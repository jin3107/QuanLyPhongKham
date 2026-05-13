import { Card, Col, DatePicker, Form, Input, Radio, Row, Select, Typography, Button, Space } from "antd";
import { PhoneOutlined, HomeOutlined, CheckCircleOutlined } from "@ant-design/icons";
// import { Link } from "react-router-dom";
import "./medicalrecord.scss";

const { Title, Text } = Typography;
const { Option } = Select;

export default function MedicalRecord() {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("submitted", values);
  };

  return (
    <div className="medical-record-page">
      {/* <div className="medical-record-header">
        <Link to="/doctor/patient-info">
          <Button type="primary" size="large">
            Tạo hồ sơ khám
          </Button>
        </Link>
      </div> */}
      <div className="content-grid">
        <Card className="form-card">
          <div className="section-heading">
            <Title level={5}>Thông tin bệnh nhân</Title>
          </div>

          <Form
            form={form}
            layout="vertical"
            name="patientIntake"
            onFinish={handleFinish}
            initialValues={{ gender: "female" }}
          >
            <Row gutter={24}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "Vui lòng nhập họ và tên" }]}
                >
                  <Input placeholder="Nguyễn Văn A" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Giới tính"
                  name="gender"
                  rules={[{ required: true, message: "Vui lòng chọn giới tính" }]}
                >
                  <Radio.Group>
                    <Radio value="female">Nữ</Radio>
                    <Radio value="male">Nam</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>


              <Col xs={24} md={12}>
                <Form.Item
                  label="Ngày sinh"
                  name="birthday"
                  rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
                >
                  <DatePicker className="full-width" placeholder="Chọn ngày sinh" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                >
                  <Input placeholder="0912 345 678" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                  <Input placeholder="Số nhà, phường, quận" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Dịch vụ khám" name="service"
                  rules={[{ required: true, message: "Vui lòng chọn khoa khám" }]}>
                  <Select placeholder="Chọn khoa khám">
                    <Option value="general">Khám tổng quát</Option>
                    <Option value="specialist">Khám chuyên khoa</Option>
                    <Option value="inject">Tiêm vaccine</Option>
                    <Option value="test">Xét nghiệm</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Số BHYT/CCCD" name="medicalCode"
                  rules={[{ required: true, message: "Vui lòng nhập số BHYT/CCCD" }]}>
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Dị ứng">
                  <Input />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item className="button-group">
                  <Space size="middle">
                    <Button type="primary" htmlType="submit">
                      Lưu hồ sơ
                    </Button>
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                      Xóa
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card className="summary-card">
          <div className="summary-header">
            <Title level={5}>Tóm tắt hồ sơ</Title>
            <Text type="secondary">Thông tin nhanh trước khi lưu hồ sơ.</Text>
          </div>

          <div className="summary-row">
            <Text strong>Họ tên bệnh nhân</Text>
            <Text>Trần Thị Mai</Text>
          </div>

          <div className="summary-row">
            <Text strong>Số BHYT/CCCD</Text>
            <Text>0123456789</Text>
          </div>

          <div className="summary-row">
            <Text strong>Khoa khám</Text>
            <Text>Nội tổng quát</Text>
          </div>

          <div className="summary-row">
            <Text strong>Tiếp nhận lúc</Text>
            <Text>05/05/2026</Text>
          </div>

          <div className="summary-status">
            <CheckCircleOutlined />
            <Text>Chuẩn bị gửi hồ sơ vào hệ thống</Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
