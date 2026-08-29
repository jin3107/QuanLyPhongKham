using MayNghien.Infrastructures.Models.Requests;
using QuanLyPhongKham.Domain.Entities;
using System.Linq.Expressions;

namespace QuanLyPhongKham.Application.Interfaces.Repositories
{
    public interface IWorkScheduleRepository
    {
        Task<WorkSchedule?> GetAsync(Guid id);
        Task AddAsync(WorkSchedule item);
        Task EditAsync(WorkSchedule entity);
        IQueryable<WorkSchedule> FindBy(Expression<Func<WorkSchedule, bool>> predicate);
        Task<int> CountRecordsAsync(Expression<Func<WorkSchedule, bool>> predicate);
        IQueryable<WorkSchedule> AddSort(IQueryable<WorkSchedule> input, SortByInfo sortByInfo);
    }
}
