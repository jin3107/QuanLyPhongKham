using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;
using QuanLyPhongKham.Models.Entities;

namespace QuanLyPhongKham.Services.Mapping
{
    public static class BenhNhanMapper
    {
        public static BenhNhanResponse ToResponse(BENHNHAN e) => new()
        {
            MaBN = e.MaBN,
            HoTen = e.HoTen,
            NgaySinh = e.NgaySinh,
            GioiTinh = e.GioiTinh,
            SoDienThoai = e.SoDienThoai,
            DiaChi = e.DiaChi,
            SoBHYT = e.SoBHYT,
            TienSuDiUng = e.TienSuDiUng,
        };

        public static BENHNHAN ToEntity(BenhNhanRequest r) => new()
        {
            HoTen = r.HoTen,
            NgaySinh = r.NgaySinh,
            GioiTinh = r.GioiTinh,
            SoDienThoai = r.SoDienThoai,
            DiaChi = r.DiaChi,
            SoBHYT = r.SoBHYT,
            TienSuDiUng = r.TienSuDiUng,
        };
    }
}
