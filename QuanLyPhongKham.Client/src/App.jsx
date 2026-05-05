import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Booking from "./pages/Appointment/Booking/Booking";
import Cancellation from "./pages/Appointment/Cancellation/Cancellation";
import Reschedule from "./pages/Appointment/Reschedule/Reschedule";
import ScheduleView from "./pages/Appointment/ScheduleView/ScheduleView";
import Billing from "./pages/Finance/Billing/Billing";
import DoctorDashboard from "./pages/Doctor/Dashboard/Dashboard";
import PatientInfo from "./pages/Doctor/PatientInfo/PatientInfo";
import PatientView from "./pages/Doctor/PatientView/PatientView";
import ServiceRequest from "./pages/Doctor/ServiceRequest/ServiceRequest";
import Prescription from "./pages/Doctor/Prescription/Prescription";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Booking />} />
        <Route path="/ScheduleView" element={<ScheduleView />} />
        <Route path="/scheduleView" element={<ScheduleView />} />
        <Route path="/Cancellation" element={<Cancellation />} />
        <Route path="/cancellation" element={<Cancellation />} />
        <Route path="/Reschedule" element={<Reschedule />} />
        <Route path="/reschedule" element={<Reschedule />} />
        <Route path="/Billing" element={<Billing />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/doctor/patient-info" element={<PatientInfo />} />
        <Route path="/doctor/patient-view" element={<PatientView />} />
        <Route path="/doctor/service-request" element={<ServiceRequest />} />
        <Route path="/doctor/prescription" element={<Prescription />} />
      </Route>
    </Routes>
  );
}

export default App;
