import "./patientinfo.scss";
import { Button, Card, Col, Form, Input, Row, Select, Space, Tag } from "antd";

const patientOptions = [
  { value: "BN001", label: "Nguyễn Văn Hòa" },
  { value: "BN002", label: "Trần Thị Mai" },
  { value: "BN003", label: "Lê Quốc Bảo" },
];

export default function PatientInfo() {
  return (
    <div className="doctor-page patient-info-page">
      <div className="doctor-page__header">
        <div>
          <h1>Thông tin bệnh nhân</h1>
          <p>
            Ghi nhận triệu chứng, chẩn đoán và hướng điều trị cho lần khám hiện
            tại theo yêu cầu quản lý khám bệnh.
          </p>
        </div>
        <Tag color="processing">Đang khám</Tag>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          <Card title="Thông tin lượt khám" className="doctor-card">
            <div className="doctor-patient-summary">
              <div className="summary-item">
                <span>Họ tên</span>
                <strong>Trần Thị Mai</strong>
              </div>
              <div className="summary-item">
                <span>Số điện thoại</span>
                <strong>0908 123 456</strong>
              </div>
              <div className="summary-item">
                <span>BHYT</span>
                <strong>HS4012345678901</strong>
              </div>
              <div className="summary-item">
                <span>Giờ khám</span>
                <strong>08:30</strong>
              </div>
              <div className="summary-item">
                <span>Phòng</span>
                <strong>Nội tổng quát 02</strong>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={16}>
          <Card title="Phiếu ghi nhận khám bệnh" className="doctor-card">
            <Form
              className="doctor-form"
              layout="vertical"
              initialValues={{
                patient: "BN002",
                temperature: "37.8",
                bloodPressure: "130/85",
                pulse: "84",
                symptom:
                  "Đau đầu, mệt, ho nhẹ, có tiền sử tăng huyết áp cần theo dõi.",
                diagnosis: "Theo dõi viêm hô hấp trên, tăng huyết áp độ 1.",
                treatment: "Nghỉ ngơi, uống đủ nước, dùng thuốc theo toa.",
              }}
            >
              <Row gutter={16}>
                <Col xs={24} md={12}>
                  <Form.Item label="Chọn bệnh nhân" name="patient">
                    <Select options={patientOptions} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item label="Nhiệt độ" name="temperature">
                    <Input suffix="°C" />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item label="Huyết áp" name="bloodPressure">
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={4}>
                  <Form.Item label="Mạch" name="pulse">
                    <Input suffix="lần/phút" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item label="Triệu chứng" name="symptom">
                <Input.TextArea rows={4} />
              </Form.Item>
              <Form.Item label="Chẩn đoán" name="diagnosis">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item label="Hướng điều trị" name="treatment">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item label="Ghi chú theo dõi" name="note">
                <Input.TextArea
                  rows={3}
                  placeholder="Nhập lưu ý tái khám, dị ứng thuốc hoặc chỉ định bổ sung"
                />
              </Form.Item>

              <Space wrap>
                <Button type="primary">Lưu thông tin khám</Button>
                <Button>Chuyển sang kê thuốc</Button>
                <Button>Yêu cầu dịch vụ</Button>
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
