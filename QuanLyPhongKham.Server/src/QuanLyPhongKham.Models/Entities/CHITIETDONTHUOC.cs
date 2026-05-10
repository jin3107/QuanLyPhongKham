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
    public class CHITIETDONTHUOC : BaseEntity
    {
        [Key]
        public Guid MaCTDT { get; set; }

        [ForeignKey("DonThuoc")]
        public Guid? MaDT { get; set; }
        public DONTHUOC? DonThuoc { get; set; }

        [ForeignKey("DanhMucThuoc")]
        public Guid? MaThuoc { get; set; }
        public DANHMUCTHUOC? DanhMucThuoc { get; set; }

        public int SoLuong { get; set; }
        public string? LieuDung { get; set; }
    }
}
