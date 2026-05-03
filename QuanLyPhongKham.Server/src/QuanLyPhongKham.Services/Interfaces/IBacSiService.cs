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
    public interface IBacSiService
    {
        Task<AppResponse<BacSiResponse>> CreateAsync(BacSiRequest request);
        Task<AppResponse<BacSiResponse>> UpdateAsync(BacSiRequest request);
        Task<AppResponse<BacSiResponse>> GetByIdAsync(Guid id);
        Task<AppResponse<string>> DeleteAsync(Guid id);
        Task<AppResponse<SearchResponse<BacSiResponse>>> SearchAsync(SearchRequest request);
    }
}
