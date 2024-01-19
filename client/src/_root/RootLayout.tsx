import { Outlet } from "react-router-dom";
import TopBar from "@/components/shared/TopBar";
import Footer from "@/components/shared/Footer";
const RootLayout = () => {
  return (
    <div className="lg:container md:container w-full flex-col gap-6 px-6">
      <TopBar/>
      <div className="min-h-screen mb-20 ">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
