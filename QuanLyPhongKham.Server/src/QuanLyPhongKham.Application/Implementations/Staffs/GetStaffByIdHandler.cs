using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.Application.Interfaces.Staffs;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.Staffs
{
    public class GetStaffByIdHandler : IGetStaffByIdHandler
    {
        private readonly IStaffRepository _nhanVienRepo;

        public GetStaffByIdHandler(IStaffRepository nhanVienRepo)
        {
            _nhanVienRepo = nhanVienRepo;
        }

        public async Task<AppResponse<NhanVienResponse>> HandleAsync(Guid id)
        {
            var result = new AppResponse<NhanVienResponse>();

            var staff = await _nhanVienRepo.GetAsync(id);
            if (staff == null || staff.IsDeleted)
                return result.BuildError("Không tìm thấy nhân viên.");

            return result.BuildResult(StaffMapper.ToResponse(staff));
        }
    }
}
