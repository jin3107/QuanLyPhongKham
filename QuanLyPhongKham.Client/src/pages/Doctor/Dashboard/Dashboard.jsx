import "./dashboard.scss";
import { Link } from "react-router-dom";
import { Button, Card, Col, Progress, Row, Space, Table, Tag } from "antd";
import {
  ExperimentOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  MedicineBoxOutlined,
  RightOutlined,
  ExportOutlined,
} from "@ant-design/icons";

const stats = [
  { label: "Bệnh nhân hôm nay", value: 18 },
  { label: "Bệnh nhân chờ khám", value: 10 },
  { label: "Đã khám", value: 8 },
  { label: "Yêu cầu dịch vụ", value: 4 }
];

const quickActions = [
  {
    description: "Cập nhật triệu chứng, chẩn đoán và hướng điều trị.",
    path: "/doctor/patient-info",
    icon: <FileAddOutlined />,
  },
  {
    description: "Tra cứu hồ sơ cá nhân và lịch sử khám bệnh.",
    path: "/doctor/patient-view",
    icon: <FileSearchOutlined />,
  },
  {
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

// lấy aip triệu chứng
const patients = [
  {
    key: "BN001",
    name: "Nguyễn Văn Hòa",
    time: "08:00",
    symptom: "Sốt, ho kéo dài",
    status: "Chờ khám",
  },
  {
    key: "BN002",
    name: "Trần Thị Mai",
    time: "08:30",
    symptom: "Tái khám huyết áp",
    status: "Đang khám",
  },
  {
    key: "BN003",
    name: "Lê Quốc Bảo",
    time: "09:00",
    symptom: "Đau dạ dày",
    status: "Chờ kết quả",
  },
];

const columns = [
  { title: "Bệnh nhân", dataIndex: "name", key: "name" },
  { title: "Giờ khám", dataIndex: "time", key: "time", width: 110 },
  { title: "Triệu chứng", dataIndex: "symptom", key: "symptom" },
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
    <div className="doctor-dashboard-page">
      <div className="doctor-page-header">
        <div>
          <p>
            Theo dõi danh sách khám trong ngày và truy cập nhanh các nghiệp vụ
            ghi thông tin bệnh nhân, yêu cầu dịch vụ, kê thuốc.
          </p>
        </div>
        <Link to="/doctor/patient-info">
          <Button type="primary" size="large">
            Bắt đầu ca khám
          </Button>
        </Link>
      </div>

      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col xs={24} sm={12} xl={6} key={item.label}>
            <Card className="doctor-card doctor-stat">
              <div className="doctor-stat-label">{item.label}</div>
              <div className="doctor-stat-value">{item.value}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} className="dashboard-main">
        <Col xs={24} xl={15}>
          <Card title="Danh sách bệnh nhân hôm nay" className="doctor-card">
            <Table
              className="doctor-table"
              columns={columns}
              dataSource={patients}
              pagination={false}
              size="medium"
              scroll={{ x: 700 }}
            />
          </Card>
        </Col>
        <Col xs={24} xl={9}>
          <Card title="Tiến độ ca khám" className="doctor-card">
            <Space direction="vertical" size={18} className="progress-block">
              <Progress percent={44} status="active" />
              <div className="progress-note">
                8/18 lượt khám đã hoàn tất. Còn 10 bệnh nhân đang chờ.
              </div>
              <div className="shift-info">
                <span>Ca làm việc: 07:30 - 11:30</span>
              </div>
              <div className="shift-info">
                <span>Chuyên khoa: Nội tổng quát</span>
              </div>
            </Space>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        {quickActions.map((action) => (
          <Col xs={24} md={12} xl={6} key={action.title}>
            <Link to={action.path} className="action-card">
              <p>{action.description}</p>
              <span className="action-card-link">
                <ExportOutlined />
              </span>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}



// import "./dashboard.scss";
// import { Link } from "react-router-dom";
// import { Button, Card, Col, Progress, Row, Space, Table, Tag } from "antd";
// import {
//   ExperimentOutlined,
//   FileAddOutlined,
//   FileSearchOutlined,
//   MedicineBoxOutlined,
//   RightOutlined,
//   ExportOutlined,
// } from "@ant-design/icons";

// const stats = [
//   { label: "Bệnh nhân hôm nay", value: 18 },
//   { label: "Bệnh nhân chờ khám", value: 10 },
//   { label: "Đã khám", value: 8 },
//   { label: "Yêu cầu dịch vụ", value: 4 }
// ];

// const quickActions = [
//   {
//     description: "Cập nhật triệu chứng, chẩn đoán và hướng điều trị.",
//     path: "/doctor/patient-info",
//     icon: <FileAddOutlined />,
//   },
//   {
//     description: "Tra cứu hồ sơ cá nhân và lịch sử khám bệnh.",
//     path: "/doctor/patient-view",
//     icon: <FileSearchOutlined />,
//   },
//   {
//     description: "Chỉ định xét nghiệm, X-quang hoặc dịch vụ bổ sung.",
//     path: "/doctor/service-request",
//     icon: <ExperimentOutlined />,
//   },
//   {
//     title: "Kê thuốc",
//     description: "Lập danh sách thuốc, số lượng và liều dùng.",
//     path: "/doctor/prescription",
//     icon: <MedicineBoxOutlined />,
//   },
// ];

// // lấy aip triệu chứng
// const patients = [
//   {
//     key: "BN001",
//     name: "Nguyễn Văn Hòa",
//     time: "08:00",
//     symptom: "Sốt, ho kéo dài",
//     status: "Chờ khám",
//   },
//   {
//     key: "BN002",
//     name: "Trần Thị Mai",
//     time: "08:30",
//     symptom: "Tái khám huyết áp",
//     status: "Đang khám",
//   },
//   {
//     key: "BN003",
//     name: "Lê Quốc Bảo",
//     time: "09:00",
//     symptom: "Đau dạ dày",
//     status: "Chờ kết quả",
//   },
// ];

// const columns = [
//   { title: "Bệnh nhân", dataIndex: "name", key: "name" },
//   { title: "Giờ khám", dataIndex: "time", key: "time", width: 110 },
//   { title: "Triệu chứng", dataIndex: "symptom", key: "symptom" },
//   {
//     title: "Trạng thái",
//     dataIndex: "status",
//     key: "status",
//     render: (status) => (
//       <Tag color={status === "Đang khám" ? "processing" : "blue"}>{status}</Tag>
//     ),
//   },
// ];

// export default function Dashboard() {
//   return (
//     <div className="doctor-page doctor-dashboard">
//       <div className="doctor-page__header">
//         <div>
//           <p>
//             Theo dõi danh sách khám trong ngày và truy cập nhanh các nghiệp vụ
//             ghi thông tin bệnh nhân, yêu cầu dịch vụ, kê thuốc.
//           </p>
//         </div>
//         <Link to="/doctor/patient-info">
//           <Button type="primary" size="large">
//             Bắt đầu ca khám
//           </Button>
//         </Link>
//       </div>

//       <Row gutter={[16, 16]}>
//         {stats.map((item) => (
//           <Col xs={24} sm={12} xl={6} key={item.label}>
//             <Card className="doctor-card doctor-stat">
//               <div className="doctor-stat__label">{item.label}</div>
//               <div className="doctor-stat__value">{item.value}</div>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       <Row gutter={[16, 16]} className="dashboard-main">
//         <Col xs={24} xl={15}>
//           <Card title="Danh sách bệnh nhân hôm nay" className="doctor-card">
//             <Table
//               className="doctor-table"
//               columns={columns}
//               dataSource={patients}
//               pagination={false}
//               size="medium"
//               scroll={{ x: 700 }}
//             />
//           </Card>
//         </Col>
//         <Col xs={24} xl={9}>
//           <Card title="Tiến độ ca khám" className="doctor-card">
//             <Space direction="vertical" size={18} className="progress-block">
//               <Progress percent={44} status="active" />
//               <div className="progress-note">
//                 8/18 lượt khám đã hoàn tất. Còn 10 bệnh nhân đang chờ.
//               </div>
//               <div className="shift-info">
//                 <span>Ca làm việc: 07:30 - 11:30</span>
//               </div>
//               <div className="shift-info">
//                 <span>Chuyên khoa: Nội tổng quát</span>
//               </div>
//             </Space>
//           </Card>
//         </Col>
//       </Row>

//       <Row gutter={[16, 16]}>
//         {quickActions.map((action) => (
//           <Col xs={24} md={12} xl={6} key={action.title}>
//             <Link to={action.path} className="action-card">
//               <p>{action.description}</p>
//               <span className="action-card__link">
//                 <ExportOutlined />
//               </span>
//             </Link>
//           </Col>
//         ))}
//       </Row>
//     </div>
//   );
// }
