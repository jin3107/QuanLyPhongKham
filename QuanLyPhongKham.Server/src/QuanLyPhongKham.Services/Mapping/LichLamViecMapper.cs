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
    public static class LichLamViecMapper
    {
        public static LichLamViecResponse ToResponse(LICHLAMVIEC e) => new()
        {
            MaLLV = e.MaLLV,
            NgayLamViec = e.NgayLamViec,
            GioBatDau = e.GioBatDau,
            GioKetThuc = e.GioKetThuc,
            MaBS = e.MaBS,
            TenBacSi = e.BacSi?.HoTen,
        };

        public static LICHLAMVIEC ToEntity(LichLamViecRequest r) => new()
        {
            NgayLamViec = r.NgayLamViec,
            GioBatDau = r.GioBatDau,
            GioKetThuc = r.GioKetThuc,
            MaBS = r.MaBS,
        };
    }
}
