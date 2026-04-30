using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Services.Interfaces
{
    public interface INhanVienService
    {
        Task<AppResponse<NhanVienResponse>> GetByIdAsync(Guid id);
        Task<AppResponse<NhanVienResponse>> CreateAsync(NhanVienRequest request);
        Task<AppResponse<NhanVienResponse>> UpdateAsync(NhanVienRequest request);
        Task<AppResponse<string>> DeleteAsync(Guid id);
        Task<AppResponse<SearchResponse<NhanVienResponse>>> SearchAsync(SearchRequest request);
    }
}
