using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.API.Extentions;
using QuanLyPhongKham.Models.Data;
using QuanLyPhongKham.Models.Entities;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddHttpContextAccessor();

// Add database configuration
builder.Services.AddDatabaseConfiguration(builder.Configuration);

// Add Service Application
builder.Services.AddApplicationServices().AddRepositories();

// Add Swagger configuration
builder.Services.AddSwaggerConfiguration();

// Add Cors and JWT
builder.Services.AddJwtAuthentication(builder.Configuration);

// Add Cors configuration
builder.Services.AddCorsConfiguration(builder.Configuration);

// Add Identity configuration
builder.Services.AddIdentityConfiguration();

// Add Serilog
Log.Logger = new LoggerConfiguration()
    .ReadFrom.Configuration(builder.Configuration)
    .CreateLogger();
builder.Host.UseSerilog();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseSerilogRequestLogging();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Lifetime.ApplicationStopped.Register(Log.CloseAndFlush);

app.Run();
