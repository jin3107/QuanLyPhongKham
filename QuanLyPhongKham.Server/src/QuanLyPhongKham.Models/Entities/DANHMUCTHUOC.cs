using MayNghien.Infrastructures.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Models.Entities
{
    public class DANHMUCTHUOC : BaseEntity
    {
        [Key]
        public Guid MaThuoc { get; set; }

        [MaxLength(100)]
        public string TenThuoc { get; set; }

        public decimal DonGia { get; set; }

        [MaxLength(500)]
        public string? ChongChiDinh { get; set; }

        public ICollection<DONTHUOC>? DonThuocs { get; set; }
    }
}
