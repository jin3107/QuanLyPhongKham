import "./logout.scss";
import heroImage from "../../../assets/image/Hospital.jpg";
import logo from "../../../assets/image/LogoBYT.png";

export default function Logout() {
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
					<h1>Hoàn tất phiên làm việc</h1>
					<p>
						Bạn có thể đăng xuất ngay hoặc quay lại để tiếp tục xử lý các yêu cầu
						còn dở.
					</p>
					<img className="auth-illustration" src={heroImage} alt="Bệnh viện" />
				</aside>
				<section className="auth-card">
					<div className="auth-card-header">
						<h1>Đăng xuất</h1>
						<p>Xác nhận đăng xuất để bảo vệ dữ liệu phòng khám.</p>
					</div>
					<div className="logout-panel">
						<div className="logout-icon">!</div>
						<div>
							<h2>Bạn muốn đăng xuất?</h2>
							<p>Lưu lại mọi thay đổi trước khi kết thúc phiên.</p>
						</div>
					</div>
					<div className="auth-actions">
						<button className="auth-button" type="button">
							Xác nhận đăng xuất
						</button>
						<button className="auth-button secondary" type="button">
							Quay lại
						</button>
					</div>
					<p className="auth-note">Bạn có thể đăng nhập lại bất cứ lúc nào.</p>
				</section>
			</div>
		</div>
	);
}
