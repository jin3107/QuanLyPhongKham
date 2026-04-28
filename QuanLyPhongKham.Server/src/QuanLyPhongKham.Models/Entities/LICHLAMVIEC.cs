
using MayNghien.Infrastructures.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Models.Entities
{
    public class LICHLAMVIEC : BaseEntity
    {
        [Key]
        public Guid MaLLV { get; set; }

        public DateTime NgayLamViec { get; set; }
        public DateTime GioBatDau { get; set; }
        public DateTime GioKetThuc { get; set; }

        [ForeignKey("BacSi")]
        public Guid? MaBS { get; set; }
        public BACSI? BacSi { get; set; }
    }
}
