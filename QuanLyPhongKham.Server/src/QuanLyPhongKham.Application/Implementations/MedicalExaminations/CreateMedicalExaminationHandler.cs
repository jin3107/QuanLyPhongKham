using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.Application.Interfaces.Identity;
using QuanLyPhongKham.Application.Interfaces.MedicalExaminations;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.MedicalExaminations
{
    public class CreateMedicalExaminationHandler : ICreateMedicalExaminationHandler
    {
        private readonly IMedicalExaminationRepository _repo;
        private readonly ICurrentUserService _currentUser;

        public CreateMedicalExaminationHandler(IMedicalExaminationRepository repo, ICurrentUserService currentUser)
        {
            _repo = repo;
            _currentUser = currentUser;
        }

        public async Task<AppResponse<PhieuKhamResponse>> HandleAsync(PhieuKhamRequest request)
        {
            var result = new AppResponse<PhieuKhamResponse>();

            var callerEmail = _currentUser.GetEmail();
            if (callerEmail == null)
                return result.BuildError("Unauthorized");

            var entity = MedicalExaminationMapper.ToEntity(request);
            entity.MaPK = Guid.NewGuid();
            entity.CreatedBy = callerEmail;
            entity.CreatedOn = DateTime.UtcNow;
            entity.IsDeleted = false;
            await _repo.AddAsync(entity);

            return result.BuildResult(MedicalExaminationMapper.ToResponse(entity), "Thêm thông tin phiếu khám thành công.");
        }
    }
}
