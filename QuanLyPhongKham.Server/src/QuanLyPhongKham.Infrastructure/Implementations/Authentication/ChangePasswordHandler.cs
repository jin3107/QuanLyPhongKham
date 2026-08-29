using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Identity;
using QuanLyPhongKham.Application.Interfaces.Authentication;
using QuanLyPhongKham.Application.Interfaces.Identity;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.DTOs.Authentication.Requests;
using QuanLyPhongKham.DTOs.Authentication.Responses;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Implementations.Authentication
{
    public class ChangePasswordHandler : IChangePasswordHandler
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ICurrentUserService _currentUser;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public ChangePasswordHandler(
            UserManager<ApplicationUser> userManager,
            ICurrentUserService currentUser,
            IRefreshTokenRepository refreshTokenRepository)
        {
            _userManager = userManager;
            _currentUser = currentUser;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<AppResponse<ChangePasswordResponse>> HandleAsync(ChangePasswordRequest request)
        {
            var result = new AppResponse<ChangePasswordResponse>();

            var email = _currentUser.GetEmail();
            if (string.IsNullOrWhiteSpace(email))
                return result.BuildError("Unauthorized.");

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return result.BuildError("User not found.");

            var changeResult = await _userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
            if (!changeResult.Succeeded)
                return result.BuildError(string.Join(", ", changeResult.Errors.Select(e => e.Description)));

            await _refreshTokenRepository.RevokeByUserIdAsync(Guid.Parse(user.Id));

            return result.BuildResult(new ChangePasswordResponse
            {
                Email = user.Email!,
                PhoneNumber = user.PhoneNumber,
            }, "Password changed successfully.");
        }
    }
}
