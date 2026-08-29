using QuanLyPhongKham.Domain.Entities;
using System.Linq.Expressions;

namespace QuanLyPhongKham.Application.Interfaces.Repositories
{
    public interface IMedicalExaminationServiceRepository
    {
        Task<MedicalExaminationService?> GetAsync(Guid id);
        Task AddRangeAsync(List<MedicalExaminationService> items, bool isCommit = true);
        Task EditAsync(MedicalExaminationService entity);
        IQueryable<MedicalExaminationService> FindBy(Expression<Func<MedicalExaminationService, bool>> predicate);
    }
}
