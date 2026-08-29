using LinqKit;
using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.Application.Interfaces.Prescriptions;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.DTOs.Responses;
using static MayNghien.Infrastructures.Helpers.SearchHelper;

namespace QuanLyPhongKham.Application.Implementations.Prescriptions
{
    public class SearchPrescriptionHandler : ISearchPrescriptionHandler
    {
        private readonly IPrescriptionRepository _donThuocRepo;

        public SearchPrescriptionHandler(IPrescriptionRepository donThuocRepo)
        {
            _donThuocRepo = donThuocRepo;
        }

        public async Task<AppResponse<SearchResponse<DonThuocResponse>>> HandleAsync(SearchRequest request)
        {
            var result = new AppResponse<SearchResponse<DonThuocResponse>>();

            var query = BuildFilterExpression(request.Filters!);
            var numOfRecords = await _donThuocRepo.CountRecordsAsync(query);
            var entities = _donThuocRepo.FindBy(query)
                .Include(x => x.PrescriptionDetails!)
                    .ThenInclude(ct => ct.Medicine)
                .AsQueryable();

            if (request.SortBy != null)
                entities = _donThuocRepo.AddSort(entities, request.SortBy);
            else
                entities = entities.OrderByDescending(x => x.NgayKe);

            int pageIndex = request.PageIndex ?? 1;
            int pageSize = request.PageSize ?? 10;
            int startIndex = (pageIndex - 1) * pageSize;
            var list = await entities.Skip(startIndex).Take(pageSize).ToListAsync();

            return result.BuildResult(new SearchResponse<DonThuocResponse>
            {
                TotalPages = CalculateNumOfPages(numOfRecords, pageSize),
                TotalRows = numOfRecords,
                CurrentPage = pageIndex,
                RowsPerPage = pageSize,
                Data = list.Select(PrescriptionMapper.ToResponse).ToList(),
            });
        }

        private static ExpressionStarter<Prescription> BuildFilterExpression(List<Filter> filters)
        {
            var predicate = PredicateBuilder.New<Prescription>(true);
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
    }
}
