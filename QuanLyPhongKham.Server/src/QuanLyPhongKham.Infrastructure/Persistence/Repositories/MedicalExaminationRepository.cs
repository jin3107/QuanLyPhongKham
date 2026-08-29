using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class MedicalExaminationRepository : GenericRepository<MedicalExamination, ApplicationDbContext, ApplicationUser>, IMedicalExaminationRepository
    {
        public MedicalExaminationRepository(ApplicationDbContext context) : base(context) { }
    }
}