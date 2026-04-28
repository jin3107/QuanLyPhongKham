using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace QuanLyPhongKham.DTOs.Authentication.Requests
{
    public class ChangePasswordRequest
    {
        [Required(ErrorMessage = "Email là bắt buộc.")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Số điện thoại là bắt buộc.")]
        [Phone(ErrorMessage = "Số điện thoại không hợp lệ.")]
        [RegularExpression(@"^(0[3|5|7|8|9])\d{8}$",
             ErrorMessage = "Số điện thoại ở Việt Nam không hợp lệ.")]
        public string PhoneNumber { get; set; }

        [Required(ErrorMessage = "Nật khẩu là bắt buộc.")]
        [StringLength(40, MinimumLength = 8, ErrorMessage = "Ký tự {0} phải có độ dài {2} và tối đa {1} ký tự.")]
        [DataType(DataType.Password)]
        [Display(Name = "New Password")]
        [Compare("ConfirmNewPassword", ErrorMessage = "Mật khẩu không khớp.")]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = "Xác nhận mật khẩu là bắt buộc.")]
        [DataType(DataType.Password)]
        [Display(Name = "Confirm New Password")]
        public string ConfirmNewPassword { get; set; }
    }
}
