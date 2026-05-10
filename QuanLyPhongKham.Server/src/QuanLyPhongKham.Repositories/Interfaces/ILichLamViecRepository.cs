using MayNghien.Infrastructures.Repository;
using Microsoft.Identity.Client;
using QuanLyPhongKham.Models.Data;
using QuanLyPhongKham.Models.Entities;

namespace QuanLyPhongKham.Repositories.Interfaces
{
    public interface ILichLamViecRepository : IGenericRepository<LICHLAMVIEC, ApplicationDbContext, ApplicationUser>
    {
    }
}
