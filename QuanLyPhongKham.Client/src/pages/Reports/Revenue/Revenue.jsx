import "./revenue.scss";
import { useState } from "react";
import { DatePicker, Button, message, Card, Statistic, Table, Empty, Tag } from "antd";
import {
  DollarOutlined, BarChartOutlined, MedicineBoxOutlined,
  ExperimentOutlined, AppstoreOutlined, ArrowUpOutlined, SearchOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const HOA_DON = [
  { MaHD: "HD001", MaPK: "PK001", MaBN: "Nguyễn Văn An", NgayThanhToan: "2026-05-01", kham: 150000, thuoc: 200000, dichvu: 50000,  TrangThaiThanhToan: "Đã thanh toán" },
  { MaHD: "HD002", MaPK: "PK002", MaBN: "Trần Thị Mai",   NgayThanhToan: "2026-05-01", kham: 150000, thuoc: 0,      dichvu: 120000, TrangThaiThanhToan: "Đã thanh toán" },
  { MaHD: "HD003", MaPK: "PK003", MaBN: "Lê Văn Nam",     NgayThanhToan: "2026-05-02", kham: 150000, thuoc: 350000, dichvu: 0,      TrangThaiThanhToan: "Đã thanh toán" },
  { MaHD: "HD004", MaPK: "PK004", MaBN: "Phạm Thị Diễm",   NgayThanhToan: "2026-05-03", kham: 200000, thuoc: 180000, dichvu: 80000,  TrangThaiThanhToan: "Đã thanh toán" },
  { MaHD: "HD005", MaPK: "PK005", MaBN: "Hoàng Văn Anh",  NgayThanhToan: "2026-05-05", kham: 150000, thuoc: 0,      dichvu: 250000, TrangThaiThanhToan: "Đã thanh toán" },
  { MaHD: "HD006", MaPK: "PK006", MaBN: "Ngô Thị Mai",    NgayThanhToan: "2026-05-06", kham: 200000, thuoc: 420000, dichvu: 0,      TrangThaiThanhToan: "Đã thanh toán" },
  { MaHD: "HD007", MaPK: "PK007", MaBN: "Bùi Văn Minh",    NgayThanhToan: "2026-05-07", kham: 150000, thuoc: 100000, dichvu: 60000,  TrangThaiThanhToan: "Đã thanh toán" },
  { MaHD: "HD008", MaPK: "PK008", MaBN: "Đặng Thị Hai",   NgayThanhToan: "2026-05-08", kham: 200000, thuoc: 290000, dichvu: 110000, TrangThaiThanhToan: "Đã thanh toán" },
];

const fmt = (n) => n.toLocaleString("vi-VN") + " ₫";

export default function Revenue() {
  const [range, setRange]       = useState(null);
  const [result, setResult]     = useState(null);
  const [searched, setSearched] = useState(false);

  const handleStatistic = () => {
    if (!range) { message.warning("Vui lòng chọn khoảng thời gian!"); return; }
    const [start, end] = range;
    const s = start.format("YYYY-MM-DD");
    const e = end.format("YYYY-MM-DD");

    const filtered = HOA_DON.filter(
      (p) => p.NgayThanhToan >= s && p.NgayThanhToan <= e && p.TrangThaiThanhToan === "Đã thanh toán"
    );

    if (filtered.length === 0) {
      setResult({ total: 0, kham: 0, thuoc: 0, dichvu: 0, rows: [], empty: true });
      setSearched(true);
      return;
    }

    const kham   = filtered.reduce((s, p) => s + p.kham,   0);
    const thuoc  = filtered.reduce((s, p) => s + p.thuoc,  0);
    const dichvu = filtered.reduce((s, p) => s + p.dichvu, 0);
    const total  = kham + thuoc + dichvu;

    setResult({ total, kham, thuoc, dichvu, rows: filtered, empty: false });
    setSearched(true);
    message.success("Thống kê thành công!");
  };

const columns = [
  {
    title: "NGÀY THANH TOÁN",
    dataIndex: "NgayThanhToan",
    width: "25%", // Cột ngày chiếm 25%
    render: (v) => v.split("-").reverse().join("/"),
  },
  {
    title: "BỆNH NHÂN",
    dataIndex: "MaBN",
    width: "45%", // Cột tên chiếm rộng nhất
  },
  {
    title: "TỔNG TIỀN",
    align: "right",
    width: "30%", // Cột tiền chiếm 30%
    render: (_, r) => (
      <span className="amt total-cell">
        {fmt(r.kham + r.thuoc + r.dichvu)}
      </span>
    ),
  },
];

  return (
    <div className="revenue-page">
        {/* ── FILTER ── */}
        <Card className="filter-card" variant="borderless">
          <div className="section-label"><SearchOutlined /> Thống kê doanh thu HoaDon theo NgayThanhToan</div>
          <div className="filter-row">
            <div className="filter-group">
              <label>Từ ngày – Đến ngày</label>
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
        </Card>

        {/* ── RESULTS ── */}
        {searched && result && (
          <>
            {result.empty ? (
              <Card className="result-card" variant="borderless">
                <Empty description="Không có HoaDon trong khoảng thời gian này" />
                <p className="empty-note">TongTien: <b>0 ₫</b></p>
              </Card>
            ) : (
              <>
                {/* Stat cards */}
                
                {/* Detail table — no card title bar */}
                <Card className="table-card"variant="borderless">
                  <div className="table-title"><DollarOutlined /> Chi tiết HoaDon đã thanh toán</div>
<Table
  columns={columns}
  dataSource={result.rows}
  rowKey="MaHD"
  size="middle"
  pagination={{ pageSize: 7, showSizeChanger: false }}
  className="clean-table"
  summary={() => (
    <Table.Summary.Row className="summary-row">
      <Table.Summary.Cell index={0} colSpan={2}>
        <b>Tổng cộng ({result.rows.length} Hóa đơn)</b>
      </Table.Summary.Cell>
      <Table.Summary.Cell index={1} align="right">
        <b className="amt total-cell" style={{ fontSize: "16px" }}>
          {fmt(result.total)}
        </b>
      </Table.Summary.Cell>
    </Table.Summary.Row>
  )}
/>
                </Card>
              </>
            )}
          </>
        )}

    </div>
  );
}