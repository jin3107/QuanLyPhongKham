using MayNghien.Infrastructures.Repository;
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
    public class LichLamViecRepository : GenericRepository<LICHLAMVIEC, ApplicationDbContext, ApplicationUser>, ILichLamViecRepository
    {
        public LichLamViecRepository(ApplicationDbContext unitOfWork) : base(unitOfWork)
        {
        }
    }
}
