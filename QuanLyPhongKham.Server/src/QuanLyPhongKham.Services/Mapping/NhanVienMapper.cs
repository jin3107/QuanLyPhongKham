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
    public static class NhanVienMapper
    {
        public static NhanVienResponse ToResponse(NHANVIEN entity)
        {
            return new NhanVienResponse
            {
                MaNV = entity.MaNV,
                HoTen = entity.HoTen,
                Email = entity.Email,
                SoDienThoai = entity.SoDienThoai,
                Role = entity.Role
            };
        }

        public static NHANVIEN ToEntity(NhanVienRequest request)
        {
            return new NHANVIEN
            {
                HoTen = request.HoTen,
                Email = request.Email,
                SoDienThoai = request.SoDienThoai,
                Role = request.Role,
                Password = request.Password,
            };
        }
    }
}
