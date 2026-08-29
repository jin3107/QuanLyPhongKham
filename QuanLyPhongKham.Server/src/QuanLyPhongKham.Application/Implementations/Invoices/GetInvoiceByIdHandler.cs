using MayNghien.Infrastructures.Models.Responses;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.Application.Interfaces.Invoices;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Mapping;
using QuanLyPhongKham.DTOs.Responses;

namespace QuanLyPhongKham.Application.Implementations.Invoices
{
    public class GetInvoiceByIdHandler : IGetInvoiceByIdHandler
    {
        private readonly IInvoiceRepository _hoaDonRepo;

        public GetInvoiceByIdHandler(IInvoiceRepository hoaDonRepo)
        {
            _hoaDonRepo = hoaDonRepo;
        }

        public async Task<AppResponse<HoaDonResponse>> HandleAsync(Guid id)
        {
            var result = new AppResponse<HoaDonResponse>();

            var entity = await _hoaDonRepo.FindBy(x => x.MaHD == id && x.IsDeleted == false)
                .Include(x => x.MedicalExamination!).ThenInclude(p => p.Appointment!).ThenInclude(l => l.Patient)
                .FirstOrDefaultAsync();
            if (entity == null)
                return result.BuildError("Thông tin hóa đơn không tồn tại.");

            return result.BuildResult(InvoiceMapper.ToResponse(entity));
        }
    }
}
