using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class PatientRepository : GenericRepository<Patient, ApplicationDbContext, ApplicationUser>, IPatientRepository
    {
        public PatientRepository(ApplicationDbContext context) : base(context) { }
    }
}