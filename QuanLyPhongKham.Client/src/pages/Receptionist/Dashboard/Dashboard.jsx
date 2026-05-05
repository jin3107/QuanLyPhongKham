import { Card, Col, DatePicker, Form, Input, Radio, Row, Select, Typography, Button, Space } from "antd";
import { PhoneOutlined, HomeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import "./dashboard.scss";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Dashboard() {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("submitted", values);
  };

  return (
    <div className="receptionist-dashboard-page">
      <div className="page-topbar">
        <div>
          <Title level={3}>Đăng ký hồ sơ bệnh án</Title>
          <Text type="secondary">
            Điền thông tin tiếp nhận bệnh nhân để tạo hồ sơ khám bệnh nhanh chóng.
          </Text>
        </div>
        <Button type="primary" className="primary-button">
          Tạo hồ sơ mới
        </Button>
      </div>

      <div className="content-grid">
        <Card className="form-card">
          <div className="section-heading">
            <Title level={5}>Thông tin bệnh nhân</Title>
            <Text type="secondary">Các trường có dấu * bắt buộc điền.</Text>
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
                  label="Ngày sinh"
                  name="birthday"
                  rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
                >
                  <DatePicker className="full-width" placeholder="Chọn ngày sinh" />
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
                    <Radio value="other">Khác</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
                >
                  <Input prefix={<PhoneOutlined />} placeholder="0912 345 678" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
                >
                  <Input prefix={<HomeOutlined />} placeholder="Số nhà, phường, quận" />
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Dịch vụ khám" name="service">
                  <Select placeholder="Chọn dịch vụ khám">
                    <Option value="general">Khám tổng quát</Option>
                    <Option value="specialist">Khám chuyên khoa</Option>
                    <Option value="inject">Tiêm vaccine</Option>
                    <Option value="test">Xét nghiệm</Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24} md={12}>
                <Form.Item label="Mã hồ sơ" name="medicalCode">
                  <Input placeholder="VD: MB-2026-001" />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item label="Ghi chú thêm" name="notes">
                  <Input.TextArea rows={4} placeholder="Ghi chú triệu chứng, tiền sử bệnh..." />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item className="button-group">
                  <Space size="middle">
                    <Button type="primary" htmlType="submit">
                      Lưu hồ sơ
                    </Button>
                    <Button htmlType="button" onClick={() => form.resetFields()}>
                      Xóa form
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card className="summary-card">
          <div className="summary-header">
            <Title level={5}>Tóm tắt tiếp nhận</Title>
            <Text type="secondary">Thông tin nhanh trước khi lưu hồ sơ.</Text>
          </div>

          <div className="summary-row">
            <Text strong>Mã bệnh án</Text>
            <Text>MB-2026-001</Text>
          </div>

          <div className="summary-row">
            <Text strong>Trạng thái tiếp nhận</Text>
            <Text>BN mới</Text>
          </div>

          <div className="summary-row">
            <Text strong>Gói khám ưu tiên</Text>
            <Text>Khám tổng quát</Text>
          </div>

          <div className="summary-row">
            <Text strong>Tiếp nhận lúc</Text>
            <Text>09:30 - 05/05/2026</Text>
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
