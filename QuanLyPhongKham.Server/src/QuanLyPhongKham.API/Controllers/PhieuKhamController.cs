using MayNghien.Infrastructures.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Services.Implementations;
using QuanLyPhongKham.Services.Interfaces;

namespace QuanLyPhongKham.API.Controllers
{
    [Route("phieukham")]
    [ApiController]
    public class PhieuKhamController : ControllerBase
    {
        private readonly IPhieuKhamService _phieuKhamService;

        public PhieuKhamController(IPhieuKhamService phieuKhamService)
        {
            _phieuKhamService = phieuKhamService;
        }
        [HttpGet("{id}")]
        [Authorize(Roles = "SuperAdmin, BacSi, LeTan, BenhNhan")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _phieuKhamService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "LeTan, BacSi")]
        public async Task<IActionResult> Create([FromBody] PhieuKhamRequest request)
        {
            var result = await _phieuKhamService.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = "LeTan, BacSi")]
        public async Task<IActionResult> Update([FromBody] PhieuKhamRequest request)
        {
            var result = await _phieuKhamService.UpdateAsync(request);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _phieuKhamService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpPost("search")]
        [Authorize(Roles = "SuperAdmin, BacSi, LeTan")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            var result = await _phieuKhamService.SearchAsync(request);
            return Ok(result);
        }

    }
}
