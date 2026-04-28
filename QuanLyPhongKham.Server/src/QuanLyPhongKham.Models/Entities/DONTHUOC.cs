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
    public class DONTHUOC : BaseEntity
    {
        [Key]
        public Guid MaDT { get; set; }

        public DateTime NgayKe { get; set; }

        [ForeignKey("PhieuKham")]
        public Guid? MaPK { get; set; }
        public PHIEUKHAM? PhieuKham { get; set; }

        public ICollection<DANHMUCTHUOC>? DanhMucThuocs { get; set; }
    }
}
