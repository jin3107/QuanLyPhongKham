using MayNghien.Infrastructures.Repository;
using Microsoft.EntityFrameworkCore;
using QuanLyPhongKham.Models.Data;
using QuanLyPhongKham.Models.Entities;
using QuanLyPhongKham.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Repositories.Implementations
{
    public class NhanVienRepository : GenericRepository<NHANVIEN, ApplicationDbContext, ApplicationUser>, INhanVienRepository
    {
        public NhanVienRepository(ApplicationDbContext unitOfWork) : base(unitOfWork)
        {
        }

        public async Task<List<NHANVIEN>> GetAllAsync()
        {
            var nhanViens = await _context.NhanViens.Where(nv => nv.IsDeleted != true).ToListAsync();
            return nhanViens;
        }
    }
}
