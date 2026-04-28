import "./login.scss";
import heroImage from "../../../assets/image/img1.png";
import logo from "../../../assets/image/LogoBYT.png";
import { Link } from "react-router-dom";

export default function Login() {
	return (
		<div className="auth-page login-page">
			<div className="auth-shell">
				<aside className="auth-visual">
					<div className="auth-badge">
						<img src={logo} alt="Bộ Y tế" />
						<div>
							<span className="auth-badge-title">Hệ thống quản lý phòng khám</span>
							<span className="auth-badge-subtitle">Đăng nhập nhanh, thao tác gọn</span>
						</div>
					</div>
					<h1>Chào mừng trở lại</h1>
					<p>
						Quản lý lịch hẹn, bệnh nhân và tài chính trong một không gian làm việc
						thống nhất.
					</p>
					<img className="auth-illustration" src={heroImage} alt="Bác sĩ" />
					<div className="auth-highlights">
						<div>
							<h4>Lịch hẹn rõ ràng</h4>
							<span>Tập trung vào ca khám quan trọng nhất.</span>
						</div>
						<div>
							<h4>Báo cáo nhanh</h4>
							<span>Thống kê được gom gọn trong một bước.</span>
						</div>
					</div>
				</aside>
				<section className="auth-card">
					<div className="auth-card-header">
						<h1>Đăng nhập</h1>
						<p>Nhập thông tin tài khoản để tiếp tục làm việc.</p>
					</div>
					<form className="auth-form">
						<label className="auth-field">
							<span>Tài khoản</span>
							<input type="text" placeholder="Email hoặc số điện thoại" />
						</label>
						<label className="auth-field">
							<span>Mật khẩu</span>
							<input type="password" placeholder="Nhập mật khẩu" />
						</label>
						<div className="auth-row">
							<label className="auth-check">
								<input type="checkbox" />
								Ghi nhớ đăng nhập
							</label>
							<button className="auth-link" type="button">
								Quên mật khẩu?
							</button>
						</div>
						<button className="auth-button" type="button">
							Đăng nhập
						</button>
					</form>
					<div className="auth-footer">
						<span>Chưa có tài khoản?</span>
						<Link className="auth-link" to="/register">
							Đăng ký
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
}
