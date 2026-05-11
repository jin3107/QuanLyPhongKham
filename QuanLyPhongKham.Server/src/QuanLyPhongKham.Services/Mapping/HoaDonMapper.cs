using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;
using QuanLyPhongKham.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Services.Mapping
{
    public static class HoaDonMapper
    {
        public static HoaDonResponse ToResponse(HOADON e) => new()
        {
            MaHD = e.MaHD,
            NgayThanhToan = e.NgayThanhToan,
            TongTien = e.TongTien,
            TrangThaiThanhToan = e.TrangThaiThanhToan,
            MaLeTan = e.MaLeTan,
            MaPK = e.MaPK,
            TenBenhNhan = e.PhieuKham?.LichHen?.BenhNhan?.HoTen,
        };

        public static HOADON ToEntity(HoaDonRequest r) => new()
        {
            NgayThanhToan = r.NgayThanhToan,
            TongTien = r.TongTien,
            TrangThaiThanhToan = r.TrangThaiThanhToan,
            MaLeTan = r.MaLeTan,
            MaPK = r.MaPK,
        };
    }
}
