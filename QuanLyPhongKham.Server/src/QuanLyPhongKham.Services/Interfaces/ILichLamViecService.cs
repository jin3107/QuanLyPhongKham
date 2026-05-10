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
    public interface ILichLamViecService
    {
        Task<AppResponse<LichLamViecResponse>> GetByIdAsync(Guid id);
        Task<AppResponse<LichLamViecResponse>> CreateAsync(LichLamViecRequest request);
        Task<AppResponse<LichLamViecResponse>> UpdateAsync(LichLamViecRequest request);
        Task<AppResponse<string>> DeleteAsync(Guid id);
        Task<AppResponse<SearchResponse<LichLamViecResponse>>> SearchAsync(SearchRequest request);
    }
}
