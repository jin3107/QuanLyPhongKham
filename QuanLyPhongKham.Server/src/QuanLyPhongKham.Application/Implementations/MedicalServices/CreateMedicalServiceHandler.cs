using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.Application.Interfaces.MedicalServices;
using QuanLyPhongKham.Application.Interfaces.Identity;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.MedicalServices
{
    public class CreateMedicalServiceHandler : ICreateMedicalServiceHandler
    {
        private readonly IMedicalServiceRepository _repo;
        private readonly ICurrentUserService _currentUser;

        public CreateMedicalServiceHandler(IMedicalServiceRepository repo, ICurrentUserService currentUser)
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

            var entity = MedicalServiceMapper.ToEntity(request);
            entity.MaDV = Guid.NewGuid();
            entity.CreatedBy = callerEmail;
            entity.CreatedOn = DateTime.UtcNow;
            entity.IsDeleted = false;
            await _repo.AddAsync(entity);

            return result.BuildResult(MedicalServiceMapper.ToResponse(entity), "Đã tạo thông tin cho danh mục dịch vụ thành công.");
        }
    }
}
