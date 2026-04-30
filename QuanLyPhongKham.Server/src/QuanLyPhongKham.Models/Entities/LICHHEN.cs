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
    public class LICHHEN : BaseEntity
    {
        [Key]
        public Guid MaLH { get; set; }
        public DateTime ThoiGianKham { get; set; }
        public string TrangThai { get; set; }

        [ForeignKey("BenhNhan")]
        public Guid? MaBN { get; set; }
        public BENHNHAN? BenhNhan { get; set; }

        [ForeignKey("BacSi")]
        public Guid? MaBS { get; set; }
        public BACSI? BacSi { get; set; }

        public PHIEUKHAM? PhieuKham { get; set; }
    }
}
