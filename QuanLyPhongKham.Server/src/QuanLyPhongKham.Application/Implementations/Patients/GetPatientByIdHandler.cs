using MayNghien.Infrastructures.Models.Responses;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.Application.Interfaces.Patients;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.Patients
{
    public class GetPatientByIdHandler : IGetPatientByIdHandler
    {
        private readonly IPatientRepository _benhNhanRepository;

        public GetPatientByIdHandler(IPatientRepository benhNhanRepository)
        {
            _benhNhanRepository = benhNhanRepository;
        }

        public async Task<AppResponse<BenhNhanResponse>> HandleAsync(Guid id)
        {
            var result = new AppResponse<BenhNhanResponse>();

            var entity = await _benhNhanRepository.FindBy(x => x.MaBN == id && x.IsDeleted == false)
                .FirstOrDefaultAsync();
            if (entity == null)
                return result.BuildError("Thông tin bệnh nhân không tồn tại.");

            return result.BuildResult(PatientMapper.ToResponse(entity));
        }
    }
}
