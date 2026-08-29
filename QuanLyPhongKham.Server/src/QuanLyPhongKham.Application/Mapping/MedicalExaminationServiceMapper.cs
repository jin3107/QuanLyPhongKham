using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Mapping
{
    public static class MedicalExaminationServiceMapper
    {
        public static PhieuKhamDichVuResponse ToResponse(MedicalExaminationService entity) => new()
        {
            Id = entity.Id,
            MaPK = entity.MaPK,
            MaDV = entity.MaDV,
            TenDV = entity.MedicalService?.TenDV,
            DonGia = entity.DonGia,
        };
    }
}
