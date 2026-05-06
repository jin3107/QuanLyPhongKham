import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Booking from './pages/Appointment/Booking/Booking'
import Cancellation from './pages/Appointment/Cancellation/Cancellation'
import Reschedule from './pages/Appointment/Reschedule/Reschedule'
import ScheduleView from './pages/Appointment/ScheduleView/ScheduleView'
import Billing from './pages/Finance/Billing/Billing'
import Workingschedule from './pages/Admin/WorkingSchedule/WorkingSchedule'
import Revenue from './pages/Reports/Revenue/Revenue'
import DoctorActivity from './pages/Reports/DoctorActivity/DoctorActivity'
import Payment from './pages/Finance/Payment/Payment'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Booking />} />
        <Route path="/ScheduleView" element={<ScheduleView />} />
        <Route path="/Cancellation" element={<Cancellation />} />
        <Route path="/Reschedule" element={<Reschedule />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/WorkingSchedule" element={<Workingschedule />} />
        <Route path="/Revenue" element={<Revenue />} />
        <Route path="/DoctorActivity" element={<DoctorActivity />} />
        <Route path="/Payment" element={<Payment/>} />
      </Route>
    </Routes>
  )
}
export default App


