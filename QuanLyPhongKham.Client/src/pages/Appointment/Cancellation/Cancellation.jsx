import { useState } from "react";
import "./cancellation.scss";
import doctorImage from "../../../assets/image/doctor.jpg";
import { Table, Tag, Row, Col, Button, Popconfirm, message, Typography, Card, Steps } from "antd";
import { 
  ExclamationCircleFilled, 
  DeleteOutlined, 
  PhoneOutlined, 
  CheckCircleFilled,
  CreditCardOutlined,
  InfoCircleOutlined
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function Cancellation() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const features = [
    "Lưu ý: Chỉ có thể hủy lịch trước giờ khám ít nhất 5 tiếng.",
    "Gợi ý: Bạn có thể đổi lịch thay vì hủy để giữ quyền lợi và tránh mất phí.",
    "Hỗ trợ: Liên hệ hotline nếu gặp vấn đề về thủ tục hoàn phí."
  ];

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
    { key: 1, code: "LK-001", department: "Nội tổng quát", doctor: "BS. Nguyễn Huy Hoàng", date: "05-01-2025", time: "09:00", status: "confirmed" },
    { key: 2, code: "LK-002", department: "Nhi", doctor: "BS. Lê Thảo Vy", date: "05-02-2026", time: "10:00", status: "" },
  ];

  const handleCancel = () => {
    message.success(`Đã gửi yêu cầu hủy cho ${selectedRowKeys.length} lịch khám.`);
    setSelectedRowKeys([]);
  };

  return (
    <div className="cancellation-page">
      {/* ========== SECTION 1: BANNER HỦY LỊCH ========== */}
      <section className="cancellation-banner">
        <div className="banner-content">
          <div className="banner-left">
            <h1>Lưu ý quan trọng khi hủy lịch</h1>
            <ul className="banner-features">
              {features.map((item, index) => (
                <li key={index}>
                  <CheckCircleFilled className="banner-icon" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="banner-actions">
               <Button type="primary" size="large" className="banner-btn" icon={<PhoneOutlined />}>
                  Hotline: 0123 456 789
               </Button>
            </div>
          </div>
          <div className="banner-right">
            <img src={doctorImage} alt="Minh họa bệnh viện" loading="eager" decoding="async" />
          </div>
        </div>
      </section>

      <div className="main-container">
        <Row gutter={[24, 24]}>
          {/* ========== SECTION 2: HƯỚNG DẪN (BÊN TRÁI) ========== */}
          <Col xs={24} lg={8}>
            <Card className="instruction-card" title={<span><InfoCircleOutlined /> Hướng dẫn thao tác</span>}>
              <Steps
                direction="vertical"
                size="small"
                current={selectedRowKeys.length > 0 ? 1 : 0}
                items={[
                  { title: 'Chọn lịch cần hủy', description: 'Tích vào ô bên phải danh sách.' },
                  { title: 'Xác nhận yêu cầu', description: 'Nhấn nút hủy sáng mờ trên bảng.' },
                  { title: 'Chờ xử lý', description: 'Hệ thống sẽ duyệt yêu cầu tự động.' },
                ]}
              />
            </Card>
          </Col>

          {/* ========== SECTION 3: TABLE (BÊN PHẢI) ========== */}
          <Col xs={24} lg={16}>
            <div className="table-container-card">
              <div className="table-header">
                <Title level={4}>Danh sách đặt lịch của bạn</Title>
                
                <Popconfirm title="Xác nhận hủy các lịch đã chọn?" onConfirm={handleCancel}>
                  <Button 
                    type="primary" 
                    danger 
                    disabled={!selectedRowKeys.length}
                    className={`glass-button ${selectedRowKeys.length > 0 ? 'active' : ''}`}
                    icon={<DeleteOutlined />}
                  >
                    Xác nhận hủy {selectedRowKeys.length > 0 && `(${selectedRowKeys.length})`}
                  </Button>
                </Popconfirm>
              </div>

              <Table
                rowSelection={{
                  type: "checkbox",
                  selectedRowKeys,
                  onChange: setSelectedRowKeys,
                  columnPosition: 'right', // Checkbox bên phải
                }}
                columns={columns}
                dataSource={data}
                pagination={false}
                className="custom-table"
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}



// import { Table, Button, Tag, Card, message, Popconfirm } from "antd";
// import { useState } from "react";

// export default function Cancellation() {
//   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

//   const columns = [
//     { title: "Mã lịch", dataIndex: "code" },
//     { title: "Khoa", dataIndex: "department" },
//     { title: "Bác sĩ", dataIndex: "doctor" },
//     { title: "Ngày", dataIndex: "date" },
//     { title: "Giờ", dataIndex: "time" },
//     {
//       title: "Trạng thái",
//       dataIndex: "status",
//       render: (s) =>
//         s === "confirmed" ? (
//           <Tag color="blue">Đã xác nhận</Tag>
//         ) : (
//           <Tag color="orange">Đang chờ</Tag>
//         ),
//     },
//   ];

//   const data = [
//     {
//       key: 1,
//       code: "LK-2024-001",
//       department: "Nội tổng quát",
//       doctor: "BS. Nguyễn Huy Hoàng",
//       date: "01/05/2024",
//       time: "09:00",
//       status: "confirmed",
//     },
//     {
//       key: 2,
//       code: "LK-2024-002",
//       department: "Nhi",
//       doctor: "BS. Lê Thảo Vy",
//       date: "02/05/2024",
//       time: "10:00",
//       status: "confirmed",
//     },
//   ];

//   const handleCancel = () => {
//     if (selectedRowKeys.length === 0) {
//       message.warning("Vui lòng chọn lịch cần hủy");
//       return;
//     }

//     message.success("Hủy lịch thành công!");
//   };

//   return (
//     <div className="cancel-page">
//       <Card className="cancel-card">
//         <div className="header">
//           <h2>Lịch khám của tôi</h2>

//           <Popconfirm
//             title="Bạn chắc chắn muốn hủy lịch này?"
//             onConfirm={handleCancel}
//           >
//             <Button type="primary" danger disabled={!selectedRowKeys.length}>
//               Xác nhận hủy
//             </Button>
//           </Popconfirm>
//         </div>

//         <Table
//           rowSelection={{
//             type: "checkbox",
//             selectedRowKeys,
//             onChange: setSelectedRowKeys,
//           }}
//           columns={columns}
//           dataSource={data}
//           pagination={false}
//           className="cancel-table"
//         />
//       </Card>
//     </div>
//   );
// }















// import "./cancellation.scss";
// import { Form, Input, Select, Button, Table, Tag, Row, Col, Alert } from "antd";
// import { ExclamationCircleOutlined } from "@ant-design/icons";

// const { Option } = Select;

// export default function Cancellation() {
// 	const [form] = Form.useForm();

// 	const columns = [
// 		{ title: "Mã lịch", dataIndex: "code", key: "code" },
// 		{ title: "Khoa", dataIndex: "department", key: "department" },
// 		{ title: "Bác sĩ", dataIndex: "doctor", key: "doctor" },
// 		{ title: "Ngày khám", dataIndex: "date", key: "date" },
// 		{ title: "Giờ khám", dataIndex: "time", key: "time" },
// 		{
// 			title: "Trạng thái",
// 			dataIndex: "status",
// 			key: "status",
// 			render: (s) =>
// 				s === "confirmed" ? (
// 					<Tag color="blue">Đã xác nhận</Tag>
// 				) : (
// 					<Tag color="orange">Đang chờ</Tag>
// 				),
// 		},
// 	];

// 	const data = [
// 		{
// 			key: 1,
// 			code: "LK-2024-001",
// 			department: "Nội tổng quát",
// 			doctor: "BS. Nguyễn Huy Hoàng",
// 			date: "2024-05-01",
// 			time: "09:00",
// 			status: "confirmed",
// 		},
// 		{
// 			key: 2,
// 			code: "LK-2024-002",
// 			department: "Nhi",
// 			doctor: "BS. Lê Thảo Vy",
// 			date: "2024-05-02",
// 			time: "10:00",
// 			status: "confirmed",
// 		},
// 	];

// 	return (
// 		<div className="cancellation-page">

// 			<Row gutter={16}>
// 				{/* FORM */}
// 				<Col xs={24} lg={14}>
// 					<div className="cancellation-card">
// 						<h2 className="cancellation-card-title">Thông tin hủy lịch</h2>

// 						{/* NOTICE */}
// 						<div className="notice-box">
// 							<div className="notice-title">
// 								<ExclamationCircleOutlined /> Lưu ý quan trọng
// 							</div>
// 							<div className="notice-text">
// 								Bạn chỉ có thể hủy lịch khám trước 3 giờ khám. Nếu hủy trong vòng 3 giờ,
// 								bạn sẽ mất phí dịch vụ 50%.
// 							</div>
// 						</div>

// 						<Form form={form} layout="vertical" autoComplete="off">
// 							{/* APPOINTMENT TO CANCEL */}
// 							<div className="form-section">
// 								<h3 className="form-section-title">Chọn lịch khám cần hủy</h3>

// 								<Row gutter={16}>
// 									<Col xs={24}>
// 										<Form.Item
// 											label="Lịch khám"
// 											name="appointmentToCancel"
// 											rules={[
// 												{
// 													required: true,
// 													message: "Vui lòng chọn lịch khám cần hủy",
// 												},
// 											]}
// 										>
// 											<Select placeholder="Chọn lịch khám">
// 												<Option value="lk1">
// 													LK-2024-001 - Nội tổng quát - BS. Nguyễn Huy Hoàng - 01/05/2024
// 													09:00
// 												</Option>
// 												<Option value="lk2">
// 													LK-2024-002 - Nhi - BS. Lê Thảo Vy - 02/05/2024 10:00
// 												</Option>
// 											</Select>
// 										</Form.Item>
// 									</Col>
// 								</Row>
// 							</div>

// 							<div className="form-actions">
// 								<Button
// 									type="primary"
// 									htmlType="submit"
// 									className="submit-btn"
// 									danger
// 								>
// 									Xác nhận hủy lịch
// 								</Button>
// 								<Button type="default" className="cancel-btn">
// 									Bỏ qua
// 								</Button>
// 							</div>
// 						</Form>
// 					</div>
// 				</Col>

// 				{/* SIDEBAR */}
// 				<Col xs={24} lg={10}>
// 					{/* MY APPOINTMENTS */}
// 					<div className="cancellation-card">
// 						<h3 className="cancellation-card-title">Lịch khám của tôi</h3>
// 						<Table
// 							columns={columns}
// 							dataSource={data}
// 							pagination={false}
// 							size="small"
// 							className="cancellation-table"
// 						/>
// 					</div>

// 					{/* POLICY */}
// 					<div className="cancellation-card cancellation-notes">
// 						<h3 className="cancellation-card-title">Chính sách hủy lịch</h3>
// 						<ul className="notes-list">
// 							<li>Hủy trước 3 giờ: Được hoàn 100% phí dịch vụ</li>
// 							<li>Hủy trong 3 giờ: Mất 50% phí dịch vụ</li>
// 							<li>Không hủy mà vắng mặt: Mất 100% phí dịch vụ</li>
// 							<li>Hoàn tiền trong 7 ngày làm việc</li>
// 						</ul>
// 					</div>
// 				</Col>
// 			</Row>
// 		</div>
// 	);
// }



