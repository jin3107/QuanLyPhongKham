import { Card, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import './dashboard.scss';

export default function ReceptionistDashboard() {
  const navigate = useNavigate();

  const menuItems = [
    // {
    //   id: 1,
    //   title: 'Đăng ký hồ sơ bệnh án',
    //   image: '/src/assets/image/card-letan-01.jpg',
    //   path: '/receptionist/register-patient'
    // },
    // {
    //   id: 2,
    //   title: 'Tiếp nhận bệnh nhân',
    //   image: '/src/assets/image/card-letan-02.jpg',
    //   path: '/receptionist/patient-intake'
    // },
    // {
    //   id: 3,
    //   title: 'Lịch sử khám bệnh',
    //   image: '/src/assets/image/card-letan-03.jpg',
    //   path: '/receptionist/history'
    // },
    {
      id: 4,
      title: 'Xem lịch',
      image: '/src/assets/image/card-benhnhan-01.jpg',
      path: '/finance/payment'
    },
        {
      id: 5,
      title: 'Đặt lịch',
      image: '/src/assets/image/card-letan-05.jpg',
      path: '/finance/payment'
    },
        {
      id: 6,
      title: 'Đổi lịch',
      image: '/src/assets/image/card-letan-06.jpg',
      path: '/finance/payment'
    },
        {
      id: 7,
      title: 'Hủy lịch',
      image: '/src/assets/image/card-letan-07.jpg',
      path: '/finance/payment'
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
          <img src={item.image} alt={item.title} />
        </div>
      }
    />
  ))}
</div>    </div>
  );
}



















// import { Card, Row, Col } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import './dashboard.scss';

// export default function ReceptionistDashboard() {
//   const navigate = useNavigate();

//   const menuItems = [
//     {
//       id: 1,
//       title: 'Đăng ký hồ sơ bệnh án',
//       image: '/src/assets/image/card-letan-01.jpg',
//       path: '/receptionist/register-patient'
//     },
//     {
//       id: 2,
//       title: 'Tiếp nhận bệnh nhân',
//       image: '/src/assets/image/card-letan-02.jpg',
//       path: '/receptionist/patient-intake'
//     },
//     {
//       id: 3,
//       title: 'Lịch sử khám bệnh',
//       image: '/src/assets/image/card-letan-03.jpg',
//       path: '/receptionist/history'
//     },
//     {
//       id: 4,
//       title: 'Thanh toán',
//       image: '/src/assets/image/card-letan-04.jpg',
//       path: '/finance/payment'
//     },
//         {
//       id: 5,
//       title: 'Đặt lịch',
//       image: '/src/assets/image/card-letan-05.jpg',
//       path: '/finance/payment'
//     },
//         {
//       id: 6,
//       title: 'Đổi lịch',
//       image: '/src/assets/image/card-letan-06.jpg',
//       path: '/finance/payment'
//     },
//         {
//       id: 7,
//       title: 'Hủy lịch',
//       image: '/src/assets/image/card-letan-07.jpg',
//       path: '/finance/payment'
//     },
//   ];

//   return (
//     <div className="receptionist-dashboard">
//             <section className="dashboard-banner">
//         <div className="banner-content">
//           <div className="banner-left">
//             <h1>Chào mừng đến với Quản lý Phòng khám</h1>
//             <p>Hệ thống quản lý hoàn toàn cho phòng khám đa khoa</p>
//           </div>
//           <div className="banner-right">
//           </div>
//         </div>
//       </section>


// <div className="menu-grid">
//   {menuItems.map((item) => (
//     <Card 
//       key={item.id}
//       className="menu-card"
//       hoverable
//       onClick={() => navigate(item.path)}
//       cover={
//         <div className="card-image-wrapper">
//           <img src={item.image} alt={item.title} />
//         </div>
//       }
//     />
//   ))}
// </div>    </div>
//   );
// }
