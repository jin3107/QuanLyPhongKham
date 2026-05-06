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
  { label: "Xét nghiệm máu", value: "blood" },
  { label: "Xét nghiệm nước tiểu", value: "urine" },
  { label: "X-quang", value: "xray" },
  { label: "Siêu âm", value: "ultrasound" },
  { label: "Điện tim", value: "ecg" },
  { label: "Tiêm chủng", value: "vaccine" },
];

const requests = [
  {
    key: "DV001",
    patient: "Nguyễn Văn Hòa",
    services: "Xét nghiệm máu",
    priority: "Thường",
    status: "Chờ thực hiện",
  },
  {
    key: "DV002",
    patient: "Trần Thị Mai",
    services: "Điện tim, Siêu âm",
    priority: "Ưu tiên",
    status: "Đã gửi",
  },
  {
    key: "DV003",
    patient: "Lê Quốc Bảo",
    services: "X-quang",
    priority: "Thường",
    status: "Có kết quả",
  },
];

const columns = [
  { title: "Bệnh nhân", dataIndex: "patient", key: "patient" },
  { title: "Dịch vụ", dataIndex: "services", key: "services" },
  {
    title: "Mức độ",
    dataIndex: "priority",
    key: "priority",
    render: (priority) => (
      <Tag color={priority === "Ưu tiên" ? "red" : "blue"}>{priority}</Tag>
    ),
  },
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
    <div className="doctor-page service-request-page">
      <div className="doctor-page__header">
        <div>
          <h1>Yêu cầu dịch vụ</h1>
          <p>
            Chỉ định dịch vụ bổ sung như xét nghiệm, X-quang, siêu âm hoặc tiêm
            chủng cho bệnh nhân đang khám.
          </p>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={10}>
          <Card title="Tạo yêu cầu mới" className="doctor-card">
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
              <Form.Item label="Bệnh nhân" name="patient">
                <Select
                  options={[
                    { value: "BN001", label: "Nguyễn Văn Hòa" },
                    { value: "BN002", label: "Trần Thị Mai" },
                    { value: "BN003", label: "Lê Quốc Bảo" },
                  ]}
                />
              </Form.Item>
              <Form.Item label="Dịch vụ chỉ định" name="services">
                <Checkbox.Group options={serviceOptions} />
              </Form.Item>
              {<Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Mức độ ưu tiên" name="priority">
                    <Select
                      options={[
                        { value: "normal", label: "Thường" },
                        { value: "urgent", label: "Ưu tiên" },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label="Ngày thực hiện" name="date">
                    <DatePicker className="full-width" format="DD/MM/YYYY" />
                  </Form.Item>
                </Col>
              </Row>}
              <Form.Item label="Lý do chỉ định" name="reason">
                <Input.TextArea
                  rows={4}
                  placeholder="Nhập dấu hiệu lâm sàng hoặc mục tiêu cần kiểm tra"
                />
              </Form.Item>
              <Space wrap>
                <Button type="primary">Gửi yêu cầu</Button>
                <Button>Lưu nháp</Button>
              </Space>
            </Form>
          </Card>
        </Col>

        <Col xs={24} xl={14}>
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
