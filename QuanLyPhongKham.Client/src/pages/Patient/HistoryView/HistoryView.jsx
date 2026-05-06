import { useState } from "react";
import {
  Card,
  Col,
  Row,
  Table,
  Tag,
  Button,
  Modal,
  Collapse,
  Timeline,
  Tabs,
  Statistic,
  Empty,
  Space,
  Input,
  Select,
  DatePicker,
  Divider,
  Typography,
} from "antd";
import {
  CalendarOutlined,
  UserOutlined,
  PhoneOutlined,
  HomeOutlined,
  FileTextOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  FileOutlined,
  DownloadOutlined,
  PrinterOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import "./historyview.scss";

const { Title, Text, Paragraph } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

export default function HistoryView() {
  // Mock dữ liệu bệnh nhân
  const [patientInfo] = useState({
    id: "BN-2026-001",
    fullName: "Nguyễn Văn A",
    birthday: "1990-05-15",
    gender: "Nam",
    phone: "0912345678",
    address: "123 Đường Nguyễn Huệ, Phường 1, Quận 1, TP.HCM",
    email: "nguyenvana@email.com",
    insuranceCode: "BH123456789",
    medicalHistory: "Tiểu đường type 2, Cao huyết áp",
    allergy: "Penicillin, Aspirin",
  });

  // Mock dữ liệu lịch sử khám
  const [medicalRecords] = useState([
    {
      id: 1,
      visitDate: "2026-04-15",
      department: "Khám tổng quát",
      doctor: "Dr. Trần Minh Hùng",
      symptoms: "Đau đầu, chóng mặt",
      diagnosis: "Thiếu máu nhẹ, Giãn mạch não",
      treatment: "Kê đơn thuốc, Tư vấn chế độ ăn",
      notes: "Bệnh nhân tuân thủ hướng dẫn tốt",
      status: "Completed",
      medicines: [
        { name: "Paracetamol", dosage: "500mg", frequency: "3 lần/ngày", duration: "7 ngày" },
        { name: "Vitamin B12", dosage: "1000mcg", frequency: "1 lần/ngày", duration: "30 ngày" },
      ],
      attachments: [
        { name: "Kết quả xét nghiệm.pdf", size: "2.3 MB" },
        { name: "Hình ảnh siêu âm.jpg", size: "1.8 MB" },
      ],
    },
    {
      id: 2,
      visitDate: "2026-03-20",
      department: "Khám tim mạch",
      doctor: "Dr. Lê Thị Kim Anh",
      symptoms: "Khó thở, tim đập nhanh",
      diagnosis: "Huyết áp cao giai đoạn 1",
      treatment: "Kê thuốc huyết áp, Hướng dẫn lối sống lành mạnh",
      notes: "Cần kiểm tra lại sau 2 tuần",
      status: "Completed",
      medicines: [
        { name: "Amlodipine", dosage: "5mg", frequency: "1 lần/ngày", duration: "30 ngày" },
      ],
      attachments: [
        { name: "ECG.pdf", size: "1.2 MB" },
        { name: "Kết quả máu.xlsx", size: "0.5 MB" },
      ],
    },
    {
      id: 3,
      visitDate: "2026-02-10",
      department: "Khám tổng quát",
      doctor: "Dr. Trần Minh Hùng",
      symptoms: "Check-up định kỳ",
      diagnosis: "Sức khỏe ổn định",
      treatment: "Tư vấn phòng ngừa bệnh",
      notes: "Bệnh nhân ở trạng thái ổn định",
      status: "Completed",
      medicines: [],
      attachments: [],
    },
  ]);

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterStatus] = useState("all");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [dateRange, setDateRange] = useState(null);

  const showModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  // Lọc dữ liệu
  const filteredRecords = medicalRecords.filter((record) => {
    let matchStatus = filterStatus === "all" || record.status === filterStatus;
    let matchDepartment = filterDepartment === "all" || record.department === filterDepartment;
    let matchDate = true;

    if (dateRange && dateRange.length === 2) {
      const recordDate = dayjs(record.visitDate);
      matchDate =
        recordDate.isAfter(dateRange[0]) && recordDate.isBefore(dateRange[1]);
    }

    return matchStatus && matchDepartment && matchDate;
  });

  const columns = [
    {
      title: "Ngày khám",
      dataIndex: "visitDate",
      key: "visitDate",
      render: (date) => dayjs(date).format("DD/MM/YYYY"),
      width: 120,
    },
    {
      title: "Chuyên khoa",
      dataIndex: "department",
      key: "department",
      width: 150,
      render: (text) => <Tag color="#0b4f84">{text}</Tag>,
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctor",
      key: "doctor",
      width: 160,
    },
    {
      title: "Triệu chứng",
      dataIndex: "symptoms",
      key: "symptoms",
      ellipsis: true,
      width: 200,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: () => (
        <Tag icon={<CheckCircleOutlined />} color="success">
          Hoàn thành
        </Tag>
      ),
      width: 120,
    },
    {
      title: "Hành động",
      key: "action",
      width: 120,
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            size="small"
            onClick={() => showModal(record)}
            className="view-detail-btn"
          >
            Chi tiết
          </Button>
          <Button type="link" size="small" danger>
            Tải xuống
          </Button>
        </Space>
      ),
    },
  ];

  const getDepartments = () => {
    return [...new Set(medicalRecords.map((r) => r.department))];
  };

  return (
    <div className="history-view-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-title">
          <Title level={2} className="title">
            <FileTextOutlined /> Lịch sử bệnh án
          </Title>
          <Text type="secondary" className="subtitle">
            Xem tất cả các lần khám và kết quả chẩn đoán của bạn
          </Text>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        {/* Thông tin cá nhân */}
        <Col xs={24} lg={8}>
          <Card className="patient-info-card">
            <div className="patient-header">
              <div className="patient-avatar">
                <UserOutlined />
              </div>
              <div className="patient-basic">
                <Title level={4} className="patient-name">
                  {patientInfo.fullName}
                </Title>
                <Text type="secondary" className="patient-id">
                  ID: {patientInfo.id}
                </Text>
              </div>
            </div>

            <Divider />

            <div className="patient-details">
              <div className="detail-row">
                <Text strong className="detail-label">
                  Ngày sinh:
                </Text>
                <Text className="detail-value">
                  {dayjs(patientInfo.birthday).format("DD/MM/YYYY")}
                </Text>
              </div>

              <div className="detail-row">
                <Text strong className="detail-label">
                  Giới tính:
                </Text>
                <Text className="detail-value">{patientInfo.gender}</Text>
              </div>

              <div className="detail-row">
                <PhoneOutlined className="detail-icon" />
                <Text className="detail-value">{patientInfo.phone}</Text>
              </div>

              <div className="detail-row">
                <HomeOutlined className="detail-icon" />
                <Text className="detail-value">{patientInfo.address}</Text>
              </div>

              <div className="detail-row">
                <Text strong className="detail-label">
                  Email:
                </Text>
                <Text className="detail-value">{patientInfo.email}</Text>
              </div>

              <div className="detail-row">
                <Text strong className="detail-label">
                  Mã BHYT:
                </Text>
                <Text className="detail-value">{patientInfo.insuranceCode}</Text>
              </div>

              <Divider />

              <div className="detail-section">
                <Text strong className="section-title">
                  Tiền sử bệnh
                </Text>
                <Paragraph className="detail-text">
                  {patientInfo.medicalHistory}
                </Paragraph>
              </div>

              <div className="detail-section">
                <Text strong className="section-title">
                  Dị ứng
                </Text>
                <Paragraph className="detail-text">
                  {patientInfo.allergy}
                </Paragraph>
              </div>

              <Space direction="vertical" style={{ width: "100%" }}>
                <Button type="primary" block className="primary-button">
                  Cập nhật thông tin
                </Button>
                <Button block>
                  <DownloadOutlined /> Tải hồ sơ
                </Button>
              </Space>
            </div>
          </Card>

          {/* Thống kê */}
          <Card className="stats-card" style={{ marginTop: 24 }}>
            <Statistic
              title="Tổng lần khám"
              value={medicalRecords.length}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: "#0b4f84", fontSize: 24 }}
            />
          </Card>
        </Col>

        {/* Danh sách khám */}
        <Col xs={24} lg={16}>
          <Card className="records-card">
            {/* Filters */}
            <div className="filters-section">
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={12} md={8}>
                  <Input.Search
                    placeholder="Tìm kiếm bác sĩ..."
                    allowClear
                    className="search-input"
                  />
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <Select
                    placeholder="Chuyên khoa"
                    value={filterDepartment}
                    onChange={setFilterDepartment}
                    style={{ width: "100%" }}
                  >
                    <Option value="all">Tất cả chuyên khoa</Option>
                    {getDepartments().map((dept) => (
                      <Option key={dept} value={dept}>
                        {dept}
                      </Option>
                    ))}
                  </Select>
                </Col>

                <Col xs={24} sm={12} md={8}>
                  <RangePicker
                    onChange={setDateRange}
                    style={{ width: "100%" }}
                    placeholder={["Từ ngày", "Đến ngày"]}
                  />
                </Col>
              </Row>
            </div>

            <Divider />

            {/* Table */}
            {filteredRecords.length > 0 ? (
              <Table
                columns={columns}
                dataSource={filteredRecords}
                rowKey="id"
                pagination={{
                  pageSize: 5,
                  showSizeChanger: true,
                  showTotal: (total) => `Tổng ${total} lần khám`,
                }}
                className="records-table"
              />
            ) : (
              <Empty description="Không có kết quả khám trong thời gian này" />
            )}
          </Card>
        </Col>
      </Row>

      {/* Modal chi tiết */}
      <Modal
        title={
          selectedRecord && (
            <div className="modal-title">
              <FileOutlined />
              Kết quả khám - {dayjs(selectedRecord.visitDate).format("DD/MM/YYYY")}
            </div>
          )
        }
        open={isModalOpen}
        onCancel={handleModalClose}
        width={800}
        footer={[
          <Button key="close" onClick={handleModalClose}>
            Đóng
          </Button>,
          <Button
            key="print"
            type="primary"
            className="primary-button"
            icon={<PrinterOutlined />}
          >
            In phiếu
          </Button>,
          <Button
            key="download"
            type="primary"
            className="primary-button"
            icon={<DownloadOutlined />}
          >
            Tải xuống
          </Button>,
        ]}
        className="detail-modal"
      >
        {selectedRecord && (
          <div className="modal-content">
            <Tabs
              defaultActiveKey="1"
              items={[
                {
                  key: "1",
                  label: "Thông tin khám",
                  children: (
                    <div className="tab-content">
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={12}>
                          <div className="info-block">
                            <Text strong>Chuyên khoa</Text>
                            <Tag color="#0b4f84" style={{ marginTop: 8 }}>
                              {selectedRecord.department}
                            </Tag>
                          </div>
                        </Col>

                        <Col xs={24} sm={12}>
                          <div className="info-block">
                            <Text strong>Bác sĩ</Text>
                            <Paragraph style={{ marginTop: 8 }}>
                              {selectedRecord.doctor}
                            </Paragraph>
                          </div>
                        </Col>

                        <Col xs={24}>
                          <div className="info-block">
                            <Text strong>Triệu chứng</Text>
                            <Paragraph style={{ marginTop: 8 }}>
                              {selectedRecord.symptoms}
                            </Paragraph>
                          </div>
                        </Col>

                        <Col xs={24}>
                          <div className="info-block">
                            <Text strong>Chẩn đoán</Text>
                            <Paragraph style={{ marginTop: 8 }}>
                              {selectedRecord.diagnosis}
                            </Paragraph>
                          </div>
                        </Col>

                        <Col xs={24}>
                          <div className="info-block">
                            <Text strong>Hướng điều trị</Text>
                            <Paragraph style={{ marginTop: 8 }}>
                              {selectedRecord.treatment}
                            </Paragraph>
                          </div>
                        </Col>

                        <Col xs={24}>
                          <div className="info-block">
                            <Text strong>Ghi chú</Text>
                            <Paragraph style={{ marginTop: 8 }}>
                              {selectedRecord.notes}
                            </Paragraph>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <>
                      <FileOutlined /> Thuốc kê đơn
                      {selectedRecord.medicines.length > 0 && (
                        <Tag color="#0b4f84" style={{ marginLeft: 8 }}>
                          {selectedRecord.medicines.length}
                        </Tag>
                      )}
                    </>
                  ),
                  children:
                    selectedRecord.medicines.length > 0 ? (
                      <div className="medicines-list">
                        {selectedRecord.medicines.map((medicine, idx) => (
                          <Card key={idx} className="medicine-card">
                            <Row gutter={[8, 8]}>
                              <Col xs={24}>
                                <Text strong className="medicine-name">
                                  {medicine.name}
                                </Text>
                              </Col>
                              <Col xs={24} sm={12}>
                                <div className="medicine-detail">
                                  <Text type="secondary">Liều lượng:</Text>
                                  <Text>{medicine.dosage}</Text>
                                </div>
                              </Col>
                              <Col xs={24} sm={12}>
                                <div className="medicine-detail">
                                  <Text type="secondary">Tần suất:</Text>
                                  <Text>{medicine.frequency}</Text>
                                </div>
                              </Col>
                              <Col xs={24}>
                                <div className="medicine-detail">
                                  <Text type="secondary">Thời gian:</Text>
                                  <Text>{medicine.duration}</Text>
                                </div>
                              </Col>
                            </Row>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Empty description="Không có thuốc được kê đơn" />
                    ),
                },
                {
                  key: "3",
                  label: (
                    <>
                      <FileOutlined /> Tài liệu đính kèm
                      {selectedRecord.attachments.length > 0 && (
                        <Tag color="#0b4f84" style={{ marginLeft: 8 }}>
                          {selectedRecord.attachments.length}
                        </Tag>
                      )}
                    </>
                  ),
                  children:
                    selectedRecord.attachments.length > 0 ? (
                      <div className="attachments-list">
                        {selectedRecord.attachments.map((file, idx) => (
                          <Card key={idx} className="attachment-card">
                            <Row justify="space-between" align="middle">
                              <Col>
                                <div>
                                  <Text strong>{file.name}</Text>
                                  <Paragraph type="secondary" style={{ fontSize: 12 }}>
                                    {file.size}
                                  </Paragraph>
                                </div>
                              </Col>
                              <Col>
                                <Space>
                                  <Button
                                    type="link"
                                    size="small"
                                    icon={<DownloadOutlined />}
                                  >
                                    Tải xuống
                                  </Button>
                                </Space>
                              </Col>
                            </Row>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Empty description="Không có tài liệu đính kèm" />
                    ),
                },
              ]}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
