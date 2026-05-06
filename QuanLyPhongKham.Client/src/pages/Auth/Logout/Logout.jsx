import "../auth.scss";
import "./logout.scss";
import logoutImage from "../../../assets/image/logout.webp";
import logo from "../../../assets/image/LogoBYT.png";
import { useNavigate } from "react-router-dom";
import { logout as logoutApi } from "../../../apis";
import { useState } from "react";
import { Alert, Button, Card, Space, Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

export default function Logout() {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleLogout = async () => {
		setError("");
		setLoading(true);
		try {
			await logoutApi();
		} catch {
			// ignore when backend is not ready
		}
		sessionStorage.clear();
		setLoading(false);
		navigate("/login");
	};

	return (
		<div className="auth-page logout-page">
			<div className="auth-shell">
				<aside className="auth-visual">
					<div className="auth-badge">
						<img src={logo} alt="Bộ Y tế" />
						<div>
							<span className="auth-badge-title">Hệ thống quản lý phòng khám</span>
							<span className="auth-badge-subtitle">Kết thúc phiên làm việc</span>
						</div>
					</div>
					<Title level={2}>Hoàn tất phiên làm việc</Title>
					<Paragraph>
						Bạn có thể đăng xuất ngay hoặc quay lại để tiếp tục xử lý các yêu cầu
						còn dở.
					</Paragraph>
					<img className="auth-illustration" src={logoutImage} alt="Bệnh viện" />
				</aside>
				<Card className="auth-card" variant="borderless">
					<div className="auth-card-header">
						<Title level={2}>Đăng xuất</Title>
						<Paragraph>Xác nhận đăng xuất để bảo vệ dữ liệu phòng khám.</Paragraph>
					</div>
					<Card className="logout-panel" size="small">
						<Space align="start">
							<div className="logout-icon">
								<ExclamationCircleOutlined />
							</div>
							<div>
								<Title level={4}>Bạn muốn đăng xuất?</Title>
								<Text type="secondary">Lưu lại mọi thay đổi trước khi kết thúc phiên.</Text>
							</div>
						</Space>
					</Card>
					<Space className="auth-actions" wrap>
						<Button type="primary" onClick={handleLogout} loading={loading}>
							Xác nhận đăng xuất
						</Button>
						<Button onClick={() => navigate(-1)}>Quay lại</Button>
					</Space>
					{error && <Alert message={error} type="error" showIcon />}
					<Paragraph className="auth-note">Bạn có thể đăng nhập lại bất cứ lúc nào.</Paragraph>
				</Card>
			</div>
		</div>
	);
}
