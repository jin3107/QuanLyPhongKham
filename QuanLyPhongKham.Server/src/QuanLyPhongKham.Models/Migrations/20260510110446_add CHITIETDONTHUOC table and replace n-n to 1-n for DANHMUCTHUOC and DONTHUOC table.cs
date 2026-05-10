using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyPhongKham.Models.Migrations
{
    /// <inheritdoc />
    public partial class addCHITIETDONTHUOCtableandreplacennto1nforDANHMUCTHUOCandDONTHUOCtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DANHMUCTHUOCDONTHUOC");

            migrationBuilder.CreateTable(
                name: "ChiTietDonThuocs",
                columns: table => new
                {
                    MaCTDT = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaDT = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    MaThuoc = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    SoLuong = table.Column<int>(type: "int", nullable: false),
                    LieuDung = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChiTietDonThuocs", x => x.MaCTDT);
                    table.ForeignKey(
                        name: "FK_ChiTietDonThuocs_DanhMucThuocs_MaThuoc",
                        column: x => x.MaThuoc,
                        principalTable: "DanhMucThuocs",
                        principalColumn: "MaThuoc",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChiTietDonThuocs_DonThuocs_MaDT",
                        column: x => x.MaDT,
                        principalTable: "DonThuocs",
                        principalColumn: "MaDT",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonThuocs_MaDT",
                table: "ChiTietDonThuocs",
                column: "MaDT");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonThuocs_MaThuoc",
                table: "ChiTietDonThuocs",
                column: "MaThuoc");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietDonThuocs");

            migrationBuilder.CreateTable(
                name: "DANHMUCTHUOCDONTHUOC",
                columns: table => new
                {
                    DanhMucThuocsMaThuoc = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    DonThuocsMaDT = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DANHMUCTHUOCDONTHUOC", x => new { x.DanhMucThuocsMaThuoc, x.DonThuocsMaDT });
                    table.ForeignKey(
                        name: "FK_DANHMUCTHUOCDONTHUOC_DanhMucThuocs_DanhMucThuocsMaThuoc",
                        column: x => x.DanhMucThuocsMaThuoc,
                        principalTable: "DanhMucThuocs",
                        principalColumn: "MaThuoc",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_DANHMUCTHUOCDONTHUOC_DonThuocs_DonThuocsMaDT",
                        column: x => x.DonThuocsMaDT,
                        principalTable: "DonThuocs",
                        principalColumn: "MaDT",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_DANHMUCTHUOCDONTHUOC_DonThuocsMaDT",
                table: "DANHMUCTHUOCDONTHUOC",
                column: "DonThuocsMaDT");
        }
    }
}
