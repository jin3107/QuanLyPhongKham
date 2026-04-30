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
    public class HOADON : BaseEntity
    {
        [Key]
        public Guid MaHD { get; set; }
        public DateTime NgayThanhToan { get; set; }
        public decimal TongTien { get; set; }
        public string? TrangThaiThanhToan { get; set; }
        public string? MaLeTan { get; set; }

        [ForeignKey("PhieuKham")]
        public Guid? MaPK { get; set; }
        public PHIEUKHAM? PhieuKham { get; set; }
    }
}
