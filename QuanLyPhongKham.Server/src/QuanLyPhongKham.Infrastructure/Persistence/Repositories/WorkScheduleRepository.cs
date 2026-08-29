using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class WorkScheduleRepository : GenericRepository<WorkSchedule, ApplicationDbContext, ApplicationUser>, IWorkScheduleRepository
    {
        public WorkScheduleRepository(ApplicationDbContext context) : base(context) { }
    }
}