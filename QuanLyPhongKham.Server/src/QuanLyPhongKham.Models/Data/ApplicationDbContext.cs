using MayNghien.Infrastructures.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using QuanLyPhongKham.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Models.Data
{
    public class ApplicationDbContext : BaseContext<ApplicationUser>
    {
        public ApplicationDbContext() { }

        public ApplicationDbContext(DbContextOptions options) : base(options) { }


        // Add DbSet
        public DbSet<BENHNHAN> BenhNhans { get; set; }
        public DbSet<BACSI> BacSis { get; set; }
        public DbSet<LICHHEN> LichHens { get; set; }
        public DbSet<PHIEUKHAM> PhieuKhams { get; set; }
        public DbSet<HOADON> HoaDons { get; set; }
        public DbSet<DONTHUOC> DonThuocs { get; set; }
        public DbSet<DANHMUCTHUOC> DanhMucThuocs { get; set; }
        public DbSet<DANHMUCDICVU> DanhMucDichVus { get; set; }
        public DbSet<LICHLAMVIEC> LichLamViecs { get; set; }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var appSetting = JsonConvert.DeserializeObject<AppSetting>(File.ReadAllText("appsettings.json"));
                optionsBuilder.UseMySql(appSetting!.ConnectionString,
                    new MySqlServerVersion(new Version(8, 0, 44)));
            }
        }
    }
}
