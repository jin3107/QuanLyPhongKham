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
    public static class DonThuocMapper
    {
        public static ChiTietDonThuocResponse ToResponse(CHITIETDONTHUOC entity)
        {
            return new ChiTietDonThuocResponse
            {
                MaCTDT = entity.MaCTDT,
                MaThuoc = entity.MaThuoc,
                TenThuoc = entity.DanhMucThuoc?.TenThuoc,
                DonGia = entity.DanhMucThuoc?.DonGia ?? 0,
                SoLuong = entity.SoLuong,
                LieuDung = entity.LieuDung,
            };
        }

        public static DonThuocResponse ToResponse(DONTHUOC entity)
        {
            return new DonThuocResponse
            {
                MaDT = entity.MaDT,
                MaPK = entity.MaPK,
                NgayKe = entity.NgayKe,
                ChiTietDonThuocs = entity.ChiTietDonThuocs?
                    .Select(ToResponse).ToList() ?? [],
            };
        }

        public static DONTHUOC ToEntity(DonThuocRequest request)
        {
            return new DONTHUOC
            {
                MaPK = request.MaPK,
                NgayKe = DateTime.UtcNow,
            };
        }
    }
}
