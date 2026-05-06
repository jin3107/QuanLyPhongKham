import "./scheduleView.scss";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  DatePicker,
  Button,
  Table,
  Tag,
  Space,
  Input,
  Modal,
  message,
} from "antd";
import {
  SearchOutlined,
  CalendarOutlined,
  CloseCircleOutlined,
  SwapRightOutlined,
} from "@ant-design/icons";

const { Search } = Input;

const initialAppointments = [
  {
    key: 1,
    date: "2026-05-08",
    time: "08:30",
    doctor: "BS. Trần Thị B",
    service: "Khám tổng quát",
    room: "Phòng 302",
    status: "Chờ xác nhận",
  },
  {
    key: 2,
    date: "2026-05-10",
    time: "09:15",
    doctor: "BS. Nguyễn Văn D",
    service: "Khám tai mũi họng",
    room: "Phòng 204",
    status: "Đã xác nhận",
  },
  {
    key: 3,
    date: "2026-05-12",
    time: "10:45",
    doctor: "BS. Lê Thị H",
    service: "Khám da liễu",
    room: "Phòng 110",
    status: "Chờ xác nhận",
  },
];

const statusColor = {
  "Chờ xác nhận": "gold",
  "Đã xác nhận": "success",
  "Đã hủy": "error",
};

export default function ScheduleView() {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [filterText, setFilterText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const handleCancelAppointment = (appointment) => {
    Modal.confirm({
      title: "Xác nhận huỷ lịch",
      content: `Bạn có chắc chắn muốn huỷ lịch khám ngày ${appointment.date} lúc ${appointment.time}?`,
      okText: "Huỷ",
      cancelText: "Đóng",
      okType: "danger",
      onOk: () => {
        setAppointments((prev) =>
          prev.map((item) =>
            item.key === appointment.key
              ? { ...item, status: "Đã hủy" }
              : item
          )
        );
        message.success("Lịch khám đã được huỷ.");
      },
    });
  };

  const handleReschedule = (appointment) => {
    navigate("/reschedule", { state: { appointment } });
  };

  const filteredSchedule = useMemo(() => {
    const text = filterText.toLowerCase();
    return appointments.filter((item) => {
      const matchText =
        item.doctor.toLowerCase().includes(text) ||
        item.service.toLowerCase().includes(text) ||
        item.room.toLowerCase().includes(text);
      const matchDate = selectedDate
        ? item.date === selectedDate.format("YYYY-MM-DD")
        : true;
      return matchText && matchDate;
    });
  }, [appointments, filterText, selectedDate]);

  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: 140,
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      width: 100,
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Dịch vụ",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Phòng",
      dataIndex: "room",
      key: "room",
      width: 120,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={statusColor[status] || "default"}>{status}</Tag>,
      width: 140,
    },
    {
      title: "Thao tác",
      key: "actions",
      width: 220,
      render: (_, record) => (
        <Space wrap>
          <Button
            danger
            type="text"
            icon={<CloseCircleOutlined />}
            onClick={() => handleCancelAppointment(record)}
            disabled={record.status === "Đã hủy"}
          >
            Huỷ
          </Button>
          <Button
            type="primary"
            icon={<SwapRightOutlined />}
            onClick={() => handleReschedule(record)}
            disabled={record.status === "Đã hủy"}
          >
            Đổi lịch
          </Button>
        </Space>
      ),
    },
  ];

  const upcomingCount = appointments.filter(
    (item) => item.status !== "Đã hủy"
  ).length;
  const nextAppointment = appointments.find(
    (item) => item.status !== "Đã hủy"
  );

  return (
    <div className="scheduleView">
      <div className="pageHeader">
        <div>
          <h2>Lịch khám của bạn</h2>
          <p>Xem lịch hẹn, huỷ lịch hoặc đổi lịch khám ngay tại đây.</p>
        </div>
      </div>

      <Row gutter={[20, 20]} className="summaryRow">
        <Col xs={24} sm={12} md={8}>
          <Card className="metricCard">
            <div className="metricTitle">Lịch sắp tới</div>
            <div className="metricValue">{upcomingCount}</div>
            <div className="metricNote">Số lịch chưa huỷ của bạn</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="metricCard">
            <div className="metricTitle">Lịch tiếp theo</div>
            <div className="metricValue">
              {nextAppointment ? `${nextAppointment.date} • ${nextAppointment.time}` : "Không có"}
            </div>
            <div className="metricNote">Bác sĩ: {nextAppointment?.doctor || "-"}</div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="metricCard">
            <div className="metricTitle">Trạng thái hiện tại</div>
            <div className="metricValue">
              {nextAppointment ? nextAppointment.status : "Đang chờ"}
            </div>
            <div className="metricNote">Quản lý lịch hẹn dễ dàng</div>
          </Card>
        </Col>
      </Row>

      <Card className="controlCard" bordered={false}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Space direction="vertical" size={8}>
              <span className="controlLabel">Chọn ngày</span>
              <DatePicker
                prefix={<CalendarOutlined />}
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                style={{ width: "100%" }}
              />
            </Space>
          </Col>
          <Col xs={24} md={10}>
            <Search
              placeholder="Tìm kiếm bác sĩ, dịch vụ hoặc phòng"
              allowClear
              enterButton={<SearchOutlined />}
              size="middle"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </Col>
          <Col xs={24} md={6}>
            <div className="actionStatus">
              <Tag color="success">Đã xác nhận</Tag>
              <Tag color="gold">Chờ xác nhận</Tag>
              <Tag color="error">Đã huỷ</Tag>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="tableCard" bordered={false}>
        <div className="tableHeader">
          <div>
            <h3>Lịch khám của bạn</h3>
            <p>Huỷ hoặc đổi lịch khám nhanh chóng mà không cần gọi phòng khám.</p>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredSchedule}
          pagination={{ pageSize: 5 }}
          rowClassName={() => "scheduleRow"}
          locale={{ emptyText: "Không có lịch khám phù hợp." }}
        />
      </Card>
    </div>
  );
}
