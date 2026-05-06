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
    dosage: "Uống 1 viên khi sốt, tối đa 4 viên/ngày",
  },
  {
    key: "T002",
    name: "Amlodipin 5mg",
    dosage: "Uống 1 viên sau ăn sáng",
  },
  {
    key: "T003",
    name: "Vitamin C",
    dosage: "Uống 1 viên/ngày sau ăn",
  },
];

const columns = [
  { title: "Tên thuốc", dataIndex: "name", key: "name" },
  { title: "Liều dùng", dataIndex: "dosage", key: "dosage" },
];

export default function Prescription() {
  return (
    <div className="doctor-page prescription-page">
      <div className="doctor-page__header">
        <div>
          <h1>Kê thuốc</h1>
          <p>
            Lập toa thuốc cho bệnh nhân, gồm tên thuốc, số lượng và ghi chú
            liều dùng theo đúng đặc tả màn hình.
          </p>
        </div>
        <Tag color="blue">Toa tạm lưu</Tag>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={9}>
          <Card title="Thông tin toa thuốc" className="doctor-card">
            <div className="doctor-patient-summary prescription-summary">
              <div className="summary-item">
                <span>Bệnh nhân</span>
                <strong>Trần Thị Mai</strong>
              </div>
              <div className="summary-item">
                <span>Mã khám</span>
                <strong>K002</strong>
              </div>
              <div className="summary-item">
                <span>Chẩn đoán</span>
                <strong>Viêm hô hấp trên</strong>
              </div>
              <div className="summary-item">
                <span>Bác sĩ</span>
                <strong>BS Nguyễn Minh An</strong>
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
              <Form.Item label="Tên thuốc" name="medicine">
                <Select
                  showSearch
                  options={[
                    { value: "paracetamol", label: "Paracetamol 500mg" },
                    { value: "amlodipin", label: "Amlodipin 5mg" },
                    { value: "vitaminc", label: "Vitamin C" },
                    { value: "oresol", label: "Oresol" },
                  ]}
                />
              </Form.Item>
              {/*<Row gutter={12}>
                <Col xs={12}>
                  <Form.Item label="Số lượng" name="quantity">
                    <InputNumber min={1} className="full-width" />
                  </Form.Item>
                </Col>
                <Col xs={12}>
                  <Form.Item label="Đơn vị" name="unit">
                    <Select
                      options={[
                        { value: "Viên", label: "Viên" },
                        { value: "Gói", label: "Gói" },
                        { value: "Chai", label: "Chai" },
                      ]}
                    />
                  </Form.Item>
                </Col>
              </Row>*/}
              <Form.Item label="Ghi chú liều dùng" name="dosage">
                <Input.TextArea
                  rows={3}
                  placeholder="Ví dụ: uống 1 viên sau ăn sáng"
                />
              </Form.Item>
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
              <strong>Dặn dò:</strong> Uống thuốc đúng liều, theo dõi huyết áp
              mỗi ngày và tái khám sau 7 ngày nếu còn sốt hoặc khó thở.
            </div>
            <Space wrap className="prescription-actions">
              <Button type="primary">Lưu toa thuốc</Button>
              <Button>In toa thuốc</Button>
              <Button>Hoàn tất khám</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
