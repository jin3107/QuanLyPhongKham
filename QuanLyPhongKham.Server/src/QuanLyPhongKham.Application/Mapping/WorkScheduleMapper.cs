using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Mapping
{
    public static class WorkScheduleMapper
    {
        public static LichLamViecResponse ToResponse(WorkSchedule e) => new()
        {
            MaLLV = e.MaLLV,
            NgayLamViec = e.NgayLamViec,
            GioBatDau = e.GioBatDau,
            GioKetThuc = e.GioKetThuc,
            MaBS = e.MaBS,
            TenBacSi = e.Doctor?.HoTen,
        };

        public static WorkSchedule ToEntity(LichLamViecRequest r) => new()
        {
            NgayLamViec = r.NgayLamViec,
            GioBatDau = r.GioBatDau,
            GioKetThuc = r.GioKetThuc,
            MaBS = r.MaBS,
        };
    }
}
