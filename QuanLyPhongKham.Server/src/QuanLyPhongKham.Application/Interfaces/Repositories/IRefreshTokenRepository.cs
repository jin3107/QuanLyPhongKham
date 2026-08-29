using QuanLyPhongKham.Domain.Entities;
using System.Linq.Expressions;

namespace QuanLyPhongKham.Application.Interfaces.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshTokenModel?> GetAsync(Guid id);
        Task AddAsync(RefreshTokenModel item);
        Task EditAsync(RefreshTokenModel entity);
        IQueryable<RefreshTokenModel> FindBy(Expression<Func<RefreshTokenModel, bool>> predicate);
        Task<RefreshTokenModel?> FindByTokenAsync(string token);
        Task RevokeByUserIdAsync(Guid userId);
    }
}
