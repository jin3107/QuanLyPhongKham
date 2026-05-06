import "./booking.scss";
import { useRef } from "react";
import { CheckCircleFilled } from "@ant-design/icons";
import hospitalImage from "../../../assets/image/Hospital.jpg";
import doctorImage from "../../../assets/image/doctor.jpg";
import {
	Form,
	Input,
	DatePicker,
	Select,
	Button,
	Card,
	Table,
	Tag,
	Row,
	Col,
	Radio,
	Avatar,
} from "antd";

const { Option } = Select;

export default function Booking() {
	const [form] = Form.useForm();
	const bookingRef = useRef(null);

	const handleScroll = () => {
	console.log("click nè");
	bookingRef.current?.scrollIntoView({
		behavior: "smooth",
    block: "start",
  });
};

	const features = [
		"Đặt khám theo giờ, không cần chờ lấy số thứ tự",
		"Được hoàn phí khám nếu hủy phiếu",
		"Hưởng chính sách hoàn tiền khi đặt online",
	];

	const columns = [
		{ title: "Tên BS", dataIndex: "doctor", key: "doctor" },
		{ title: "Giờ khám", dataIndex: "time", key: "time" },
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (s) =>
				s === "available" ? (
					<Tag color="green">Còn trống</Tag>
				) : (
					<Tag color="red">Đã hết</Tag>
				),
		},
	];

	const data = [
		{ key: 1, doctor: "BS A", time: "08:00", status: "available" },
		{ key: 2, doctor: "BS B", time: "09:00", status: "full" },
    // { key: 3, doctor: "BS C", time: "09:00", status: "full" },
	];

	return (
		<div className="booking-page">
			{/* BANNER */}
			<section className="booking-banner">
				<div className="banner-content">
					<div className="banner-left">
						<h1>ĐẶT KHÁM TẠI CƠ SỞ</h1>
						<ul className="banner-features">
							{features.map((item, index) => (
								<li key={index}>
									<CheckCircleFilled className="banner-icon" />
									{item}
								</li>
							))}
						</ul>
						<Button type="primary" size="large" className="banner-btn" onClick={handleScroll}>
							Đặt khám ngay
						</Button>
					</div>
					<div className="banner-right">
						<img src={hospitalImage} alt="Phòng khám" loading="eager" decoding="async" />
					</div>
				</div>
			</section>

			<Row gutter={16}>
				{/* FORM */}
				<Col xs={24} lg={16}>
					<div className="booking-card" ref={bookingRef}>
						<h2 className="booking-card-title">Nhập thông tin đặt lịch</h2>

						<Form
							form={form}
							layout="vertical"
							autoComplete="off"
						>
							{/* PATIENT INFO */}
							<div className="form-section">
								<h3 className="form-section-title">Thông tin bệnh nhân</h3>

								<Row gutter={16}>
									<Col xs={24} sm={12}>
										<Form.Item
											label="Họ tên"
											name="name"
											rules={[
												{
													required: true,
													message: "Vui lòng nhập họ tên",
												},
											]}
										>
											<Input placeholder="Nhập họ tên" />
										</Form.Item>
									</Col>

									<Col xs={24} sm={12}>
										<Form.Item
											label="Giới tính"
											name="gender"
											rules={[
												{
													required: true,
													message: "Vui lòng chọn giới tính",
												},
											]}
										>
											<Radio.Group>
												<Radio value="male">Nam</Radio>
												<Radio value="female">Nữ</Radio>
											</Radio.Group>
										</Form.Item>
									</Col>

									<Col xs={24} sm={12}>
										<Form.Item
											label="Ngày sinh"
											name="dob"
											rules={[
												{
													required: true,
													message: "Vui lòng chọn ngày sinh",
												},
											]}
										>
											<DatePicker style={{ width: "100%" }} />
										</Form.Item>
									</Col>

									<Col xs={24} sm={12}>
										<Form.Item
											label="Số điện thoại"
											name="phone"
											rules={[
												{
													required: true,
													message: "Vui lòng nhập số điện thoại",
												},
											]}
										>
											<Input placeholder="Nhập số điện thoại" />
										</Form.Item>
									</Col>

									<Col xs={24} sm={12}>
										<Form.Item
											label="CCCD/BHYT"
											name="cccd"
											rules={[
												{
													required: true,
													message: "Vui lòng nhập CCCD/BHYT",
												},
											]}
										>
											<Input placeholder="Nhập CCCD/BHYT" />
										</Form.Item>
									</Col>

									<Col xs={24} sm={12}>
										<Form.Item
											label="Địa chỉ"
											name="address"
											rules={[
												{
													required: true,
													message: "Vui lòng nhập địa chỉ",
												},
											]}
										>
											<Input placeholder="Nhập địa chỉ" />
										</Form.Item>
									</Col>

									<Col xs={24}>
										<Form.Item label="Triệu chứng/Dị ứng" name="symptoms">
											<Input.TextArea
												autoSize={{ minRows: 1, maxRows: 5 }}
												placeholder="Mô tả triệu chứng hoặc dị ứng"
											/>
										</Form.Item>
									</Col>
								</Row>
							</div>

							{/* APPOINTMENT INFO */}
							<div className="form-section">
								<h3 className="form-section-title">Thông tin đặt lịch</h3>

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
											label="Ngày khám"
											name="date"
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
											label="Giờ khám"
											name="time"
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
									Xác nhận đặt lịch
								</Button>
								<Button type="default" className="reset-btn">
									Xóa
								</Button>
							</div>
						</Form>
					</div>
				</Col>

				{/* SIDEBAR */}
				<Col xs={24} lg={8}>
					{/* SCHEDULE TABLE */}
					<div className="booking-card">
						<h3 className="booking-card-title">Lịch khám hôm nay</h3>
						<Table
							columns={columns}
							dataSource={data}
							pagination={false}
							bordered
							size="small"
							className="booking-table"
						/>
					</div>

					{/* NOTES */}
					<div className="booking-card booking-notes">
						<h3 className="booking-card-title">Lưu ý quan trọng</h3>
						<ul className="notes-list">
							<li>Đến trước giờ hẹn 15 phút</li>
							<li>Mang theo CCCD và thẻ BHYT</li>
							<li>Tuân thủ hướng dẫn y tế của cơ sở</li>
						</ul>
					</div>

					{/* DOCTORS */}
					<div className="booking-card">
						<h3 className="booking-card-title">Bác sĩ chuyên khoa</h3>
						<div className="doctors-list">
							<div className="doctor-item">
								<Avatar size={48} src={doctorImage} />
								<div className="doctor-info">
									<div className="doctor-name">BS. Nguyễn Huy Hoàng</div>
									<div className="doctor-dept">Nội tổng quát</div>
								</div>
							</div>
							<div className="doctor-item">
								<Avatar size={48} src={doctorImage} />
								<div className="doctor-info">
									<div className="doctor-name">BS. Lê Thảo Vy</div>
									<div className="doctor-dept">Nhi</div>
								</div>
							</div>
						</div>
					</div>
				</Col>
			</Row>
		</div>
	);
}
