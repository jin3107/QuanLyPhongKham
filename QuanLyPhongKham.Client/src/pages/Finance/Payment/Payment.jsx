import React, { useState } from "react";
import "./payment.scss";
import {
  Table, Button, Card, Divider, Tag, message, Modal, Badge,
} from "antd";
import {
  PrinterOutlined, UserOutlined,
  MedicineBoxOutlined, ExperimentOutlined, AppstoreOutlined,
  CheckCircleOutlined, DollarOutlined, CreditCardOutlined,
  BankOutlined, WarningOutlined, FileTextOutlined,
} from "@ant-design/icons";

/* ── DATA ── */
const BENH_NHAN = [
  { MaBN: "BN001", HoTen: "Nguyễn Văn An",  NgaySinh: "1985-03-12", GioiTinh: true,  SoBHYT: "BH123456", TienSuDiUng: "Không" },
  { MaBN: "BN002", HoTen: "Trần Thị Bích",  NgaySinh: "1992-07-20", GioiTinh: false, SoBHYT: "BH789012", TienSuDiUng: "Penicillin" },
  { MaBN: "BN003", HoTen: "Lê Minh Châu",   NgaySinh: "1978-11-05", GioiTinh: true,  SoBHYT: "BH345678", TienSuDiUng: "Không" },
  { MaBN: "BN004", HoTen: "Phạm Thị Dung",  NgaySinh: "2001-06-14", GioiTinh: false, SoBHYT: "BH901234", TienSuDiUng: "Aspirin" },
];

const DANH_MUC_DICH_VU = [
  { MaDV: "DV001", TenDichVu: "Khám nội tổng quát",       DonGia: 150000, loai: "kham" },
  { MaDV: "DV002", TenDichVu: "Khám nhi",                 DonGia: 150000, loai: "kham" },
  { MaDV: "DV003", TenDichVu: "Khám tim mạch",            DonGia: 200000, loai: "kham" },
  { MaDV: "DV004", TenDichVu: "Khám da liễu",             DonGia: 150000, loai: "kham" },
  { MaDV: "DV005", TenDichVu: "Xét nghiệm công thức máu", DonGia: 120000, loai: "xn" },
  { MaDV: "DV006", TenDichVu: "Điện tâm đồ ECG",          DonGia: 180000, loai: "xn" },
  { MaDV: "DV007", TenDichVu: "Siêu âm bụng tổng quát",   DonGia: 250000, loai: "dichvu" },
  { MaDV: "DV008", TenDichVu: "Chiếu đèn UV trị liệu",    DonGia: 200000, loai: "dichvu" },
];

const DANH_MUC_THUOC = [
  { MaThuoc: "TH001", TenThuoc: "Paracetamol 500mg",     DonGia: 85000,  ChongChiDinh: "Suy gan nặng",      LieuDung: "2 viên/ngày × 5 ngày",    SoLuong: 2 },
  { MaThuoc: "TH002", TenThuoc: "Kem bôi Betamethasone", DonGia: 65000,  ChongChiDinh: "Nhiễm nấm da",      LieuDung: "Bôi 2 lần/ngày × 7 ngày", SoLuong: 1 },
  { MaThuoc: "TH003", TenThuoc: "Amoxicillin 500mg",     DonGia: 95000,  ChongChiDinh: "Dị ứng Penicillin", LieuDung: "3 viên/ngày × 7 ngày",    SoLuong: 3 },
  { MaThuoc: "TH004", TenThuoc: "Metoprolol 50mg",       DonGia: 120000, ChongChiDinh: "Nhịp tim chậm",     LieuDung: "1 viên/ngày × 30 ngày",   SoLuong: 1 },
];

