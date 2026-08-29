using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Mapping
{
    public static class MedicineMapper
    {
        public static DanhMucThuocResponse ToResponse(Medicine entity) => new()
        {
            MaThuoc = entity.MaThuoc,
            TenThuoc = entity.TenThuoc,
            DonGia = entity.DonGia,
            ChongChiDinh = entity.ChongChiDinh
        };

        public static Medicine ToEntity(DanhMucThuocRequest request) => new()
        {
            TenThuoc = request.TenThuoc,
            DonGia = request.DonGia,
            ChongChiDinh = request.ChongChiDinh
        };
    }
}
