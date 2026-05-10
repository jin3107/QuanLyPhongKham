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
    public static class DanhMucDichVuMapper
    {
        public static DanhMucDichVuResponse ToResponse(DANHMUCDICHVU entity)
        {
            return new DanhMucDichVuResponse
            {
                MaDV = entity.MaDV,
                TenDV = entity.TenDV,
                DonGia = entity.DonGia
            };
        }

        public static DANHMUCDICHVU ToEntity(DanhMucDichVuRequest request)
        {
            return new DANHMUCDICHVU
            {
                TenDV = request.TenDV,
                DonGia = request.DonGia
            };
        }
    }
}
