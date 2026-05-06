import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
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
import DoctorDashboard from './pages/Doctor/Dashboard/Dashboard'
import DoctorPatientInfo from './pages/Doctor/PatientInfo/PatientInfo'
import DoctorPatientView from './pages/Doctor/PatientView/PatientView'
import DoctorPrescription from './pages/Doctor/Prescription/Prescription'
import DoctorServiceRequest from './pages/Doctor/ServiceRequest/ServiceRequest'
import ReceptionistDashboard from './pages/Receptionist/Dashboard/Dashboard'
import PatientIntake from './pages/Receptionist/PatientIntake/PatientIntake'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'


function App() {
  return (
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Logout" element={<Logout />} />
      <Route path="/ForgotPassword" element={<ForgotPassword />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/Login" replace />} />
        <Route path="/Scheduleview" element={<ScheduleView />} />
        <Route path="/Cancellation" element={<Cancellation />} />
        <Route path="/Reschedule" element={<Reschedule />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
        <Route path="/Admin/User-roles" element={<AdminUserRoles />} />
        <Route path="/Admin/Doctors" element={<AdminDoctors />} />
        <Route path="/Doctor/Dashboard" element={<DoctorDashboard />} />
        <Route path="/Doctor/Patient-info" element={<DoctorPatientInfo />} />
        <Route path="/doctor/Patient-view" element={<DoctorPatientView />} />
        <Route path="/Doctor/Prescription" element={<DoctorPrescription />} />
        <Route path="/Doctor/Service-request" element={<DoctorServiceRequest />} />
        <Route path="/Receptionist/Dashboard" element={<ReceptionistDashboard />} />
        <Route path="/Receptionist/Patient-intake" element={<PatientIntake />} />
      </Route>
    </Routes>
  )
}
export default App