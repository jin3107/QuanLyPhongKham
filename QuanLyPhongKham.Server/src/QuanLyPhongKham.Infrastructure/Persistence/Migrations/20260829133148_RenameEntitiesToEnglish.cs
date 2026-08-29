using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyPhongKham.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RenameEntitiesToEnglish : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ChiTietDonThuocs");

            migrationBuilder.DropTable(
                name: "DanhMucDichVus");

            migrationBuilder.DropTable(
                name: "HoaDons");

            migrationBuilder.DropTable(
                name: "LichLamViecs");

            migrationBuilder.DropTable(
                name: "NhanViens");

            migrationBuilder.DropTable(
                name: "DanhMucThuocs");

            migrationBuilder.DropTable(
                name: "DonThuocs");

            migrationBuilder.DropTable(
                name: "PhieuKhams");

            migrationBuilder.DropTable(
                name: "LichHens");

            migrationBuilder.DropTable(
                name: "BacSis");

            migrationBuilder.DropTable(
                name: "BenhNhans");

            migrationBuilder.CreateTable(
                name: "Doctors",
                columns: table => new
                {
                    MaBS = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    HoTen = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ChuyenKhoa = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SoDienThoai = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaTK = table.Column<string>(type: "longtext", nullable: true)
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
                    table.PrimaryKey("PK_Doctors", x => x.MaBS);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MedicalServices",
                columns: table => new
                {
                    MaDV = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TenDV = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DonGia = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
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
                    table.PrimaryKey("PK_MedicalServices", x => x.MaDV);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Medicines",
                columns: table => new
                {
                    MaThuoc = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    TenThuoc = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DonGia = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    ChongChiDinh = table.Column<string>(type: "longtext", nullable: true)
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
                    table.PrimaryKey("PK_Medicines", x => x.MaThuoc);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Patients",
                columns: table => new
                {
                    MaBN = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    HoTen = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    NgaySinh = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    GioiTinh = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    SoDienThoai = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    DiaChi = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SoBHYT = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TienSuDiUng = table.Column<string>(type: "longtext", nullable: true)
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
                    table.PrimaryKey("PK_Patients", x => x.MaBN);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Staffs",
                columns: table => new
                {
                    MaNV = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    HoTen = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SoDienThoai = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "longtext", nullable: false)
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
                    table.PrimaryKey("PK_Staffs", x => x.MaNV);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "WorkSchedules",
                columns: table => new
                {
                    MaLLV = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    NgayLamViec = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    GioBatDau = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    GioKetThuc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    MaBS = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
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
                    table.PrimaryKey("PK_WorkSchedules", x => x.MaLLV);
                    table.ForeignKey(
                        name: "FK_WorkSchedules_Doctors_MaBS",
                        column: x => x.MaBS,
                        principalTable: "Doctors",
                        principalColumn: "MaBS",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    MaLH = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ThoiGianKham = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TrangThai = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaBN = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    MaBS = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
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
                    table.PrimaryKey("PK_Appointments", x => x.MaLH);
                    table.ForeignKey(
                        name: "FK_Appointments_Doctors_MaBS",
                        column: x => x.MaBS,
                        principalTable: "Doctors",
                        principalColumn: "MaBS",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Appointments_Patients_MaBN",
                        column: x => x.MaBN,
                        principalTable: "Patients",
                        principalColumn: "MaBN",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "MedicalExaminations",
                columns: table => new
                {
                    MaPK = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    NgayKham = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TrieuChung = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ChuanDoan = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HuongDieuTri = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TrangThaiTiepNhan = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaLH = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    MaBS = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
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
                    table.PrimaryKey("PK_MedicalExaminations", x => x.MaPK);
                    table.ForeignKey(
                        name: "FK_MedicalExaminations_Appointments_MaLH",
                        column: x => x.MaLH,
                        principalTable: "Appointments",
                        principalColumn: "MaLH",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MedicalExaminations_Doctors_MaBS",
                        column: x => x.MaBS,
                        principalTable: "Doctors",
                        principalColumn: "MaBS",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    MaHD = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    NgayThanhToan = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TongTien = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TrangThaiThanhToan = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaLeTan = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    MaPK = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
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
                    table.PrimaryKey("PK_Invoices", x => x.MaHD);
                    table.ForeignKey(
                        name: "FK_Invoices_MedicalExaminations_MaPK",
                        column: x => x.MaPK,
                        principalTable: "MedicalExaminations",
                        principalColumn: "MaPK",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Prescriptions",
                columns: table => new
                {
                    MaDT = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    NgayKe = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    MaPK = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
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
                    table.PrimaryKey("PK_Prescriptions", x => x.MaDT);
                    table.ForeignKey(
                        name: "FK_Prescriptions_MedicalExaminations_MaPK",
                        column: x => x.MaPK,
                        principalTable: "MedicalExaminations",
                        principalColumn: "MaPK",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PrescriptionDetails",
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
                    table.PrimaryKey("PK_PrescriptionDetails", x => x.MaCTDT);
                    table.ForeignKey(
                        name: "FK_PrescriptionDetails_Medicines_MaThuoc",
                        column: x => x.MaThuoc,
                        principalTable: "Medicines",
                        principalColumn: "MaThuoc",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PrescriptionDetails_Prescriptions_MaDT",
                        column: x => x.MaDT,
                        principalTable: "Prescriptions",
                        principalColumn: "MaDT",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_MaBN",
                table: "Appointments",
                column: "MaBN");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_MaBS",
                table: "Appointments",
                column: "MaBS");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_MaPK",
                table: "Invoices",
                column: "MaPK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_MedicalExaminations_MaBS",
                table: "MedicalExaminations",
                column: "MaBS");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalExaminations_MaLH",
                table: "MedicalExaminations",
                column: "MaLH",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionDetails_MaDT",
                table: "PrescriptionDetails",
                column: "MaDT");

            migrationBuilder.CreateIndex(
                name: "IX_PrescriptionDetails_MaThuoc",
                table: "PrescriptionDetails",
                column: "MaThuoc");

            migrationBuilder.CreateIndex(
                name: "IX_Prescriptions_MaPK",
                table: "Prescriptions",
                column: "MaPK");

            migrationBuilder.CreateIndex(
                name: "IX_WorkSchedules_MaBS",
                table: "WorkSchedules",
                column: "MaBS");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "MedicalServices");

            migrationBuilder.DropTable(
                name: "PrescriptionDetails");

            migrationBuilder.DropTable(
                name: "Staffs");

            migrationBuilder.DropTable(
                name: "WorkSchedules");

            migrationBuilder.DropTable(
                name: "Medicines");

            migrationBuilder.DropTable(
                name: "Prescriptions");

            migrationBuilder.DropTable(
                name: "MedicalExaminations");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Doctors");

            migrationBuilder.DropTable(
                name: "Patients");

            migrationBuilder.CreateTable(
                name: "BacSis",
                columns: table => new
                {
                    MaBS = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaTK = table.Column<string>(type: "varchar(255)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ChuyenKhoa = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    HoTen = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    SoDienThoai = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BacSis", x => x.MaBS);
                    table.ForeignKey(
                        name: "FK_BacSis_AspNetUsers_MaTK",
                        column: x => x.MaTK,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "BenhNhans",
                columns: table => new
                {
                    MaBN = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DiaChi = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    GioiTinh = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    HoTen = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    NgaySinh = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SoBHYT = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SoDienThoai = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TienSuDiUng = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenhNhans", x => x.MaBN);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DanhMucDichVus",
                columns: table => new
                {
                    MaDV = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DonGia = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    TenDV = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMucDichVus", x => x.MaDV);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DanhMucThuocs",
                columns: table => new
                {
                    MaThuoc = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    ChongChiDinh = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    DonGia = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    TenThuoc = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DanhMucThuocs", x => x.MaThuoc);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "NhanViens",
                columns: table => new
                {
                    MaNV = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Email = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    HoTen = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    Password = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Role = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    SoDienThoai = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NhanViens", x => x.MaNV);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LichLamViecs",
                columns: table => new
                {
                    MaLLV = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaBS = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    GioBatDau = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    GioKetThuc = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    NgayLamViec = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LichLamViecs", x => x.MaLLV);
                    table.ForeignKey(
                        name: "FK_LichLamViecs_BacSis_MaBS",
                        column: x => x.MaBS,
                        principalTable: "BacSis",
                        principalColumn: "MaBS",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "LichHens",
                columns: table => new
                {
                    MaLH = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaBN = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    MaBS = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    ThoiGianKham = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TrangThai = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LichHens", x => x.MaLH);
                    table.ForeignKey(
                        name: "FK_LichHens_BacSis_MaBS",
                        column: x => x.MaBS,
                        principalTable: "BacSis",
                        principalColumn: "MaBS",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LichHens_BenhNhans_MaBN",
                        column: x => x.MaBN,
                        principalTable: "BenhNhans",
                        principalColumn: "MaBN",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PhieuKhams",
                columns: table => new
                {
                    MaPK = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaBS = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    MaLH = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    ChuanDoan = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    HuongDieuTri = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    NgayKham = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TrangThaiTiepNhan = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TrieuChung = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhieuKhams", x => x.MaPK);
                    table.ForeignKey(
                        name: "FK_PhieuKhams_BacSis_MaBS",
                        column: x => x.MaBS,
                        principalTable: "BacSis",
                        principalColumn: "MaBS",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_PhieuKhams_LichHens_MaLH",
                        column: x => x.MaLH,
                        principalTable: "LichHens",
                        principalColumn: "MaLH",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "DonThuocs",
                columns: table => new
                {
                    MaDT = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaPK = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    NgayKe = table.Column<DateTime>(type: "datetime(6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DonThuocs", x => x.MaDT);
                    table.ForeignKey(
                        name: "FK_DonThuocs_PhieuKhams_MaPK",
                        column: x => x.MaPK,
                        principalTable: "PhieuKhams",
                        principalColumn: "MaPK",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "HoaDons",
                columns: table => new
                {
                    MaHD = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaPK = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    MaLeTan = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    NgayThanhToan = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    TongTien = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    TrangThaiThanhToan = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HoaDons", x => x.MaHD);
                    table.ForeignKey(
                        name: "FK_HoaDons_PhieuKhams_MaPK",
                        column: x => x.MaPK,
                        principalTable: "PhieuKhams",
                        principalColumn: "MaPK",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ChiTietDonThuocs",
                columns: table => new
                {
                    MaCTDT = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaDT = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    MaThuoc = table.Column<Guid>(type: "char(36)", nullable: true, collation: "ascii_general_ci"),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    LieuDung = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ModifiedOn = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    SoLuong = table.Column<int>(type: "int", nullable: false)
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
                name: "IX_BacSis_MaTK",
                table: "BacSis",
                column: "MaTK");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonThuocs_MaDT",
                table: "ChiTietDonThuocs",
                column: "MaDT");

            migrationBuilder.CreateIndex(
                name: "IX_ChiTietDonThuocs_MaThuoc",
                table: "ChiTietDonThuocs",
                column: "MaThuoc");

            migrationBuilder.CreateIndex(
                name: "IX_DonThuocs_MaPK",
                table: "DonThuocs",
                column: "MaPK");

            migrationBuilder.CreateIndex(
                name: "IX_HoaDons_MaPK",
                table: "HoaDons",
                column: "MaPK",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LichHens_MaBN",
                table: "LichHens",
                column: "MaBN");

            migrationBuilder.CreateIndex(
                name: "IX_LichHens_MaBS",
                table: "LichHens",
                column: "MaBS");

            migrationBuilder.CreateIndex(
                name: "IX_LichLamViecs_MaBS",
                table: "LichLamViecs",
                column: "MaBS");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuKhams_MaBS",
                table: "PhieuKhams",
                column: "MaBS");

            migrationBuilder.CreateIndex(
                name: "IX_PhieuKhams_MaLH",
                table: "PhieuKhams",
                column: "MaLH",
                unique: true);
        }
    }
}
