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
    public class ChiTietDonThuocRepository : GenericRepository<CHITIETDONTHUOC, ApplicationDbContext, ApplicationUser>, IChiTietDonThuocRepository
    {
        public ChiTietDonThuocRepository(ApplicationDbContext unitOfWork) : base(unitOfWork)
        {
        }
    }
}
