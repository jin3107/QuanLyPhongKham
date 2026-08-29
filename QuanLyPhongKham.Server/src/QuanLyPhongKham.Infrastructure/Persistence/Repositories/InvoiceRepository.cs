using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class InvoiceRepository : GenericRepository<Invoice, ApplicationDbContext, ApplicationUser>, IInvoiceRepository
    {
        public InvoiceRepository(ApplicationDbContext context) : base(context) { }
    }
}