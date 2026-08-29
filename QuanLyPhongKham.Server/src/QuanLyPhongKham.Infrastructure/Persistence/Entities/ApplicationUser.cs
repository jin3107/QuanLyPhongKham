using Microsoft.AspNetCore.Identity;
using QuanLyPhongKham.Commons.Enum;

namespace QuanLyPhongKham.Infrastructure.Persistence.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string? TrangThai { get; set; }
        public Role? Role { get; set; }
        public string? FullName { get; set; }
    }
}
