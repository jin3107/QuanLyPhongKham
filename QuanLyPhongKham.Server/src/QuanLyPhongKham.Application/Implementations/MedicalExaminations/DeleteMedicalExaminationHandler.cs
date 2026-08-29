using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.Application.Interfaces.Identity;
using QuanLyPhongKham.Application.Interfaces.MedicalExaminations;
using QuanLyPhongKham.Application.Interfaces.Repositories;

namespace QuanLyPhongKham.Application.Implementations.MedicalExaminations
{
    public class DeleteMedicalExaminationHandler : IDeleteMedicalExaminationHandler
    {
        private readonly IMedicalExaminationRepository _repo;
        private readonly ICurrentUserService _currentUser;

        public DeleteMedicalExaminationHandler(IMedicalExaminationRepository repo, ICurrentUserService currentUser)
        {
            _repo = repo;
            _currentUser = currentUser;
        }

        public async Task<AppResponse<string>> HandleAsync(Guid id)
        {
            var result = new AppResponse<string>();

            var callerEmail = _currentUser.GetEmail();
            if (callerEmail == null)
                return result.BuildError("Unauthorized");

            var entity = await _repo.GetAsync(id);
            if (entity == null || entity.IsDeleted == true)
                return result.BuildError("Thông tin phiếu khám không tồn tại.");

            entity.IsDeleted = true;
            entity.ModifiedBy = callerEmail;
            entity.ModifiedOn = DateTime.UtcNow;
            await _repo.EditAsync(entity);

            return result.BuildResult("Đã xóa thông tin phiếu khám thành công.");
        }
    }
}
