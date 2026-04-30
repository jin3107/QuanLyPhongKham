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
    public class BACSI : BaseEntity
    {
        [Key]
        public Guid MaBS { get; set; }
        public string HoTen { get; set; }
        public string? ChuyenKhoa { get; set; }
        public string? SoDienThoai { get; set; }

        [ForeignKey("TaiKhoan")]
        public string? MaTK { get; set; }
        public ApplicationUser? TaiKhoan { get; set; }

        public ICollection<LICHHEN>? LichHens { get; set; }
        public ICollection<PHIEUKHAM>? PhieuKhams { get; set; }
        public ICollection<LICHLAMVIEC>? LichLamViecs { get; set; }
    }
}
