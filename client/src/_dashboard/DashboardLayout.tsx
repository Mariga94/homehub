import { Outlet } from "react-router-dom";
import LeftSidebar from "./_components/LeftSidebar";
import { DashBoardTopNavigation } from "./_components";
import { useState, MouseEventHandler } from "react";

const DashboardLayout = () => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const toggleLeftBarNavigation: MouseEventHandler<
    SVGSVGElement | HTMLDivElement
  > = (): void => {
    setIsToggled(!isToggled);
  };

  return (
    <div className="flex flex-row w-full  bg-slate-100">
      <LeftSidebar
        isToggled={isToggled}
        toggleLeftBarNavigation={toggleLeftBarNavigation}
      />
      <div className="w-full ">
        <DashBoardTopNavigation
          isToggled={isToggled}
          toggleLeftBarNavigation={toggleLeftBarNavigation}
        />
        <div className=" overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
