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
    public class PhieuKhamRepository : GenericRepository<PHIEUKHAM, ApplicationDbContext, ApplicationUser>, IPhieuKhamRepository
    {
        public PhieuKhamRepository(ApplicationDbContext unitOfWork) : base(unitOfWork)
        {
        }
    }
}
