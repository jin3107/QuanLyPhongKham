import "./reschedule.scss";
import { Form, Input, DatePicker, Select, Button, Table, Tag, Row, Col, Card } from "antd";
import { CheckCircleFilled, ExclamationCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function Reschedule() {
	const [form] = Form.useForm();

const columns = [
  { title: "Ngày", dataIndex: "date", key: "date" },
  { title: "Giờ", dataIndex: "time", key: "time" },
  { title: "Bác sĩ", dataIndex: "doctor", key: "doctor" },
  { title: "Khoa", dataIndex: "department", key: "department" },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (s) =>
      s === "confirmed" ? (
        <Tag color="blue">Đã xác nhận</Tag>
      ) : (
        <Tag color="orange">Đang chờ</Tag>
      ),
  },
];

	const data = [
		{
			key: 1,
			code: "LK-2024-001",
			department: "Nội tổng quát",
			doctor: "BS. Nguyễn Huy Hoàng",
			date: "05-01-2025",
			time: "09:00",
			status: "confirmed",
		},
		{
			key: 2,
			code: "LK-2024-002",
			department: "Nhi",
			doctor: "BS. Lê Thảo Vy",
			date: "05-02-2025",
			time: "10:00",
			status: "confirmed",
		},
	];

	return (
		<div className="reschedule-page">
			{/* <header className="reschedule-header">
				<div>
					<h1 className="reschedule-title">Đổi Lịch Khám</h1>
					<p className="reschedule-subtitle">
						Dễ dàng đổi lịch khám sang ngày, giờ, hoặc bác sĩ khác phù hợp với bạn.
					</p>
				</div>
				<div className="reschedule-actions">
					<Button className="reschedule-btn" type="primary">
						Quay lại danh sách lịch
					</Button>
				</div>
			</header> */}

			<Row gutter={16}>
				{/* FORM */}
				<Col xs={24} lg={12}>
					<div className="reschedule-card">
						<h2 className="reschedule-card-title">Thông tin đổi lịch</h2>

						<Form form={form} layout="vertical" autoComplete="off">
							{/* CURRENT APPOINTMENT */}
							<div className="form-section">
						{/* NOTICE */}
						<div className="notice-box">
							<div className="notice-title">
								<ExclamationCircleOutlined /> Lưu ý quan trọng
							</div>
							<div className="notice-text">
								Bạn chỉ có thể đổi lịch khám trước 5 giờ khám.
							</div>
						</div>

								<h3 className="form-section-title">Lịch khám hiện tại</h3>

								<Row gutter={16}>
									<Col xs={24}>
										<Form.Item
											label="Chọn lịch khám cần đổi"
											name="currentAppointment"
											rules={[
												{
													required: true,
													message: "Vui lòng chọn lịch khám",
												},
											]}
										>
											<Select placeholder="Chọn lịch khám">
												<Option value="lk1">
													LK-2024-001 - Nội tổng quát - BS. Nguyễn Huy Hoàng - 01/05/2024 09:00
												</Option>
												<Option value="lk2">
													LK-2024-002 - Nhi - BS. Lê Thảo Vy - 02/05/2024 10:00
												</Option>
											</Select>
										</Form.Item>
									</Col>
								</Row>
							</div>

							{/* NEW APPOINTMENT */}
							<div className="form-section">
								<h3 className="form-section-title">Lịch khám mới</h3>

								<Row gutter={16}>
									<Col xs={24} sm={12}>
										<Form.Item
											label="Khoa/Chuyên khoa"
											name="department"
											rules={[
												{
													required: true,
													message: "Vui lòng chọn khoa",
												},
											]}
										>
											<Select placeholder="Chọn khoa">
												<Option value="than_kinh">Thần kinh</Option>
												<Option value="nhi">Nhi</Option>
												<Option value="noi">Nội tổng quát</Option>
												<Option value="tim_mach">Tim mạch</Option>
											</Select>
										</Form.Item>
									</Col>

									<Col xs={24} sm={12}>
										<Form.Item
											label="Ngày khám mới"
											name="newDate"
											rules={[
												{
													required: true,
													message: "Vui lòng chọn ngày khám",
												},
											]}
										>
											<DatePicker style={{ width: "100%" }} />
										</Form.Item>
									</Col>

									<Col xs={24} sm={12}>
										<Form.Item
											label="Bác sĩ"
											name="doctor"
											rules={[
												{
													required: true,
													message: "Vui lòng chọn bác sĩ",
												},
											]}
										>
											<Select placeholder="Chọn bác sĩ">
												<Option value="bs1">BS. Nguyễn Huy Hoàng</Option>
												<Option value="bs2">BS. Lê Thảo Vy</Option>
												<Option value="bs3">BS. Trần Quốc Bảo</Option>
											</Select>
										</Form.Item>
									</Col>

									<Col xs={24} sm={12}>
										<Form.Item
											label="Giờ khám mới"
											name="newTime"
											rules={[
												{
													required: true,
													message: "Vui lòng chọn giờ khám",
												},
											]}
										>
											<Select placeholder="Chọn giờ khám">
												<Option value="08:00">08:00</Option>
												<Option value="09:00">09:00</Option>
												<Option value="10:00">10:00</Option>
											</Select>
										</Form.Item>
									</Col>
								</Row>
							</div>

							<div className="form-actions">
								<Button type="primary" htmlType="submit" className="submit-btn">
									Xác nhận đổi lịch
								</Button>
								<Button type="default" className="reset-btn">
									Xóa
								</Button>
							</div>
						</Form>
					</div>
				</Col>

				{/* SIDEBAR */}
				<Col xs={24} lg={12}>
					{/* CURRENT APPOINTMENTS */}
					<div className="reschedule-card">
						<h3 className="reschedule-card-title">Lịch khám của tôi</h3>
						<Table
							columns={columns}
							dataSource={data}
							pagination={false}
							bordered
							size="small"
							className="reschedule-table"
						/>
					</div>

					{/* NOTES */}
					<div className="reschedule-card reschedule-notes">
						<h3 className="reschedule-card-title">Lưu ý khi đổi lịch</h3>
						<ul className="notes-list">
							<li>Chỉ có thể đổi lịch trước 5 giờ khám</li>
							<li>Lịch mới phải khác với lịch cũ</li>
							<li>Không được đổi lịch quá 2 lần</li>
						</ul>
					</div>
				</Col>
			</Row>
		</div>
	);
}