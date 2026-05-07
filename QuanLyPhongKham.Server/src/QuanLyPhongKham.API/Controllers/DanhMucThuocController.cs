using MayNghien.Infrastructures.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Services.Interfaces;

namespace QuanLyPhongKham.API.Controllers
{
    [Route("danhmucthuoc")]
    [ApiController]
    public class DanhMucThuocController : ControllerBase
    {
        private readonly IDanhMucThuocService _danhMucThuocService;

        public DanhMucThuocController(IDanhMucThuocService danhMucThuocService)
        {
            _danhMucThuocService = danhMucThuocService;
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _danhMucThuocService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Create([FromBody] DanhMucThuocRequest request)
        {
            var result = await _danhMucThuocService.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Update([FromBody] DanhMucThuocRequest request)
        {
            var result = await _danhMucThuocService.UpdateAsync(request);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _danhMucThuocService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("search")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            var result = await _danhMucThuocService.SearchAsync(request);
            return Ok(result);
        }
    }
}
