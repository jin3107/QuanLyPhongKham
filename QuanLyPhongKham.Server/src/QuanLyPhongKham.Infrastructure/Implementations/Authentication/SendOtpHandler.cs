using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using QuanLyPhongKham.Application.Interfaces.Authentication;
using QuanLyPhongKham.Application.Interfaces.Background;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Domain.Entities;
using QuanLyPhongKham.Domain.Enums;
using QuanLyPhongKham.DTOs.Authentication.Requests;
using QuanLyPhongKham.DTOs.Authentication.Responses;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;

namespace QuanLyPhongKham.Infrastructure.Implementations.Authentication
{
    public class SendOtpHandler : ISendOtpHandler
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IOtpCodeRepository _otpRepository;
        private readonly IEmailService _emailService;

        public SendOtpHandler(UserManager<ApplicationUser> userManager,
            IOtpCodeRepository otpRepository, IEmailService emailService)
        {
            _userManager = userManager;
            _otpRepository = otpRepository;
            _emailService = emailService;
        }

        public async Task<AppResponse<SendOtpResponse>> HandleAsync(SendOtpRequest request)
        {
            var result = new AppResponse<SendOtpResponse>();

            var email = request.Email.Trim().ToLowerInvariant();
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return result.BuildError("Email không tồn tại trong hệ thống.");

            await _otpRepository.InvalidatePreviousAsync(email);

            var otp = GenerateOtp();
            await _otpRepository.AddAsync(new OtpCode
            {
                Email = email,
                Code = otp,
                Purpose = OtpPurpose.ResetPassword,
                ExpiresAt = DateTime.UtcNow.AddMinutes(5),
                IsUsed = false,
                AttemptCount = 0,
            });

            await _emailService.SendEmailAsync(email, "Mã xác thực đặt lại mật khẩu - Quản Lý Phòng Khám",
                $"Mã OTP của bạn là: {otp}\nMã có hiệu lực trong 5 phút.");

            return result.BuildResult(new SendOtpResponse { Email = email },
                "Mã OTP đã được gửi tới email của bạn.");
        }

        private static string GenerateOtp()
        {
            using var rng = RandomNumberGenerator.Create();
            var bytes = new byte[4];
            rng.GetBytes(bytes);
            return (Math.Abs(BitConverter.ToInt32(bytes, 0)) % 1000000).ToString("D6");
        }
    }
}