const PHIEU_KHAM_INIT = [
  { MaPK: "PK001", MaBN: "BN001", BacSi: "Nguyễn Hữu Phúc",
    NgayKham: "2026-05-01", ChuanDoan: "Viêm họng cấp",
    HuongDieuTri: "Nghỉ ngơi, uống thuốc theo đơn", TrangThaiTiepNhan: "Chờ thanh toán",
    donThuoc: { MaDT: "DT001", chiTiet: [{ MaThuoc: "TH001", SoLuong: 2 }] },
    dichVuSuDung: ["DV001", "DV005"] },
  { MaPK: "PK002", MaBN: "BN002", BacSi: "Lê Thị Lan",
    NgayKham: "2026-05-01", ChuanDoan: "Viêm amidan",
    HuongDieuTri: "Kháng sinh + theo dõi", TrangThaiTiepNhan: "Chờ thanh toán",
    donThuoc: { MaDT: "DT002", chiTiet: [{ MaThuoc: "TH003", SoLuong: 3 }] },
    dichVuSuDung: ["DV002", "DV007"] },
  { MaPK: "PK003", MaBN: "BN003", BacSi: "Trần Văn Bình",
    NgayKham: "2026-04-28", ChuanDoan: "Rối loạn nhịp tim",
    HuongDieuTri: "Dùng thuốc kiểm soát nhịp tim", TrangThaiTiepNhan: "Đã thanh toán",
    donThuoc: { MaDT: "DT003", chiTiet: [{ MaThuoc: "TH004", SoLuong: 1 }] },
    dichVuSuDung: ["DV003", "DV006"] },
  { MaPK: "PK004", MaBN: "BN004", BacSi: "Phạm Quốc Hùng",
    NgayKham: "2026-05-01", ChuanDoan: "Viêm da dị ứng",
    HuongDieuTri: "Tránh tác nhân gây dị ứng, bôi thuốc", TrangThaiTiepNhan: "Chờ thanh toán",
    donThuoc: { MaDT: "DT004", chiTiet: [{ MaThuoc: "TH002", SoLuong: 1 }] },
    dichVuSuDung: ["DV004", "DV008"] },
];

const HOA_DON_INIT = [
  { MaHD: "HD001", MaBN: "BN001", MaPK: "PK001", NgayThanhToan: "2026-05-01", TongTien: 355000, TrangThaiThanhToan: "Chưa thanh toán", PhuongThuc: null },
  { MaHD: "HD002", MaBN: "BN002", MaPK: "PK002", NgayThanhToan: "2026-05-01", TongTien: 495000, TrangThaiThanhToan: "Chưa thanh toán", PhuongThuc: null },
  { MaHD: "HD003", MaBN: "BN003", MaPK: "PK003", NgayThanhToan: "2026-04-28", TongTien: 500000, TrangThaiThanhToan: "Đã thanh toán",   PhuongThuc: "cash" },
  { MaHD: "HD004", MaBN: "BN004", MaPK: "PK004", NgayThanhToan: "2026-05-01", TongTien: 415000, TrangThaiThanhToan: "Chưa thanh toán", PhuongThuc: null },
];

/* ── Helpers ── */
const LOAI_COLOR = { kham: "blue", xn: "cyan", dichvu: "orange", thuoc: "green" };
const LOAI_LABEL = { kham: "Khám", xn: "Xét nghiệm", dichvu: "Dịch vụ", thuoc: "Thuốc" };
const LOAI_ICON  = { kham: <MedicineBoxOutlined />, xn: <ExperimentOutlined />, dichvu: <AppstoreOutlined />, thuoc: <MedicineBoxOutlined /> };
const METHOD_MAP = {
  cash: { label: "Tiền mặt",     icon: <DollarOutlined /> },
  bank: { label: "Chuyển khoản", icon: <BankOutlined /> },
};

const fmt     = (n) => n.toLocaleString("vi-VN") + " ₫";
const fmtDate = (s) => s.split("-").reverse().join("/");

