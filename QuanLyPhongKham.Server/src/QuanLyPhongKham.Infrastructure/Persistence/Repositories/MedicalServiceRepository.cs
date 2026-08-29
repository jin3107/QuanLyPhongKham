using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class MedicalServiceRepository : GenericRepository<MedicalService, ApplicationDbContext, ApplicationUser>, IMedicalServiceRepository
    {
        public MedicalServiceRepository(ApplicationDbContext context) : base(context) { }
    }
}