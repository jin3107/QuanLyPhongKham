using MayNghien.Infrastructures.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Models.Entities
{
    public class BENHNHAN : BaseEntity
    {
        [Key]
        public Guid MaBN { get; set; }

        [MaxLength(100)]
        public string HoTen { get; set; }

        public DateTime NgaySinh { get; set; }
        public bool GioiTinh { get; set; }

        [MaxLength(10)]
        public string? SoDienThoai { get; set; }

        [MaxLength(200)]
        public string? DiaChi { get; set; }

        [MaxLength(20)]
        public string? SoBHYT { get; set; }

        [MaxLength(500)]
        public string? TienSuDiUng { get; set; }


        public ICollection<LICHHEN> LichHen { get; set; }
    }
}
