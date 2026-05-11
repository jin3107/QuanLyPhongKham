import "./servicerequest.scss";
import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Row,
  Select,
  Space,
  Table,
  Tag,
  message,
  Spin,
} from "antd";
import {
  searchDanhMucDichVu,
  searchBenhNhan,
  searchLichHen,
  searchBacSi,
} from "../../../apis";
import { createFilter, toLocalDateString } from "../../../helpers";
import {
  normalizeDanhMucDichVu,
  normalizeBenhNhan,
  normalizeLichHen,
  normalizeBacSi,
} from "../../../models";

const STORAGE_KEY = "doctorServiceRequests";

const getSearchRows = (response) => {
  const payload = response?.data ?? {};
  const searchData = payload?.data ?? payload?.Data ?? {};
  return searchData?.data ?? searchData?.Data ?? [];
};

export default function ServiceRequest() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [messageApi, contextHolder] = message.useMessage();

  const loadRequests = () => {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  };

  const saveRequests = (items) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    setRequests(items);
  };

  const resolveDoctorId = (items) => {
    const storedId = sessionStorage.getItem("doctorId");
    if (storedId && items.some((item) => item.maBS === storedId)) return storedId;

    const userName = sessionStorage.getItem("userName") || "";
    const matched =
      items.find((item) => item.email === userName) ||
      items.find((item) => item.hoTen === userName) ||
      (items.length === 1 ? items[0] : null);

    if (matched?.maBS) {
      sessionStorage.setItem("doctorId", matched.maBS);
      return matched.maBS;
    }
    return "";
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const today = new Date();
      const [serviceRes, benhNhanRes, lichHenRes, bacSiRes] = await Promise.all([
        searchDanhMucDichVu(null, 1, 200),
        searchBenhNhan(null, 1, 200),
        searchLichHen([createFilter("Thời gian khám", toLocalDateString(today))], 1, 200),
        searchBacSi(null, 1, 200),
      ]);

      const serviceRows = getSearchRows(serviceRes);
      const benhNhanRows = getSearchRows(benhNhanRes);
      const lichHenRows = getSearchRows(lichHenRes);
      const bacSiRows = getSearchRows(bacSiRes);

      const normalizedServices = Array.isArray(serviceRows)
        ? serviceRows.map(normalizeDanhMucDichVu)
        : [];
      const normalizedPatients = Array.isArray(benhNhanRows)
        ? benhNhanRows.map(normalizeBenhNhan)
        : [];
      const normalizedAppointments = Array.isArray(lichHenRows)
        ? lichHenRows.map(normalizeLichHen)
        : [];
      const normalizedDoctors = Array.isArray(bacSiRows)
        ? bacSiRows.map(normalizeBacSi)
        : [];

      const doctorId = resolveDoctorId(normalizedDoctors);
      const filteredAppointments = doctorId
        ? normalizedAppointments.filter((item) => item.maBS === doctorId)
        : normalizedAppointments;
      const appointmentPatientIds = new Set(
        filteredAppointments.map((item) => item.maBN).filter(Boolean),
      );
      const appointmentPatients = normalizedPatients.filter((p) =>
        appointmentPatientIds.has(p.maBN),
      );

      setServices(normalizedServices);
      setPatients(appointmentPatients.length ? appointmentPatients : normalizedPatients);
      setRequests(loadRequests());
    } catch {
      messageApi.error("Không tải được danh mục dịch vụ.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const serviceOptions = useMemo(() => {
    return services.map((service) => ({
      value: service.maDV,
      label: service.tenDV,
    }));
  }, [services]);

  const patientOptions = useMemo(() => {
    return patients.map((patient) => ({
      value: patient.maBN,
      label: patient.hoTen,
    }));
  }, [patients]);

  const handleSubmit = (values) => {
    const selectedPatient = patients.find((p) => p.maBN === values.patient);
    const selectedServices = services.filter((service) =>
      values.services.includes(service.maDV),
    );

    const newRequest = {
      key: `DV-${Date.now()}`,
      patient: selectedPatient?.hoTen || "Bệnh nhân",
      services: selectedServices.map((s) => s.tenDV).join(", "),
      status: "Đã gửi yêu cầu",
    };

    const nextRequests = [newRequest, ...requests];
    saveRequests(nextRequests);
    form.resetFields();
    messageApi.success("Đã gửi yêu cầu dịch vụ.");
  };

  const columns = [
    { title: "Bệnh nhân", dataIndex: "patient", key: "patient" },
    { title: "Dịch vụ", dataIndex: "services", key: "services" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color="processing">{status}</Tag>,
    },
  ];

  return (
    <div className="doctor-service-request-page">
      {contextHolder}
      <div className="doctor-page-header">
        <div>
          <p>
            Chỉ định dịch vụ bổ sung như xét nghiệm, X-quang, siêu âm hoặc tiêm
            chủng cho bệnh nhân đang khám.
          </p>
        </div>
      </div>

      <Spin spinning={loading} description="Đang tải...">
        <Row gutter={[16, 16]}>
          <Col xs={24} xl={9}>
            <Card title="Yêu cầu dịch vụ mới" className="doctor-card">
              <Alert
                className="request-alert"
                type="info"
                showIcon
                message="Yêu cầu sẽ được chuyển đến bộ phận thực hiện dịch vụ và cập nhật vào hồ sơ khám."
              />

              <Form
                className="doctor-form"
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
              >
                <div className="note-group">
                  <label>Tên bệnh nhân</label>
                  <Form.Item
                    name="patient"
                    rules={[{ required: true, message: "Chọn bệnh nhân" }]}
                  >
                    <Select
                      showSearch
                      optionFilterProp="label"
                      options={patientOptions}
                      notFoundContent="Không có bệnh nhân"
                    />
                  </Form.Item>
                </div>
                <div className="note-group">
                  <label>Loại dịch vụ</label>
                  <Form.Item
                    name="services"
                    rules={[{ required: true, message: "Chọn dịch vụ" }]}
                  >
                    <Select
                      mode="multiple"
                      showSearch
                      optionFilterProp="label"
                      options={serviceOptions}
                      notFoundContent="Chưa có dịch vụ trong danh mục"
                    />
                  </Form.Item>
                </div>
                <Space wrap>
                  <Button type="primary" htmlType="submit">
                    Gửi yêu cầu
                  </Button>
                  <Button onClick={() => form.resetFields()}>Xóa</Button>
                </Space>
              </Form>
            </Card>
          </Col>

          <Col xs={24} xl={15}>
            <Card title="Yêu cầu dịch vụ trong ngày" className="doctor-card">
              <Table
                className="doctor-table"
                columns={columns}
                dataSource={requests}
                pagination={false}
                scroll={{ x: 720 }}
                locale={{ emptyText: "Chưa có yêu cầu dịch vụ." }}
              />
            </Card>
          </Col>
        </Row>
      </Spin>
    </div>
  );
}
