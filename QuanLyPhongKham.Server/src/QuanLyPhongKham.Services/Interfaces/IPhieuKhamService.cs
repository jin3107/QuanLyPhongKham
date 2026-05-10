using MayNghien.Infrastructures.Models.Requests;
using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.DTOs.Requests;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Services.Interfaces
{
    public interface IPhieuKhamService
    {
        Task<AppResponse<PhieuKhamResponse>> GetByIdAsync(Guid id);
        Task<AppResponse<PhieuKhamResponse>> CreateAsync(PhieuKhamRequest request);
        Task<AppResponse<PhieuKhamResponse>> UpdateAsync(PhieuKhamRequest request);
        Task<AppResponse<string>> DeleteAsync(Guid id);
        Task<AppResponse<SearchResponse<PhieuKhamResponse>>> SearchAsync(SearchRequest request);
    }
}
