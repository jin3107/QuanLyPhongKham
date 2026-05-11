import "./patientview.scss";
import {
  Descriptions,
  Tabs,
  Table,
  Button,
  Card,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from "antd";

import { SearchOutlined } from "@ant-design/icons";

const history = [
  {
    key: "K001",
    date: "02/05/2026",
    doctor: "Nguyễn Minh An",
    label: "Trần Thị Mai",
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
];

export default function PatientView() {
  return (
    <div className="doctor-patient-view-page">
      <div className="doctor-page-header">
        <div>
          <p>
            Tra cứu hồ sơ cá nhân, lịch sử khám, chẩn đoán, toa thuốc và dịch vụ
            đã sử dụng.
          </p>
        </div>
      </div>

      <div className="note-group">
        <Select
          placeholder="Tìm kiếm bệnh nhân"
          showSearch
          options={history}
          optionFilterProp="label"
        />
      </div>

      <Row gutter={[16, 16]}>
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
                    <Card className="doctor-card">
                      <div className="prescription-paper">
                        <div className="prescription-header">
                          <h2>TOA THUỐC</h2>
                          <span>Ngày kê: 10/05/2026</span>
                        </div>

                        <div className="prescription-patient">
                          <div className="patient-row">
                            <p><strong>Bệnh nhân:</strong> Trần Thị Mai</p>
                            <p><strong>Giới tính:</strong> Nữ</p>
                          </div>

                          <div className="patient-row">
                            <p><strong>Ngày sinh:</strong> 14/09/1982</p>
                            <p><strong>Số điện thoại:</strong> 0908 123 456</p>
                          </div>

                          <div className="patient-row">
                            <p><strong>Địa chỉ:</strong> Cao Lãnh, Đồng Tháp</p>
                          </div>

                          <div className="patient-row">
                            <p><strong>Chẩn đoán:</strong> Viêm hô hấp trên</p>
                          </div>

                        </div>
                        <div className="prescription-list">
                          {medicines.map((item, index) => (
                            <div className="prescription-row" key={item.key}>
                              <div className="prescription-line">
                                <span className="medicine-name">
                                  {index + 1}. {item.name}
                                </span>

                                <span className="medicine-quantity">
                                  SL: {item.quantity}
                                </span>
                              </div>

                              <div className="medicine-dosage">
                                {item.dosage}
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="prescription-footer">
                          <p>Lưu ý: Uống thuốc đúng liều lượng.</p>

                          <div className="doctor-sign">
                            <strong>Bác sĩ điều trị</strong>
                            <span>Nguyễn Minh An</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ),
                },
                // {
                //   key: "result",
                //   label: "Kết quả dịch vụ",
                //   children: (
                //     <div className="result-box">
                //       <strong>Xét nghiệm máu tổng quát</strong>
                //       <p>
                //         Bạch cầu tăng nhẹ, các chỉ số còn lại trong giới hạn
                //         theo dõi. Hẹn tái khám sau 7 ngày nếu triệu chứng không
                //         cải thiện.
                //       </p>
                //     </div>
                //   ),
                // },
              ]}
            />
          </Card>
        </Col>
        <Col xs={24} xl={9}>
          <Card title="Hồ sơ bệnh nhân" className="doctor-card">
            <Descriptions column={1} size="middle">
              <Descriptions.Item label="Họ tên">Trần Thị Mai</Descriptions.Item>
              <Descriptions.Item label="Ngày sinh">
                14/09/1982
              </Descriptions.Item>
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
      </Row>
    </div>
  );
}
