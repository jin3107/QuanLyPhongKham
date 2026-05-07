using LinqKit;
using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;
using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Repositories.Implementations;
using QuanLyPhongKham.Repositories.Interfaces;
using QuanLyPhongKham.Services.Interfaces;
using QuanLyPhongKham.Services.Mapping;
using static MayNghien.Infrastructures.Helpers.SearchHelper;

namespace QuanLyPhongKham.Services.Implementations
{
    public class DanhMucThuocService : IDanhMucThuocService
    {
        private readonly IDanhMucThuocRepository _danhMucThuocRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _contextAccessor;

        public DanhMucThuocService(IDanhMucThuocRepository danhMucThuocRepository, 
            UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor)
        {
            _danhMucThuocRepository = danhMucThuocRepository;
            _userManager = userManager;
            _contextAccessor = contextAccessor;
        }

        public async Task<AppResponse<DanhMucThuocResponse>> CreateAsync(DanhMucThuocRequest request)
        {
            var result = new AppResponse<DanhMucThuocResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var newDanhMucThuoc = DanhMucThuocMapper.ToEntity(request);
                newDanhMucThuoc.MaThuoc = Guid.NewGuid();
                newDanhMucThuoc.TenThuoc = request.TenThuoc;
                newDanhMucThuoc.DonGia = request.DonGia;
                newDanhMucThuoc.ChongChiDinh = request.ChongChiDinh;
                newDanhMucThuoc.CreatedBy = user.Email;
                newDanhMucThuoc.CreatedOn = DateTime.UtcNow;
                newDanhMucThuoc.IsDeleted = false;
                await _danhMucThuocRepository.AddAsync(newDanhMucThuoc);

                var response = DanhMucThuocMapper.ToResponse(newDanhMucThuoc);
                return result.BuildResult(response, "Đã tạo thông tin cho danh mục thuốc thành công.");
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

                var danhMucThuoc = await _danhMucThuocRepository.GetAsync(id);
                if (danhMucThuoc == null || danhMucThuoc.IsDeleted == true)
                    return result.BuildError("Thông tin danh mục thuốc không tồn tại hoặc đã bị xóa.");

                danhMucThuoc.IsDeleted = true;
                danhMucThuoc.ModifiedBy = user.Email;
                danhMucThuoc.ModifiedOn = DateTime.UtcNow;
                await _danhMucThuocRepository.EditAsync(danhMucThuoc);

                return result.BuildResult("Đã xóa thông tin danh mục thuốc thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<DanhMucThuocResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<DanhMucThuocResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var danhMucThuoc = await _danhMucThuocRepository.FindBy(b => b.MaThuoc == id)
                    .FirstOrDefaultAsync();
                if (danhMucThuoc == null || danhMucThuoc.IsDeleted == true)
                    return result.BuildError("Thông tin bác sĩ không tồn tại hoặc đã bị xóa.");

                var response = DanhMucThuocMapper
                    .ToResponse(danhMucThuoc);
                return result.BuildResult(response);
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<SearchResponse<DanhMucThuocResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<DanhMucThuocResponse>>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorize");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _danhMucThuocRepository.CountRecordsAsync(query);
                var danhMucThuoc = _danhMucThuocRepository.FindBy(query).Include(x => x.TenThuoc).AsQueryable();

                if (request.SortBy != null)
                    danhMucThuoc = _danhMucThuocRepository.AddSort(danhMucThuoc, request.SortBy);
                else
                    danhMucThuoc = danhMucThuoc.OrderBy(x => x.TenThuoc);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var classList = await danhMucThuoc.Skip(startIndex).Take(pageSize).ToListAsync();
                var dtoList = classList.Select(DanhMucThuocMapper.ToResponse).ToList();
                var searchResponse = new SearchResponse<DanhMucThuocResponse>
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

        private ExpressionStarter<DANHMUCTHUOC> BuildFilterExpression(List<Filter> filters)
        {
            try
            {
                var predicate = PredicateBuilder.New<DANHMUCTHUOC>(true);
                if (filters != null)
                {
                    foreach (var filter in filters)
                    {
                        switch (filter.FieldName)
                        {
                            case "Tên thuốc":
                                if (!string.IsNullOrEmpty(filter.Value))
                                    predicate = predicate.And(x => x.TenThuoc.Contains(filter.Value));
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

        public async Task<AppResponse<DanhMucThuocResponse>> UpdateAsync(DanhMucThuocRequest request)
        {
            var result = new AppResponse<DanhMucThuocResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var danhMucThuoc = await _danhMucThuocRepository.GetAsync(request.MaThuoc);
                if (danhMucThuoc == null || danhMucThuoc.IsDeleted)
                    return result.BuildError("Không tìm thấy danh mục thuốc.");

                danhMucThuoc.TenThuoc = request.TenThuoc;
                danhMucThuoc.DonGia = request.DonGia;
                danhMucThuoc.ChongChiDinh = request.ChongChiDinh;
                danhMucThuoc.ModifiedBy = user.Email;
                danhMucThuoc.ModifiedOn = DateTime.UtcNow;
                await _danhMucThuocRepository.EditAsync(danhMucThuoc);

                var response = DanhMucThuocMapper.ToResponse(danhMucThuoc);
                return result.BuildResult(response, "Đã cập nhật thông tin danh mục thuốc thảnh công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }
    }
}
