using MayNghien.Infrastructures.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Services.Interfaces;

namespace QuanLyPhongKham.API.Controllers
{
    [Route("donthuoc")]
    [ApiController]
    public class DonThuocController : ControllerBase
    {
        private readonly IDonThuocService _donThuocService;

        public DonThuocController(IDonThuocService donThuocService)
        {
            _donThuocService = donThuocService;
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdmin, BacSi, LeTan, BenhNhan")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _donThuocService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "BacSi")]
        public async Task<IActionResult> Create([FromBody] DonThuocRequest request)
        {
            var result = await _donThuocService.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = "SuperAdmin, BacSi")]
        public async Task<IActionResult> Update([FromBody] DonThuocRequest request)
        {
            var result = await _donThuocService.UpdateAsync(request);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _donThuocService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpPost("search")]
        [Authorize(Roles = "SuperAdmin, BacSi, LeTan, BenhNhan")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            var result = await _donThuocService.SearchAsync(request);
            return Ok(result);
        }
    }
}
