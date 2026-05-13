import "./workingschedule.scss";
import { useState } from "react";
import { Table, Button, DatePicker, Select, Card } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  EditOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import dayjs from "dayjs";

const { Option } = Select;

const doctors = [
  { MaBS: "BS01", HoTen: "Nguyễn Văn An", ChuyenKhoa: "Nội tổng quát" },
  { MaBS: "BS02", HoTen: "Trần Thị Bích", ChuyenKhoa: "Nhi khoa" },
  { MaBS: "BS03", HoTen: "Lê Minh Châu", ChuyenKhoa: "Tim mạch" },
  { MaBS: "BS04", HoTen: "Phạm Thị Dung", ChuyenKhoa: "Da liễu" },
];

const doctorOptions = doctors.map((doctor) => ({
  label: `${doctor.HoTen} - ${doctor.ChuyenKhoa}`,
  value: doctor.MaBS,
}));

const INITIAL_SCHEDULE = [
  {
    MaLLV: "LLV001",
    MaBS: "BS01",
    HoTen: "Nguyễn Văn An",
    ChuyenKhoa: "Nội tổng quát",
    NgayLamViec: "2026-05-01",
    GioBatDau: "07:00",
    GioKetThuc: "12:00",
  },
  {
    MaLLV: "LLV002",
    MaBS: "BS02",
    HoTen: "Trần Thị Bích",
    ChuyenKhoa: "Nhi khoa",
    NgayLamViec: "2026-05-02",
    GioBatDau: "13:00",
    GioKetThuc: "17:00",
  },
];

const GIO_OPTIONS = [
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
];

export default function WorkingSchedule() {
  const [schedule] = useState(INITIAL_SCHEDULE);

const columns = [
  {
    title: "NGÀY",
    dataIndex: "NgayLamViec",
    render: (v) => dayjs(v).format("DD/MM/YYYY"),
  },
  {
    title: "GIỜ BẮT ĐẦU",
    dataIndex: "GioBatDau",
  },
  {
    title: "GIỜ KẾT THÚC",
    dataIndex: "GioKetThuc",
  },
  {
    title: "BÁC SĨ",
    dataIndex: "HoTen",
  },
  {
    title: "KHOA",
    dataIndex: "ChuyenKhoa",
  },
{
  title: "THAO TÁC",
  align: "center",
  render: () => (
    <div className="action-buttons">
      <Button
        type="text"
        icon={<EditOutlined />}
        className="edit-btn"
      />

      <Button
        type="text"
        danger
        icon={<DeleteOutlined />}
        className="delete-btn"
      />
    </div>
  ),
}
];

  return (
    <div className="workingschedule-page">
      <Card className="assign-card" variant="borderless">
        <div className="section-label">
          <PlusOutlined /> Phân công lịch làm việc mới
        </div>

        <div className="assign-form">
          <div className="form-group">
            <label>Ngày làm việc</label>

            <DatePicker
              format="DD/MM/YYYY"
              placeholder="Chọn ngày"
              style={{ width: "100%" }}
            />
          </div>

          <div className="form-group">
            <label>Bác sĩ</label>

            <Select
              showSearch
              placeholder="Chọn bác sĩ"
              options={doctorOptions}
              optionFilterProp="label"
              style={{ width: "100%" }}
            />
          </div>

          <div className="form-group">
            <label>Giờ bắt đầu</label>

            <Select
              placeholder="Giờ bắt đầu"
              style={{ width: "100%" }}
            >
              {GIO_OPTIONS.map((h) => (
                <Option key={h} value={h}>
                  {h}
                </Option>
              ))}
            </Select>
          </div>

          <div className="form-group">
            <label>Giờ kết thúc</label>

            <Select
              placeholder="Giờ kết thúc"
              style={{ width: "100%" }}
            >
              {GIO_OPTIONS.map((h) => (
                <Option key={h} value={h}>
                  {h}
                </Option>
              ))}
            </Select>
          </div>

          <div className="form-group form-group--btn">
            <label>&nbsp;</label>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              block
              className="assign-btn"
            >
              Xác nhận phân công
            </Button>
          </div>
        </div>
      </Card>

      <Card className="table-card" variant="borderless">
        <div className="table-title">
          <CalendarOutlined /> Danh sách lịch làm việc
        </div>

        <Table
          columns={columns}
          dataSource={schedule}
          rowKey="MaLLV"
          size="medium"
          pagination={{
            pageSize: 8,
            showSizeChanger: false,
          }}
          className="clean-table"
        />
      </Card>
    </div>
  );
}