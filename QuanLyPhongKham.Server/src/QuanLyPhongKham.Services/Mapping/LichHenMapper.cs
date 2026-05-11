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
    public static class LichHenMapper
    {
        public static LichHenResponse ToResponse(LICHHEN entity)
        {
            return new LichHenResponse
            {
                MaLH = entity.MaLH,
                ThoiGianKham = entity.ThoiGianKham,
                TrangThai = entity.TrangThai,
                MaBN = entity.MaBN,
                MaBS = entity.MaBS,
                CreatedBy = entity.CreatedBy
            };
        }

        public static LICHHEN ToEntity(LichHenRequest request)
        {
            return new LICHHEN
            {
                ThoiGianKham = request.ThoiGianKham,
                TrangThai = request.TrangThai,
                MaBN = request.MaBN,
                MaBS = request.MaBS
            };
        }
    }
}
