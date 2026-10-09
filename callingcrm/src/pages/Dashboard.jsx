import DashboardOverview from "../components/dashboard/DashboardOverview";
import RightDashboard from "../components/dashboard/right/RightDashboard";

const Dashboard = () => {
    return (
        <div className="w-full p-3 sm:p-4 lg:p-5">
            <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_290px]">

                <main className="min-w-0">
                    <DashboardOverview />
                </main>

                <aside className="min-w-0">
                    <RightDashboard />
                </aside>


            </div>
        </div>
    )
}
export default Dashboard;