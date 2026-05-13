import "../admin.scss";
import "./dashboard.scss";
import {
  Button,
  Card,
  Col,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
} from "antd";

const { Title, Text } = Typography;

const metricCards = [
  {
    title: "Lịch hẹn hôm nay",
    value: 45,
  },
  {
    title: "Bệnh nhân chờ khám",
    value: 18,
  },
  {
    title: "Tổng doanh thu",
    value: "86.500.000đ",
  },
];

const schedules = [
  {
    title: "Phòng Nội tổng quát",
    description: ["Phạm Thu Hà", "Nguyễn Văn An"],
    status: "Đang trực",
    color: "success",
  },
  {
    title: "Phòng Tim mạch",
    description: ["Trần Minh Châu", "Nguyễn Hoàng Vy"],
    status: "Đang trực",
    color: "success",
  },
  {
    title: "Phòng Nhi",
    description: ["Nguyễn Tuấn Anh", "Lê Thảo Vy"],
    status: "Đang trực",
    color: "success",
  },
];

const doctorColumns = [
  { title: "Bác sĩ", dataIndex: "doctor", key: "doctor" },
  { title: "Chuyên khoa", dataIndex: "department", key: "department" },
  { title: "Lượt khám", dataIndex: "visits", key: "visits" },
];

const topDoctors = [
  {
    key: "BS001",
    doctor: "Nguyễn Huy Hoàng",
    department: "Nội tổng quát",
    visits: 18,
  },
  {
    key: "BS005",
    doctor: "Lê Thảo Vy",
    department: "Nhi",
    visits: 15,
  },
  {
    key: "BS011",
    doctor: "Trần Quốc Bảo",
    department: "Tim mạch",
    visits: 12,
  },
];

export default function Dashboard() {
  return (
    <div className="admin-page admin-dashboard-page">
      <header className="admin-header">
        <div>
          <Text type="secondary" className="admin-subtitle">
            Tổng quan nhanh tình hình hoạt động phòng khám hôm nay.
          </Text>
        </div>
        <Space wrap>
          <Button type="primary">Tạo báo cáo</Button>
        </Space>
      </header>

<Row gutter={[10, 0]}>
  {metricCards.map((item) => (
    <Col key={item.title} xs={24} md={8}>
      <Card className="metric-card">
        <Statistic title={item.title} value={item.value} />
      </Card>
    </Col>
  ))}
</Row>

      <Row className="admin-section" gutter={[16, 16]}>
        <Col xs={24} lg={11}>
          <Card
            title="Lịch làm việc gần đây"
            extra={<Tag color="processing">Trong ngày</Tag>}
          >
            <div className="admin-list">
              {schedules.map((item) => (
                <div className="admin-list-item" key={item.title}>
                  <div className="info">
                    <h4>{item.title}</h4>

                    <div className="doctor-list">
                      {item.description.map((doctor) => (
                        <p key={doctor}>{doctor}</p>
                      ))}
                    </div>
                  </div>

                  <Tag color={item.color}>{item.status}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={13}>
          <Card title="Top bác sĩ theo lượt khám">
            <Table
              columns={doctorColumns}
              dataSource={topDoctors}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
