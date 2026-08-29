using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class PrescriptionDetailRepository : GenericRepository<PrescriptionDetail, ApplicationDbContext, ApplicationUser>, IPrescriptionDetailRepository
    {
        public PrescriptionDetailRepository(ApplicationDbContext context) : base(context) { }

        public async Task EditRangeAsync(List<PrescriptionDetail> items)
        {
            if (items.Count == 0) return;
            DbContext.UpdateRange(items);
            await DbContext.SaveChangesAsync();
        }
    }
}