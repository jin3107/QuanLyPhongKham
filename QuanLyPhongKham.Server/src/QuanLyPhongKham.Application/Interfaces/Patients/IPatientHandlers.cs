using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Interfaces.Patients
{
    public interface ICreatePatientHandler
    {
        Task<AppResponse<BenhNhanResponse>> HandleAsync(BenhNhanRequest request);
    }

    public interface IUpdatePatientHandler
    {
        Task<AppResponse<BenhNhanResponse>> HandleAsync(BenhNhanRequest request);
    }

    public interface IDeletePatientHandler
    {
        Task<AppResponse<string>> HandleAsync(Guid id);
    }

    public interface IGetPatientByIdHandler
    {
        Task<AppResponse<BenhNhanResponse>> HandleAsync(Guid id);
    }

    public interface ISearchPatientHandler
    {
        Task<AppResponse<SearchResponse<BenhNhanResponse>>> HandleAsync(SearchRequest request);
    }
}
