import "./userroles.scss";

export default function UserRoles() {
	return (
		<div className="admin-page user-roles-page">
			<header className="admin-header">
				<div>
					<h1 className="admin-title">Quản lý phân quyền</h1>
					<p className="admin-subtitle">
						Thiết lập vai trò và phạm vi truy cập cho từng nhóm người dùng.
					</p>
				</div>
				<div className="admin-actions">
					<button className="admin-btn" type="button">
						Thêm vai trò
					</button>
					<button className="admin-btn ghost" type="button">
						Cập nhật quyền
					</button>
				</div>
			</header>

			<section className="admin-split">
				<div className="admin-card">
					<div className="admin-card-head">
						<h3>Danh sách vai trò</h3>
						<div className="admin-input-group">
							<input
								className="admin-input"
								type="text"
								placeholder="Tìm vai trò"
							/>
						</div>
					</div>
					<div className="admin-list">
						<div className="admin-list-item">
							<div>
								<h4>Quản lý</h4>
								<p>Quản lý nhân sự, phân quyền, thống kê</p>
							</div>
							<span className="admin-pill">4 người dùng</span>
						</div>
						<div className="admin-list-item">
							<div>
								<h4>Bác sĩ</h4>
								<p>Khám bệnh, kê thuốc, yêu cầu dịch vụ</p>
							</div>
							<span className="admin-pill">18 người dùng</span>
						</div>
						<div className="admin-list-item">
							<div>
								<h4>Lễ tân</h4>
								<p>Tiếp nhận, đặt lịch, thanh toán</p>
							</div>
							<span className="admin-pill">6 người dùng</span>
						</div>
						<div className="admin-list-item">
							<div>
								<h4>Bệnh nhân</h4>
								<p>Đặt lịch, hủy lịch, đổi lịch</p>
							</div>
							<span className="admin-pill">120 người dùng</span>
						</div>
					</div>
				</div>

				<div className="admin-card">
					<div className="admin-card-head">
						<h3>Chi tiết vai trò</h3>
						<span className="admin-pill">Quản lý</span>
					</div>
					<div className="role-grid">
						<div className="role-item">
							<h4>Quản lý thông tin bác sĩ</h4>
							<p>Thêm, chỉnh sửa, cập nhật hồ sơ bác sĩ</p>
						</div>
						<div className="role-item">
							<h4>Quản lý phân quyền</h4>
							<p>Cập nhật vai trò theo tài khoản</p>
						</div>
						<div className="role-item">
							<h4>Phân công lịch làm việc</h4>
							<p>Phân công ca trực theo lichlamviecs</p>
						</div>
						<div className="role-item">
							<h4>Thống kê</h4>
							<p>Báo cáo bệnh nhân, doanh thu, hoạt động bác sĩ</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
