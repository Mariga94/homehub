import { Outlet } from "react-router-dom";
// import TopNav from "./_components/TopNav";
import TopBar from "@/components/shared/TopBar";
import LeftSidebar from "./_components/LeftSidebar";
const DashboardLayout = () => {
  return (
    <div className="w-full flex flex-col">
      <TopBar textcolor="text-gray-700" />
      <div className="flex lg:flex-row md:flex-row flex-col">
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
