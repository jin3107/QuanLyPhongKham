using MayNghien.Infrastructures.Models;
using QuanLyPhongKham.Commons.Enum;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace QuanLyPhongKham.Models.Entities
{
    public class NHANVIEN : BaseEntity
    {
        [Key]
        public Guid MaNV { get; set; }

        [MaxLength(100)]
        public string HoTen { get; set; }

        [MaxLength(10)]
        public string? SoDienThoai { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
    }
}
