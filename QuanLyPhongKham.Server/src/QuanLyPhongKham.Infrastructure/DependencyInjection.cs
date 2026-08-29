using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using QuanLyPhongKham.Application.Interfaces.Authentication;
using QuanLyPhongKham.Application.Interfaces.Background;
using QuanLyPhongKham.Application.Interfaces.Identity;
using QuanLyPhongKham.Application.Interfaces.Repositories;
using QuanLyPhongKham.Application.Implementations.Background;
using QuanLyPhongKham.Infrastructure.Implementations.Authentication;
using QuanLyPhongKham.Infrastructure.Implementations.Background;
using QuanLyPhongKham.Infrastructure.Implementations.Identity;
using QuanLyPhongKham.Infrastructure.Persistence.Data;
using QuanLyPhongKham.Infrastructure.Persistence.Entities;
using QuanLyPhongKham.Infrastructure.Persistence.Repositories;

namespace QuanLyPhongKham.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructureServices(
            this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseMySql(
                    configuration.GetConnectionString("DefaultConnection"),
                    new MySqlServerVersion(new Version(8, 0, 44))));

            services.AddIdentity<ApplicationUser, IdentityRole>(opts =>
            {
                opts.Password.RequireDigit = true;
                opts.Password.RequireLowercase = true;
                opts.Password.RequireUppercase = true;
                opts.Password.RequireNonAlphanumeric = true;
                opts.Password.RequiredLength = 8;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

            services.AddScoped<IDoctorRepository, DoctorRepository>();
            services.AddScoped<IPatientRepository, PatientRepository>();
            services.AddScoped<IPrescriptionDetailRepository, PrescriptionDetailRepository>();
            services.AddScoped<IMedicalServiceRepository, MedicalServiceRepository>();
            services.AddScoped<IMedicineRepository, MedicineRepository>();
            services.AddScoped<IPrescriptionRepository, PrescriptionRepository>();
            services.AddScoped<IInvoiceRepository, InvoiceRepository>();
            services.AddScoped<IAppointmentRepository, AppointmentRepository>();
            services.AddScoped<IWorkScheduleRepository, WorkScheduleRepository>();
            services.AddScoped<IStaffRepository, StaffRepository>();
            services.AddScoped<IMedicalExaminationRepository, MedicalExaminationRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<IOtpCodeRepository, OtpCodeRepository>();
            services.AddScoped<IMedicalExaminationServiceRepository, MedicalExaminationServiceRepository>();

            services.AddHttpContextAccessor();
            services.AddScoped<ICurrentUserService, CurrentUserService>();
            services.AddScoped<IIdentityUserService, IdentityUserService>();
            services.AddScoped<IEmailService, EmailService>();

            services.AddScoped<ILoginHandler, LoginHandler>();
            services.AddScoped<IRegisterHandler, RegisterHandler>();
            services.AddScoped<IChangePasswordHandler, ChangePasswordHandler>();
            services.AddScoped<IRefreshTokenHandler, RefreshTokenHandler>();
            services.AddScoped<ILogoutHandler, LogoutHandler>();
            services.AddScoped<IGetProfileHandler, GetProfileHandler>();
            services.AddScoped<ISendOtpHandler, SendOtpHandler>();
            services.AddScoped<IVerifyOtpHandler, VerifyOtpHandler>();
            services.AddScoped<IResetPasswordHandler, ResetPasswordHandler>();
            services.AddScoped<IClearExpiredDataHandler, ClearExpiredDataHandler>();

            return services;
        }
    }
}
