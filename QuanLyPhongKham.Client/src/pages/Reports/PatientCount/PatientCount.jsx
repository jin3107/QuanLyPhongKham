import "./patientcount.scss";
import { useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  DatePicker,
  Select,
  Table,
  Tag,
  Statistic,
  Space,
  Input,
  Button,
} from "antd";
import {
  FilterOutlined,
  BarChartOutlined,
  SearchOutlined,
  ReloadOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const patientSummary = [
  {
    key: "total",
    title: "Tổng bệnh nhân",
    value: 842,
    description: "Trong tháng này",
  },
  {
    key: "new",
    title: "Bệnh nhân mới",
    value: 218,
    description: "Lần đầu khám",
  },
  {
    key: "returning",
    title: "Tái khám",
    value: 324,
    description: "Đã khám lại",
  },
  {
    key: "cancelled",
    title: "Đã huỷ",
    value: 34,
    description: "Lịch khám bị huỷ",
  },
];

const patientRecords = [
  {
    key: 1,
    date: "08/05/2026",
    name: "Nguyễn Văn A",
    age: 29,
    type: "Mới",
    status: "Đã đến",
    doctor: "BS. Trần Thị B",
  },
  {
    key: 2,
    date: "09/05/2026",
    name: "Lê Thị C",
    age: 42,
    type: "Tái khám",
    status: "Đang chờ",
    doctor: "BS. Nguyễn Văn D",
  },
  {
    key: 3,
    date: "10/05/2026",
    name: "Phạm Thị E",
    age: 35,
    type: "Mới",
    status: "Không đến",
    doctor: "BS. Lê Thị H",
  },
  {
    key: 4,
    date: "11/05/2026",
    name: "Hoàng Văn F",
    age: 50,
    type: "Tái khám",
    status: "Đã đến",
    doctor: "BS. Trần Thị B",
  },
  {
    key: 5,
    date: "12/05/2026",
    name: "Đỗ Thị G",
    age: 27,
    type: "Mới",
    status: "Đang chờ",
    doctor: "BS. Nguyễn Văn D",
  },
];

const statusColor = {
  "Đã đến": "success",
  "Đang chờ": "warning",
  "Không đến": "error",
};

const patientTypes = [
  { label: "Tất cả", value: "all" },
  { label: "Mới", value: "Mới" },
  { label: "Tái khám", value: "Tái khám" },
];

export default function PatientCount() {
  const [range, setRange] = useState(null);
  const [patientType, setPatientType] = useState("all");
  const [searchText, setSearchText] = useState("");

  const filteredRecords = useMemo(() => {
    let records = patientRecords;

    if (patientType !== "all") {
      records = records.filter((item) => item.type === patientType);
    }

    if (range && range.length === 2) {
      const [start, end] = range;
      records = records.filter((item) => {
        const [day, month, year] = item.date.split("/");
        const recordDate = new Date(`${year}-${month}-${day}`);
        return recordDate >= start.toDate() && recordDate <= end.toDate();
      });
    }

    if (searchText) {
      const query = searchText.toLowerCase();
      records = records.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.doctor.toLowerCase().includes(query) ||
          item.status.toLowerCase().includes(query)
      );
    }

    return records;
  }, [patientType, range, searchText]);

  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      width: 120,
    },
    {
      title: "Bệnh nhân",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Tuổi",
      dataIndex: "age",
      key: "age",
      width: 80,
    },
    {
      title: "Loại khám",
      dataIndex: "type",
      key: "type",
      width: 120,
    },
    {
      title: "Bác sĩ",
      dataIndex: "doctor",
      key: "doctor",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status) => (
        <Tag color={statusColor[status] || "default"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="patientCountPage">
      <div className="pageHeader">
        <div className="pageTitle">
          <BarChartOutlined className="pageIcon" />
          <div>
            <h2>Quản lý số lượng bệnh nhân</h2>
            <p>Tổng hợp số liệu bệnh nhân theo lịch khám trong tháng và theo loại khám.</p>
          </div>
        </div>
        <Button icon={<ReloadOutlined />} type="primary">
          Làm mới
        </Button>
      </div>

      <Row gutter={[20, 20]} className="summaryRow">
        {patientSummary.map((item) => (
          <Col xs={24} sm={12} md={6} key={item.key}>
            <Card className="summaryCard" bordered={false}>
              <Statistic title={item.title} value={item.value} valueStyle={{ color: "#0b4f84" }} />
              <div className="summaryNote">{item.description}</div>
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="filterCard" bordered={false}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} lg={8}>
            <div className="filterLabel">Chọn khoảng thời gian</div>
            <RangePicker
              value={range}
              onChange={(dates) => setRange(dates)}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} lg={6}>
            <div className="filterLabel">Loại bệnh nhân</div>
            <Select
              options={patientTypes}
              value={patientType}
              onChange={setPatientType}
              suffixIcon={<FilterOutlined />}
              style={{ width: "100%" }}
            />
          </Col>
          <Col xs={24} lg={8}>
            <div className="filterLabel">Tìm kiếm</div>
            <Input
              placeholder="Tìm tên, bác sĩ, trạng thái"
              prefix={<SearchOutlined />}
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} lg={2}>
            <Button type="primary" block>
              Áp dụng
            </Button>
          </Col>
        </Row>
      </Card>

      <Card className="tableCard" bordered={false}>
        <div className="tableHeader">
          <h3>Danh sách bệnh nhân</h3>
          <p>Bảng thống kê chi tiết theo lịch khám và trạng thái hiện tại.</p>
        </div>
        <Table
          columns={columns}
          dataSource={filteredRecords}
          pagination={{ pageSize: 5 }}
          rowClassName={() => "tableRow"}
          locale={{ emptyText: "Không có bản ghi phù hợp." }}
        />
      </Card>
    </div>
  );
}
