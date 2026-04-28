import "./register.scss";
import heroImage from "../../../assets/image/img2.png";
import logo from "../../../assets/image/LogoBYT.png";
import { Link } from "react-router-dom";

export default function Register() {
	return (
		<div className="auth-page register-page">
			<div className="auth-shell">
				<aside className="auth-visual">
					<div className="auth-badge">
						<img src={logo} alt="Bộ Y tế" />
						<div>
							<span className="auth-badge-title">Hệ thống quản lý phòng khám</span>
							<span className="auth-badge-subtitle">Đăng ký tài khoản quản trị</span>
						</div>
					</div>
					<h1>Tạo tài khoản mới</h1>
					<p>
						Bắt đầu quản lý phòng khám với đầy đủ thông tin bác sĩ, phân quyền và
						lịch làm việc.
					</p>
					<img className="auth-illustration" src={heroImage} alt="Phòng khám" />
					<div className="auth-highlights">
						<div>
							<h4>Quản lý rõ ràng</h4>
							<span>Thiết lập phân quyền ngay từ đầu.</span>
						</div>
						<div>
							<h4>An toàn dữ liệu</h4>
							<span>Thông tin bệnh nhân được lưu trữ tập trung.</span>
						</div>
					</div>
				</aside>
				<section className="auth-card">
					<div className="auth-card-header">
						<h1>Đăng ký</h1>
						<p>Nhập thông tin cơ bản để khởi tạo tài khoản.</p>
					</div>
					<form className="auth-form">
						<div className="auth-grid">
							<label className="auth-field">
								<span>Họ và tên</span>
								<input type="text" placeholder="Nhập họ tên" />
							</label>
							<label className="auth-field">
								<span>Số điện thoại</span>
								<input type="text" placeholder="Nhập số điện thoại" />
							</label>
						</div>
						<label className="auth-field">
							<span>Email</span>
							<input type="email" placeholder="Nhập email" />
						</label>
						<div className="auth-grid">
							<label className="auth-field">
								<span>Mật khẩu</span>
								<input type="password" placeholder="Tạo mật khẩu" />
							</label>
							<label className="auth-field">
								<span>Xác nhận</span>
								<input type="password" placeholder="Nhập lại mật khẩu" />
							</label>
						</div>
						<div className="auth-row">
							<label className="auth-check">
								<input type="checkbox" />
								Đồng ý với điều khoản sử dụng
							</label>
						</div>
						<button className="auth-button" type="button">
							Tạo tài khoản
						</button>
						<p className="auth-note">
							Bạn sẽ nhận được email xác nhận để kích hoạt tài khoản quản lý.
						</p>
					</form>
					<div className="auth-footer">
						<span>Đã có tài khoản?</span>
						<Link className="auth-link" to="/login">
							Đăng nhập
						</Link>
					</div>
				</section>
			</div>
		</div>
	);
}
