import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout'
import Booking from './pages/Appointment/Booking/Booking'
import Cancellation from './pages/Appointment/Cancellation/Cancellation'
import Reschedule from './pages/Appointment/Reschedule/Reschedule'
import ScheduleView from './pages/Appointment/ScheduleView/ScheduleView'
import Billing from './pages/Finance/Billing/Billing'
import WorkingSchedule from './pages/Admin/WorkingSchedule/WorkingSchedule'
import Revenue from './pages/Reports/Revenue/Revenue'
import DoctorActivity from './pages/Reports/DoctorActivity/DoctorActivity'
import Payment from './pages/Finance/Payment/Payment'
import Register from './pages/Auth/Register/Register'
import Login from './pages/Auth/Login/Login'
import Logout from './pages/Auth/Logout/Logout'
import AdminDashboard from './pages/Admin/Dashboard/Dashboard'
import AdminUserRoles from './pages/Admin/UserRoles/UserRoles'
import AdminDoctors from './pages/Admin/Doctors/Doctors'
import DoctorDashboard from './pages/Doctor/Dashboard/Dashboard'
import PatientInfo from './pages/Doctor/PatientInfo/PatientInfo'
import PatientView from './pages/Doctor/PatientView/PatientView'
import Prescription from './pages/Doctor/Prescription/Prescription'
import ServiceRequest from './pages/Doctor/ServiceRequest/ServiceRequest'
import ReceptionistDashboard from './pages/Receptionist/Dashboard/Dashboard'
import PatientIntake from './pages/Receptionist/PatientIntake/PatientIntake'
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword'


import PatientCount from './pages/Reports/PatientCount/PatientCount'
import MedicalRecord from './pages/Patient/MedicalRecord/MedicalRecord'
import HistoryView from './pages/Patient/HistoryView/HistoryView'
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
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/Reschedule" element={<Reschedule />} />
        <Route path="/reschedule" element={<Reschedule />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/Admin/Dashboard" element={<AdminDashboard />} />
        <Route path="/Admin/User-roles" element={<AdminUserRoles />} />
        <Route path="/Admin/Doctors" element={<AdminDoctors />} />
        <Route path="/Doctor/Dashboard" element={<DoctorDashboard />} />
        <Route path="/Doctor/Patient-info" element={<PatientInfo />} />
        <Route path="/doctor/Patient-view" element={<PatientView />} />
        <Route path="/Doctor/Prescription" element={<Prescription />} />
        <Route path="/Doctor/Service-request" element={<ServiceRequest />} />
        <Route path="/Receptionist/Dashboard" element={<ReceptionistDashboard />} />
        <Route path="/Receptionist/Patient-intake" element={<PatientIntake />} />
        <Route path="/WorkingSchedule" element={<WorkingSchedule />} />
        <Route path="/Revenue" element={<Revenue />} />
        <Route path="/DoctorActivity" element={<DoctorActivity />} />
        <Route path="/Payment" element={<Payment/>} />
        <Route index element={<Booking />} />
        <Route path="scheduleView" element={<ScheduleView />} />
        <Route path="cancellation" element={<Cancellation />} />
        <Route path="reschedule" element={<Reschedule />} />
        <Route path="billing" element={<Billing />} />
        <Route path="patientCount" element={<PatientCount />} />
        <Route path="MedicalRecord" element={<MedicalRecord />} />
        <Route path="historyView" element={<HistoryView />} />
      </Route>
    </Routes>
  );
}
export default App