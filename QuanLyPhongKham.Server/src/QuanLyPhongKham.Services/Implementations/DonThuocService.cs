using LinqKit;
using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
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
    public class DonThuocService : IDonThuocService
    {
        private readonly IDonThuocRepository _donThuocRepository;
        private readonly IChiTietDonThuocRepository _chiTietRepository;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IHttpContextAccessor _contextAccessor;

        public DonThuocService(
            IDonThuocRepository donThuocRepository,
            IChiTietDonThuocRepository chiTietRepository,
            UserManager<ApplicationUser> userManager,
            IHttpContextAccessor contextAccessor)
        {
            _donThuocRepository = donThuocRepository;
            _chiTietRepository = chiTietRepository;
            _userManager = userManager;
            _contextAccessor = contextAccessor;
        }

        private async Task<ApplicationUser?> GetCurrentUser()
            => await _userManager.FindByEmailAsync(
                _contextAccessor.HttpContext?.User.Identity?.Name!);

        public async Task<AppResponse<DonThuocResponse>> CreateAsync(DonThuocRequest request)
        {
            var result = new AppResponse<DonThuocResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var donThuoc = DonThuocMapper.ToEntity(request);
                donThuoc.MaDT = Guid.NewGuid();
                donThuoc.CreatedBy = user.Email;
                donThuoc.CreatedOn = DateTime.UtcNow;
                donThuoc.IsDeleted = false;
                await _donThuocRepository.AddAsync(donThuoc);

                foreach (var ct in request.ChiTietDonThuocs)
                {
                    var chiTiet = new CHITIETDONTHUOC
                    {
                        MaCTDT = Guid.NewGuid(),
                        MaDT = donThuoc.MaDT,
                        MaThuoc = ct.MaThuoc,
                        SoLuong = ct.SoLuong,
                        LieuDung = ct.LieuDung,
                        CreatedBy = user.Email,
                        CreatedOn = DateTime.UtcNow,
                        IsDeleted = false,
                    };
                    await _chiTietRepository.AddAsync(chiTiet);
                }

                var created = await _donThuocRepository
                    .FindBy(x => x.MaDT == donThuoc.MaDT)
                    .Include(x => x.ChiTietDonThuocs!)
                        .ThenInclude(ct => ct.DanhMucThuoc)
                    .FirstOrDefaultAsync();

                var response = DonThuocMapper.ToResponse(created!);

                return result.BuildResult(response, "Thêm thông tin đơn thuốc thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<DonThuocResponse>> GetByIdAsync(Guid id)
        {
            var result = new AppResponse<DonThuocResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var donThuoc = await _donThuocRepository
                    .FindBy(x => x.MaDT == id && x.IsDeleted == false)
                    .Include(x => x.ChiTietDonThuocs!)
                        .ThenInclude(ct => ct.DanhMucThuoc)
                    .FirstOrDefaultAsync();

                if (donThuoc == null)
                    return result.BuildError("Thông tin đơn thuốc không tồn tại.");

                var response = DonThuocMapper.ToResponse(donThuoc);
                return result.BuildResult(response);
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<DonThuocResponse>> UpdateAsync(DonThuocRequest request)
        {
            var result = new AppResponse<DonThuocResponse>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var donThuoc = await _donThuocRepository
                    .FindBy(x => x.MaDT == request.MaDT && x.IsDeleted == false)
                    .Include(x => x.ChiTietDonThuocs)
                    .FirstOrDefaultAsync();

                if (donThuoc == null)
                    return result.BuildError("Thông tin đơn thuốc không tồn tại.");

                foreach (var ct in donThuoc.ChiTietDonThuocs ?? [])
                {
                    ct.IsDeleted = true;
                    ct.ModifiedBy = user.Email;
                    ct.ModifiedOn = DateTime.UtcNow;
                    await _chiTietRepository.EditAsync(ct);
                }

                foreach (var ct in request.ChiTietDonThuocs)
                {
                    var chiTiet = new CHITIETDONTHUOC
                    {
                        MaCTDT = Guid.NewGuid(),
                        MaDT = donThuoc.MaDT,
                        MaThuoc = ct.MaThuoc,
                        SoLuong = ct.SoLuong,
                        LieuDung = ct.LieuDung,
                        CreatedBy = user.Email,
                        CreatedOn = DateTime.UtcNow,
                        IsDeleted = false,
                    };
                    await _chiTietRepository.AddAsync(chiTiet);
                }

                donThuoc.ModifiedBy = user.Email;
                donThuoc.ModifiedOn = DateTime.UtcNow;
                await _donThuocRepository.EditAsync(donThuoc);

                var updated = await _donThuocRepository
                    .FindBy(x => x.MaDT == donThuoc.MaDT)
                    .Include(x => x.ChiTietDonThuocs!)
                        .ThenInclude(ct => ct.DanhMucThuoc)
                    .FirstOrDefaultAsync();

                var resposnse = DonThuocMapper.ToResponse(updated!);
                return result.BuildResult(resposnse, "Cập nhật thông tin đơn thuốc thành công.");
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

                var donThuoc = await _donThuocRepository
                    .FindBy(x => x.MaDT == id && x.IsDeleted == false)
                    .Include(x => x.ChiTietDonThuocs)
                    .FirstOrDefaultAsync();

                if (donThuoc == null)
                    return result.BuildError("Thông tin đơn thuốc không tồn tại.");

                foreach (var ct in donThuoc.ChiTietDonThuocs ?? [])
                {
                    ct.IsDeleted = true;
                    ct.ModifiedBy = user.Email;
                    ct.ModifiedOn = DateTime.UtcNow;
                    await _chiTietRepository.EditAsync(ct);
                }

                donThuoc.IsDeleted = true;
                donThuoc.ModifiedBy = user.Email;
                donThuoc.ModifiedOn = DateTime.UtcNow;
                await _donThuocRepository.EditAsync(donThuoc);

                return result.BuildResult("Đã xóa thông tin đơn thuốc thành công.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<SearchResponse<DonThuocResponse>>> SearchAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<DonThuocResponse>>();
            try
            {
                var user = await GetCurrentUser();
                if (user == null) 
                    return result.BuildError("Unauthorized");

                var query = BuildFilterExpression(request.Filters!);
                var numOfRecords = await _donThuocRepository.CountRecordsAsync(query);
                var donThuocs = _donThuocRepository
                    .FindBy(query)
                    .Include(x => x.ChiTietDonThuocs!)
                        .ThenInclude(ct => ct.DanhMucThuoc)
                    .AsQueryable();

                if (request.SortBy != null)
                    donThuocs = _donThuocRepository.AddSort(donThuocs, request.SortBy);
                else
                    donThuocs = donThuocs.OrderByDescending(x => x.NgayKe);

                int pageIndex = request.PageIndex ?? 1;
                int pageSize = request.PageSize ?? 10;
                int startIndex = (pageIndex - 1) * pageSize;
                var list = await donThuocs.Skip(startIndex).Take(pageSize).ToListAsync();

                var searchResponse = new SearchResponse<DonThuocResponse>
                {
                    TotalPages = CalculateNumOfPages(numOfRecords, pageSize),
                    TotalRows = numOfRecords,
                    CurrentPage = pageIndex,
                    RowsPerPage = pageSize,
                    Data = list.Select(DonThuocMapper.ToResponse).ToList(),
                };

                return result.BuildResult(searchResponse);
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        private ExpressionStarter<DONTHUOC> BuildFilterExpression(List<Filter> filters)
        {
            try
            {
                var predicate = PredicateBuilder.New<DONTHUOC>(true);
                if (filters != null)
                {
                    foreach (var filter in filters)
                    {
                        switch (filter.FieldName)
                        {
                            case "Ngày kê":
                                if (!string.IsNullOrEmpty(filter.Value) && DateTime.TryParse(filter.Value, out var ngayKe))
                                    predicate = predicate.And(x => x.NgayKe >= ngayKe.Date && x.NgayKe < ngayKe.Date.AddDays(1));
                                break;
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
    }
}
