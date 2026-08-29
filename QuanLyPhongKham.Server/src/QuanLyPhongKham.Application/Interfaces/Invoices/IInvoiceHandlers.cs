using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Interfaces.Invoices
{
    public interface ICreateInvoiceHandler
    {
        Task<AppResponse<HoaDonResponse>> HandleAsync(HoaDonRequest request);
    }

    public interface IUpdateInvoiceHandler
    {
        Task<AppResponse<HoaDonResponse>> HandleAsync(HoaDonRequest request);
    }

    public interface IDeleteInvoiceHandler
    {
        Task<AppResponse<string>> HandleAsync(Guid id);
    }

    public interface IGetInvoiceByIdHandler
    {
        Task<AppResponse<HoaDonResponse>> HandleAsync(Guid id);
    }

    public interface ISearchInvoiceHandler
    {
        Task<AppResponse<SearchResponse<HoaDonResponse>>> HandleAsync(SearchRequest request);
    }
}
