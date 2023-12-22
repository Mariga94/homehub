import { Outlet } from "react-router-dom";
import TopNav from "./_components/TopNav";
import LeftSidebar from "./_components/LeftSidebar";
const DashboardLayout = () => {
  return (
    <div className="w-full flex flex-col ">
      <TopNav />
      <div className="flex flex-row">
        <LeftSidebar />
        <div className="w-full">
          <div className="overflow-auto max-h-screen">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
