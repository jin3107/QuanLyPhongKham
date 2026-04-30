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
    const key = String(value).toLowerCase().replace(/[_\s-]+/g, "");
    if (["superadmin", "admin", "quanly", "manager"].includes(key)) return "admin";
    if (["bacsi", "doctor"].includes(key)) return "doctor";
    if (["letan", "receptionist"].includes(key)) return "receptionist";
    if (["benhnhan", "patient"].includes(key)) return "patient";
    return null;
  };

  const sessionRole = normalizeRole(
    sessionStorage.getItem("role") ||
      sessionStorage.getItem("userRole") ||
      sessionStorage.getItem("user_role") ||
      sessionStorage.getItem("Role")
  );

  const sessionName =
    sessionStorage.getItem("userName") || sessionStorage.getItem("UserName");

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
    return "/";
  };

  useEffect(() => {
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
        const apiRole = normalizeRole(payload?.role || payload?.Role);
        if (apiRole) setApiRole(apiRole);
        const apiName =
          payload?.userName || payload?.UserName || payload?.name || payload?.Name;
        if (apiName) setApiUserName(apiName);
      } catch {
        // ignore when auth is not ready
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
      { path: "/scheduleview", icon: <CalendarOutlined />, label: "Xem lịch" },
      { path: "/", icon: <ScheduleOutlined />, label: "Đặt lịch" },
      { path: "/cancellation", icon: <StopOutlined />, label: "Huỷ lịch" },
      { path: "/reschedule", icon: <SwapOutlined />, label: "Đổi lịch" },
      { path: "/billing", icon: <DollarOutlined />, label: "Tính chi phí" },
    ];

    const receptionistMenu = [
      { path: "/scheduleview", icon: <CalendarOutlined />, label: "Xem lịch" },
      { path: "/", icon: <ScheduleOutlined />, label: "Đặt lịch" },
      { path: "/cancellation", icon: <StopOutlined />, label: "Huỷ lịch" },
      { path: "/reschedule", icon: <SwapOutlined />, label: "Đổi lịch" },
      { path: "/billing", icon: <DollarOutlined />, label: "Thanh toán" },
    ];

    const adminMenu = [
      { path: "/admin/dashboard", icon: <DashboardOutlined />, label: "Bảng điều khiển" },
      { path: "/admin/user-roles", icon: <TeamOutlined />, label: "Phân quyền" },
      { path: "/admin/doctors", icon: <UserOutlined />, label: "Quản lý bác sĩ" },
    ];

    const doctorMenu = [
      { path: "/doctor/dashboard", icon: <DashboardOutlined />, label: "Bảng điều khiển" },
      { path: "/doctor/patient-info", icon: <UserOutlined />, label: "Thông tin bệnh nhân" },
      { path: "/doctor/prescription", icon: <ScheduleOutlined />, label: "Kê thuốc" },
      { path: "/doctor/service-request", icon: <SwapOutlined />, label: "Yêu cầu dịch vụ" },
      { path: "/doctor/patient-view", icon: <CalendarOutlined />, label: "Lịch sử khám" },
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

  const activeItem = menuItems.find((item) => isActive(item.path)) || menuItems[0];

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
    <Layout className="layout">
      {/* SIDEBAR */}
      <Sider
        collapsed={collapsed}
        className="sider"
        breakpoint="lg" // tự collapse khi màn nhỏ
        collapsedWidth="60" // ẩn hẳn menu
      >
        {/* TOP: TOGGLE */}
        <div className="top">
          <Button
            type="text"
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            icon={<MenuOutlined />}
          />
          {!collapsed && <span className="logo">{roleLabels[role]}</span>}
        </div>

        {/* MENU */}
        <div className="menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${isActive(item.path) ? "active" : ""}`}
            >
              {item.icon && <span className="icon">{item.icon}</span>}
              {!collapsed && item.label}
            </Link>
          ))}
        </div>

        {/* LOGOUT BOTTOM */}
        <div className="logout">
          {!collapsed && <Link to="/logout">Đăng xuất</Link>}
        </div>
      </Sider>

      {/* MAIN */}
      <Layout className="main">
        <Header className="header">
          <div className="left">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="selected-label">
              {(activeItem?.label || roleLabels[role]).toLocaleUpperCase()}
            </div>
          </div>

          <div className="right">
            <Dropdown menu={{ items }} placement="bottomRight">
              <div className="user">
                <span className="name">{userName}</span>
                <Avatar size="medium" className="avatar">
                  {getInitial(userName)}
                </Avatar>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="content">
          <Outlet />
          <Footer className="footer">
            <div className="footer-container">

              {/* LEFT */}
              <div className="footer-col">
                <h3>Hệ thống quản lý phòng khám</h3>
                <p>Hỗ trợ đặt lịch và khám bệnh.</p>
              </div>

              {/* CENTER */}
              <div className="footer-col">
                <h4>Liên hệ</h4>
                <p>Email: htglpk@gmail.com</p>
                <p>Hotline: 0123 456 789</p>
              </div>

              {/* RIGHT */}
              <div className="footer-col">
                <h4>Thông tin</h4>
                <p>Phiên bản: v1.0.0</p>
                <p>© 2026 Hệ thống quản lý phòm khám</p>
              </div>
            </div>
          </Footer>
        </Content>
      </Layout>
    </Layout>
  );
}
