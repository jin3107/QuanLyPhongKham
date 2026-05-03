using MayNghien.Infrastructures.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Services.Interfaces;

namespace QuanLyPhongKham.API.Controllers
{
    [Route("bacsi")]
    [ApiController]
    public class BacSiController : ControllerBase
    {
        private readonly IBacSiService _bacSiService;

        public BacSiController(IBacSiService bacSiService)
        {
            _bacSiService = bacSiService;
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi, BenhNhan")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _bacSiService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Create([FromBody] BacSiRequest request)
        {
            var result = await _bacSiService.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Update([FromBody] BacSiRequest request)
        {
            var result = await _bacSiService.UpdateAsync(request);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _bacSiService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("search")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi, BenhNhan")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            var result = await _bacSiService.SearchAsync(request);
            return Ok(result);
        }
    }
}
