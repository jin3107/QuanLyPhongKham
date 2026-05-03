using LinqKit;
using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.Commons.Enum;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;
using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Repositories.Interfaces;
using QuanLyPhongKham.Services.Interfaces;
using QuanLyPhongKham.Services.Mapping;
using static MayNghien.Infrastructures.Helpers.SearchHelper;

namespace QuanLyPhongKham.Services.Implementations
{
    public class BacSiService : IBacSiService
    {
        private readonly IBacSiRepository _bacSiRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IHttpContextAccessor _contextAccessor;

        public BacSiService(IBacSiRepository bacSiRepository,
            UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager,
            IHttpContextAccessor contextAccessor)
        {
            _bacSiRepository = bacSiRepository;
            _userManager = userManager;
            _roleManager = roleManager;
            _contextAccessor = contextAccessor;
        }

        public async Task<AppResponse<BacSiResponse>> CreateAsync(BacSiRequest request)
        {
            var result = new AppResponse<BacSiResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                if (string.IsNullOrWhiteSpace(request.Password))
                    return result.BuildError("Mật khẩu là bắt buộc khi tạo bác sĩ.");

                if (await CheckUserExists(request.Email, request.SoDienThoai!))
                    return result.BuildError("Email hoặc số điện thoại của bác sĩ đã tồn tại.");

                var (createResult, identityUser) = await CreateUser(request);
                if (!createResult.Succeeded || identityUser == null)
                    return result.BuildError("Không thể tạo người dùng: "
                        + string.Join(", ", createResult.Errors.Select(e => e.Description)));

                var bacSi = BacSiMapper.ToEntity(request);
                bacSi.MaBS = Guid.NewGuid();
                bacSi.HoTen = request.HoTen;
                bacSi.ChuyenKhoa = request.ChuyenKhoa;
                bacSi.SoDienThoai = request.SoDienThoai;
                bacSi.MaTK = identityUser.Id;
                bacSi.TaiKhoan = identityUser;
                bacSi.CreatedBy = user.Email;
                bacSi.CreatedOn = DateTime.UtcNow;
                bacSi.IsDeleted = false;

                try
                {
                    await AssignRole(identityUser, Role.BacSi.ToString());
                    await _bacSiRepository.AddAsync(bacSi);
                }
                catch
                {
                    await _userManager.DeleteAsync(identityUser);
                    throw;
                }

                var response = BacSiMapper.ToResponse(bacSi);
                return result.BuildResult(response, "Đã tạo thông tin bác sĩ thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<string>> DeleteAsync(Guid id)
        {
            var result = new AppResponse<string>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var bacSi = await _bacSiRepository.GetAsync(id);
                if (bacSi == null || bacSi.IsDeleted == true)
                    return result.BuildError("Thông tin bác sĩ không tồn tại hoặc đã bị xóa.");

                bacSi.IsDeleted = true;
                bacSi.ModifiedBy = user.Email;
                bacSi.ModifiedOn = DateTime.UtcNow;

                if (!string.IsNullOrEmpty(bacSi.MaTK))
                {
                    var identityUser = await _userManager.FindByIdAsync(bacSi.MaTK);
                    if (identityUser != null)
                    {
                        var roles = await _userManager.GetRolesAsync(identityUser);
                        await _userManager.RemoveFromRolesAsync(identityUser, roles);
                        identityUser.TrangThai = "Inactive";
                        await _userManager.UpdateAsync(identityUser);
                    }
                }

                await _bacSiRepository.EditAsync(bacSi);

                return result.BuildResult("Đã xóa thông tin bác sĩ thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<BacSiResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<BacSiResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var bacSi = await _bacSiRepository.FindBy(b => b.MaBS == id)
                    .Include(b => b.TaiKhoan)
                    .FirstOrDefaultAsync();
                if (bacSi == null || bacSi.IsDeleted == true)
                    return result.BuildError("Thông tin bác sĩ không tồn tại hoặc đã bị xóa.");

                var response = BacSiMapper.ToResponse(bacSi);
                return result.BuildResult(response);
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<SearchResponse<BacSiResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<BacSiResponse>>();
            try
            {
                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _bacSiRepository.CountRecordsAsync(query);
                var bacSies = _bacSiRepository.FindBy(query).Include(x => x.TaiKhoan).AsQueryable();

                if (request.SortBy != null)
                    bacSies = _bacSiRepository.AddSort(bacSies, request.SortBy);
                else
                    bacSies = bacSies.OrderBy(x => x.HoTen);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var classList = await bacSies.Skip(startIndex).Take(pageSize).ToListAsync();
                var dtoList = classList.Select(BacSiMapper.ToResponse).ToList();
                var searchResponse = new SearchResponse<BacSiResponse>
                {
                    TotalPages = CalculateNumOfPages(numOfRecords, pageSize),
                    TotalRows = numOfRecords,
                    CurrentPage = pageIndex,
                    Data = dtoList,
                    RowsPerPage = pageSize,
                };

                return result.BuildResult(searchResponse);
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<BacSiResponse>> UpdateAsync(BacSiRequest request)
        {
            var result = new AppResponse<BacSiResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var bacSi = await _bacSiRepository.GetAsync(request.MaBS);
                if (bacSi == null || bacSi.IsDeleted == true)
                    return result.BuildError("Thông tin bác sĩ không tồn tại hoặc đã bị xóa.");

                var identityUser = !string.IsNullOrEmpty(bacSi.MaTK)
                    ? await _userManager.FindByIdAsync(bacSi.MaTK)
                    : null;

                bool isNewUser = false;

                if (identityUser == null)
                {
                    if (string.IsNullOrWhiteSpace(request.Password))
                        return result.BuildError("Bác sĩ chưa có tài khoản đăng nhập. Vui lòng nhập mật khẩu để tạo tài khoản.");

                    if (await CheckUserExists(request.Email, request.SoDienThoai!))
                        return result.BuildError("Email hoặc số điện thoại đã được sử dụng.");

                    var (createResult, createdUser) = await CreateUser(request);
                    if (!createResult.Succeeded || createdUser == null)
                        return result.BuildError("Không thể tạo người dùng: "
                            + string.Join(", ", createResult.Errors.Select(e => e.Description)));

                    identityUser = createdUser;
                    bacSi.MaTK = identityUser.Id;
                    isNewUser = true;
                }

                if (await CheckUserExists(request.Email, request.SoDienThoai!, identityUser.Id))
                    return result.BuildError("Email hoặc số điện thoại đã được sử dụng.");

                bacSi.HoTen = request.HoTen;
                bacSi.ChuyenKhoa = request.ChuyenKhoa;
                bacSi.SoDienThoai = request.SoDienThoai;
                bacSi.ModifiedBy = user.Email;
                bacSi.ModifiedOn = DateTime.UtcNow;

                identityUser.UserName = request.Email;
                identityUser.Email = request.Email;
                identityUser.PhoneNumber = request.SoDienThoai;
                identityUser.FullName = request.HoTen;
                identityUser.Role = Role.BacSi;

                var updateUserResult = await _userManager.UpdateAsync(identityUser);
                if (!updateUserResult.Succeeded)
                    return result.BuildError("Cập nhật người dùng thất bại: "
                        + string.Join(", ", updateUserResult.Errors.Select(e => e.Description)));

                if (!string.IsNullOrWhiteSpace(request.Password))
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(identityUser);
                    var resetPasswordResult = await _userManager.ResetPasswordAsync(identityUser, token, request.Password);
                    if (!resetPasswordResult.Succeeded)
                        return result.BuildError("Cập nhật mật khẩu thất bại: "
                            + string.Join(", ", resetPasswordResult.Errors.Select(e => e.Description)));
                }

                try
                {
                    await AssignRole(identityUser, Role.BacSi.ToString());
                    bacSi.TaiKhoan = identityUser;
                    await _bacSiRepository.EditAsync(bacSi);
                }
                catch
                {
                    if (isNewUser)
                        await _userManager.DeleteAsync(identityUser);
                    throw;
                }

                var response = BacSiMapper.ToResponse(bacSi);
                return result.BuildResult(response, "Đã cập nhật thông tin bác sĩ thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        private ExpressionStarter<BACSI> BuildFilterExpression(List<Filter> filters)
        {
            try
            {
                var predicate = PredicateBuilder.New<BACSI>(true);
                if (filters != null)
                {
                    foreach (var filter in filters)
                    {
                        switch (filter.FieldName)
                        {
                            case "Họ tên":
                                if (!string.IsNullOrEmpty(filter.Value))
                                    predicate = predicate.And(x => x.HoTen.Contains(filter.Value));
                                break;

                            case "Chuyên khoa":
                                if (!string.IsNullOrEmpty(filter.Value))
                                    predicate = predicate.And(x => x.ChuyenKhoa!.Contains(filter.Value));
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

        private async Task<(IdentityResult Result, ApplicationUser? User)> CreateUser(BacSiRequest request)
        {
            var identityUser = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email,
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                PhoneNumber = request.SoDienThoai,
                FullName = request.HoTen,
                Role = Role.BacSi
            };

            var result = await _userManager.CreateAsync(identityUser, request.Password!);
            return (result, identityUser);
        }

        private async Task<bool> CheckUserExists(string email, string phoneNumber, string? ignoreUserId = null)
        {
            var userByEmail = await _userManager.FindByEmailAsync(email);
            if (userByEmail != null && userByEmail.Id != ignoreUserId)
                return true;

            var userByPhoneNumber = await _userManager.Users
                .FirstOrDefaultAsync(x => x.PhoneNumber == phoneNumber && x.Id != ignoreUserId);
            return userByPhoneNumber != null;
        }

        private async Task AssignRole(ApplicationUser user, string role)
        {
            var roles = await _userManager.GetRolesAsync(user);
            await _userManager.RemoveFromRolesAsync(user, roles);

            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            await _userManager.AddToRoleAsync(user, role);
        }
    }
}