using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.Application.Interfaces.Medicines;
using QuanLyPhongKham.Application.Interfaces.Identity;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.Medicines
{
    public class CreateMedicineHandler : ICreateMedicineHandler
    {
        private readonly IMedicineRepository _repo;
        private readonly ICurrentUserService _currentUser;

        public CreateMedicineHandler(IMedicineRepository repo, ICurrentUserService currentUser)
        {
            _repo = repo;
            _currentUser = currentUser;
        }

        public async Task<AppResponse<DanhMucThuocResponse>> HandleAsync(DanhMucThuocRequest request)
        {
            var result = new AppResponse<DanhMucThuocResponse>();

            var callerEmail = _currentUser.GetEmail();
            if (callerEmail == null)
                return result.BuildError("Unauthorized");

            var entity = MedicineMapper.ToEntity(request);
            entity.MaThuoc = Guid.NewGuid();
            entity.CreatedBy = callerEmail;
            entity.CreatedOn = DateTime.UtcNow;
            entity.IsDeleted = false;
            await _repo.AddAsync(entity);

            return result.BuildResult(MedicineMapper.ToResponse(entity), "Đã tạo thông tin cho danh mục thuốc thành công.");
        }
    }
}
