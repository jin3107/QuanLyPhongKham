using LinqKit;
using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.Commons.Enum;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;
using QuanLyPhongKham.Models.Data;
using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Repositories.Interfaces;
using QuanLyPhongKham.Services.Interfaces;
using QuanLyPhongKham.Services.Mapping;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using static MayNghien.Infrastructures.Helpers.SearchHelper;

namespace QuanLyPhongKham.Services.Implementations
{
    public class NhanVienService : INhanVienService
    {
        private readonly INhanVienRepository _nhanVienfRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public NhanVienService(INhanVienRepository nhanVienfRepository,
            IHttpContextAccessor contextAccessor, UserManager<ApplicationUser> userManager, 
            RoleManager<IdentityRole> roleManager)
        {
            _nhanVienfRepository = nhanVienfRepository;
            _contextAccessor = contextAccessor;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<AppResponse<NhanVienResponse>> CreateAsync(NhanVienRequest request)
        {
            var result = new AppResponse<NhanVienResponse>();
            try
            {
                var currentUser = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (currentUser == null)
                    return result.BuildError("Unauthorized");

                if (await CheckUserExists(request.Email, request.SoDienThoai!))
                    return result.BuildError("Email hoặc số điện thoại của nhân viên đã tồn tại");

                var createStaff = await CreateStaff(request);
                if (createStaff == null)
                    return result.BuildError("Tạo nhân viên thất bại.");

                var (createResult, createdUser) = await CreateUser(request, createStaff.MaNV);
                if (!createResult.Succeeded)
                {
                    await _nhanVienfRepository.DeleteAsync(createStaff);

                    if (createdUser != null)
                        await _userManager.DeleteAsync(createdUser);

                    return result.BuildError("Không thể tạo người dùng: "
                        + string.Join(", ", createResult.Errors.Select(e => e.Description)));
                }

                var identityUser = await _userManager.FindByEmailAsync(request.Email);
                if (identityUser == null)
                    return result.BuildError("Không thể truy xuất thông tin nhân viên đã tạo.");

                await AssignRole(identityUser, request.Role);
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, request.Email),
                    new Claim(ClaimTypes.Role, request.Role),
                };

                var response = NhanVienMapper.ToResponse(createStaff);
                return result.BuildResult(response, "Tạo nhân viên thành công");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }

        }

        private async Task<(IdentityResult Result, ApplicationUser? User)> CreateUser(NhanVienRequest request, Guid staffId)
        {
            var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
            if (request == null)
                throw new ArgumentNullException(nameof(request), "Yêu cầu đăng ký cho nhân viên không được xác định.");

            var identityUser = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email,
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                PhoneNumber = request.SoDienThoai,
                Role = Role.LeTan
            };

