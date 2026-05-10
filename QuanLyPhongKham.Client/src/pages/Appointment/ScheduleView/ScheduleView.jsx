import "./scheduleview.scss";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Card,
  Table,
  Tag,
  Space,
  Modal,
  message,
  Button,
} from "antd";

import {
  EditOutlined,
  StopOutlined,
} from "@ant-design/icons";

const initialAppointments = [
  {
    key: 1,
    date: "08-05-2026",
    time: "08:30",
    doctor: "BS. Trần Thị B",
    department: "Khoa tổng quát",
    status: "Chờ xác nhận",
  },
  {
    key: 2,
    date: "10-05-2026",
    time: "09:15",
    doctor: "BS. Nguyễn Văn D",
    department: "Khoa tai mũi họng",
    status: "Đã xác nhận",
  },
  {
    key: 3,
    date: "12-05-2026",
    time: "10:45",
    doctor: "BS. Lê Thị H",
    department: "Khoa da liễu",
    status: "Chờ xác nhận",
  },
];

const statusColor = {
  "Chờ xác nhận": "blue",
  "Đã xác nhận": "success",
  "Đã hủy": "error",
};

export default function ScheduleView() {
  const [appointments, setAppointments] = useState(initialAppointments);

const columns = [
  {
    title: "Ngày",
    dataIndex: "date",
  },
  {
    title: "Thời gian",
    dataIndex: "time",
  },
  {
    title: "Bác sĩ",
    dataIndex: "doctor",
  },
{
  title: "Khoa",
  dataIndex: "department",
  key: "department",
},
  {
    title: "Trạng thái",
    dataIndex: "status",

    render: (status) => (
      <Tag color={statusColor[status]}>
        {status}
      </Tag>
    ),
  },
{
  title: "Thao tác",
  key: "actions",

  render: (_, record) => (
    <Space size="small">
      <Link to="/reschedule">
        <Button
          type="link"
          className="actionBtn editBtn"
          icon={<EditOutlined />}
          disabled={record.status === "Đã hủy"}
        />
      </Link>

      <Link to="/cancellation">
        <Button
          type="link"
          className="actionBtn cancelBtn"
          icon={<StopOutlined />}
          disabled={record.status === "Đã hủy"}
        />
      </Link>
    </Space>
  ),
}
];

  return (
    <div className="scheduleView-page">
      <div className="scheduleView-header">
        <div>
          <p>Theo dõi và quản lý lịch khám của bạn nhanh chóng, tiện lợi.</p>
        </div>
      </div>
      <Card className="scheduleView-table" bordered={false}>

        <div className="tableHeader">
          <div>
            <h3>Lịch khám của bạn</h3>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={appointments}
          size="medium"
          locale={{
            emptyText: "Không có lịch khám phù hợp.",
          }}
        />
      </Card>
    </div>
  );
}