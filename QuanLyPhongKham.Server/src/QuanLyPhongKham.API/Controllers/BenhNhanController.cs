using MayNghien.Infrastructures.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Services.Interfaces;

namespace QuanLyPhongKham.API.Controllers
{
    [Route("benhnhan")]
    [ApiController]
    public class BenhNhanController : ControllerBase
    {
        private readonly IBenhNhanService _benhNhanService;

        public BenhNhanController(IBenhNhanService benhNhanService)
        {
            _benhNhanService = benhNhanService;
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi, BenhNhan")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _benhNhanService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "LeTan, BenhNhan")]
        public async Task<IActionResult> Create([FromBody] BenhNhanRequest request)
        {
            var result = await _benhNhanService.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = "SuperAdmin, LeTan, BenhNhan")]
        public async Task<IActionResult> Update([FromBody] BenhNhanRequest request)
        {
            var result = await _benhNhanService.UpdateAsync(request);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _benhNhanService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("search")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi, BenhNhan")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            var result = await _benhNhanService.SearchAsync(request);
            return Ok(result);
        }
    }
}
