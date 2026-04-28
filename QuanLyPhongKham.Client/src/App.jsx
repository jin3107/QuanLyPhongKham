import './App.css'
import { Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout'
import Booking from './pages/Appointment/Booking/Booking'
import Cancellation from './pages/Appointment/Cancellation/Cancellation'
import Reschedule from './pages/Appointment/Reschedule/Reschedule'
import ScheduleView from './pages/Appointment/ScheduleView/ScheduleView'
import Billing from './pages/Finance/Billing/Billing'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Booking />} />
        <Route path="/ScheduleView" element={<ScheduleView />} />
        <Route path="/Cancellation" element={<Cancellation />} />
        <Route path="/Reschedule" element={<Reschedule />} />
        <Route path="/Billing" element={<Billing />} />

      </Route>
    </Routes>
  )
}
export default App


