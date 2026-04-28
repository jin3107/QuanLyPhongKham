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
    public class PHIEUKHAM : BaseEntity
    {
        [Key]
        public Guid MaPK { get; set; }

        public DateTime NgayKham { get; set; }

        [MaxLength(500)]
        public string? TrieuChung { get; set; }

        [MaxLength(500)]
        public string? ChuanDoan { get; set; }

        [MaxLength(500)]
        public string? HuongDieuTri { get; set; }

        [MaxLength(30)]
        public string? TrangThaiTiepNhan { get; set; }

        [ForeignKey("LichHen")]
        public Guid? MaLH { get; set; }
        public LICHHEN? LichHen { get; set; }

        [ForeignKey("BacSi")]
        public Guid? MaBS { get; set; }
        public BACSI? BacSi { get; set; }

        public HOADON? HoaDon { get; set; }
        public ICollection<DONTHUOC>? DonThuocs { get; set; }
    }
}