            var result = await _userManager.CreateAsync(identityUser, request.Password);
            return (result, identityUser);
        }

        private async Task<bool> CheckUserExists(string email, string phoneNumber)
        {
            if (string.IsNullOrEmpty(email))
                throw new ArgumentNullException(nameof(email));

            var userByEmail = await _userManager.FindByEmailAsync(email);
            if (userByEmail != null) return true;

            var userByPhoneNumber = await _userManager.Users.FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber);
            return userByPhoneNumber != null;
        }

        private async Task<NHANVIEN> CreateStaff(NhanVienRequest request)
        {
            var currentUser = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
            if (request == null)
                throw new ArgumentNullException(nameof(request), "Yêu cầu cho nhân viên không được xác định.");

            var staff = NhanVienMapper.ToEntity(request);
            staff.MaNV = Guid.NewGuid();
            staff.CreatedBy = currentUser?.Email;
            staff.CreatedOn = DateTime.UtcNow;
            staff.IsDeleted = false;

            await _nhanVienfRepository.AddAsync(staff);
            return staff;
        }

        private async Task AssignRole(ApplicationUser user, string role)
        {
            var roles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, roles);

            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            await _userManager.AddToRoleAsync(user, role);
        }

        public async Task<AppResponse<string>> DeleteAsync(Guid id)
        {
            var result = new AppResponse<string>();
            try
            {
                var currentUser = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (currentUser == null)
                    return result.BuildError("Unauthorized");

                var staff = await _nhanVienfRepository.GetAsync(id);
                if (staff == null)
                    return result.BuildError("Không tìm thấy nhân viên");

                staff.IsDeleted = true;
                staff.ModifiedBy = currentUser.Email;
                staff.ModifiedOn = DateTime.UtcNow;

                await _nhanVienfRepository.EditAsync(staff);
                return result.BuildResult("Đã xóa thành công", "Đã xóa nhân viên thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<NhanVienResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<NhanVienResponse>();
            try
            {
                var currentUser = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (currentUser == null)
                    return result.BuildError("Unauthorized");

                var staff = await _nhanVienfRepository.GetAsync(id);
                if (staff == null || staff.IsDeleted)
                    return result.BuildError("Không tìm thấy nhân viên.");

                var response = NhanVienMapper.ToResponse(staff);
                return result.BuildResult(response);
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<SearchResponse<NhanVienResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<NhanVienResponse>>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorize");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _nhanVienfRepository.CountRecordsAsync(query);
                var staffs = _nhanVienfRepository.FindBy(query).AsQueryable();
                if (request.SortBy != null)
                    staffs = _nhanVienfRepository.AddSort(staffs, request.SortBy);
                else
                    staffs = staffs.OrderBy(x => x.HoTen);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 1;
                int startIndex = (pageIndex - 1) * pageSize;
                var staffList = await staffs.Skip(startIndex).Take(pageSize).ToListAsync();
                var dtoList = staffList.Select(NhanVienMapper.ToResponse).ToList();
                var searchResponse = new SearchResponse<NhanVienResponse>
                {
                    TotalPages = CalculateNumOfPages(numOfRecords, pageSize),
                    TotalRows = numOfRecords,
                    CurrentPage = pageIndex,
                    Data = dtoList,
                    RowsPerPage = pageSize,
                };
                result.Data = searchResponse;
                result.IsSuccess = true;
            }
            catch (Exception ex)
            {
                result.BuildError(ex.Message + " " + ex.StackTrace);
            }
            return result;
        }

        private ExpressionStarter<NHANVIEN> BuildFilterExpression(List<Filter> filters)
        {
            try
            {
                var predicate = PredicateBuilder.New<NHANVIEN>(true);
                if (filters != null)
                {
                    foreach (var filter in filters)
                    {
                        switch (filter.FieldName)
                        {
                            case "Name":
                                if (!string.IsNullOrEmpty(filter.Value))
                                    predicate = predicate.And(x => x.HoTen.Contains(filter.Value));
                                break;

                            case "Email":
                                if (!string.IsNullOrEmpty(filter.Value))
                                    predicate = predicate.And(x => x.Email.Contains(filter.Value));
                                break;

                            case "PhoneNumber":
                                if (!string.IsNullOrEmpty(filter.Value))
                                    predicate = predicate.And(x => x.SoDienThoai!.Contains(filter.Value));
                                break;

                            case "Role":
                                if (!string.IsNullOrEmpty(filter.Value))
                                    predicate = predicate.And(x => x.Role.Contains(filter.Value));
                                break;

                            default: break;
                        }
                    }
                }

                predicate = predicate.And(x => x.IsDeleted == false);
                return predicate;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<NhanVienResponse>> UpdateAsync(NhanVienRequest request)
        {
            var result = new AppResponse<NhanVienResponse>();
            try
            {
                var userName = _contextAccessor.HttpContext?.User.Identity?.Name;
                if (userName == null)
                    return result.BuildError("Unauthorized");

                if (request.MaNV == Guid.Empty)
                    return result.BuildError("Staff ID is required");

                var staff = await _nhanVienfRepository.GetAsync(request.MaNV);
                if (staff == null || staff.IsDeleted)
                    return result.BuildError("Không tìm thấy nhân viên.");

                if ((staff.Email != request.Email || staff.SoDienThoai != request.SoDienThoai) &&
                    await CheckUserExists(request.Email, request.SoDienThoai!))
                    return result.BuildError("Email hoặc số điện thoại đã được sử dụng.");

                var currentEmail = staff.Email;
                staff.HoTen = request.HoTen;
                staff.Email = request.Email;
                staff.SoDienThoai = request.SoDienThoai;
                staff.Password = request.Password;
                staff.Role = request.Role;
                staff.ModifiedBy = userName;
                staff.ModifiedOn = DateTime.UtcNow;

                var identityUser = await _userManager.FindByEmailAsync(currentEmail);
                if (identityUser == null)
                    return result.BuildError("Không tìm thấy tài khoản người dùng liên kết.");

                identityUser.Email = request.Email;
                identityUser.PhoneNumber = request.SoDienThoai;

                var updateResult = await _userManager.UpdateAsync(identityUser);
                if (!updateResult.Succeeded)
                    return result.BuildError("Cpậ nhật người dùng thất bại: " +
                        string.Join(", ", updateResult.Errors.Select(e => e.Description)));

                await AssignRole(identityUser, request.Role);
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, request.Email),
                    new Claim(ClaimTypes.Role, request.Role),
                };

                await _nhanVienfRepository.EditAsync(staff);
                var response = NhanVienMapper.ToResponse(staff);

                return result.BuildResult(response, "Cập nhật nhân viên thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }
    }
}
