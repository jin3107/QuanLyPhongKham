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
  UserAddOutlined,
  FileSearchOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import logo from "../assets/image/LogoBYT.png";

const { Header, Sider, Content, Footer } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", icon: <HomeOutlined />, label: "Màn hình chính" },
    //{ path: "/scheduleView", icon: <CalendarOutlined />, label: "Xem lịch" },
    //{ path: "/", icon: <ScheduleOutlined />, label: "Đặt lịch" },
    { path: "/patientIntake", icon: <UserAddOutlined />, label: "Đăng ký hồ sơ bệnh án" },
    { path: "/historyView", icon: <FileSearchOutlined />, label: "Lịch sử bệnh án" },
    //{ path: "/cancellation", icon: <StopOutlined />, label: "Huỷ lịch" },
    //{ path: "/reschedule", icon: <SwapOutlined />, label: "Đổi lịch" },
    //{ path: "/billing", icon: <DollarOutlined />, label: "Tính chi phí" },
    ];

  const activeItem = menuItems.find((item) => item.path === location.pathname) || menuItems[0];

  // lấy chữ cái đầu tiên của tên user
  const userName = " Trần Phước Minh";
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
          {!collapsed && <span className="logo">Lễ tân</span>}
        </div>

        {/* MENU */}
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

        {/* LOGOUT BOTTOM */}
        <div className="logout">{!collapsed && "Đăng xuất"}</div>
      </Sider>

      {/* MAIN */}
      <Layout className="main">
        <Header className="header">
          <div className="left">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
            <div className="selected-label">
              {activeItem?.label.toLocaleUpperCase()}
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
