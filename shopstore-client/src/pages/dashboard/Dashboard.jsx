import { Outlet } from "react-router-dom";
import VendorSidebar from "../../components/vendor/VendorSidebar";

function Dashboard() {
  return (
    <div className="min-h-screen flex bg-gray-100">
      <VendorSidebar />
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default Dashboard;
