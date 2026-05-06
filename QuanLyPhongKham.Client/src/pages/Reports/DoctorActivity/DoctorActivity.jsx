import "./doctoractivity.scss";
import { useState } from "react";
import { DatePicker, Button, message, Table, Tag } from "antd";
import { BarChartOutlined, TeamOutlined, MedicineBoxOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;

const DOCTORS = [
  { MaBS: "BS01", HoTen: "Nguyễn Văn An",  ChuyenKhoa: "Nội tổng quát" },
  { MaBS: "BS02", HoTen: "Trần Thị Bích",  ChuyenKhoa: "Nhi khoa"       },
  { MaBS: "BS03", HoTen: "Lê Minh Châu",   ChuyenKhoa: "Tim mạch"       },
  { MaBS: "BS04", HoTen: "Phạm Thị Dung",  ChuyenKhoa: "Da liễu"        },
];

// Giả lập PhieuKham
const PHIEU_KHAM = [
  { MaPK: "PK001", MaBS: "BS01", NgayKham: "2026-05-01" },
  { MaPK: "PK002", MaBS: "BS02", NgayKham: "2026-05-01" },
  { MaPK: "PK003", MaBS: "BS03", NgayKham: "2026-05-02" },
  { MaPK: "PK004", MaBS: "BS01", NgayKham: "2026-05-03" },
  { MaPK: "PK005", MaBS: "BS02", NgayKham: "2026-05-04" },
  { MaPK: "PK006", MaBS: "BS03", NgayKham: "2026-05-05" },
  { MaPK: "PK007", MaBS: "BS04", NgayKham: "2026-05-05" },
  { MaPK: "PK008", MaBS: "BS01", NgayKham: "2026-05-06" },
  { MaPK: "PK009", MaBS: "BS02", NgayKham: "2026-05-07" },
  { MaPK: "PK010", MaBS: "BS03", NgayKham: "2026-05-08" },
  { MaPK: "PK011", MaBS: "BS04", NgayKham: "2026-05-09" },
  { MaPK: "PK012", MaBS: "BS01", NgayKham: "2026-05-10" },
  { MaPK: "PK013", MaBS: "BS02", NgayKham: "2026-05-11" },
  { MaPK: "PK014", MaBS: "BS03", NgayKham: "2026-05-12" },
];

export default function DoctorStats() {
  const [range,    setRange]    = useState(null);
  const [rows,     setRows]     = useState([]);
  const [searched, setSearched] = useState(false);
  const [summary,  setSummary]  = useState(null);

  const handleStatistic = () => {
    if (!range) { message.warning("Vui lòng chọn khoảng thời gian!"); return; }
    const [start, end] = range;
    const s = start.format("YYYY-MM-DD");
    const e = end.format("YYYY-MM-DD");

    const filtered = PHIEU_KHAM.filter((p) => p.NgayKham >= s && p.NgayKham <= e);

    const result = DOCTORS.map((d) => {
      const count = filtered.filter((p) => p.MaBS === d.MaBS).length;
      return { ...d, SoPhieuKham: count, active: count > 0 };
    }).sort((a, b) => b.SoPhieuKham - a.SoPhieuKham);

    const total    = result.reduce((s, r) => s + r.SoPhieuKham, 0);
    const active   = result.filter((r) => r.active).length;
    const inactive = result.length - active;

    setRows(result);
    setSummary({ total, active, inactive, totalBS: result.length });
    setSearched(true);
    message.success("Thống kê thành công!");
  };

  const maxCount = rows.length ? Math.max(...rows.map((r) => r.SoPhieuKham)) : 1;

  const columns = [
    {
      title: "BÁC SĨ (MABS)",
      dataIndex: "HoTen",
      render: (v) => <span className="bs-name">{v}</span>,
    },
    {
      title: "CHUYÊN KHOA",
      dataIndex: "ChuyenKhoa",
      render: (v) => <span className="spec-text">{v}</span>,
    },
    {
      title: "SỐ PHIEUKHAM",
      dataIndex: "SoPhieuKham",
      align: "right",
      sorter: (a, b) => b.SoPhieuKham - a.SoPhieuKham,
      render: (v) => (
        <div className="count-cell">
          <div className="count-bar-wrap">
            <div
              className="count-bar"
              style={{ width: maxCount > 0 ? `${(v / maxCount) * 100}%` : "0%" }}
            />
          </div>
          <span className="count-num">{v} ca</span>
        </div>
      ),
    },
  ];

  return (
    <div className="doctorstats">
      <div className="ds-body">

        {/* Filter */}
        <div className="filter-card">
          <div className="section-label"><BarChartOutlined /> Chọn khoảng thời gian thống kê PhieuKham</div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Từ ngày – Đến ngày (NgayKham)</label>
              <RangePicker
                onChange={(v) => { setRange(v); setSearched(false); }}
                format="DD/MM/YYYY"
                placeholder={["Từ ngày", "Đến ngày"]}
                style={{ width: 280 }}
              />
            </div>
            <Button type="primary" icon={<BarChartOutlined />} onClick={handleStatistic}
              size="large" className="stat-btn">
              Thống kê
            </Button>
          </div>
        </div>

        {/* Summary chips */}
        {searched && summary && (
          <div className="summary-chips">
            <div className="chip"><TeamOutlined /> <b>{summary.totalBS}</b> bác sĩ</div>
            <div className="chip active"><MedicineBoxOutlined /> <b>{summary.active}</b> có hoạt động</div>
            <div className="chip inactive"><TeamOutlined /> <b>{summary.inactive}</b> không hoạt động</div>
            <div className="chip total"><BarChartOutlined /> Tổng <b>{summary.total}</b> phiếu khám</div>
          </div>
        )}

        {/* Table */}
        {searched && (
          <div className="table-wrap">
            <div className="table-title"><BarChartOutlined /> Thống kê hoạt động BacSi</div>
            <Table
              columns={columns}
              dataSource={rows}
              rowKey="MaBS"
              size="middle"
              pagination={false}
              className="clean-table"
              locale={{ emptyText: "Không có dữ liệu" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}