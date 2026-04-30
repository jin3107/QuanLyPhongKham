using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.DTOs.Authentication.Requests;
using QuanLyPhongKham.Services.Interfaces;

namespace QuanLyPhongKham.API.Controllers
{
	[Route("authentication")]
	[ApiController]
	public class AuthenticationsController : ControllerBase
	{
		private readonly IAuthenticationService _authenticationService;
		private readonly IHostEnvironment _environment;
		private readonly IConfiguration _configuration;

		public AuthenticationsController(
			IAuthenticationService authenticationService,
			IHostEnvironment environment,
			IConfiguration configuration)
		{
			_authenticationService = authenticationService;
			_environment = environment;
			_configuration = configuration;
		}

		[HttpPost("login")]
		[AllowAnonymous]
		public async Task<IActionResult> Login([FromBody] LoginRequest request)
		{
			var result = await _authenticationService.LoginAsync(request);
			return Ok(result);
		}

		[HttpPost("register")]
		[AllowAnonymous]
		public async Task<IActionResult> Register([FromBody] RegisterRequest request)
		{
			var result = await _authenticationService.RegisterAsync(request);
			return Ok(result);
		}

		[HttpGet("me")]
		[AllowAnonymous]
		public async Task<IActionResult> Me()
		{
			var result = await _authenticationService.GetProfileAsync();
			return Ok(result);
		}

		[HttpPost("refresh-token")]
		[AllowAnonymous]
		public async Task<IActionResult> RefreshToken()
		{
			var refreshToken = Request.Cookies["RefreshToken"];
			if (string.IsNullOrWhiteSpace(refreshToken))
				return Unauthorized(new { message = "No refresh token provided." });

			var result = await _authenticationService.RefreshTokenAsync(refreshToken);
			return Ok(result);
		}

		[HttpPost("change-password")]
		[AllowAnonymous]
		public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
		{
			var result = await _authenticationService.ChangePasswordAsync(request);
			return Ok(result);
		}

		[HttpPost("logout")]
		[Authorize]
		public async Task<IActionResult> Logout()
		{
			var refreshToken = Request.Cookies["RefreshToken"] ?? string.Empty;
			await _authenticationService.LogoutAsync(refreshToken);
			return Ok(new { message = "Logged out successfully." });
		}
	}
}
