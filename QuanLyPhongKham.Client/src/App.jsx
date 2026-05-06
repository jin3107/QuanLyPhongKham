import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Booking from './pages/Appointment/Booking/Booking'
import Cancellation from './pages/Appointment/Cancellation/Cancellation'
import Reschedule from './pages/Appointment/Reschedule/Reschedule'
import ScheduleView from './pages/Appointment/ScheduleView/ScheduleView'
import Billing from './pages/Finance/Billing/Billing'
import Register from './pages/Auth/Register/Register'
import Login from './pages/Auth/Login/Login'
import Logout from './pages/Auth/Logout/Logout'
import AdminDashboard from './pages/Admin/Dashboard/Dashboard'
import AdminUserRoles from './pages/Admin/UserRoles/UserRoles'
import AdminDoctors from './pages/Admin/Doctors/Doctors'
import ReceptionistDashboard from './pages/Receptionist/Dashboard/Dashboard'
import PatientIntake from './pages/Receptionist/PatientIntake/PatientIntake'


function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Booking />} />
        <Route path="/ScheduleView" element={<ScheduleView />} />
        <Route path="/Cancellation" element={<Cancellation />} />
        <Route path="/Reschedule" element={<Reschedule />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/user-roles" element={<AdminUserRoles />} />
        <Route path="/admin/doctors" element={<AdminDoctors />} />
        <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
        <Route path="/receptionist/PatientIntake" element={<PatientIntake />} />

      </Route>
    </Routes>
  )
}
export default App


