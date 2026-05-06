import "./patientview.scss";
import {
  Card,
  Col,
  Descriptions,
  Input,
  Row,
  Space,
  Table,
  Tabs,
  Tag,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";

const history = [
  {
    key: "K001",
    date: "02/05/2026",
    doctor: "Nguyễn Minh An",
    diagnosis: "Viêm họng cấp",
    service: "Xét nghiệm máu",
  },
  {
    key: "K002",
    date: "18/04/2026",
    doctor: "Lê Thanh Bình",
    diagnosis: "Đau dạ dày",
    service: "Siêu âm ổ bụng",
  },
  {
    key: "K003",
    date: "03/03/2026",
    doctor: "Nguyễn Minh An",
    diagnosis: "Tăng huyết áp",
    service: "Điện tim",
  },
];

const columns = [
  { title: "Ngày khám", dataIndex: "date", key: "date", width: 130 },
  { title: "Bác sĩ", dataIndex: "doctor", key: "doctor" },
  { title: "Chẩn đoán", dataIndex: "diagnosis", key: "diagnosis" },
  { title: "Dịch vụ", dataIndex: "service", key: "service" },
];

export default function PatientView() {
  return (
    <div className="doctor-page patient-view-page">
      <div className="doctor-page__header">
        <div>
          <h1>Xem thông tin bệnh nhân</h1>
          <p>
            Tra cứu hồ sơ cá nhân, lịch sử khám, chẩn đoán, toa thuốc và dịch
            vụ đã sử dụng.
          </p>
        </div>
      </div>

      <div className="doctor-toolbar">
        <Input
          className="doctor-search"
          size="large"
          prefix={<SearchOutlined />}
          placeholder="Tìm theo mã bệnh nhân, họ tên hoặc số điện thoại"
        />
        <Space wrap>
          <Tag color="blue">BHYT còn hiệu lực</Tag>
          <Tag color="green">Đã tiếp nhận hôm nay</Tag>
        </Space>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} xl={9}>
          <Card title="Hồ sơ bệnh nhân" className="doctor-card">
            <Descriptions column={1} size="middle">
              <Descriptions.Item label="Họ tên">Trần Thị Mai</Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">14/09/1982</Descriptions.Item>
              <Descriptions.Item label="Giới tính">Nữ</Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                0908 123 456
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                Cao Lãnh, Đồng Tháp
              </Descriptions.Item>
              <Descriptions.Item label="Số BHYT">
                HS4012345678901
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>

        <Col xs={24} xl={15}>
          <Card className="doctor-card">
            <Tabs
              defaultActiveKey="history"
              items={[
                {
                  key: "history",
                  label: "Lịch sử khám",
                  children: (
                    <Table
                      className="doctor-table"
                      columns={columns}
                      dataSource={history}
                      pagination={false}
                      scroll={{ x: 720 }}
                    />
                  ),
                },
                {
                  key: "medicine",
                  label: "Toa thuốc gần nhất",
                  children: (
                    <div className="medicine-list">
                      <div>
                        <strong>Paracetamol 500mg</strong>
                        <span>10 viên - uống khi sốt, tối đa 4 viên/ngày</span>
                      </div>
                      <div>
                        <strong>Amlodipin 5mg</strong>
                        <span>14 viên - uống 1 viên sau ăn sáng</span>
                      </div>
                      <div>
                        <strong>Vitamin C</strong>
                        <span>10 viên - uống 1 viên/ngày</span>
                      </div>
                    </div>
                  ),
                },
                {
                  key: "result",
                  label: "Kết quả dịch vụ",
                  children: (
                    <div className="result-box">
                      <strong>Xét nghiệm máu tổng quát</strong>
                      <p>
                        Bạch cầu tăng nhẹ, các chỉ số còn lại trong giới hạn
                        theo dõi. Hẹn tái khám sau 7 ngày nếu triệu chứng không
                        cải thiện.
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
