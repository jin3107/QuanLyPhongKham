using MayNghien.Infrastructures.Models.Responses;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.Application.Interfaces.Appointments;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.Appointments
{
    public class GetAppointmentByIdHandler : IGetAppointmentByIdHandler
    {
        private readonly IAppointmentRepository _lichHenRepo;

        public GetAppointmentByIdHandler(IAppointmentRepository lichHenRepo)
        {
            _lichHenRepo = lichHenRepo;
        }

        public async Task<AppResponse<LichHenResponse>> HandleAsync(Guid id)
        {
            var result = new AppResponse<LichHenResponse>();

            var lichHen = await _lichHenRepo.FindBy(v => v.MaLH == id && v.IsDeleted == false)
                .FirstOrDefaultAsync();
            if (lichHen == null)
                return result.BuildError("Thông tin lịch hẹn không tồn tại hoặc đã bị xóa.");

            return result.BuildResult(AppointmentMapper.ToResponse(lichHen));
        }
    }
}
