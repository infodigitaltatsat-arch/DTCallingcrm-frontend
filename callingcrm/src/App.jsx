import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Login from './pages/Login'
import CallHistory from "./pages/CallHistory";
import FollowUps from './pages/FollowUps'
import Calls from "./pages/Calls";
import Campaigns from "./pages/Campaings";
import Schedule from "./pages/Schedule";
import Reports from "./pages/Reports";
import Agents from "./pages/Agents";
import ROs from "./pages/ROs";
import QuickCall from "./pages/QuickCall";
import Register from "./pages/Register"
import Settings from './pages/Settings'

const PlaceholderPage = () => {
  return (
    <div className="p-5">
      <div className="rounded-xl bg-white">
        <h2 className="text-xl font-bold text-blue-950">Page Not In Production</h2>
        <p className="mt-2 text-gray-600">This Section is currently outside the project scope</p>

      </div>
    </div>
  )
};

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("crm_token");

  return token ? children : <Navigate to='/login' replace />
}



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth><DashboardLayout /></RequireAuth>}>
          <Route path="/" element={<Dashboard />} />


          <Route path="/calls" element={<Calls />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/campaigns" element={<Campaigns />} />
          <Route path="/follow-ups" element={<FollowUps />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/agents" element={<Agents />} />
          <Route path="/call-history" element={<CallHistory />} />
          <Route path="/ros" element={<ROs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/quick-call" element={<QuickCall/>}/>


        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App