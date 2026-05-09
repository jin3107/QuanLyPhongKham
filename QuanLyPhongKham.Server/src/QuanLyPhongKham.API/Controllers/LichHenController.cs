using MayNghien.Infrastructures.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Services.Implementations;
using QuanLyPhongKham.Services.Interfaces;

namespace QuanLyPhongKham.API.Controllers
{
    [Route("lichhen")]
    [ApiController]
    public class LichHenController : ControllerBase
    {
        private readonly ILichHenService _lichHenService;

        public LichHenController(ILichHenService lichHenService)
        {
            _lichHenService = lichHenService;
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi, BenhNhan")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _lichHenService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "LeTan, BenhNhan")]
        public async Task<IActionResult> Create([FromBody] LichHenRequest request)
        {
            var result = await _lichHenService.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = "SuperAdmin, LeTan, BenhNhan")]
        public async Task<IActionResult> Update([FromBody] LichHenRequest request)
        {
            var result = await _lichHenService.UpdateAsync(request);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _lichHenService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("search")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi, BenhNhan")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            var result = await _lichHenService.SearchAsync(request);
            return Ok(result);
        }
    }
}
