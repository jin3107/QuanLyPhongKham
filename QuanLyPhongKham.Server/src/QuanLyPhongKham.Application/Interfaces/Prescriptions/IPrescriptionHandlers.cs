using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Interfaces.Prescriptions
{
    public interface ICreatePrescriptionHandler
    {
        Task<AppResponse<DonThuocResponse>> HandleAsync(DonThuocRequest request);
    }

    public interface IUpdatePrescriptionHandler
    {
        Task<AppResponse<DonThuocResponse>> HandleAsync(DonThuocRequest request);
    }

    public interface IDeletePrescriptionHandler
    {
        Task<AppResponse<string>> HandleAsync(Guid id);
    }

    public interface IGetPrescriptionByIdHandler
    {
        Task<AppResponse<DonThuocResponse>> HandleAsync(Guid id);
    }

    public interface ISearchPrescriptionHandler
    {
        Task<AppResponse<SearchResponse<DonThuocResponse>>> HandleAsync(SearchRequest request);
    }
}
