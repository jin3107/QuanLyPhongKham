using MayNghien.Infrastructures.Models.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QuanLyPhongKham.Commons.Enum;
using QuanLyPhongKham.DTOs.Authentication.Requests;
using QuanLyPhongKham.DTOs.Authentication.Responses;
using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Repositories.Interfaces;
using QuanLyPhongKham.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using MayNghien.Infrastructures.Helpers;

namespace QuanLyPhongKham.Services.Implementations
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _config;
        private readonly IRefreshTokenRepository _refreshTokenRepository;

        public AuthenticationService(IHttpContextAccessor contextAccessor,
            UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            RoleManager<IdentityRole> roleManager, IConfiguration config, IRefreshTokenRepository refreshTokenRepository)
        {
            _contextAccessor = contextAccessor;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _config = config;
            _refreshTokenRepository = refreshTokenRepository;
        }

        public async Task<AppResponse<ChangePasswordResponse>> ChangePasswordAsync(ChangePasswordRequest request)
        {
            var result = new AppResponse<ChangePasswordResponse>();
            try
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                if (user == null)
                    return result.BuildError("User not found.");

                if (user.PhoneNumber != request.PhoneNumber)
                    return result.BuildError("Phone number does not match.");

                if (request.NewPassword != request.ConfirmNewPassword)
                    return result.BuildError("Passwords do not match.");

                var token = await _userManager.GeneratePasswordResetTokenAsync(user);
                var resetResult = await _userManager.ResetPasswordAsync(user, token, request.NewPassword);
                if (!resetResult.Succeeded)
                    return result.BuildError(string.Join(", ", resetResult.Errors.Select(e => e.Description)));

                await _refreshTokenRepository.RevokeByUserIdAsync(Guid.Parse(user.Id));

                return result.BuildResult(new ChangePasswordResponse
                {
                    Email = user.Email!,
                    PhoneNumber = user.PhoneNumber,
                }, "Password changed successfully.");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<LoginResponse>> LoginAsync(LoginRequest request)
        {
            var result = new AppResponse<LoginResponse>();
            try
            {
                var user = await _userManager.FindByNameAsync(request.UserName) ?? await _userManager.FindByEmailAsync(request.UserName);

                if (user == null && request.UserName == "htqlpk@gmail.com")
                {
                    await CreateAdminAsync(request.UserName);
                    user = await _userManager.FindByEmailAsync(request.UserName);
                }

                if (user == null)
                    return result.BuildError("User not found. Please check your username or email.");

                if (!await _userManager.CheckPasswordAsync(user, request.Password))
                    return result.BuildError("Invalid credentials. Please check your password.");

                var roles = await _userManager.GetRolesAsync(user);
                if (!roles.Any())
                    return result.BuildError("User has no role assigned.");

                var claims = BuildClaims(user.Email!, roles);
                var (accessToken, refreshToken) = await GenerateTokensAsync(user, claims);

                return result.BuildResult(new LoginResponse
                {
                    UserName = user.UserName!,
                    Email = user.Email!,
                    PhoneNumber = user.PhoneNumber!,
                    Role = roles.First(),
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                });
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public Task<AppResponse<ProfileResponse>> GetProfileAsync()
        {
            var result = new AppResponse<ProfileResponse>();
            try
            {
                var context = _contextAccessor.HttpContext;
                if (context == null)
                    return Task.FromResult(result.BuildError("Missing http context."));

                var token = ClaimHelper.GetTokenFromHeader(context) ?? context.Request.Cookies["AuthToken"];
                if (string.IsNullOrWhiteSpace(token))
                    return Task.FromResult(result.BuildError("Missing access token."));

                var handler = new JwtSecurityTokenHandler();
                var validationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ClockSkew = TimeSpan.Zero,
                    ValidIssuer = _config["Jwt:Issuer"],
                    ValidAudience = _config["Jwt:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(_config["Jwt:Key"] ?? string.Empty))
                };

                var principal = handler.ValidateToken(token, validationParameters, out _);
                var role = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role)?.Value ?? string.Empty;
                var name = principal.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value ?? string.Empty;

                return Task.FromResult(result.BuildResult(new ProfileResponse
                {
                    UserName = name,
                    Role = role,
                }));
            }
            catch (Exception ex)
            {
                return Task.FromResult(result.BuildError(ex.Message + " " + ex.StackTrace));
            }
        }

        public async Task LogoutAsync(string refreshToken)
        {
            if (!string.IsNullOrWhiteSpace(refreshToken))
            {
                var tokenEntity = await _refreshTokenRepository.FindByTokenAsync(refreshToken);
                if (tokenEntity != null && !tokenEntity.IsRevoked)
                {
                    tokenEntity.IsRevoked = true;
                    tokenEntity.IsDeleted = true;
                    await _refreshTokenRepository.EditAsync(tokenEntity);
                }
            }

            await _signInManager.SignOutAsync();
        }

        public async Task<AppResponse<RefreshTokenResponse>> RefreshTokenAsync(string refreshToken)
        {
            var result = new AppResponse<RefreshTokenResponse>();
            try
            {
                var tokenEntity = await _refreshTokenRepository.FindByTokenAsync(refreshToken);

                if (tokenEntity == null)
                    return result.BuildError("Invalid refresh token.");

                if (tokenEntity.IsRevoked)
                    return result.BuildError("Refresh token has been revoked.");

                if (tokenEntity.RefreshTokenExpiryTime < DateTime.UtcNow)
                    return result.BuildError("Refresh token has expired.");

                var user = await _userManager.FindByIdAsync(tokenEntity.UserId.ToString()!);
                if (user == null)
                    return result.BuildError("User not found.");

                tokenEntity.IsRevoked = true;
                await _refreshTokenRepository.EditAsync(tokenEntity);

                var roles = await _userManager.GetRolesAsync(user);
                var claims = BuildClaims(user.Email!, roles);
                var (newAccessToken, newRefreshToken) = await GenerateTokensAsync(user, claims);

                return result.BuildResult(new RefreshTokenResponse
                {
                    Name = user.UserName!,
                    Email = user.Email!,
                    PhoneNumber = user.PhoneNumber!,
                    Token = newAccessToken,
                    RefreshToken = newRefreshToken,
                });
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }

        public async Task<AppResponse<RegisterResponse>> RegisterAsync(RegisterRequest request)
        {
            var result = new AppResponse<RegisterResponse>();
            try
            {
                if (await CheckUserExistsAsync(request.Email, request.PhoneNumber))
                    return result.BuildError("User already exists.");

                var createResult = await CreateStudentAsync(request);
                if (!createResult.Succeeded)
                    return result.BuildError(string.Join(", ", createResult.Errors.Select(e => e.Description)));

                var user = await _userManager.FindByEmailAsync(request.Email);
                await AssignRoleAsync(user!, "BenhNhan");

                var roles = await _userManager.GetRolesAsync(user!);
                var claims = BuildClaims(user!.Email!, roles);
                var (accessToken, refreshToken) = await GenerateTokensAsync(user!, claims);

                return result.BuildResult(new RegisterResponse
                {
                    Email = request.Email,
                    Name = request.Name,
                    PhoneNumber = request.PhoneNumber,
                    Role = roles.FirstOrDefault() ?? "BenhNhan",
                    AccessToken = accessToken,
                    RefreshToken = refreshToken,
                }, "BenhNhan registered successfully!");
            }
            catch (Exception ex)
            {
                return result.BuildError(ex.Message + " " + ex.StackTrace);
            }
        }


        private async Task AssignRoleAsync(ApplicationUser user, string role)
        {
            if (!await _roleManager.RoleExistsAsync(role))
                await _roleManager.CreateAsync(new IdentityRole(role));

            await _userManager.AddToRoleAsync(user, role);
        }

        private async Task<bool> CheckUserExistsAsync(string email, string phoneNumber)
        {
            if (await _userManager.FindByEmailAsync(email) != null)
                return true;
            return _userManager.Users.Any(p => p.PhoneNumber == phoneNumber);
        }

        private string GenerateAccessToken(IEnumerable<Claim> claims)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddSeconds(
                    int.Parse(_config["Jwt:AccessTokenExpiresIn"] ?? "3600")),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private static string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<(string accessToken, string refreshToken)> GenerateTokensAsync(ApplicationUser user, IEnumerable<Claim> claims)
        {
            var accessToken = GenerateAccessToken(claims);
            var refreshToken = GenerateRefreshToken();

            await _refreshTokenRepository.AddAsync(new RefreshTokenModel
            {
                UserId = Guid.Parse(user.Id),
                RefreshToken = refreshToken,
                RefreshTokenExpiryTime = DateTime.UtcNow.AddMinutes(
                    int.Parse(_config["Jwt:RefreshTokenExpiresIn"] ?? "10080")),
                IsRevoked = false,
                CreatedOn = DateTime.UtcNow,
                CreatedBy = user.Email
            });

            return (accessToken, refreshToken);
        }

        private static List<Claim> BuildClaims(string email, IList<string> roles)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, email),
                new Claim(ClaimTypes.Name, email),
            };
            foreach (var role in roles)
                claims.Add(new Claim(ClaimTypes.Role, role));

            return claims;
        }

        private async Task<ApplicationUser> CreateAdminAsync(string email)
        {
            var admin = new ApplicationUser
            {
                Email = email,
                EmailConfirmed = true,
                UserName = email,
                Role = Role.SuperAdmin,
            };

            await _userManager.CreateAsync(admin);
            await _userManager.AddPasswordAsync(admin, "Admin@123");
            if (!await _roleManager.RoleExistsAsync("SuperAdmin"))
                await _roleManager.CreateAsync(new IdentityRole("SuperAdmin"));

            await _userManager.AddToRoleAsync(admin, "SuperAdmin");
            return admin;
        }

        private async Task<IdentityResult> CreateStudentAsync(RegisterRequest request)
        {
            var user = new ApplicationUser
            {
                UserName = request.Email,
                Email = request.Email,
                EmailConfirmed = true,
                SecurityStamp = Guid.NewGuid().ToString(),
                PhoneNumber = request.PhoneNumber,
                Role = Role.BenhNhan
            };

            return await _userManager.CreateAsync(user, request.Password);
        }
    }
}
