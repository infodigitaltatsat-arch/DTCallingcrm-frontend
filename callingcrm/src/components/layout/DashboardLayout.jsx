import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F4F8FF]">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <Header
        setSidebarOpen={setSidebarOpen}
      />

      <main className="ml-0 min-h-screen pt-[72px] lg:ml-55">
        <Outlet />
      </main>

    </div>
  );
};

export default DashboardLayout;