using MayNghien.Infrastructures.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Models.Entities
{
    public class DANHMUCDICVU : BaseEntity
    {
        [Key]
        public Guid MaDV { get; set; }

        [MaxLength(100)]
        public string TenDV { get; set; }

        public decimal DonGia { get; set; }
    }
}
