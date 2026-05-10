using MayNghien.Infrastructures.Repository;
using QuanLyPhongKham.Models.Data;
using QuanLyPhongKham.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Repositories.Interfaces
{
    public interface IChiTietDonThuocRepository : IGenericRepository<CHITIETDONTHUOC, ApplicationDbContext, ApplicationUser>
    {
    }
}
