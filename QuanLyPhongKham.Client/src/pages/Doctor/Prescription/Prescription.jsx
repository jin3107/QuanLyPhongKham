import "./prescription.scss";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";

const medicines = [
  {
    key: "T001",
    name: "Paracetamol 500mg",
    quantity: "3 viên",
    dosage: "Uống 1 viên khi sốt, tối đa 2 viên/ngày",
  },
  {
    key: "T002",
    name: "Amlodipin 5mg",
    quantity: "7 viên",
    dosage: "Uống 1 viên sau ăn sáng",
  },
  {
    key: "T003",
    name: "Vitamin C",
    quantity: "7 gói",
    dosage: "Uống 1 viên/ngày sau ăn",
  },
];

const columns = [
  { title: "Tên thuốc", dataIndex: "name", key: "name" },
  { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
  { title: "Liều dùng", dataIndex: "dosage", key: "dosage" },
];

export default function Prescription() {
  return (
    <div className="doctor-prescription-page">
      <div className="doctor-page-header">
        <div>
          <p>
            Lập toa thuốc cho bệnh nhân, gồm tên thuốc, số lượng và ghi chú liều
            dùng theo đúng đặc tả màn hình.
          </p>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={9}>
          <Card title="Thông tin toa thuốc" className="doctor-card">
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

            <Form
              className="doctor-form add-medicine-form"
              layout="vertical"
              initialValues={{
                medicine: "paracetamol",
                quantity: 10,
                unit: "Viên",
              }}
            >
              <div className="note-group">
                <label>Tên Thuốc</label>
                <Select
                  showSearch
                  options={[
                    { value: "paracetamol", label: "Paracetamol 500mg" },
                    { value: "amlodipin", label: "Amlodipin 5mg" },
                    { value: "vitaminc", label: "Vitamin C" },
                    { value: "oresol", label: "Oresol" },
                  ]}
                />
              </div>

              <Row gutter={12}>
                <Col xs={12}>
                  <div className="note-group">
                    <label>Số lượng</label>
                    <InputNumber min={1} className="full-width" />
                  </div>
                </Col>
                <Col xs={12}>
                  <div className="note-group">
                    <label>Đơn vị</label>
                    <Select
                      options={[
                        { value: "Viên", label: "Viên" },
                        { value: "Gói", label: "Gói" },
                        { value: "Chai", label: "Chai" },
                        { value: "Hộp", label: "Hộp" },

                      ]}
                    />
                  </div>
                </Col>
              </Row>
              <div className="note-group">
                <label>Liều dùng</label>
                <Input.TextArea rows={2} />
              </div>
              <Button type="primary" block>
                Thêm vào toa thuốc
              </Button>
            </Form>
          </Card>
        </Col>

        <Col xs={24} xl={15}>
          <Card title="Danh sách thuốc đã kê" className="doctor-card">
            <Table
              className="doctor-table"
              columns={columns}
              dataSource={medicines}
              pagination={false}
              scroll={{ x: 720 }}
            />
            <div className="prescription-note">
              <strong>Lưu ý:</strong> Uống thuốc đúng liều lượng
            </div>
            <Space wrap className="prescription-actions">
              <Button type="primary">Lưu toa thuốc</Button>
              <Button>Hoàn tất khám</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
