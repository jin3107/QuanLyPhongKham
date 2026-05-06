import "./workingschedule.scss";
import { useState } from "react";
import {
  Table, Button, DatePicker, Select, message, Tag,
  Modal, Card,
} from "antd";
import {
  PlusOutlined, CalendarOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

const { Option } = Select;

const DOCTORS = [
  { MaBS: "BS01", HoTen: "Nguyễn Văn An",  ChuyenKhoa: "Nội tổng quát" },
  { MaBS: "BS02", HoTen: "Trần Thị Bích",  ChuyenKhoa: "Nhi khoa"       },
  { MaBS: "BS03", HoTen: "Lê Minh Châu",   ChuyenKhoa: "Tim mạch"       },
  { MaBS: "BS04", HoTen: "Phạm Thị Dung",  ChuyenKhoa: "Da liễu"        },
];

const MAX_SHIFTS_PER_WEEK = 5;

const LEAVE_REQUESTS = [
  { MaBS: "BS02", date: "2026-05-05", reason: "Nghỉ phép năm" },
  { MaBS: "BS03", date: "2026-05-07", reason: "Nghỉ bệnh"     },
];

const INITIAL_SCHEDULE = [
  { MaLLV: "LLV001", MaBS: "BS01", HoTen: "Nguyễn Văn An", NgayLamViec: "2026-05-01", GioBatDau: "07:00", GioKetThuc: "12:00" },
  { MaLLV: "LLV002", MaBS: "BS02", HoTen: "Trần Thị Bích", NgayLamViec: "2026-05-02", GioBatDau: "13:00", GioKetThuc: "17:00" },
  { MaLLV: "LLV003", MaBS: "BS03", HoTen: "Lê Minh Châu",  NgayLamViec: "2026-05-03", GioBatDau: "07:00", GioKetThuc: "12:00" },
];

const GIO_OPTIONS = [
  "07:00","08:00","09:00","10:00","11:00","12:00",
  "13:00","14:00","15:00","16:00","17:00","18:00",
  "19:00","20:00","21:00","22:00",
];

export default function WorkingSchedule() {
  const [schedule,   setSchedule]   = useState(INITIAL_SCHEDULE);
  const [date,       setDate]       = useState(null);
  const [MaBS,       setMaBS]       = useState(null);
  const [gioBatDau,  setGioBatDau]  = useState(null);
  const [gioKetThuc, setGioKetThuc] = useState(null);
  const [leaveModal, setLeaveModal] = useState(null);

  const getWeekShifts = (maBS, d) => {
    const start = dayjs(d).startOf("week");
    const end   = dayjs(d).endOf("week");
    return schedule.filter(
      (s) => s.MaBS === maBS && dayjs(s.NgayLamViec).isBetween(start, end, null, "[]")
    ).length;
  };

  const isOnLeave = (maBS, d) =>
    LEAVE_REQUESTS.find((l) => l.MaBS === maBS && l.date === dayjs(d).format("YYYY-MM-DD"));

  const handleAssign = () => {
    if (!date || !MaBS || !gioBatDau || !gioKetThuc) {
      message.warning("Vui lòng chọn đầy đủ thông tin!"); return;
    }
    const dateStr = date.format("YYYY-MM-DD");
    const doc     = DOCTORS.find((d) => d.MaBS === MaBS);

    const leave = isOnLeave(MaBS, dateStr);
    if (leave) { setLeaveModal({ HoTen: doc.HoTen, date: dateStr, reason: leave.reason }); return; }

    const duplicate = schedule.some(
      (s) => s.MaBS === MaBS && s.NgayLamViec === dateStr && s.GioBatDau === gioBatDau
    );
    if (duplicate) { message.error(`${doc.HoTen} đã có ca ${gioBatDau} ngày ${dateStr}!`); return; }

    const weekCount = getWeekShifts(MaBS, dateStr);
    if (weekCount >= MAX_SHIFTS_PER_WEEK) {
      message.error(`${doc.HoTen} đã đủ ${MAX_SHIFTS_PER_WEEK} ca trong tuần này!`); return;
    }

    const newLLV = {
      MaLLV: `LLV${Date.now()}`, MaBS, HoTen: doc.HoTen,
      NgayLamViec: dateStr, GioBatDau: gioBatDau, GioKetThuc: gioKetThuc,
    };
    setSchedule([...schedule, newLLV]);
    message.success("Phân công thành công!");
    setDate(null); setMaBS(null); setGioBatDau(null); setGioKetThuc(null);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Xác nhận xoá lịch",
      icon: <ExclamationCircleOutlined />,
      content: `Xoá ca ${record.GioBatDau}–${record.GioKetThuc} ngày ${record.NgayLamViec} của ${record.HoTen}?`,
      okText: "Xoá", okType: "danger", cancelText: "Huỷ",
      onOk: () => { setSchedule(schedule.filter((s) => s.MaLLV !== record.MaLLV)); message.success("Đã xoá!"); },
    });
  };

  const columns = [
    {
      title: "NGÀY",
      dataIndex: "NgayLamViec",
      sorter: (a, b) => a.NgayLamViec.localeCompare(b.NgayLamViec),
      render: (v) => dayjs(v).format("DD/MM/YYYY"),
    },
    {
      title: "GIỜ BẮT ĐẦU",
      dataIndex: "GioBatDau",
      render: (v) => (
        <div className="time-cell">
          
          <span>{v}</span>
        </div>
      ),
    },
    {
      title: "GIỜ KẾT THÚC",
      dataIndex: "GioKetThuc",
      render: (v) => (
        <div className="time-cell">
          <span>{v}</span>
        </div>
      ),
    },
    {
      title: "BÁC SĨ",
      dataIndex: "HoTen",
      filters: DOCTORS.map((d) => ({ text: d.HoTen, value: d.HoTen })),
      onFilter: (val, row) => row.HoTen === val,
    },
    {
      title: "THAO TÁC",
      align: "center",
      render: (_, record) => (
        <Button danger size="small" className="del-btn" onClick={() => handleDelete(record)}>
          Xoá
        </Button>
      ),
    },
  ];

  return (
    <div className="workingschedule">
      <div className="ws-body">

        <Card className="assign-card" variant="borderless">
          <div className="section-label">
            <PlusOutlined /> Phân công lịch làm việc mới
          </div>
          <div className="assign-form">
            <div className="form-group">
              <label>NgayLamViec</label>
              <DatePicker
                value={date} onChange={(d) => setDate(d)}
                format="DD/MM/YYYY" placeholder="Chọn ngày"
                disabledDate={(d) => d && d < dayjs().startOf("day")}
                style={{ width: "100%" }}
              />
            </div>
            <div className="form-group">
              <label>Bác sĩ</label>
              <Select value={MaBS} placeholder="Chọn bác sĩ" onChange={(v) => setMaBS(v)} style={{ width: "100%" }}>
                {DOCTORS.map((d) => {
                  const wk   = date ? getWeekShifts(d.MaBS, date) : 0;
                  const full = wk >= MAX_SHIFTS_PER_WEEK;
                  const lv   = date ? isOnLeave(d.MaBS, date.format("YYYY-MM-DD")) : null;
                  return (
                    <Option key={d.MaBS} value={d.MaBS} disabled={full || !!lv}>
                      <div className="doctor-option">
                        <div className="doctor-option-info">
                          <span className="opt-name">{d.HoTen}</span>
                          <span className="opt-spec">{d.ChuyenKhoa}</span>
                        </div>
                        {lv   ? <Tag color="error"   style={{ fontSize: 10 }}>Nghỉ phép</Tag>
                        : full ? <Tag color="warning" style={{ fontSize: 10 }}>Đủ lịch</Tag>
                               : <Tag color="success" style={{ fontSize: 10 }}>{wk}/{MAX_SHIFTS_PER_WEEK} ca</Tag>}
                      </div>
                    </Option>
                  );
                })}
              </Select>
            </div>
            <div className="form-group">
              <label>GioBatDau</label>
              <Select value={gioBatDau} placeholder="Giờ bắt đầu"
                onChange={(v) => { setGioBatDau(v); setGioKetThuc(null); }}
                style={{ width: "100%" }}>
                {GIO_OPTIONS.filter((h) => h < "22:00").map((h) => (
                  <Option key={h} value={h}>{h}</Option>
                ))}
              </Select>
            </div>
            <div className="form-group">
              <label>GioKetThuc</label>
              <Select value={gioKetThuc} placeholder="Giờ kết thúc"
                disabled={!gioBatDau} onChange={(v) => setGioKetThuc(v)}
                style={{ width: "100%" }}>
                {GIO_OPTIONS.filter((h) => !gioBatDau || h > gioBatDau).map((h) => (
                  <Option key={h} value={h}>{h}</Option>
                ))}
              </Select>
            </div>
            <div className="form-group form-group--btn">
              <label>&nbsp;</label>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAssign}
                block className="assign-btn">
                Xác nhận phân công
              </Button>
            </div>
          </div>
        </Card>

        

        <Card className="table-card" variant="borderless">
          <div className="table-title"><CalendarOutlined /> Danh sách lịch làm việc</div>
          <Table
            columns={columns} dataSource={schedule} rowKey="MaLLV"
            size="middle"
            pagination={{ pageSize: 8, showSizeChanger: false, showTotal: (t) => `Tổng ${t} ca` }}
            locale={{ emptyText: "Chưa có lịch phân công nào" }}
            className="clean-table"
          />
        </Card>
      </div>

      <Modal open={!!leaveModal} onCancel={() => setLeaveModal(null)}
        footer={<Button type="primary" onClick={() => setLeaveModal(null)}>Đã hiểu</Button>}
        title={<span style={{ color: "#e63946" }}><ExclamationCircleOutlined /> Không thể phân công</span>}>
        {leaveModal && (
          <div className="leave-modal-body">
            <p><b>{leaveModal.HoTen}</b> đã đăng ký nghỉ vào ngày <b>{dayjs(leaveModal.date).format("DD/MM/YYYY")}</b>.</p>
            <p>Lý do: <i>{leaveModal.reason}</i></p>
            <p>Vui lòng chọn bác sĩ khác hoặc ngày khác.</p>
          </div>
        )}
      </Modal>
    </div>
  );
}