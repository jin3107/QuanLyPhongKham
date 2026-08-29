using MayNghien.Infrastructures.Models.Responses;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.Application.Interfaces.MedicalServices;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.MedicalServices
{
    public class GetMedicalServiceByIdHandler : IGetMedicalServiceByIdHandler
    {
        private readonly IMedicalServiceRepository _repo;

        public GetMedicalServiceByIdHandler(IMedicalServiceRepository repo)
        {
            _repo = repo;
        }

        public async Task<AppResponse<DanhMucDichVuResponse>> HandleAsync(Guid id)
        {
            var result = new AppResponse<DanhMucDichVuResponse>();

            var entity = await _repo.FindBy(v => v.MaDV == id && v.IsDeleted == false)
                .FirstOrDefaultAsync();
            if (entity == null)
                return result.BuildError("Thông tin danh mục dịch vụ không tồn tại hoặc đã bị xóa.");

            return result.BuildResult(MedicalServiceMapper.ToResponse(entity));
        }
    }
}
