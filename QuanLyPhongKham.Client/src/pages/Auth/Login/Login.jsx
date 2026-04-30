import "./login.scss";
import heroImage from "../../../assets/image/img1.png";
import logo from "../../../assets/image/LogoBYT.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login as loginApi } from "../../../apis";

export default function Login() {
	const navigate = useNavigate();
	const [form, setForm] = useState({ userName: "", password: "" });
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleChange = (field) => (event) => {
		setForm((prev) => ({ ...prev, [field]: event.target.value }));
	};

	const getRoleKey = (value) =>
		String(value || "")
			.toLowerCase()
			.replace(/[_\s-]+/g, "");

	const getDefaultRoute = (roleValue) => {
		const key = getRoleKey(roleValue);
		if (["superadmin", "admin", "quanly", "manager"].includes(key))
			return "/admin/dashboard";
		if (["bacsi", "doctor"].includes(key)) return "/doctor/dashboard";
		if (["letan", "receptionist"].includes(key))
			return "/receptionist/dashboard";
		return "/";
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setError("");
		setLoading(true);
		try {
			const response = await loginApi({
				UserName: form.userName,
				Password: form.password,
			});
			const result = response?.data;
			if (!result?.isSuccess) {
				setError(result?.message || "Đăng nhập thất bại.");
				return;
			}
			const data = result.data || {};
			const accessToken = data.accessToken || data.AccessToken;
			const role = data.role || data.Role;
			const name =
				data.userName || data.UserName || data.email || data.Email || form.userName;

			if (accessToken) sessionStorage.setItem("accessToken", accessToken);
			if (role) sessionStorage.setItem("role", role);
			if (name) sessionStorage.setItem("userName", name);

			navigate(getDefaultRoute(role));
		} catch (err) {
			setError("Không thể kết nối máy chủ.");
		} finally {
			setLoading(false);
		}
	};

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
					<form className="auth-form" onSubmit={handleSubmit}>
						<label className="auth-field">
							<span>Tài khoản</span>
							<input
								type="text"
								placeholder="Email hoặc số điện thoại"
								value={form.userName}
								onChange={handleChange("userName")}
								required
							/>
						</label>
						<label className="auth-field">
							<span>Mật khẩu</span>
							<input
								type="password"
								placeholder="Nhập mật khẩu"
								value={form.password}
								onChange={handleChange("password")}
								required
							/>
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
						{error && <p className="auth-error">{error}</p>}
						<button className="auth-button" type="submit" disabled={loading}>
							{loading ? "Đang đăng nhập..." : "Đăng nhập"}
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
