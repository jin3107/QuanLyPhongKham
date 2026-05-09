using MayNghien.Infrastructures.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using QuanLyPhongKham.DTOs.Requests;
using QuanLyPhongKham.Services.Implementations;
using QuanLyPhongKham.Services.Interfaces;

namespace QuanLyPhongKham.API.Controllers
{
    [Route("danhmucdichvu")]
    [ApiController]
    public class DanhMucDichVuController : ControllerBase
    {
        private readonly IDanhMucDichVuService _danhMucDichVuService;

        public DanhMucDichVuController(IDanhMucDichVuService danhMucDichVuService)
        {
            _danhMucDichVuService = danhMucDichVuService;
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var result = await _danhMucDichVuService.GetByIdAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Create([FromBody] DanhMucDichVuRequest request)
        {
            var result = await _danhMucDichVuService.CreateAsync(request);
            return Ok(result);
        }

        [HttpPut]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Update([FromBody] DanhMucDichVuRequest request)
        {
            var result = await _danhMucDichVuService.UpdateAsync(request);
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        [Authorize(Roles = "SuperAdmin")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _danhMucDichVuService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpPost]
        [Route("search")]
        [Authorize(Roles = "SuperAdmin, LeTan, BacSi")]
        public async Task<IActionResult> Search([FromBody] SearchRequest request)
        {
            var result = await _danhMucDichVuService.SearchAsync(request);
            return Ok(result);
        }
    }
}
