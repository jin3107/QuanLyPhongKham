using QuanLyPhongKham.Application.Interfaces.Authentication;
using QuanLyPhongKham.Application.Interfaces.Repositories;

namespace QuanLyPhongKham.Infrastructure.Implementations.Authentication
{
    public class LogoutHandler : ILogoutHandler
    {
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public LogoutHandler(IRefreshTokenRepository refreshTokenRepository)
        {
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task HandleAsync(string refreshToken)
        {
            if (string.IsNullOrWhiteSpace(refreshToken))
                return;

            var tokenEntity = await _refreshTokenRepository.FindByTokenAsync(refreshToken);
            if (tokenEntity != null && !tokenEntity.IsRevoked)
            {
                tokenEntity.IsRevoked = true;
                tokenEntity.IsDeleted = true;
                await _refreshTokenRepository.EditAsync(tokenEntity);
            }
        }
    }
}
