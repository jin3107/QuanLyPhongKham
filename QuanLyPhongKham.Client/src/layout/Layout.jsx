import "./layout.scss";
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Layout, Button, Dropdown, Avatar } from "antd";
import {
  HomeOutlined,
  MenuOutlined,
  CalendarOutlined,
  ScheduleOutlined,
  StopOutlined,
  SwapOutlined,
  DollarOutlined,
  LogoutOutlined,
  FileAddOutlined,
  UserAddOutlined,
  HistoryOutlined,
  CreditCardOutlined,
} from "@ant-design/icons";
import logo from "../assets/image/LogoBYT.png";

const { Header, Sider, Content, Footer } = Layout;

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/Receptionist/Dashboard", icon: <HomeOutlined />, label: "Màn hình chính bệnh nhân" },
    { path: "/scheduleView", icon: <CalendarOutlined />, label: "Xem lịch khám" },
    { path: "/", icon: <ScheduleOutlined />, label: "Đặt lịch" },
    { path: "/reschedule", icon: <SwapOutlined />, label: "Đổi lịch" },
    { path: "/cancellation", icon: <StopOutlined />, label: "Huỷ lịch" },

  // { path: "/register", icon: <FileAddOutlined />, label: "Đăng ký hồ sơ bệnh án" },
  // { path: "/Receptionist/PatientIntake", icon: <UserAddOutlined />, label: "Tiếp nhận bệnh nhân" },
  // { path: "/history", icon: <HistoryOutlined />, label: "Xem lịch sử khám" },
  // { path: "/payment", icon: <CreditCardOutlined />, label: "Thanh toán" },
  ];

  const [activeItem, setActiveItem] = useState(menuItems[0]);

  // lấy chữ cái đầu tiên của tên user
  const userName = "Trần Phước Minh";
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
          width={240}
  collapsedWidth={60}
      >
        {/* TOP: TOGGLE */}
        <div className="top">
          <Button
            type="text"
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            icon={<MenuOutlined />}
          />
          {!collapsed && <span className="logo">Bệnh nhân</span>}
        </div>

        {/* MENU */}
        <div className="menu">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setActiveItem(item)}
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
