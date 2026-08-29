using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QuanLyPhongKham.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddMedicalExaminationServices : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "MedicalExaminationServices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaPK = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    MaDV = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
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
                    table.PrimaryKey("PK_MedicalExaminationServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MedicalExaminationServices_MedicalExaminations_MaPK",
                        column: x => x.MaPK,
                        principalTable: "MedicalExaminations",
                        principalColumn: "MaPK",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_MedicalExaminationServices_MedicalServices_MaDV",
                        column: x => x.MaDV,
                        principalTable: "MedicalServices",
                        principalColumn: "MaDV",
                        onDelete: ReferentialAction.Restrict);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalExaminationServices_MaDV",
                table: "MedicalExaminationServices",
                column: "MaDV");

            migrationBuilder.CreateIndex(
                name: "IX_MedicalExaminationServices_MaPK",
                table: "MedicalExaminationServices",
                column: "MaPK");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "MedicalExaminationServices");
        }
    }
}
