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
    public class DanhMucDichVuService : IDanhMucDichVuService
    {
        private readonly IDanhMucDichVuRepository _danhMucDichVuRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;

        public DanhMucDichVuService(IDanhMucDichVuRepository danhMucDichVuRepository, 
            IHttpContextAccessor contextAccessor, UserManager<ApplicationUser> userManager)
        {
            _danhMucDichVuRepository = danhMucDichVuRepository;
            _contextAccessor = contextAccessor;
            _userManager = userManager;
        }

        public async Task<AppResponse<DanhMucDichVuResponse>> CreateAsync(DanhMucDichVuRequest request)
        {
            var result = new AppResponse<DanhMucDichVuResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var newDichVu = DanhMucDichVuMapper.ToEntity(request);
                newDichVu.MaDV = Guid.NewGuid();
                newDichVu.TenDV = request.TenDV;
                newDichVu.DonGia = request.DonGia;
                newDichVu.CreatedBy = user.Email;
                newDichVu.CreatedOn = DateTime.UtcNow;
                await _danhMucDichVuRepository.AddAsync(newDichVu);

                var response = DanhMucDichVuMapper.ToResponse(newDichVu);
                return result.BuildResult(response, "Đã tạo thông tin cho danh mục dịch vụ thành công.");
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

                var danhMucDichVu = await _danhMucDichVuRepository.GetAsync(id);
                if (danhMucDichVu == null || danhMucDichVu.IsDeleted == true)
                    return result.BuildError("Thông tin danh mục dịch vụ không tồn tại hoặc đã bị xóa.");

                danhMucDichVu.IsDeleted = true;
                danhMucDichVu.ModifiedBy = user.Email;
                danhMucDichVu.ModifiedOn = DateTime.UtcNow;
                await _danhMucDichVuRepository.EditAsync(danhMucDichVu);

                return result.BuildResult("Đã xóa thông tin danh mục dịch vụ thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<DanhMucDichVuResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<DanhMucDichVuResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorize");

                var danhMucDichVu = await _danhMucDichVuRepository.FindBy(v => v.MaDV == id).FirstOrDefaultAsync();
                if (danhMucDichVu == null || danhMucDichVu.IsDeleted == true)
                    return result.BuildError("Thông tin danh mục thuốc không tồn tại hoặc đã bị xóa.");

                var response = DanhMucDichVuMapper.ToResponse(danhMucDichVu);
                return result.BuildResult(response);
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<SearchResponse<DanhMucDichVuResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<DanhMucDichVuResponse>>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorize");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _danhMucDichVuRepository.CountRecordsAsync(query);
                var danhMucDichVu = _danhMucDichVuRepository.FindBy(query).AsQueryable();

                if (request.SortBy != null)
                    danhMucDichVu = _danhMucDichVuRepository.AddSort(danhMucDichVu, request.SortBy);
                else
                    danhMucDichVu = danhMucDichVu.OrderBy(x => x.TenDV);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var classList = await danhMucDichVu.Skip(startIndex).Take(pageSize).ToListAsync();
                var dtoList = classList.Select(DanhMucDichVuMapper.ToResponse).ToList();
                var searchResponse = new SearchResponse<DanhMucDichVuResponse>
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

        private ExpressionStarter<DANHMUCDICHVU> BuildFilterExpression(List<Filter> filters)
        {
            try
            {
                var predicate = PredicateBuilder.New<DANHMUCDICHVU>(true);
                if (filters != null)
                {
                    foreach (var filter in filters)
                    {
                        switch (filter.FieldName)
                        {
                            case "Tên dịch vụ":
                                if (!string.IsNullOrEmpty(filter.Value))
                                    predicate = predicate.And(x => x.TenDV.Contains(filter.Value));
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

        public async Task<AppResponse<DanhMucDichVuResponse>> UpdateAsync(DanhMucDichVuRequest request)
        {
            var result = new AppResponse<DanhMucDichVuResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var danhMucDichVu = await _danhMucDichVuRepository.GetAsync(request.MaDV);
                if (danhMucDichVu == null || danhMucDichVu.IsDeleted)
                    return result.BuildError("Không tìm thấy danh mục dịch vụ.");

                danhMucDichVu.TenDV = request.TenDV;
                danhMucDichVu.DonGia = request.DonGia;
                danhMucDichVu.ModifiedBy = user.Email;
                danhMucDichVu.ModifiedOn = DateTime.UtcNow;
                await _danhMucDichVuRepository.EditAsync(danhMucDichVu);

                var response = DanhMucDichVuMapper.ToResponse(danhMucDichVu);
                return result.BuildResult(response, "Đã cập nhật thông tin danh mục dịch vụ thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }
    }
}
