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
    public class HoaDonService : IHoaDonService
    {
        private readonly IHoaDonRepository _hoaDonRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _contextAccessor;

        public HoaDonService(IHoaDonRepository hoaDonRepository, 
            UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor)
        {
            _hoaDonRepository = hoaDonRepository;
            _userManager = userManager;
            _contextAccessor = contextAccessor;
        }

        private async Task<ApplicationUser?> GetCurrentUser()
        => await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);

        public async Task<AppResponse<HoaDonResponse>> CreateAsync(HoaDonRequest request)
        {
            var result = new AppResponse<HoaDonResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = HoaDonMapper.ToEntity(request);
                entity.MaHD = Guid.NewGuid();
                entity.MaLeTan = user.Id;
                entity.CreatedBy = user.Email;
                entity.CreatedOn = DateTime.UtcNow;
                entity.IsDeleted = false;
                await _hoaDonRepository.AddAsync(entity);

                return result.BuildResult(HoaDonMapper.ToResponse(entity), "Thêm thông tin hóa đơn thành công.");
            }
            catch (Exception ex) { return result.BuildError(ex.Message + " " + ex.StackTrace); }
        }

        public async Task<AppResponse<HoaDonResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<HoaDonResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _hoaDonRepository.FindBy(x => x.MaHD == id && x.IsDeleted == false)
                    .Include(x => x.PhieuKham!)
                        .ThenInclude(p => p.LichHen!)
                        .ThenInclude(l => l.BenhNhan)
                    .FirstOrDefaultAsync();
                if (entity == null) 
                    return result.BuildError("Thông tin hóa đơn không tồn tại.");

                return result.BuildResult(HoaDonMapper.ToResponse(entity));
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<HoaDonResponse>> UpdateAsync(HoaDonRequest request)
        {
            var result = new AppResponse<HoaDonResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _hoaDonRepository.FindBy(x => x.MaHD == request.MaHD && x.IsDeleted == false)
                    .Include(x => x.PhieuKham!)
                        .ThenInclude(p => p.LichHen!)
                        .ThenInclude(l => l.BenhNhan)
                    .FirstOrDefaultAsync();
                if (entity == null) 
                    return result.BuildError("Thông tin hóa đơn không tồn tại.");

                entity.NgayThanhToan = request.NgayThanhToan;
                entity.TongTien = request.TongTien;
                entity.TrangThaiThanhToan = request.TrangThaiThanhToan;
                entity.ModifiedBy = user.Email;
                entity.ModifiedOn = DateTime.UtcNow;
                await _hoaDonRepository.EditAsync(entity);

                return result.BuildResult(HoaDonMapper.ToResponse(entity), "Cập nhật thông tin hóa đơn thành công.");
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

                var entity = await _hoaDonRepository.GetAsync(id);
                if (entity == null || entity.IsDeleted == true) 
                    return result.BuildError("Thông tin hóa đơn không tồn tại.");

                entity.IsDeleted = true;
                entity.ModifiedBy = user.Email;
                entity.ModifiedOn = DateTime.UtcNow;
                await _hoaDonRepository.EditAsync(entity);

                return result.BuildResult("Đã xóa thông tin hóa đơn thành công.");
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        public async Task<AppResponse<SearchResponse<HoaDonResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<HoaDonResponse>>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _hoaDonRepository.CountRecordsAsync(query);
                var entities = _hoaDonRepository.FindBy(query)
                    .Include(x => x.PhieuKham!)
                        .ThenInclude(p => p.LichHen!)
                        .ThenInclude(l => l.BenhNhan)
                    .AsQueryable();

                if (request.SortBy != null)
                    entities = _hoaDonRepository.AddSort(entities, request.SortBy);
                else
                    entities = entities.OrderByDescending(x => x.NgayThanhToan);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var list = await entities.Skip(startIndex).Take(pageSize).ToListAsync();

                return result.BuildResult(new SearchResponse<HoaDonResponse>
                {
                    TotalPages = CalculateNumOfPages(numOfRecords, pageSize),
                    TotalRows = numOfRecords,
                    CurrentPage = pageIndex,
                    RowsPerPage = pageSize,
                    Data = list.Select(HoaDonMapper.ToResponse).ToList(),
                });
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        private ExpressionStarter<HOADON> BuildFilterExpression(List<Filter> filters)
        {
            var predicate = PredicateBuilder.New<HOADON>(true);
            if (filters != null)
            {
                foreach (var filter in filters)
                {
                    switch (filter.FieldName)
                    {
                        case "Trang thái thanh toán":
                            if (!string.IsNullOrEmpty(filter.Value))
                                predicate = predicate.And(x => x.TrangThaiThanhToan!.Contains(filter.Value));
                            break;
                        case "Ngày thanh toán":
                            if (!string.IsNullOrEmpty(filter.Value) && DateTime.TryParse(filter.Value, out var ngay))
                                predicate = predicate.And(x => x.NgayThanhToan >= ngay.Date && x.NgayThanhToan < ngay.Date.AddDays(1));
                            break;
                    }
                }
            }
            predicate = predicate.And(x => x.IsDeleted == false);
            return predicate;
        }
    }
}
