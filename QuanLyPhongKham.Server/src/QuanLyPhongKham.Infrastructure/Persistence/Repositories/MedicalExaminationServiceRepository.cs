using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Persistence.Repositories
{
    public class MedicalExaminationServiceRepository
        : GenericRepository<MedicalExaminationService, ApplicationDbContext, ApplicationUser>,
          IMedicalExaminationServiceRepository
    {
        public MedicalExaminationServiceRepository(ApplicationDbContext context) : base(context) { }
    }
}
