import "./doctors.scss";

export default function Doctors() {
	return (
		<div className="admin-page doctors-page">
			<header className="admin-header">
				<div>
					<h1 className="admin-title">Quản lý bác sĩ</h1>
					<p className="admin-subtitle">
						Theo dõi thông tin bác sĩ, chuyên khoa và lịch làm việc.
					</p>
				</div>
				<div className="admin-actions">
					<button className="admin-btn" type="button">
						Thêm bác sĩ
					</button>
					<button className="admin-btn ghost" type="button">
						Xuất danh sách
					</button>
				</div>
			</header>

			<section className="admin-card admin-filters">
				<div className="admin-filter-group">
					<label>Chuyên khoa</label>
					<select className="admin-select">
						<option>Tất cả</option>
						<option>Nội tổng quát</option>
						<option>Nhi</option>
						<option>Tim mạch</option>
					</select>
				</div>
				<div className="admin-filter-group">
					<label>Trạng thái</label>
					<select className="admin-select">
						<option>Tất cả</option>
						<option>Đang làm việc</option>
						<option>Tạm nghỉ</option>
					</select>
				</div>
				<div className="admin-filter-actions">
					<button className="admin-btn" type="button">
						Lọc
					</button>
					<button className="admin-btn ghost" type="button">
						Đặt lại
					</button>
				</div>
			</section>

			<section className="admin-section">
				<div className="admin-card">
					<div className="admin-card-head">
						<h3>Danh sách bác sĩ</h3>
						<div className="admin-input-group">
							<input
								className="admin-input"
								type="text"
								placeholder="Tìm theo tên hoặc mã bác sĩ"
							/>
						</div>
					</div>
					<div className="admin-table-wrap">
						<table className="admin-table">
							<thead>
								<tr>
									<th>Bác sĩ</th>
									<th>Chuyên khoa</th>
									<th>Ca trực</th>
									<th>Trạng thái</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Nguyễn Huy Hoàng</td>
									<td>Nội tổng quát</td>
									<td>LLV-240428-01 · 08:00 - 12:00</td>
									<td>
										<span className="admin-pill success">Đang làm việc</span>
									</td>
								</tr>
								<tr>
									<td>Lê Thảo Vy</td>
									<td>Nhi</td>
									<td>LLV-240428-05 · 13:00 - 17:00</td>
									<td>
										<span className="admin-pill">Đặt lịch kín</span>
									</td>
								</tr>
								<tr>
									<td>Trần Quốc Bảo</td>
									<td>Tim mạch</td>
									<td>LLV-240428-07 · 09:00 - 11:30</td>
									<td>
										<span className="admin-pill warn">Tạm nghỉ</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</div>
	);
}
