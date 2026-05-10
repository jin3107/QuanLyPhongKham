using MayNghien.Infrastructures.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Models.Entities
{
    public class DANHMUCDICHVU : BaseEntity
    {
        [Key]
        public Guid MaDV { get; set; }
        public string TenDV { get; set; }
        public decimal DonGia { get; set; }
    }
}
