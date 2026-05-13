import "./patientcount.scss";

import { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Card,
  DatePicker,
  Table,
  Statistic,
  Button,
  message,
  Tag,
} from "antd";

import {
  ReloadOutlined,
  CheckCircleOutlined,
  SyncOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import dayjs from "dayjs";

// Bổ sung import API LichHen
import { searchBenhNhan } from "../../../apis/BenhNhanAPI";
import { searchPhieuKham } from "../../../apis/PhieuKhamAPI";
import { searchBacSi } from "../../../apis/BacSiAPI";
import { searchLichHen } from "../../../apis/LichHenAPI";

const { RangePicker } = DatePicker;

// Hàm hỗ trợ lấy mảng dữ liệu từ API
const getSearchRows = (response) => {
  const payload = response?.data ?? {};
  const searchData = payload?.data ?? payload?.Data ?? {};
  return searchData?.data ?? searchData?.Data ?? [];
};

// Chuẩn hóa dữ liệu để dễ dàng sử dụng
const normalizeBenhNhan = (item) => ({
  maBN: item?.maBN ?? item?.MaBN ?? item?.id ?? "",
  hoTen: item?.hoTen ?? item?.HoTen ?? "",
  soBHYT: item?.soBHYT ?? item?.SoBHYT ?? "",
});

const normalizePhieuKham = (item) => ({
  maPK: item?.maPK ?? item?.MaPK ?? "",
  maBS: item?.maBS ?? item?.MaBS ?? "",
  maLH: item?.maLH ?? item?.MaLH ?? "", // Thêm maLH để liên kết với Lịch hẹn
  ngayKham: item?.ngayKham ?? item?.NgayKham ?? null,
  trangThaiTiepNhan: item?.trangThaiTiepNhan ?? item?.TrangThaiTiepNhan ?? "",
});

const normalizeBacSi = (item) => ({
  maBS: item?.maBS ?? item?.MaBS ?? item?.id ?? "",
  hoTen: item?.hoTen ?? item?.HoTen ?? "",
});

const normalizeLichHen = (item) => ({
  maLH: item?.maLH ?? item?.MaLH ?? item?.id ?? "",
  maBN: item?.maBN ?? item?.MaBN ?? "", // Lịch hẹn sẽ chứa mã Bệnh nhân
});

export default function PatientCount() {
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState(null);

  // Khai báo các biến lưu trữ dữ liệu (State)
  const [benhNhans, setBenhNhans] = useState([]);
  const [phieuKhams, setPhieuKhams] = useState([]);
  const [bacSis, setBacSis] = useState([]);
  const [lichHens, setLichHens] = useState([]); // Bổ sung State cho Lịch hẹn

  useEffect(() => {
    loadData();
  }, []);

  // Hàm tải toàn bộ dữ liệu
  const loadData = async () => {
    setLoading(true);
    try {
      // Gọi cả 4 API cùng lúc để tăng tốc độ
      const [benhNhanRes, phieuKhamRes, bacSiRes, lichHenRes] =
        await Promise.all([
          searchBenhNhan(null, 1, 1000),
          searchPhieuKham(null, 1, 1000),
          searchBacSi(null, 1, 500),
          searchLichHen(null, 1, 1000), // Gọi API Lịch hẹn
        ]);

      const benhNhanRows = getSearchRows(benhNhanRes);
      const phieuKhamRows = getSearchRows(phieuKhamRes);
      const bacSiRows = getSearchRows(bacSiRes);
      const lichHenRows = getSearchRows(lichHenRes);

      // Lưu dữ liệu đã được chuẩn hóa vào State
      setBenhNhans(
        Array.isArray(benhNhanRows) ? benhNhanRows.map(normalizeBenhNhan) : [],
      );
      setPhieuKhams(
        Array.isArray(phieuKhamRows)
          ? phieuKhamRows.map(normalizePhieuKham)
          : [],
      );
      setBacSis(Array.isArray(bacSiRows) ? bacSiRows.map(normalizeBacSi) : []);
      setLichHens(
        Array.isArray(lichHenRows) ? lichHenRows.map(normalizeLichHen) : [],
      );
    } catch (error) {
      console.error(error);
      messageApi.error("Không tải được dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  // Logic ghép nối dữ liệu chính
  const patientRecords = useMemo(() => {
    return phieuKhams.map((item, index) => {
      // 1. Tìm Lịch Hẹn từ Phiếu Khám (dựa vào maLH)
      const lichHen = lichHens.find(
        (l) => String(l.maLH) === String(item.maLH),
      );

      // 2. Lấy mã bệnh nhân từ Lịch Hẹn (nếu có)
      const currentMaBN = lichHen?.maBN || "";

      // 3. Tìm Bệnh Nhân dựa vào currentMaBN
      const benhNhan = benhNhans.find(
        (x) => String(x.maBN) === String(currentMaBN),
      );

      // 4. Tìm Bác Sĩ
      const bacSi = bacSis.find((x) => String(x.maBS) === String(item.maBS));

      return {
        key: item.maPK || index,
        date: item.ngayKham
          ? dayjs(item.ngayKham).format("DD/MM/YYYY")
          : "Chưa cập nhật",
        name: benhNhan?.hoTen || "Chưa cập nhật",
        bhyt: benhNhan?.soBHYT || "Chưa cập nhật",
        doctor: bacSi?.hoTen || "Chưa cập nhật",
        status: item.trangThaiTiepNhan || "Chưa khám",
      };
    });
  }, [phieuKhams, benhNhans, bacSis, lichHens]); // Đừng quên thêm lichHens vào dependencies

  // Logic lọc dữ liệu theo ngày
  const filteredRecords = useMemo(() => {
    let records = [...patientRecords];

    if (range && range.length === 2) {
      const [start, end] = range;
      records = records.filter((item) => {
        const currentDate = dayjs(item.date, "DD/MM/YYYY");
        return (
          currentDate.isSame(start, "day") ||
          currentDate.isSame(end, "day") ||
          (currentDate.isAfter(start, "day") &&
            currentDate.isBefore(end, "day"))
        );
      });
    }
    return records;
  }, [patientRecords, range]);

  // Logic thống kê số lượng hiển thị trên thẻ (Card)
  const patientSummary = useMemo(() => {
    const total = patientRecords.length;
    const done = patientRecords.filter((item) =>
      item.status.toLowerCase().includes("đã"),
    ).length;
    const pending = total - done;

    return [
      { key: "total", title: "Tổng bệnh nhân", value: total },
      { key: "done", title: "Đã khám / Thanh toán", value: done },
      { key: "pending", title: "Chưa khám", value: pending },
    ];
  }, [patientRecords]);

  // Cấu hình các cột của bảng
  const columns = [
    { title: "Ngày", dataIndex: "date", key: "date" },
    { title: "Bệnh nhân", dataIndex: "name", key: "name" },
    { title: "BHYT", dataIndex: "bhyt", key: "bhyt", align: "center" },
    { title: "Bác sĩ", dataIndex: "doctor", key: "doctor" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "processing";
        let icon = <MinusCircleOutlined />;
        const textLower = status.toLowerCase();

        if (
          textLower.includes("đã thanh toán") ||
          textLower.includes("đã khám")
        ) {
          color = "success";
          icon = <CheckCircleOutlined />;
        } else if (textLower.includes("chưa")) {
          color = "warning";
          icon = <SyncOutlined spin />;
        }

        return (
          <Tag
            icon={icon}
            color={color}
            style={{
              padding: "4px 8px",
              borderRadius: "4px",
              fontSize: "13px",
            }}
          >
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  return (
    <div className="patientCountPage">
      {contextHolder}

      <Row gutter={[20, 20]} className="summaryRow">
        {patientSummary.map((item) => (
          <Col xs={24} sm={12} md={8} key={item.key}>
            <Card className="summaryCard" bordered={false}>
              <Statistic
                title={item.title}
                value={item.value}
                valueStyle={{ color: "#0b4f84" }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      <Card className="tableCard" bordered={false}>
        <div className="tableHeader">
          <h3>Danh sách bệnh nhân</h3>
          <div style={{ display: "flex", gap: 12 }}>
            <RangePicker
              value={range}
              onChange={(dates) => setRange(dates)}
              format="DD/MM/YYYY"
            />
            <Button
              icon={<ReloadOutlined />}
              type="primary"
              onClick={loadData}
              loading={loading}
            >
              Làm mới
            </Button>
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={filteredRecords}
          loading={loading}
          pagination={{ pageSize: 5 }}
          rowClassName={() => "tableRow"}
          locale={{ emptyText: "Không có bản ghi phù hợp." }}
        />
      </Card>
    </div>
  );
}
