import "./patientinfo.scss";
import { Button, Card, Col, Form, Input, Row, Select, Space, Tag } from "antd";
import { Link } from "react-router-dom";
const patientOptions = [
  { value: "BN001", label: "Nguyễn Văn Hòa" },
  { value: "BN002", label: "Trần Thị Mai" },
  { value: "BN003", label: "Lê Quốc Bảo" },
];

export default function PatientInfo() {
  return (
    <div className="doctor-patient-info-page">
      <div className="doctor-page-header">
        <div>
          <p>
            Ghi nhận triệu chứng, chẩn đoán và hướng điều trị cho lần khám hiện
            tại theo yêu cầu quản lý khám bệnh.
          </p>
        </div>
        <Tag color="processing">Đang khám</Tag>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={8}>
          <Card title="Thông tin bệnh nhân" className="doctor-card">
            <div className="medical-ticket">
              <div className="ticket-row">
                <span>
                  Họ và tên: <strong>Trần Thị Mai</strong>
                </span>
              </div>
              <div className="ticket-row">
                <span>
                  Số điện thoại: <strong> 0908 123 456</strong>
                </span>
              </div>
              <div className="ticket-row">
                <span>
                  Mã BHYT: <strong> HS4012345678901</strong>
                </span>
              </div>
              <div className="ticket-row">
                <span>
                  Giờ khám: <strong> 08:30</strong>
                </span>
              </div>
              <div className="ticket-row">
                <span>
                  Khoa: <strong> Nội tổng quát</strong>
                </span>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} xl={16}>
          <Card title="Phiếu ghi nhận khám bệnh" className="doctor-card">
            <Form
              layout="vertical"
              className="doctor-note-form"
              // initialValues={{
              //   patient: "BN002",
              //   symptom:
              //     "Đau đầu, mệt, ho nhẹ, có tiền sử tăng huyết áp cần theo dõi.",
              //   diagnosis: "Theo dõi viêm hô hấp trên, tăng huyết áp độ 1.",
              //   treatment: "Nghỉ ngơi, uống đủ nước, dùng thuốc theo toa.",
              // }}
            >
              <div className="note-group">
                <label>Bệnh nhân</label>              
                <Select 
                  showSearch
                  options={patientOptions} />
              </div>

              <div className="note-group">
                <label>Triệu chứng</label>
                <Input.TextArea rows={2} />
              </div>

              <div className="note-group">
                <label>Chẩn đoán</label>
                <Input.TextArea rows={2} />
              </div>

              <div className="note-group">
                <label>Hướng điều trị</label>
                <Input.TextArea rows={2} />
              </div>

              <Space wrap>
                  <Button type="primary" size="large">
                    Lưu thông tin khám
                  </Button>

                <Link to="/doctor/prescription">
                  <Button>Chuyển sang kê thuốc</Button>
                </Link>
                <Link to="/doctor/service-request">
                  <Button>Yêu cầu dịch vụ</Button>
                </Link>
              </Space>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
