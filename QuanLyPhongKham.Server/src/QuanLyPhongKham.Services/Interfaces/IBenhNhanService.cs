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
    public interface IBenhNhanService
    {
        Task<AppResponse<BenhNhanResponse>> GetByIdAsync(Guid id);
        Task<AppResponse<BenhNhanResponse>> CreateAsync(BenhNhanRequest request);
        Task<AppResponse<BenhNhanResponse>> UpdateAsync(BenhNhanRequest request);
        Task<AppResponse<string>> DeleteAsync(Guid id);
        Task<AppResponse<SearchResponse<BenhNhanResponse>>> SearchAsync(SearchRequest request);
    }
}
