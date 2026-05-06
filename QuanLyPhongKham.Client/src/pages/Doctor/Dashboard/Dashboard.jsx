import "./dashboard.scss";
import { Link } from "react-router-dom";
import { Button, Card, Col, Progress, Row, Space, Table, Tag } from "antd";
import {
  ExperimentOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  MedicineBoxOutlined,
  RightOutlined,
} from "@ant-design/icons";

const stats = [
  { label: "Bệnh nhân chờ khám", value: 8, meta: "3 ca ưu tiên" },
  { label: "Đã hoàn tất hôm nay", value: 18, meta: "Tăng 12% so với hôm qua" },
  { label: "Đơn thuốc đã kê", value: 14, meta: "2 đơn cần kiểm tra lại" },
  { label: "Yêu cầu dịch vụ", value: 6, meta: "4 xét nghiệm, 2 chẩn đoán hình ảnh" },
];

const quickActions = [
  {
    title: "Ghi thông tin bệnh nhân",
    description: "Cập nhật triệu chứng, chẩn đoán và hướng điều trị.",
    path: "/doctor/patient-info",
    icon: <FileAddOutlined />,
  },
  {
    title: "Xem thông tin bệnh nhân",
    description: "Tra cứu hồ sơ cá nhân và lịch sử khám bệnh.",
    path: "/doctor/patient-view",
    icon: <FileSearchOutlined />,
  },
  {
    title: "Yêu cầu dịch vụ",
    description: "Chỉ định xét nghiệm, X-quang hoặc dịch vụ bổ sung.",
    path: "/doctor/service-request",
    icon: <ExperimentOutlined />,
  },
  {
    title: "Kê thuốc",
    description: "Lập danh sách thuốc, số lượng và liều dùng.",
    path: "/doctor/prescription",
    icon: <MedicineBoxOutlined />,
  },
];

const patients = [
  {
    key: "BN001",
    name: "Nguyễn Văn Hòa",
    time: "08:00",
    reason: "Sốt, ho kéo dài",
    status: "Chờ khám",
  },
  {
    key: "BN002",
    name: "Trần Thị Mai",
    time: "08:30",
    reason: "Tái khám huyết áp",
    status: "Đang khám",
  },
  {
    key: "BN003",
    name: "Lê Quốc Bảo",
    time: "09:00",
    reason: "Đau dạ dày",
    status: "Chờ kết quả",
  },
];

const columns = [
  { title: "Bệnh nhân", dataIndex: "name", key: "name" },
  { title: "Giờ khám", dataIndex: "time", key: "time", width: 110 },
  { title: "Lý do khám", dataIndex: "reason", key: "reason" },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <Tag color={status === "Đang khám" ? "processing" : "blue"}>{status}</Tag>
    ),
  },
];

export default function Dashboard() {
  return (
    <div className="doctor-page doctor-dashboard">
      <div className="doctor-page__header">
        <div>
          <h1>Màn hình chính Bác sĩ</h1>
          <p>
            Theo dõi danh sách khám trong ngày và truy cập nhanh các nghiệp vụ
            ghi thông tin bệnh nhân, yêu cầu dịch vụ, kê thuốc.
          </p>
        </div>
        <Button type="primary" size="large">
          Bắt đầu ca khám
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.label}>
            <Card className="doctor-card doctor-stat">
              <div className="doctor-stat__label">{item.label}</div>
              <div className="doctor-stat__value">{item.value}</div>
              <div className="doctor-stat__meta">{item.meta}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} className="dashboard-main">
        <Col xs={24} xl={16}>
          <Card title="Danh sách bệnh nhân hôm nay" className="doctor-card">
            <Table
              className="doctor-table"
              columns={columns}
              dataSource={patients}
              pagination={false}
              scroll={{ x: 720 }}
            />
          </Card>
        </Col>
        <Col xs={24} xl={8}>
          <Card title="Tiến độ ca khám" className="doctor-card">
            <Space direction="vertical" size={18} className="progress-block">
              <Progress percent={68} status="active" />
              <div className="progress-note">
                18/26 lượt khám đã hoàn tất. Còn 8 bệnh nhân trong hàng chờ.
              </div>
              <div className="shift-info">
                <span>Ca làm việc</span>
                <strong>07:30 - 11:30</strong>
              </div>
              <div className="shift-info">
                <span>Phòng khám</span>
                <strong>Phòng Nội tổng quát 02</strong>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {quickActions.map((action) => (
          <Col xs={24} md={12} xl={6} key={action.title}>
            <Link to={action.path} className="action-card">
              <span className="action-card__icon">{action.icon}</span>
              <strong>{action.title}</strong>
              <p>{action.description}</p>
              <span className="action-card__link">
                Mở chức năng <RightOutlined />
              </span>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}
