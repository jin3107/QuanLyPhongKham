using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.Application.Interfaces.MedicalServices;
using QuanLyPhongKham.Application.Interfaces.Identity;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.MedicalServices
{
    public class UpdateMedicalServiceHandler : IUpdateMedicalServiceHandler
    {
        private readonly IMedicalServiceRepository _repo;
        private readonly ICurrentUserService _currentUser;

        public UpdateMedicalServiceHandler(IMedicalServiceRepository repo, ICurrentUserService currentUser)
        {
            _repo = repo;
            _currentUser = currentUser;
        }

        public async Task<AppResponse<DanhMucDichVuResponse>> HandleAsync(DanhMucDichVuRequest request)
        {
            var result = new AppResponse<DanhMucDichVuResponse>();

            var callerEmail = _currentUser.GetEmail();
            if (callerEmail == null)
                return result.BuildError("Unauthorized");

            var entity = await _repo.GetAsync(request.MaDV);
            if (entity == null || entity.IsDeleted)
                return result.BuildError("Không tìm thấy danh mục dịch vụ.");

            entity.TenDV = request.TenDV;
            entity.DonGia = request.DonGia;
            entity.ModifiedBy = callerEmail;
            entity.ModifiedOn = DateTime.UtcNow;
            await _repo.EditAsync(entity);

            return result.BuildResult(MedicalServiceMapper.ToResponse(entity), "Đã cập nhật thông tin danh mục dịch vụ thành công.");
        }
    }
}
