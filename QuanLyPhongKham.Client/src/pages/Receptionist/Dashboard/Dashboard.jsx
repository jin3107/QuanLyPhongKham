import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss';
import medicalRecordImage from '../../../assets/image/card-letan-01.jpg';
import intakeImage from '../../../assets/image/card-letan-02.jpg';
import historyImage from '../../../assets/image/card-letan-03.jpg';
import paymentImage from '../../../assets/image/card-letan-04.jpg';

export default function ReceptionistDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 1,
      title: 'Đăng ký hồ sơ bệnh án',
      image: medicalRecordImage,
      // Đường dẫn cũ: /receptionist/register-patient
      path: '/receptionist/medical-record'
    },
    {
      id: 2,
      title: 'Tiếp nhận bệnh nhân',
      image: intakeImage,
      path: '/receptionist/patient-intake'
    },
    {
      id: 3,
      title: 'Lịch sử khám bệnh',
      image: historyImage,
      // Đường dẫn cũ: /receptionist/history
      path: '/receptionist/history-view'
    },
    {
      id: 4,
      title: 'Thanh toán',
      image: paymentImage,
      // Đường dẫn cũ: /finance/payment
      path: '/payment'
    },
  ];

  return (
    <div className="receptionist-dashboard">
            <section className="dashboard-banner">
        <div className="banner-content">
          <div className="banner-left">
            <h1>Chào mừng đến với Quản lý Phòng khám</h1>
            <p>Hệ thống quản lý hoàn toàn cho phòng khám đa khoa</p>
          </div>
          <div className="banner-right">
          </div>
        </div>
      </section>


<div className="menu-grid">
  {menuItems.map((item) => (
    <Card 
      key={item.id}
      className="menu-card"
      hoverable
      onClick={() => navigate(item.path)}
      cover={
        <div className="card-image-wrapper">
          <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
        </div>
      }
    >
      <Card.Meta title={item.title} />
    </Card>
  ))}
</div>    </div>
  );
}
