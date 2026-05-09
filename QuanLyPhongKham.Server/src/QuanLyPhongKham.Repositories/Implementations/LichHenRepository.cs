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
    public class LichHenRepository : GenericRepository<LICHHEN, ApplicationDbContext, ApplicationUser>, ILichHenRepository
    {
        public LichHenRepository(ApplicationDbContext unitOfWork) : base(unitOfWork)
        {
        }
    }
}
