using LinqKit;
using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Repositories.Interfaces;
using QuanLyPhongKham.Services.Interfaces;
using QuanLyPhongKham.Services.Mapping;
using static MayNghien.Infrastructures.Helpers.SearchHelper;

namespace QuanLyPhongKham.Services.Implementations
{
    public class PhieuKhamService : IPhieuKhamService
    {
        private readonly IPhieuKhamRepository _phieuKhamRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _contextAccessor;

        public PhieuKhamService(IPhieuKhamRepository phieuKhamRepository, 
            UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor)
        {
            _phieuKhamRepository = phieuKhamRepository;
            _userManager = userManager;
            _contextAccessor = contextAccessor;
        }

        private async Task<ApplicationUser?> GetCurrentUser()
            => await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);

        public async Task<AppResponse<PhieuKhamResponse>> CreateAsync(PhieuKhamRequest request)
        {
            var result = new AppResponse<PhieuKhamResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = PhieuKhamMapper.ToEntity(request);
                entity.MaPK = Guid.NewGuid();
                entity.CreatedBy = user.Email;
                entity.CreatedOn = DateTime.UtcNow;
                entity.IsDeleted = false;
                await _phieuKhamRepository.AddAsync(entity);

                var response = PhieuKhamMapper.ToResponse(entity);
                return result.BuildResult(response, "Thêm thông tin phiếu khám thành công.");
            }
            catch (Exception ex) { return result.BuildError(ex.Message + " " + ex.StackTrace); }
        }

        public async Task<AppResponse<PhieuKhamResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<PhieuKhamResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _phieuKhamRepository.FindBy(x => x.MaPK == id && x.IsDeleted == false)
                    .Include(x => x.BacSi)
                    .Include(x => x.LichHen!).ThenInclude(l => l.BenhNhan)
                    .FirstOrDefaultAsync();
                if (entity == null) return result.BuildError("Thông tin phiếu khám không tồn tại.");

                var response = PhieuKhamMapper.ToResponse(entity);
                return result.BuildResult(response);
            }
            catch (Exception ex) { return result.BuildError(ex.Message + " " + ex.StackTrace); }
        }

        public async Task<AppResponse<PhieuKhamResponse>> UpdateAsync(PhieuKhamRequest request)
        {
            var result = new AppResponse<PhieuKhamResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _phieuKhamRepository.FindBy(x => x.MaPK == request.MaPK && x.IsDeleted == false)
                    .Include(x => x.BacSi)
                    .Include(x => x.LichHen!).ThenInclude(l => l.BenhNhan)
                    .FirstOrDefaultAsync();
                if (entity == null) 
                    return result.BuildError("Thông tin phiếu khám không tồn tại.");

                entity.NgayKham = request.NgayKham;
                entity.TrieuChung = request.TrieuChung;
                entity.ChuanDoan = request.ChuanDoan;
                entity.HuongDieuTri = request.HuongDieuTri;
                entity.TrangThaiTiepNhan = request.TrangThaiTiepNhan;
                entity.MaLH = request.MaLH;
                entity.MaBS = request.MaBS;
                entity.ModifiedBy = user.Email;
                entity.ModifiedOn = DateTime.UtcNow;
                await _phieuKhamRepository.EditAsync(entity);

                var response = PhieuKhamMapper.ToResponse(entity);
                return result.BuildResult(response, "Cập nhật thông tin phiếu khám thành công.");
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
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _phieuKhamRepository.GetAsync(id);
                if (entity == null || entity.IsDeleted == true) 
                    return result.BuildError("Thông tin phiếu khám không tồn tại.");

                entity.IsDeleted = true;
                entity.ModifiedBy = user.Email;
                entity.ModifiedOn = DateTime.UtcNow;
                await _phieuKhamRepository.EditAsync(entity);

                return result.BuildResult("Đã xóa thông tin phiếu khám thành công.");
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        public async Task<AppResponse<SearchResponse<PhieuKhamResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<PhieuKhamResponse>>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _phieuKhamRepository.CountRecordsAsync(query);
                var entities = _phieuKhamRepository.FindBy(query)
                    .Include(x => x.BacSi)
                    .Include(x => x.LichHen!).ThenInclude(l => l.BenhNhan)
                    .AsQueryable();

                if (request.SortBy != null)
                    entities = _phieuKhamRepository.AddSort(entities, request.SortBy);
                else
                    entities = entities.OrderByDescending(x => x.NgayKham);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var list = await entities.Skip(startIndex).Take(pageSize).ToListAsync();

                return result.BuildResult(new SearchResponse<PhieuKhamResponse>
                {
                    TotalPages = CalculateNumOfPages(numOfRecords, pageSize),
                    TotalRows = numOfRecords,
                    CurrentPage = pageIndex,
                    RowsPerPage = pageSize,
                    Data = list.Select(PhieuKhamMapper.ToResponse).ToList(),
                });
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        private ExpressionStarter<PHIEUKHAM> BuildFilterExpression(List<Filter> filters)
        {
            var predicate = PredicateBuilder.New<PHIEUKHAM>(true);
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    switch (filter.FieldName)
                    {
                        case "Trạng thái tiếp nhận":
                            if (!string.IsNullOrEmpty(filter.Value))
                                predicate = predicate.And(x => x.TrangThaiTiepNhan!.Contains(filter.Value));
                            break;
                        case "Ngày khám":
                            if (!string.IsNullOrEmpty(filter.Value) && DateTime.TryParse(filter.Value, out var ngay))
                                predicate = predicate.And(x => x.NgayKham >= ngay.Date && x.NgayKham < ngay.Date.AddDays(1));
                            break;
                    }
                }
            }
            predicate = predicate.And(x => x.IsDeleted == false);
            return predicate;
        }
    }
}
