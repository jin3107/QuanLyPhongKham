import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Booking from './pages/Appointment/Booking/Booking'
import Cancellation from './pages/Appointment/Cancellation/Cancellation'
import Reschedule from './pages/Appointment/Reschedule/Reschedule'
import ScheduleView from './pages/Appointment/ScheduleView/ScheduleView'
import Billing from './pages/Finance/Billing/Billing'
import PatientCount from './pages/Reports/PatientCount/PatientCount'
import MedicalRecord from './pages/Patient/MedicalRecord/MedicalRecord'
import HistoryView from './pages/Patient/HistoryView/HistoryView'
function App() {
  return (
 <Routes>
      <Route path="/" element={<Layout />}>
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
  )
}
export default App
