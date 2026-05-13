import { useCallback, useEffect, useMemo, useState } from "react";
import { Card, Table, Tag, Empty, Spin, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import "./historyview.scss";

import { searchBenhNhan, searchLichHen, searchPhieuKham } from "../../../apis";
import { searchHoaDon } from "../../../apis/HoaDonAPI";

import {
  normalizeBenhNhan,
  normalizeLichHen,
  normalizePhieuKham,
} from "../../../models";

import { normalizeHoaDon } from "../../../models/HoaDon";

const getSearchRows = (response) => {
  const payload = response?.data ?? {};
  const searchData = payload?.data ?? payload?.Data ?? {};

  return searchData?.data ?? searchData?.Data ?? [];
};

const toDateValue = (value) => {
  if (!value) return null;

  if (value?.toDate) {
    return value.toDate();
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? null : date;
};

const formatDate = (value) => {
  const date = toDateValue(value);

  if (!date) return "";

  return dayjs(date).format("DD/MM/YYYY");
};

export default function HistoryView() {
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setLoading] = useState(false);

  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [phieuKhams, setPhieuKhams] = useState([]);
  const [hoaDons, setHoaDons] = useState([]);

  const [patientId, setPatientId] = useState(
    sessionStorage.getItem("patientId") || "",
  );

  const resolvePatientId = (items) => {
    const storedId = sessionStorage.getItem("patientId");

    if (storedId && items.some((item) => item.maBN === storedId)) {
      return storedId;
    }

    const userName =
      sessionStorage.getItem("userName") ||
      sessionStorage.getItem("UserName") ||
      "";

    if (!userName) return "";

    const matched =
      items.find((item) => item.soDienThoai === userName) ||
      items.find((item) => item.hoTen === userName);

    if (matched?.maBN) {
      sessionStorage.setItem("patientId", matched.maBN);
      return matched.maBN;
    }

    return "";
  };

  const loadData = useCallback(async () => {
    setLoading(true);

    try {
      const [benhNhanRes, lichHenRes, phieuKhamRes, hoaDonRes] =
        await Promise.all([
          searchBenhNhan(null, 1, 200),
          searchLichHen(null, 1, 200),
          searchPhieuKham(null, 1, 200),
          searchHoaDon(null, 1, 200),
        ]);

      const benhNhanRows = getSearchRows(benhNhanRes);
      const lichHenRows = getSearchRows(lichHenRes);
      const phieuKhamRows = getSearchRows(phieuKhamRes);
      const hoaDonRows = getSearchRows(hoaDonRes);

      const normalizedPatients = Array.isArray(benhNhanRows)
        ? benhNhanRows.map(normalizeBenhNhan)
        : [];

      setPatients(normalizedPatients);

      setAppointments(
        Array.isArray(lichHenRows) ? lichHenRows.map(normalizeLichHen) : [],
      );

      setPhieuKhams(
        Array.isArray(phieuKhamRows)
          ? phieuKhamRows.map(normalizePhieuKham)
          : [],
      );

      setHoaDons(
        Array.isArray(hoaDonRows) ? hoaDonRows.map(normalizeHoaDon) : [],
      );

      const resolvedId = resolvePatientId(normalizedPatients);

      if (resolvedId) {
        setPatientId(resolvedId);
      }
    } catch {
      messageApi.error("Không tải được lịch sử khám.");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const currentPatient = useMemo(
    () => patients.find((item) => item.maBN === patientId) || null,
    [patients, patientId],
  );

  const appointmentIds = useMemo(() => {
    if (!patientId) return new Set();

    return new Set(
      appointments
        .filter((item) => item.maBN === patientId)
        .map((item) => item.maLH),
    );
  }, [appointments, patientId]);

  const getStatusText = (value) => (value || "").toLowerCase();

  const isPaidPhieu = useCallback(
    (phieu) => {
      const status = getStatusText(phieu?.trangThaiTiepNhan);

      if (status.includes("đã thanh toán")) {
        return true;
      }

      const invoice = hoaDons.find((h) => h.maPK === phieu.maPK);

      return getStatusText(invoice?.trangThaiThanhToan).includes("đã");
    },
    [hoaDons],
  );

  const scopedPhieuKhams = useMemo(() => {
    if (!patientId) return phieuKhams;

    return phieuKhams.filter((item) => appointmentIds.has(item.maLH));
  }, [phieuKhams, patientId, appointmentIds]);

  const paidRecords = useMemo(() => {
    return scopedPhieuKhams
      .filter(isPaidPhieu)
      .sort((a, b) => toDateValue(b.ngayKham) - toDateValue(a.ngayKham));
  }, [scopedPhieuKhams, isPaidPhieu]);

  const patientName =
    currentPatient?.hoTen || paidRecords[0]?.tenBenhNhan || "Chưa cập nhật";

  const tableRows = useMemo(() => {
    return paidRecords.map((item) => ({
      key: item.maPK || item.maLH,
      benhNhan: patientName,
      ngayKham: formatDate(item.ngayKham),
      bacSi: item.tenBacSi || "-",
      chuanDoan: item.chuanDoan || "—",
      huongDieuTri: item.huongDieuTri || "—",
      trangThai: item.trangThaiTiepNhan || "Đã thanh toán",
    }));
  }, [paidRecords, patientName]);

  const columns = [
    {
      title: "Bệnh nhân",
      dataIndex: "benhNhan",
      key: "benhNhan",
      width: 220,
    },
    {
      title: "Ngày khám",
      dataIndex: "ngayKham",
      key: "ngayKham",
      width: 140,
    },
    {
      title: "Bác sĩ",
      dataIndex: "bacSi",
      key: "bacSi",
      width: 220,
    },
    {
      title: "Chẩn đoán",
      dataIndex: "chuanDoan",
      key: "chuanDoan",
      ellipsis: true,
    },
    {
      title: "Hướng điều trị",
      dataIndex: "huongDieuTri",
      key: "huongDieuTri",
      ellipsis: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "trangThai",
      key: "trangThai",
      width: 180,
      render: (value) => (
        <Tag icon={<CheckCircleOutlined />} color="success">
          {value || "Đã thanh toán"}
        </Tag>
      ),
    },
  ];

  return (
    <div className="history-view-page">
      {contextHolder}
      <p>Danh sách các lần khám đã thanh toán.</p>

      <Spin spinning={loading} description="Đang tải...">
        <Card className="records-card">
          {tableRows.length ? (
            <Table
              columns={columns}
              dataSource={tableRows}
              rowKey="key"
              className="records-table"
              scroll={{ x: 1100 }}
              pagination={{
                pageSize: 5,
                showSizeChanger: true,
                showTotal: (total) => `Tổng ${total} lần khám`,
              }}
            />
          ) : (
            <Empty description="Chưa có lịch sử khám đã thanh toán" />
          )}
        </Card>
      </Spin>
    </div>
  );
}
