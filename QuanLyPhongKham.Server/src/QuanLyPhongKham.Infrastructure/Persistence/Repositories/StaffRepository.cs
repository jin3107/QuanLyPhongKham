using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class StaffRepository : GenericRepository<Staff, ApplicationDbContext, ApplicationUser>, IStaffRepository
    {
        public StaffRepository(ApplicationDbContext context) : base(context) { }
    }
}