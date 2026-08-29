using MayNghien.Infrastructures.Models.Responses;
using QuanLyPhongKham.DTOs.Authentication.Requests;
using QuanLyPhongKham.DTOs.Authentication.Responses;

namespace QuanLyPhongKham.Application.Interfaces.Authentication
{
    public interface ILoginHandler
    {
        Task<AppResponse<LoginResponse>> HandleAsync(LoginRequest request);
    }

    public interface IRegisterHandler
    {
        Task<AppResponse<RegisterResponse>> HandleAsync(RegisterRequest request);
    }

    public interface IChangePasswordHandler
    {
        Task<AppResponse<ChangePasswordResponse>> HandleAsync(ChangePasswordRequest request);
    }

    public interface IRefreshTokenHandler
    {
        Task<AppResponse<RefreshTokenResponse>> HandleAsync(string refreshToken);
    }

    public interface ILogoutHandler
    {
        Task HandleAsync(string refreshToken);
    }

    public interface IGetProfileHandler
    {
        Task<AppResponse<ProfileResponse>> HandleAsync();
    }

    public interface ISendOtpHandler
    {
        Task<AppResponse<SendOtpResponse>> HandleAsync(SendOtpRequest request);
    }

    public interface IVerifyOtpHandler
    {
        Task<AppResponse<bool>> HandleAsync(VerifyOtpRequest request);
    }

    public interface IResetPasswordHandler
    {
        Task<AppResponse<ResetPasswordResponse>> HandleAsync(ResetPasswordRequest request);
    }
}