const buildItems = (pk) => [
  ...pk.dichVuSuDung.map((maDV) => {
    const dv = DANH_MUC_DICH_VU.find((d) => d.MaDV === maDV);
    return { key: maDV, loai: dv.loai, label: dv.TenDichVu, price: dv.DonGia };
  }),
  ...pk.donThuoc.chiTiet.map((ct) => {
    const t = DANH_MUC_THUOC.find((x) => x.MaThuoc === ct.MaThuoc);
    return { key: ct.MaThuoc, loai: "thuoc", label: t.TenThuoc, price: t.DonGia, ref: t, soLuong: ct.SoLuong };
  }),
];

/* ══════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════ */
export default function Payment() {
  const [phieuList,  setPhieuList]  = useState(PHIEU_KHAM_INIT);
  const [hoaDonList, setHoaDonList] = useState(HOA_DON_INIT);
  const [selected,   setSelected]   = useState(null);
  const [method,     setMethod]     = useState(null);
  const [printModal, setPrintModal] = useState(false);

  const getBN = (maBN) => BENH_NHAN.find((b) => b.MaBN === maBN);
  const getHD = (maPK) => hoaDonList.find((h) => h.MaPK === maPK);

  const waiting = phieuList.filter((p) => p.TrangThaiTiepNhan === "Chờ thanh toán");

  const handleSelect = (p) => { setSelected(p); setMethod(null); };

  const handlePay = () => {
    if (!method) { message.warning("Vui lòng chọn phương thức thanh toán!"); return; }
    const hd = getHD(selected.MaPK);
    const updatedHD = { ...hd, TrangThaiThanhToan: "Đã thanh toán", PhuongThuc: method, NgayThanhToan: new Date().toISOString().split("T")[0] };
    setHoaDonList((prev) => prev.map((h) => h.MaPK === selected.MaPK ? updatedHD : h));
    setPhieuList((prev)  => prev.map((p) => p.MaPK === selected.MaPK ? { ...p, TrangThaiTiepNhan: "Đã thanh toán" } : p));
    message.success(`Thanh toán thành công! ${fmt(hd.TongTien)} – ${METHOD_MAP[method].label}`);
    setSelected(null); setMethod(null);
  };

  const items   = selected ? buildItems(selected) : [];
  const total   = items.reduce((s, i) => s + i.price, 0);
  const patient = selected ? getBN(selected.MaBN) : null;
  const selHD   = selected ? getHD(selected.MaPK) : null;

  const stats = {
    chua: hoaDonList.filter((h) => h.TrangThaiThanhToan === "Chưa thanh toán").length,
    da:   hoaDonList.filter((h) => h.TrangThaiThanhToan === "Đã thanh toán").length,
    tong: hoaDonList.reduce((s, h) => h.TrangThaiThanhToan === "Đã thanh toán" ? s + h.TongTien : s, 0),
  };

  /* ── Cột bảng DS ── */
  const listColumns = [
    {
      title: "Bệnh nhân",
      render: (_, r) => <span className="pname">{getBN(r.MaBN)?.HoTen}</span>,
    },
    {
      title: "Ngày khám", dataIndex: "NgayKham", width: 110,
      render: (v) => fmtDate(v),
    },
    {
      title: "Bác sĩ", dataIndex: "BacSi",
    },
    {
      title: "", width: 80, align: "center",
      render: (_, r) => (
        <Button type="primary" size="small" className="sel-btn" onClick={() => handleSelect(r)}>
          Chọn
        </Button>
      ),
    },
  ];

  /* ── Cột chi phí ── */
  const svcColumns = [
    { title: "Loại", dataIndex: "loai", width: 120,
      render: (v) => <Tag color={LOAI_COLOR[v]} icon={LOAI_ICON[v]}>{LOAI_LABEL[v]}</Tag> },
    { title: "Tên dịch vụ / Thuốc", dataIndex: "label" },
    { title: "Đơn giá", dataIndex: "price", align: "right",
      render: (v) => <span className="price-cell">{fmt(v)}</span> },
  ];

  return (
    <div className="payment-page">

      {/* ── Stats ── */}
      <div className="stats-bar">
        <div className="stat-chip chip-warn"><span className="sc-num">{stats.chua}</span> chờ thanh toán</div>
        <div className="stat-chip chip-ok"><CheckCircleOutlined /><span className="sc-num">{stats.da}</span> đã thanh toán</div>
        <div className="stat-chip chip-blue"><DollarOutlined /><span className="sc-num">{fmt(stats.tong)}</span> doanh thu</div>
      </div>

      {/* ── Main 2-column layout ── */}
      <div className="main-layout">

        {/* ════ LEFT COLUMN ════ */}
        <div className="left-col">

          {/* Bảng DS phiếu khám */}
          <Card className="list-card"
            title={<span className="card-title"><UserOutlined /> Phiếu khám chờ thanh toán</span>}>
            <Table
              dataSource={waiting}
              columns={listColumns}
              rowKey="MaPK"
              size="middle"
              className="pay-table"
              pagination={{ pageSize: 6, showSizeChanger: false }}
              rowClassName={(r) => r.MaPK === selected?.MaPK ? "row-sel" : ""}
              locale={{ emptyText: "Không có phiếu chờ thanh toán" }}
            />
          </Card>

          {/* Thông tin BN + PK (hiện khi chọn) */}
          {selected && (
            <div className="info-row-2col">
              {/* Thông tin BenhNhan */}
              <div className="info-block">
                <div className="ib-title">Thông tin BenhNhan</div>
                <div className="ib-row"><span className="ib-lbl">Họ tên</span>        <span className="ib-val bold">{patient?.HoTen}</span></div>
                <div className="ib-row"><span className="ib-lbl">Ngày sinh</span>     <span className="ib-val">{patient?.NgaySinh ? fmtDate(patient.NgaySinh) : "—"}</span></div>
                <div className="ib-row"><span className="ib-lbl">Giới tính</span>     <span className="ib-val">{patient?.GioiTinh ? "Nam" : "Nữ"}</span></div>
                <div className="ib-row"><span className="ib-lbl">SoBHYT</span>        <span className="ib-val">{patient?.SoBHYT}</span></div>
                <div className="ib-row"><span className="ib-lbl">TienSuDiUng</span>   <span className="ib-val">{patient?.TienSuDiUng}</span></div>
              </div>

              {/* Thông tin PhieuKham */}
              <div className="info-block">
                <div className="ib-title">Thông tin PhieuKham</div>
                <div className="ib-row"><span className="ib-lbl">NgayKham</span>      <span className="ib-val">{fmtDate(selected.NgayKham)}</span></div>
                <div className="ib-row"><span className="ib-lbl">Bác sĩ</span>        <span className="ib-val">{selected.BacSi}</span></div>
                <div className="ib-row"><span className="ib-lbl">ChuanDoan</span>     <span className="ib-val">{selected.ChuanDoan}</span></div>
                <div className="ib-row"><span className="ib-lbl">HuongDieuTri</span> <span className="ib-val">{selected.HuongDieuTri}</span></div>
              </div>
            </div>
          )}
        </div>

        {/* ════ RIGHT COLUMN ════ */}
        <div className="right-col">
          {selected ? (
            <Card className="pay-card"
              title={<span className="card-title"><FileTextOutlined /> Chi Phí Khám</span>}>

              {/* Bảng chi phí */}
              <Table
                dataSource={items}
                columns={svcColumns}
                rowKey="key"
                pagination={false}
                size="small"
                className="svc-table"
                summary={() => (
                  <Table.Summary.Row className="svc-summary">
                    <Table.Summary.Cell index={0} colSpan={2}>
                      <b>TongTien ({items.length} mục)</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2} align="right">
                      <b className="total-sum">{fmt(total)}</b>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                )}
              />

              {/* TongTien HoaDon */}
              <div className="total-box">
                <span className="total-label">TongTien (HoaDon)</span>
                <span className="total-amount">{fmt(selHD?.TongTien ?? total)}</span>
              </div>

              <Divider style={{ margin: "14px 0 10px" }} />

              {/* Phương thức */}
              <div className="method-label">Phương thức thanh toán</div>
              <div className="method-btns">
                {Object.entries(METHOD_MAP).map(([key, val]) => (
                  <button key={key}
                    className={`method-btn${method === key ? " active" : ""}`}
                    onClick={() => setMethod(key)}>
                    {val.icon} {val.label}
                  </button>
                ))}
              </div>

              {/* Actions */}
              <div className="action-row">
                <Button icon={<PrinterOutlined />} size="large" className="print-btn"
                  onClick={() => setPrintModal(true)}>
                  In hóa đơn
                </Button>
                <Button type="primary" icon={<CheckCircleOutlined />} size="large"
                  className="pay-btn" disabled={!method} onClick={handlePay}>
                  Xác nhận thanh toán
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="pay-card empty-right">
              <div className="empty-state">
                <DollarOutlined className="empty-icon" />
                <p>Chọn phiếu khám để xem chi phí và thanh toán</p>
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* ── Modal in hóa đơn ── */}
      <Modal
        open={printModal}
        onCancel={() => setPrintModal(false)}
        title={<span><PrinterOutlined /> Xem trước Hóa đơn</span>}
        width={520}
        className="print-modal"
        footer={
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
            <Button onClick={() => setPrintModal(false)}>Đóng</Button>
            <Button type="primary" icon={<PrinterOutlined />}
              onClick={() => { message.success("Đang in hóa đơn..."); setPrintModal(false); }}>
              In ngay
            </Button>
          </div>
        }>
        {selected && (
          <div className="invoice-preview">
            <div className="inv-clinic">Phòng khám đa khoa</div>
            <div className="inv-title">Hóa đơn khám bệnh</div>
            <div className="inv-meta-box">
              <div><b>Bệnh nhân:</b> {patient?.HoTen} ({patient?.GioiTinh ? "Nam" : "Nữ"})</div>
              <div><b>Bác sĩ:</b> {selected.BacSi}</div>
              <div><b>Chẩn đoán:</b> {selected.ChuanDoan}</div>
              <div><b>Số BHYT:</b> {patient?.SoBHYT}</div>
              <div><b>Ngày khám:</b> {fmtDate(selected.NgayKham)}</div>
            </div>
            <Divider style={{ margin: "10px 0" }} />
            <table className="inv-table">
              <thead><tr><th>Dịch vụ / Thuốc</th><th>Loại</th><th>Đơn giá</th></tr></thead>
              <tbody>
                {items.map((s) => (
                  <tr key={s.key}>
                    <td>{s.label}</td>
                    <td><Tag color={LOAI_COLOR[s.loai]} style={{ fontSize: 11 }}>{LOAI_LABEL[s.loai]}</Tag></td>
                    <td className="inv-price">{fmt(s.price)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Divider style={{ margin: "10px 0" }} />
            <div className="inv-total">
              <span>TỔNG CỘNG</span>
              <span className="inv-total-num">{fmt(selHD?.TongTien ?? total)}</span>
            </div>
            <Divider style={{ margin: "10px 0" }} />
            <div className="toa-title">Toa thuốc</div>
            <div className="toa-list">
              {selected.donThuoc.chiTiet.map((ct) => {
                const t = DANH_MUC_THUOC.find((x) => x.MaThuoc === ct.MaThuoc);
                if (!t) return null;
                return (
                  <div key={ct.MaThuoc} className="toa-item">
                    <div className="toa-name">{t.TenThuoc}</div>
                    <div className="toa-lieu">Liều dùng: {t.LieuDung} · SL: {ct.SoLuong}</div>
                    {t.ChongChiDinh && (
                      <div className="toa-ccd"><WarningOutlined /> Chống chỉ định: {t.ChongChiDinh}</div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="inv-footer">Cảm ơn quý bệnh nhân đã tin tưởng!</div>
          </div>
        )}
      </Modal>
    </div>
  );
}