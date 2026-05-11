using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Services.Interfaces
{
    public interface IHoaDonService
    {
        Task<AppResponse<HoaDonResponse>> GetByIdAsync(Guid id);
        Task<AppResponse<HoaDonResponse>> CreateAsync(HoaDonRequest request);
        Task<AppResponse<HoaDonResponse>> UpdateAsync(HoaDonRequest request);
        Task<AppResponse<string>> DeleteAsync(Guid id);
        Task<AppResponse<SearchResponse<HoaDonResponse>>> SearchAsync(SearchRequest request);
    }
}
