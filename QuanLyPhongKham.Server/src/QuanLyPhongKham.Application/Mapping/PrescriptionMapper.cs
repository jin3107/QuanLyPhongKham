using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Mapping
{
    public static class PrescriptionMapper
    {
        public static ChiTietDonThuocResponse ToChiTietResponse(PrescriptionDetail entity) => new()
        {
            MaCTDT = entity.MaCTDT,
            MaThuoc = entity.MaThuoc,
            TenThuoc = entity.Medicine?.TenThuoc,
            DonGia = entity.Medicine?.DonGia ?? 0,
            SoLuong = entity.SoLuong,
            LieuDung = entity.LieuDung,
        };

        public static DonThuocResponse ToResponse(Prescription entity) => new()
        {
            MaDT = entity.MaDT,
            MaPK = entity.MaPK,
            NgayKe = entity.NgayKe,
            ChiTietDonThuocs = entity.PrescriptionDetails?
                .Where(x => x.IsDeleted == false)
                .Select(ToChiTietResponse).ToList() ?? [],
        };

        public static Prescription ToEntity(DonThuocRequest request) => new()
        {
            MaPK = request.MaPK,
            NgayKe = DateTime.UtcNow,
        };
    }
}
