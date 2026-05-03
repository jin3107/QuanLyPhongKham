using Microsoft.AspNetCore.Identity;
using QuanLyPhongKham.Commons.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.Models.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string? TrangThai { get; set; }

        public Role? Role { get; set; }
        public string? FullName { get; set; }
    }
}
