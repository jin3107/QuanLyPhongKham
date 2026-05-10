import "./servicerequest.scss";
import {
  Alert,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";

const serviceOptions = [
  { value: "Xét nghiệm nước tiểu" },
  { value: "Xét nghiệm máu" },
  { value: "X-quang" },
  { value: "Siêu âm" },
  { value: "Điện tim" },
  { value: "Tiêm chủng" },
];

const requests = [
  {
    key: "DV001",
    patient: "Nguyễn Văn Hòa",
    services: "Xét nghiệm máu",
    status: "Đã gửi yêu cầu",
  },
  {
    key: "DV002",
    patient: "Trần Thị Mai",
    services: "Điện tim, Siêu âm",
    status: "Đã gửi yêu cầu",
  },
  {
    key: "DV003",
    patient: "Lê Quốc Bảo",
    services: "X-quang",
    status: "Đã gửi yêu cầu",
  },
];

const columns = [
  { title: "Bệnh nhân", dataIndex: "patient", key: "patient" },
  { title: "Dịch vụ", dataIndex: "services", key: "services" },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    render: (status) => <Tag color="processing">{status}</Tag>,
  },
  {/*
    title: "Giá",
    dataIndex: "price",
    key: "price",
    render: (price) => price ? `${price} đ` : "Đang tính",
  */}
];

export default function ServiceRequest() {
  return (
    <div className="doctor-service-request-page">
      <div className="doctor-page-header">
        <div>
          <p>
            Chỉ định dịch vụ bổ sung như xét nghiệm, X-quang, siêu âm hoặc tiêm
            chủng cho bệnh nhân đang khám.
          </p>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={9}>
          <Card title="Yêu cầu dịch vụ mới" className="doctor-card">
            <Alert
              className="request-alert"
              type="info"
              showIcon
              message="Yêu cầu sẽ được chuyển đến bộ phận thực hiện dịch vụ và cập nhật vào hồ sơ khám."
            />

            <Form
              className="doctor-form"
              layout="vertical"
              initialValues={{
                patient: "BN002",
                priority: "normal",
                services: ["blood", "ecg"],
              }}
            >
              <div className="note-group">
                <label>Tên bệnh nhân</label>
                <Select
                  showSearch
                  options={[
                    { value: "Nguyễn Văn Hòa" },
                    { value: "Trần Thị Mai" },
                    { value: "Lê Quốc Bảo" },
                  ]}
                  />
              </div>
              <div className="note-group">
                <label>Loại dịch vụ</label>
                <Select
                  showSearch
                  options={serviceOptions}
                  />
              </div>
              <Space wrap>
                <Button type="primary">Gửi yêu cầu</Button>
                <Button>Xóa</Button>
              </Space>
            </Form>
          </Card>
        </Col>

        <Col xs={24} xl={15}>
          <Card title="Yêu cầu dịch vụ trong ngày" className="doctor-card">
            <Table
              className="doctor-table"
              columns={columns}
              dataSource={requests}
              pagination={false}
              scroll={{ x: 720 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
