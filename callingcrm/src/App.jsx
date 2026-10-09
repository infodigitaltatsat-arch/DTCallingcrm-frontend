import { BrowserRouter, Route, Routes } from "react-router-dom";

import DashboardLayout from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";


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



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />


          <Route path="/calls" element={<PlaceholderPage />} />
          <Route path="/leads" element={<PlaceholderPage />} />
          <Route path="/campaigns" element={<PlaceholderPage />} />
          <Route path="/follow-ups" element={<PlaceholderPage />} />
          <Route path="/schedule" element={<PlaceholderPage />} />
          <Route path="/report" element={<PlaceholderPage />} />
          <Route path="/agent" element={<PlaceholderPage />} />
          <Route path="/call-history" element={<PlaceholderPage />} />
          <Route path="/ros" element={<PlaceholderPage />} />
          <Route path="/settings" element={<PlaceholderPage />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App