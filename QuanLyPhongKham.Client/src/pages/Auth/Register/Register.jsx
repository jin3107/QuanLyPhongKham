import "./register.scss";
import heroImage from "../../../assets/image/img2.png";
import logo from "../../../assets/image/LogoBYT.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register as registerApi } from "../../../apis";

export default function Register() {
	const navigate = useNavigate();
	const [form, setForm] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		password: "",
		confirmPassword: "",
		agree: false,
	});
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (field) => (event) => {
		const value = field === "agree" ? event.target.checked : event.target.value;
		setForm((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		if (!form.agree) {
			setError("Vui lòng đồng ý với điều khoản sử dụng.");
			return;
		}
		setLoading(true);
		try {
			const response = await registerApi({
				Name: form.name,
				Email: form.email,
				PhoneNumber: form.phoneNumber,
				Password: form.password,
				ConfirmPassword: form.confirmPassword,
			});
			const result = response?.data;
			if (!result?.isSuccess) {
				setError(result?.message || "Đăng ký thất bại.");
				return;
			}
			const data = result.data || {};
			const accessToken = data.accessToken || data.AccessToken;
			const role = data.role || data.Role;
			const name = data.userName || data.UserName || data.name || data.Name;

			if (accessToken) sessionStorage.setItem("accessToken", accessToken);
			if (role) sessionStorage.setItem("role", role);
			if (name) sessionStorage.setItem("userName", name);

			navigate("/login");
		} catch {
			setError("Không thể kết nối máy chủ.");
		} finally {
			setLoading(false);
		}
	};

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
					<form className="auth-form" onSubmit={handleSubmit}>
						<div className="auth-grid">
							<label className="auth-field">
								<span>Họ và tên</span>
								<input
									type="text"
									placeholder="Nhập họ tên"
									value={form.name}
									onChange={handleChange("name")}
									required
								/>
							</label>
							<label className="auth-field">
								<span>Số điện thoại</span>
								<input
									type="text"
									placeholder="Nhập số điện thoại"
									value={form.phoneNumber}
									onChange={handleChange("phoneNumber")}
									required
								/>
							</label>
						</div>
						<label className="auth-field">
							<span>Email</span>
							<input
								type="email"
								placeholder="Nhập email"
								value={form.email}
								onChange={handleChange("email")}
								required
							/>
						</label>
						<div className="auth-grid">
							<label className="auth-field">
								<span>Mật khẩu</span>
								<input
									type="password"
									placeholder="Tạo mật khẩu"
									value={form.password}
									onChange={handleChange("password")}
									required
								/>
							</label>
							<label className="auth-field">
								<span>Xác nhận</span>
								<input
									type="password"
									placeholder="Nhập lại mật khẩu"
									value={form.confirmPassword}
									onChange={handleChange("confirmPassword")}
									required
								/>
							</label>
						</div>
						<div className="auth-row">
							<label className="auth-check">
								<input
									type="checkbox"
									checked={form.agree}
									onChange={handleChange("agree")}
								/>
								Đồng ý với điều khoản sử dụng
							</label>
						</div>
						{error && <p className="auth-error">{error}</p>}
						<button className="auth-button" type="submit" disabled={loading}>
							{loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
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
