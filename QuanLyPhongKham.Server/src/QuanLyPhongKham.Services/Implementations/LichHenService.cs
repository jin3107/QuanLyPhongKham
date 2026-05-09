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
    public class LichHenService : ILichHenService
    {
        private readonly ILichHenRepository _lichHenRepository;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;

        public LichHenService(ILichHenRepository lichHenRepository,
            IHttpContextAccessor contextAccessor, UserManager<ApplicationUser> userManager)
        {
            _lichHenRepository = lichHenRepository;
            _contextAccessor = contextAccessor;
            _userManager = userManager;
        }

        public async Task<AppResponse<LichHenResponse>> CreateAsync(LichHenRequest request)
        {
            var result = new AppResponse<LichHenResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var newLichHen = LichHenMapper.ToEntity(request);
                newLichHen.MaLH = Guid.NewGuid();
                newLichHen.ThoiGianKham = request.ThoiGianKham;
                newLichHen.TrangThai = request.TrangThai;
                newLichHen.MaBN = request.MaBN;
                newLichHen.MaBS = request.MaBS;
                newLichHen.CreatedBy = user.Email;
                newLichHen.CreatedOn = DateTime.UtcNow;
                await _lichHenRepository.AddAsync(newLichHen);

                var response = LichHenMapper.ToResponse(newLichHen);
                return result.BuildResult(response, "Đã tạo thông tin cho lịch hẹn thành công.");
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

                var lichHen = await _lichHenRepository.GetAsync(id);
                if (lichHen == null || lichHen.IsDeleted == true)
                    return result.BuildError("Thông tin lịch hẹn không tồn tại hoặc đã bị xóa.");

                lichHen.IsDeleted = true;
                lichHen.ModifiedBy = user.Email;
                lichHen.ModifiedOn = DateTime.UtcNow;
                await _lichHenRepository.EditAsync(lichHen);

                return result.BuildResult("Đã xóa thông tin lịch hẹn thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<LichHenResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<LichHenResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorize");

                var lichHen = await _lichHenRepository.FindBy(v => v.MaLH == id).FirstOrDefaultAsync();
                if (lichHen == null || lichHen.IsDeleted == true)
                    return result.BuildError("Thông tin lịch hẹn không tồn tại hoặc đã bị xóa.");

                var response = LichHenMapper.ToResponse(lichHen);
                return result.BuildResult(response);
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<SearchResponse<LichHenResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<LichHenResponse>>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorize");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _lichHenRepository.CountRecordsAsync(query);
                var lichHen = _lichHenRepository.FindBy(query).Include(x => x.ThoiGianKham).AsQueryable();

                if (request.SortBy != null)
                    lichHen = _lichHenRepository.AddSort(lichHen, request.SortBy);
                else
                    lichHen = lichHen.OrderBy(x => x.ThoiGianKham);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var classList = await lichHen.Skip(startIndex).Take(pageSize).ToListAsync();
                var dtoList = classList.Select(LichHenMapper.ToResponse).ToList();
                var searchResponse = new SearchResponse<LichHenResponse>
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

        private ExpressionStarter<LICHHEN> BuildFilterExpression(List<Filter> filters)
        {
            try
            {
                var predicate = PredicateBuilder.New<LICHHEN>(true);
                if (filters != null)
                {
                    foreach (var filter in filters)
                    {
                        switch (filter.FieldName)
                        {
                            case "Thời gian khám":
                                if (!string.IsNullOrEmpty(filter.Value) && DateTime.TryParse(filter.Value, out var thoiGianKham))
                                    predicate = predicate.And(x => x.ThoiGianKham >= thoiGianKham.Date && x.ThoiGianKham < thoiGianKham.Date.AddDays(1));
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

        public async Task<AppResponse<LichHenResponse>> UpdateAsync(LichHenRequest request)
        {
            var result = new AppResponse<LichHenResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);
                if (user == null)
                    return result.BuildError("Unauthorized");

                var lichHen = await _lichHenRepository.GetAsync(request.MaLH);
                if (lichHen == null || lichHen.IsDeleted)
                    return result.BuildError("Không tìm thấy lịch hẹn.");

                lichHen.ThoiGianKham = request.ThoiGianKham;
                lichHen.TrangThai = request.TrangThai;
                lichHen.MaBN = request.MaBN;
                lichHen.MaBS = request.MaBS;
                lichHen.ModifiedBy = user.Email;
                lichHen.ModifiedOn = DateTime.UtcNow;
                await _lichHenRepository.EditAsync(lichHen);

                var response = LichHenMapper.ToResponse(lichHen);
                return result.BuildResult(response, "Đã cập nhật thông tin lịch hẹn thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }
    }
}
