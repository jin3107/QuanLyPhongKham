using LinqKit;
using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;
using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Repositories.Interfaces;
using QuanLyPhongKham.Services.Interfaces;
using QuanLyPhongKham.Services.Mapping;
using static MayNghien.Infrastructures.Helpers.SearchHelper;

namespace QuanLyPhongKham.Services.Implementations
{
    public class LichLamViecService : ILichLamViecService
    {
        private readonly ILichLamViecRepository _lichLamViecRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _contextAccessor;

        public LichLamViecService(ILichLamViecRepository lichLamViecRepository,
            UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor)
        {
            _lichLamViecRepository = lichLamViecRepository;
            _userManager = userManager;
            _contextAccessor = contextAccessor;
        }

        private async Task<ApplicationUser?> GetCurrentUser()
        => await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);

        public async Task<AppResponse<LichLamViecResponse>> CreateAsync(LichLamViecRequest request)
        {
            var result = new AppResponse<LichLamViecResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = LichLamViecMapper.ToEntity(request);
                entity.MaLLV = Guid.NewGuid();
                entity.CreatedBy = user.Email;
                entity.CreatedOn = DateTime.UtcNow;
                entity.IsDeleted = false;
                await _lichLamViecRepository.AddAsync(entity);

                var response = LichLamViecMapper.ToResponse(entity);
                return result.BuildResult(response, "Thêm thông tin lịch làm việc thành công.");
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        public async Task<AppResponse<LichLamViecResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<LichLamViecResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _lichLamViecRepository.FindBy(x => x.MaLLV == id && x.IsDeleted == false)
                    .Include(x => x.BacSi)
                    .FirstOrDefaultAsync();
                if (entity == null) 
                    return result.BuildError("Thông tin lịch làm việc không tồn tại.");
                var response = LichLamViecMapper.ToResponse(entity);
                return result.BuildResult(response);
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        public async Task<AppResponse<LichLamViecResponse>> UpdateAsync(LichLamViecRequest request)
        {
            var result = new AppResponse<LichLamViecResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _lichLamViecRepository.FindBy(x => x.MaLLV == request.MaLLV && x.IsDeleted == false)
                    .Include(x => x.BacSi)
                    .FirstOrDefaultAsync();
                if (entity == null) 
                    return result.BuildError("Thông tin lịch làm việc không tồn tại.");

                entity.NgayLamViec = request.NgayLamViec;
                entity.GioBatDau = request.GioBatDau;
                entity.GioKetThuc = request.GioKetThuc;
                entity.MaBS = request.MaBS;
                entity.ModifiedBy = user.Email;
                entity.ModifiedOn = DateTime.UtcNow;
                await _lichLamViecRepository.EditAsync(entity);

                var response = LichLamViecMapper.ToResponse(entity);
                return result.BuildResult(response, "Cập nhật thông tin  lịch làm việc thành công.");
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

                var entity = await _lichLamViecRepository.GetAsync(id);
                if (entity == null || entity.IsDeleted == true) 
                    return result.BuildError("Thông tin lịch làm việc không tồn tại.");

                entity.IsDeleted = true;
                entity.ModifiedBy = user.Email;
                entity.ModifiedOn = DateTime.UtcNow;
                await _lichLamViecRepository.EditAsync(entity);

                return result.BuildResult("Đã xóa thông tin lịch làm việc thành công.");
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        public async Task<AppResponse<SearchResponse<LichLamViecResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<LichLamViecResponse>>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _lichLamViecRepository.CountRecordsAsync(query);
                var entities = _lichLamViecRepository.FindBy(query)
                    .Include(x => x.BacSi)
                    .AsQueryable();

                if (request.SortBy != null)
                    entities = _lichLamViecRepository.AddSort(entities, request.SortBy);
                else
                    entities = entities.OrderBy(x => x.NgayLamViec);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var list = await entities.Skip(startIndex).Take(pageSize).ToListAsync();

                return result.BuildResult(new SearchResponse<LichLamViecResponse>
                {
                    TotalPages = CalculateNumOfPages(numOfRecords, pageSize),
                    TotalRows = numOfRecords,
                    CurrentPage = pageIndex,
                    RowsPerPage = pageSize,
                    Data = list.Select(LichLamViecMapper.ToResponse).ToList(),
                });
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        private ExpressionStarter<LICHLAMVIEC> BuildFilterExpression(List<Filter> filters)
        {
            var predicate = PredicateBuilder.New<LICHLAMVIEC>(true);
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    switch (filter.FieldName)
                    {
                        case "MaBS":
                            if (Guid.TryParse(filter.Value, out var maBS))
                                predicate = predicate.And(x => x.MaBS == maBS);
                            break;
                        case "NgayLamViec":
                            if (!string.IsNullOrEmpty(filter.Value) && DateTime.TryParse(filter.Value, out var ngay))
                                predicate = predicate.And(x => x.NgayLamViec >= ngay.Date && x.NgayLamViec < ngay.Date.AddDays(1));
                            break;
                    }
                }
            }
            predicate = predicate.And(x => x.IsDeleted == false);
            return predicate;
        }
    }
}
