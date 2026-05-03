import "../admin.scss";
import "./dashboard.scss";
import { Button, Card, Col, Row, Space, Statistic, Table, Tag, Typography } from "antd";

const { Title, Text } = Typography;

const metricCards = [
	{
		title: "Lịch hẹn hôm nay",
		value: 64,
		note: "Theo bảng lichhens (trạng thái: Đã đặt)",
	},
	{
		title: "Bệnh nhân chờ khám",
		value: 18,
		note: "TrangThaiTiepNhan: Chờ khám",
	},
	{
		title: "Doanh thu tạm tính",
		value: "86.500.000đ",
		note: "Từ hoadons đã thanh toán hôm nay",
	},
];

const schedules = [
	{
		title: "Phòng Nội tổng quát",
		description: "LLV-240428-01 · Phạm Thu Hà · 08:00 - 11:30",
		status: "Đang trực",
		color: "success",
	},
	{
		title: "Phòng Tim mạch",
		description: "LLV-240428-02 · Trần Minh Châu · 09:00 - 12:00",
		status: "Đủ lịch",
		color: "processing",
	},
	{
		title: "Phòng Nhi",
		description: "LLV-240428-03 · Nguyễn Tuấn Anh · 13:00 - 16:30",
		status: "Cần bổ sung",
		color: "warning",
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
		doctor: "BS001 - Nguyễn Huy Hoàng",
		department: "Nội tổng quát",
		visits: 18,
	},
	{
		key: "BS005",
		doctor: "BS005 - Lê Thảo Vy",
		department: "Nhi",
		visits: 15,
	},
	{
		key: "BS011",
		doctor: "BS011 - Trần Quốc Bảo",
		department: "Tim mạch",
		visits: 12,
	},
];

export default function Dashboard() {
	return (
		<div className="admin-page dashboard-page">
			<header className="admin-header">
				<div>
					{/* <Title level={3} className="admin-title">
						Bảng điều khiển
					</Title> */}
					<Text type="secondary" className="admin-subtitle">
						Tổng quan nhanh tình hình hoạt động phòng khám hôm nay.
					</Text>
				</div>
				<Space wrap>
					<Button type="primary">Tạo báo cáo</Button>
					<Button>Xuất dữ liệu</Button>
				</Space>
			</header>

			<Row gutter={[16, 16]}>
				{metricCards.map((item) => (
					<Col key={item.title} xs={24} md={8}>
						<Card>
							<Statistic title={item.title} value={item.value} />
							<Text type="secondary" className="admin-metric-note">
								{item.note}
							</Text>
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
									<div>
										<h4>{item.title}</h4>
										<p>{item.description}</p>
									</div>
									<Tag color={item.color}>{item.status}</Tag>
								</div>
							))}
						</div>
					</Card>
				</Col>

				<Col xs={24} lg={13}>
					<Card title="Top bác sĩ theo lượt khám" extra={<Button type="link">Xem tất cả</Button>}>
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
