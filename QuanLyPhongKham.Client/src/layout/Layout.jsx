import "./layout.scss";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Button, Dropdown, Avatar } from "antd";
import {
  MenuOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  StopOutlined,
  SwapOutlined,
  DollarOutlined,
  LogoutOutlined,
  DashboardOutlined,
  FileAddOutlined,
  FileSearchOutlined,
  ExperimentOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import logo from "../assets/image/LogoBYT.png";

const { Header, Sider, Content, Footer } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const patientMenuItems = [
    { path: "/scheduleView", icon: <CalendarOutlined />, label: "Xem lịch" },
    { path: "/", icon: <ScheduleOutlined />, label: "Đặt lịch" },
    { path: "/cancellation", icon: <StopOutlined />, label: "Hủy lịch" },
    { path: "/reschedule", icon: <SwapOutlined />, label: "Đổi lịch" },
    { path: "/billing", icon: <DollarOutlined />, label: "Tính chi phí" },
  ];

  const doctorMenuItems = [
    { path: "/doctor", icon: <DashboardOutlined />, label: "Tổng quan" },
    {
      path: "/doctor/patient-info",
      icon: <FileAddOutlined />,
      label: "Ghi thông tin bệnh nhân",
    },
    {
      path: "/doctor/patient-view",
      icon: <FileSearchOutlined />,
      label: "Xem thông tin bệnh nhân",
    },
    {
      path: "/doctor/service-request",
      icon: <ExperimentOutlined />,
      label: "Yêu cầu dịch vụ",
    },
    {
      path: "/doctor/prescription",
      icon: <MedicineBoxOutlined />,
      label: "Kê thuốc",
    },
  ];

  const isDoctorArea = location.pathname.toLowerCase().startsWith("/doctor");
  const menuItems = isDoctorArea ? doctorMenuItems : patientMenuItems;
  const activeItem =
    menuItems.find((item) => location.pathname === item.path) || menuItems[0];

  const userName = isDoctorArea ? "BS Nguyễn Minh An" : "Huỳnh Như";
  const getInitial = (name) => {
    return name?.trim().split(" ").pop().charAt(0).toUpperCase();
  };

  const items = [
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng xuất",
    },
  ];

  return (
    <Layout className="layout">
      <Sider
        collapsed={collapsed}
        className="sider"
        breakpoint="lg"
        collapsedWidth="60"
      >
        <div className="top">
          <Button
            type="text"
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            icon={<MenuOutlined />}
          />
          {!collapsed && (
            <span className="logo">{isDoctorArea ? "Bác sĩ" : "Bệnh nhân"}</span>
          )}
        </div>

        <div className="menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
            >
              {item.icon && <span className="icon">{item.icon}</span>}
              {!collapsed && item.label}
            </Link>
          ))}
        </div>

        <div className="logout">{!collapsed && "Đăng xuất"}</div>
      </Sider>

      <Layout className="main">
        <Header className="header">
          <div className="left">
            <div className="logo">
              <img src={logo} alt="Logo Bộ Y tế" />
            </div>
            <div className="selected-label">
              {activeItem?.label.toLocaleUpperCase("vi-VN")}
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
              <div className="footer-col">
                <h3>Hệ thống quản lý phòng khám</h3>
                <p>Hỗ trợ tiếp nhận, khám bệnh, kê đơn và thanh toán.</p>
              </div>

              <div className="footer-col">
                <h4>Liên hệ</h4>
                <p>Email: htglpk@gmail.com</p>
                <p>Hotline: 0123 456 789</p>
              </div>

              <div className="footer-col">
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
