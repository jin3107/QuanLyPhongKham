import "./layout.scss";
import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Layout, Button, Dropdown, Avatar } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  StopOutlined,
  SwapOutlined,
  DollarOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,   
  FileAddOutlined,
  HistoryOutlined,
  FileSearchOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
  BarChartOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import logo from "../assets/image/LogoBYT.png";
import apiClient from "../config/axios";

const { Header, Sider, Content, Footer } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname.toLowerCase();
  const [apiRole, setApiRole] = useState(null);
  const [apiUserName, setApiUserName] = useState(null);

  const normalizeRole = (value) => {
    if (!value) return null;
    const key = String(value)
      .toLowerCase()
      .replace(/[_\s-]+/g, "");
    if (["superadmin", "admin", "quanly", "manager"].includes(key))
      return "admin";
    if (["bacsi", "doctor"].includes(key)) return "doctor";
    if (["letan", "receptionist"].includes(key)) return "receptionist";
    if (["benhnhan", "patient"].includes(key)) return "patient";
    return null;
  };

  const sessionRole = useMemo(
    () =>
      normalizeRole(
        sessionStorage.getItem("role") ||
          sessionStorage.getItem("userRole") ||
          sessionStorage.getItem("user_role") ||
          sessionStorage.getItem("Role"),
      ),
    [],
  );

  const sessionName = useMemo(
    () =>
      sessionStorage.getItem("userName") || sessionStorage.getItem("UserName"),
    [],
  );

  const authRole = apiRole || sessionRole;
  const role = authRole || "patient";
  const userName = apiUserName || sessionName || "Người dùng";

  const roleLabels = {
    admin: "Quản lý",
    doctor: "Bác sĩ",
    receptionist: "Lễ tân",
    patient: "Bệnh nhân",
  };

  const getDefaultRoute = (roleValue) => {
    if (roleValue === "admin") return "/admin/dashboard";
    if (roleValue === "doctor") return "/doctor/dashboard";
    if (roleValue === "receptionist") return "/receptionist/dashboard";
    return "/patient/dashboard";
  };

  useEffect(() => {
    const storedRole =
      sessionStorage.getItem("role") ||
      sessionStorage.getItem("userRole") ||
      sessionStorage.getItem("user_role") ||
      sessionStorage.getItem("Role");
    const storedName =
      sessionStorage.getItem("userName") || sessionStorage.getItem("UserName");

    // có session rồi thì skip
    if (storedRole && storedName) return;

    const token =
      sessionStorage.getItem("accessToken") ||
      sessionStorage.getItem("AccessToken");
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const loadProfile = async () => {
      try {
        const response = await apiClient.get("/authentication/me", {
          headers,
          withCredentials: true,
        });
        const raw = response?.data;
        if (!raw) return;
        if (raw?.isSuccess === false || raw?.IsSuccess === false) return;
        const payload = raw?.data || raw?.Data || raw;
        const resolvedRole = normalizeRole(payload?.role || payload?.Role);
        if (resolvedRole) setApiRole(resolvedRole);
        const resolvedName =
          payload?.userName ||
          payload?.UserName ||
          payload?.name ||
          payload?.Name;
        if (resolvedName) setApiUserName(resolvedName);
      } catch {
        // ignore
      }
    };

    loadProfile();
  }, []);

  useEffect(() => {
    const isAdminPath = pathname.startsWith("/admin");
    const isDoctorPath = pathname.startsWith("/doctor");
    const isReceptionistPath = pathname.startsWith("/receptionist");

    if ((isAdminPath || isDoctorPath || isReceptionistPath) && !authRole) {
      navigate("/login", { replace: true });
      return;
    }

    if (isAdminPath && authRole && authRole !== "admin") {
      navigate(getDefaultRoute(authRole), { replace: true });
      return;
    }

    if (isDoctorPath && authRole && authRole !== "doctor") {
      navigate(getDefaultRoute(authRole), { replace: true });
      return;
    }

    if (isReceptionistPath && authRole && authRole !== "receptionist") {
      navigate(getDefaultRoute(authRole), { replace: true });
    }
  }, [authRole, navigate, pathname]);

  const menuItems = useMemo(() => {
    const patientMenu = [
      {
        path: "/patient/dashboard",
        icon: <DashboardOutlined />,
        label: "Trang chính",
      },
      { path: "/scheduleview", icon: <CalendarOutlined />, label: "Xem lịch" },
      // Đường dẫn cũ: "/". Theo tài liệu, đặt lịch là một màn hình chức năng riêng.
      { path: "/booking", icon: <ScheduleOutlined />, label: "Đặt lịch" },
      { path: "/cancellation", icon: <StopOutlined />, label: "Huỷ lịch" },
      { path: "/reschedule", icon: <SwapOutlined />, label: "Đổi lịch" }
    ];

    const receptionistMenu = [
      {
        path: "/receptionist/dashboard",
        icon: <DashboardOutlined />,
        label: "Trang chính",
      },
      {
        path: "/receptionist/medical-record",
        icon: <FileAddOutlined />,
        label: "Đăng ký hồ sơ",
      },
      {
        path: "/receptionist/patient-intake",
        icon: <UsergroupAddOutlined />,
        label: "Tiếp nhận",
      },
      {
        path: "/receptionist/history-view",
        icon: <HistoryOutlined />,
        label: "Lịch sử khám",
      },
      { path: "/payment", icon: <CreditCardOutlined />, label: "Thanh toán" },
    ];

    const adminMenu = [
      {
        path: "/admin/dashboard",
        icon: <DashboardOutlined />,
        label: "Bảng điều khiển",
      },
      {
        path: "/admin/user-roles",
        icon: <TeamOutlined />,
        label: "Quản lý Phân quyền",
      },
      {
        path: "/admin/doctors",
        icon: <UserOutlined />,
        label: "Quản lý bác sĩ",
      },
      {
        path: "/admin/working-schedule",
        icon: <ScheduleOutlined />,
        label: "Phân công lịch",
      },
      {
        path: "/revenue",
        icon: <DollarOutlined />,
        label: "Thống kê doanh thu",
      },
      {
        path: "/doctoractivity",
        icon: <LineChartOutlined />,
        label: "Hoạt động bác sĩ",
      },
      {
        path: "/patientcount",
        icon: <BarChartOutlined />,
        label: "Số lượng bệnh nhân",
      },
    ];

    const doctorMenu = [
      {
        path: "/doctor/dashboard",
        icon: <DashboardOutlined />,
        label: "Bảng điều khiển",
      },
      {
        path: "/doctor/patient-info",
        icon: <FileAddOutlined />,
        label: "Ghi thông tin",
      },
      {
        path: "/doctor/prescription",
        icon: <MedicineBoxOutlined />,
        label: "Kê thuốc",
      },
      {
        path: "/doctor/service-request",
        icon: <ExperimentOutlined />,
        label: "Yêu cầu dịch vụ",
      },
      {
        path: "/doctor/patient-view",
        icon: <FileSearchOutlined />,
        label: "Xem thông tin",
      },
    ];

    if (role === "admin") return adminMenu;
    if (role === "doctor") return doctorMenu;
    if (role === "receptionist") return receptionistMenu;
    return patientMenu;
  }, [role]);

  const isActive = (itemPath) => {
    if (itemPath === "/") return pathname === "/";
    return pathname.startsWith(itemPath);
  };

  const activeItem =
    menuItems.find((item) => isActive(item.path)) || menuItems[0];

  // lấy chữ cái đầu tiên của tên user
  const getInitial = (name) => {
    return name?.trim().split(" ").pop().charAt(0).toUpperCase();
  };

  const items = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: <Link to="/logout">Đăng xuất</Link>,
    },
  ]; 
  return (
    <Layout className="app-layout">
      {/* SIDEBAR */}
      <Sider
        collapsed={collapsed}
        className="app-sider"
        breakpoint="lg" // tự collapse khi màn nhỏ
        width={240}
        collapsedWidth={60}
      >
        {/* TOP: TOGGLE */}
        <div className="app-sider-top">
          <Button
            type="text"
            className="app-toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            icon={<MenuOutlined />}
          />
          {!collapsed && (
            <span className="app-role-label">{roleLabels[role]}</span>
          )}
        </div>

        {/* MENU */}
        <div className="app-menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`app-menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon && <span className="app-menu-icon">{item.icon}</span>}
              {!collapsed && item.label}
            </Link>
          ))}
        </div>

        {/* LOGOUT BOTTOM */}
        <div className="app-logout">
          {!collapsed && <Link to="/logout">Đăng xuất</Link>}
        </div>
      </Sider>

      {/* MAIN */}
      <Layout className="app-main">
        <Header className="app-header">
          <div className="app-header-left">
            <div className="app-header-logo">
              <img src={logo} alt="Hệ thống quản lý phòng khám" loading="eager" decoding="async" />
            </div>
            <div className="app-selected-label">
              {(activeItem?.label || roleLabels[role]).toLocaleUpperCase()}
            </div>
          </div>

          <div className="app-header-right">
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="app-user">
                <span className="app-user-name">{userName}</span>
                <Avatar size="medium" className="app-avatar">
                  {getInitial(userName)}
                </Avatar>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="app-content">
          <Outlet />
          <Footer className="app-footer">
            <div className="app-footer-container">
              {/* LEFT */}
              <div className="app-footer-col">
                <h3>Hệ thống quản lý phòng khám</h3>
                <p>Hỗ trợ tiếp nhận, khám bệnh, kê đơn và thanh toán.</p>
              </div>

              {/* CENTER */}
              <div className="app-footer-col">
                <h4>Liên hệ</h4>
                <p>Email: htglpk@gmail.com</p>
                <p>Hotline: 0123 456 789</p>
              </div>

              {/* RIGHT */}
              <div className="app-footer-col">
                <h4>Thông tin</h4>
                <p>Phiên bản: v1.0.0</p>
                <p>© 2026 Hệ thống quản lý phòng khám</p>
              </div>
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
