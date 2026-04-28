import "./dashboard.scss";

export default function Dashboard() {
	return (
		<div className="admin-page dashboard-page">
			<header className="admin-header">
				<div>
					<h1 className="admin-title">Bảng điều khiển</h1>
					<p className="admin-subtitle">
						Tổng quan nhanh tình hình hoạt động phòng khám hôm nay.
					</p>
				</div>
				<div className="admin-actions">
					<button className="admin-btn" type="button">
						Tạo báo cáo
					</button>
					<button className="admin-btn ghost" type="button">
						Xuất dữ liệu
					</button>
				</div>
			</header>

			<section className="admin-grid">
				<article className="admin-card">
					<h3>Lịch hẹn hôm nay</h3>
					<div className="metric">64</div>
					<p className="metric-note">Theo bảng lichhens (trạng thái: Đã đặt)</p>
				</article>
				<article className="admin-card">
					<h3>Bệnh nhân chờ khám</h3>
					<div className="metric">18</div>
					<p className="metric-note">TrangThaiTiepNhan: Chờ khám</p>
				</article>
				<article className="admin-card">
					<h3>Doanh thu tạm tính</h3>
					<div className="metric">86.500.000đ</div>
					<p className="metric-note">Từ hoadons đã thanh toán hôm nay</p>
				</article>
			</section>

			<section className="admin-section">
				<div className="admin-split">
					<div className="admin-card">
						<div className="admin-card-head">
							<h3>Lịch làm việc gần đây</h3>
							<span className="admin-pill">Trong ngày</span>
						</div>
						<div className="admin-list">
							<div className="admin-list-item">
								<div>
									<h4>Phòng Nội tổng quát</h4>
									<p>LLV-240428-01 · Phạm Thu Hà · 08:00 - 11:30</p>
								</div>
								<span className="admin-pill success">Đang trực</span>
							</div>
							<div className="admin-list-item">
								<div>
									<h4>Phòng Tim mạch</h4>
									<p>LLV-240428-02 · Trần Minh Châu · 09:00 - 12:00</p>
								</div>
								<span className="admin-pill">Đủ lịch</span>
							</div>
							<div className="admin-list-item">
								<div>
									<h4>Phòng Nhi</h4>
									<p>LLV-240428-03 · Nguyễn Tuấn Anh · 13:00 - 16:30</p>
								</div>
								<span className="admin-pill warn">Cần bổ sung</span>
							</div>
						</div>
					</div>

					<div className="admin-card">
						<div className="admin-card-head">
							<h3>Top bác sĩ theo lượt khám</h3>
							<button className="admin-link" type="button">
								Xem tất cả
							</button>
						</div>
						<div className="admin-table-wrap">
							<table className="admin-table">
								<thead>
									<tr>
										<th>Bác sĩ</th>
										<th>Chuyên khoa</th>
										<th>Lượt khám</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>BS001 - Nguyễn Huy Hoàng</td>
										<td>Nội tổng quát</td>
										<td>18</td>
									</tr>
									<tr>
										<td>BS005 - Lê Thảo Vy</td>
										<td>Nhi</td>
										<td>15</td>
									</tr>
									<tr>
										<td>BS011 - Trần Quốc Bảo</td>
										<td>Tim mạch</td>
										<td>12</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
