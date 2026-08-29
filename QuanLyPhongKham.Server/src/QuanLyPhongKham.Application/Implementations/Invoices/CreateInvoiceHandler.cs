using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.Application.Interfaces.Invoices;
using QuanLyPhongKham.Application.Interfaces.Identity;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.Invoices
{
    public class CreateInvoiceHandler : ICreateInvoiceHandler
    {
        private readonly IInvoiceRepository _hoaDonRepo;
        private readonly ICurrentUserService _currentUser;

        public CreateInvoiceHandler(IInvoiceRepository hoaDonRepo, ICurrentUserService currentUser)
        {
            _hoaDonRepo = hoaDonRepo;
            _currentUser = currentUser;
        }

        public async Task<AppResponse<HoaDonResponse>> HandleAsync(HoaDonRequest request)
        {
            var result = new AppResponse<HoaDonResponse>();

            var callerEmail = _currentUser.GetEmail();
            var callerId = _currentUser.GetUserId();
            if (callerEmail == null || callerId == null)
                return result.BuildError("Unauthorized");

            var entity = InvoiceMapper.ToEntity(request);
            entity.MaHD = Guid.NewGuid();
            entity.MaLeTan = callerId;   // current Identity user's ID
            entity.CreatedBy = callerEmail;
            entity.CreatedOn = DateTime.UtcNow;
            entity.IsDeleted = false;
            await _hoaDonRepo.AddAsync(entity);

            return result.BuildResult(InvoiceMapper.ToResponse(entity), "Thêm thông tin hóa đơn thành công.");
        }
    }
}
