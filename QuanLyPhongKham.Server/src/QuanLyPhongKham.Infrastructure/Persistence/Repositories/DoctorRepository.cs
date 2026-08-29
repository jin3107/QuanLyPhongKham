using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class DoctorRepository : GenericRepository<Doctor, ApplicationDbContext, ApplicationUser>, IDoctorRepository
    {
        public DoctorRepository(ApplicationDbContext context) : base(context) { }
    }
}