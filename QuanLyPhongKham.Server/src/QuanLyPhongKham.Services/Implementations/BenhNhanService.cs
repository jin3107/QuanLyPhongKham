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
    public class BenhNhanService : IBenhNhanService
    {
        private readonly IBenhNhanRepository _benhNhanRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IHttpContextAccessor _contextAccessor;

        public BenhNhanService(IBenhNhanRepository benhNhanRepository,
            UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IHttpContextAccessor contextAccessor)
        {
            _benhNhanRepository = benhNhanRepository;
            _userManager = userManager;
            _roleManager = roleManager;
            _contextAccessor = contextAccessor;
        }

        private async Task<ApplicationUser?> GetCurrentUser()
        => await _userManager.FindByEmailAsync(_contextAccessor.HttpContext?.User.Identity?.Name!);

        public async Task<AppResponse<BenhNhanResponse>> CreateAsync(BenhNhanRequest request)
        {
            var result = new AppResponse<BenhNhanResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = BenhNhanMapper.ToEntity(request);
                entity.MaBN = Guid.NewGuid();
                entity.CreatedBy = user.Email;
                entity.CreatedOn = DateTime.UtcNow;
                entity.IsDeleted = false;
                await _benhNhanRepository.AddAsync(entity);

                var response = BenhNhanMapper.ToResponse(entity);
                return result.BuildResult(response, "Thêm thông tin bệnh nhân thành công.");
            }
            catch (Exception ex) { return result.BuildError(ex.Message + " " + ex.StackTrace); }
        }

        public async Task<AppResponse<BenhNhanResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<BenhNhanResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _benhNhanRepository.FindBy(x => x.MaBN == id && x.IsDeleted == false)
                    .FirstOrDefaultAsync();
                if (entity == null) 
                    return result.BuildError("Thông tin bệnh nhân không tồn tại.");

                return result.BuildResult(BenhNhanMapper.ToResponse(entity));
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        public async Task<AppResponse<BenhNhanResponse>> UpdateAsync(BenhNhanRequest request)
        {
            var result = new AppResponse<BenhNhanResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var entity = await _benhNhanRepository.GetAsync(request.MaBN!.Value);
                if (entity == null || entity.IsDeleted) 
                    return result.BuildError("Thông tin bệnh nhân không tồn tại.");

                entity.HoTen = request.HoTen;
                entity.NgaySinh = request.NgaySinh;
                entity.GioiTinh = request.GioiTinh;
                entity.SoDienThoai = request.SoDienThoai;
                entity.DiaChi = request.DiaChi;
                entity.SoBHYT = request.SoBHYT;
                entity.TienSuDiUng = request.TienSuDiUng;
                entity.ModifiedBy = user.Email;
                entity.ModifiedOn = DateTime.UtcNow;
                await _benhNhanRepository.EditAsync(entity);

                var response = BenhNhanMapper.ToResponse(entity);
                return result.BuildResult(response, "Cập nhật thông tin bệnh nhân thành công.");
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

                var entity = await _benhNhanRepository.GetAsync(id);
                if (entity == null || entity.IsDeleted == true) 
                    return result.BuildError("Thông tin bệnh nhân không tồn tại.");

                entity.IsDeleted = true;
                entity.ModifiedBy = user.Email;
                entity.ModifiedOn = DateTime.UtcNow;
                await _benhNhanRepository.EditAsync(entity);

                return result.BuildResult("Đã xóa thông tin bệnh nhân thành công.");
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        public async Task<AppResponse<SearchResponse<BenhNhanResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<BenhNhanResponse>>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _benhNhanRepository.CountRecordsAsync(query);
                var entities = _benhNhanRepository.FindBy(query).AsQueryable();

                if (request.SortBy != null)
                    entities = _benhNhanRepository.AddSort(entities, request.SortBy);
                else
                    entities = entities.OrderBy(x => x.HoTen);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var list = await entities.Skip(startIndex).Take(pageSize).ToListAsync();

                return result.BuildResult(new SearchResponse<BenhNhanResponse>
                {
                    TotalPages = CalculateNumOfPages(numOfRecords, pageSize),
                    TotalRows = numOfRecords,
                    CurrentPage = pageIndex,
                    RowsPerPage = pageSize,
                    Data = list.Select(BenhNhanMapper.ToResponse).ToList(),
                });
            }
            catch (Exception ex) 
            { 
                return result.BuildError(ex.Message + " " + ex.StackTrace); 
            }
        }

        private ExpressionStarter<BENHNHAN> BuildFilterExpression(List<Filter> filters)
        {
            var predicate = PredicateBuilder.New<BENHNHAN>(true);
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
                        case "Số điện thoại":
                            if (!string.IsNullOrEmpty(filter.Value))
                                predicate = predicate.And(x => x.SoDienThoai!.Contains(filter.Value));
                            break;
                    }
                }
            }
            predicate = predicate.And(x => x.IsDeleted == false);
            return predicate;
        }
    }
}
