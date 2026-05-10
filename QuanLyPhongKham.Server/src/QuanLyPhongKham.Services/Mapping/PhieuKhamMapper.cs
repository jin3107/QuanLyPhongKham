using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Models.Entities;

namespace QuanLyPhongKham.Services.Mapping
{
    public static class PhieuKhamMapper
    {
        public static PhieuKhamResponse ToResponse(PHIEUKHAM e) => new()
        {
            MaPK = e.MaPK,
            NgayKham = e.NgayKham,
            TrieuChung = e.TrieuChung,
            ChuanDoan = e.ChuanDoan,
            HuongDieuTri = e.HuongDieuTri,
            TrangThaiTiepNhan = e.TrangThaiTiepNhan,
            MaLH = e.MaLH,
            MaBS = e.MaBS,
            TenBacSi = e.BacSi?.HoTen,
            TenBenhNhan = e.LichHen?.BenhNhan?.HoTen,
        };

        public static PHIEUKHAM ToEntity(PhieuKhamRequest r) => new()
        {
            NgayKham = r.NgayKham,
            TrieuChung = r.TrieuChung,
            ChuanDoan = r.ChuanDoan,
            HuongDieuTri = r.HuongDieuTri,
            TrangThaiTiepNhan = r.TrangThaiTiepNhan,
            MaLH = r.MaLH,
            MaBS = r.MaBS,
        };
    }
}
