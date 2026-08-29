using MayNghien.Infrastructures.Models.Requests;
using QuanLyPhongKham.Domain.Entities;
using System.Linq.Expressions;

namespace QuanLyPhongKham.Application.Interfaces.Repositories
{
    public interface IMedicalExaminationRepository
    {
        Task<MedicalExamination?> GetAsync(Guid id);
        Task AddAsync(MedicalExamination item);
        Task EditAsync(MedicalExamination entity);
        IQueryable<MedicalExamination> FindBy(Expression<Func<MedicalExamination, bool>> predicate);
        Task<int> CountRecordsAsync(Expression<Func<MedicalExamination, bool>> predicate);
        IQueryable<MedicalExamination> AddSort(IQueryable<MedicalExamination> input, SortByInfo sortByInfo);
    }
}
