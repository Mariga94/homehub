import { Home, UserRound, Heart, X, LineChart, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import HomeHubLogo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

const LeftSidebar = ({
  isToggled,
  toggleLeftBarNavigation,
}: {
  isToggled: boolean;
  toggleLeftBarNavigation: React.MouseEventHandler<
    SVGSVGElement | HTMLButtonElement | HTMLDivElement | HTMLAnchorElement
  >;
}) => {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <div>
      <nav
        className={`overflow-y-auto transition ease-in-out duration-300 z-50 absolute lg:relative top-0 lg:top-auto lg:left-auto left-0 bottom-0 ${
          isToggled ? " translate-x-0" : "lg:-translate-x-full lg:hidden translate-x-[-100%]"
        }  py-2 space-y-8 min-w-[300px] lg:min-w-[270px] md:min-w-[50%]  border-r-2 h-screen
       bg-white  `}
      >
        <div className="h-16 flex items-center border-b-2 justify-between px-3">
          <HomeHubLogo />
          
        </div>
        <div className="flex flex-col gap-2 ">
          <Link
            onClick={toggleLeftBarNavigation}
            to="/dashboard/"
            className={`gap-2 leftsidebar-link ${
              currentUrl === "/dashboard/" ? "bg-primary text-white" : ""
            }`}
          >
            <LineChart />
            <span>My Dashboard</span>
          </Link>
          <Link
            onClick={toggleLeftBarNavigation}
            to="/dashboard/my-listing"
            className={`gap-2 leftsidebar-link ${
              currentUrl === "/dashboard/my-listing"
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <Home />
            <span>My Listing</span>
          </Link>
          <Link
            onClick={toggleLeftBarNavigation}
            to="/dashboard/create-listing"
            className={`gap-2 leftsidebar-link ${
              currentUrl === "/dashboard/create-listing"
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <Plus/>
            <span>Create Listing</span>
          </Link>
          <Link
            onClick={toggleLeftBarNavigation}
            to="/dashboard/my-favourites"
            className={`gap-2 leftsidebar-link ${
              currentUrl === "/dashboard/my-favourites"
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <Heart />
            <span>My Favourites</span>
          </Link>
          <Link
            onClick={toggleLeftBarNavigation}
            to="/dashboard/my-profile"
            className={`gap-2 leftsidebar-link ${
              currentUrl === "/dashboard/my-profile"
                ? "bg-primary text-white"
                : ""
            }`}
          >
            <UserRound />
            <span>My Profile</span>
          </Link>
        </div>
      </nav>
      <div className="lg:hidden ">
        {isToggled && (
          <div
            className="fixed inset-0 z-10 bg-black bg-opacity-50"
            onClick={toggleLeftBarNavigation}
          >
            <Button
              variant="ghost"
              onClick={toggleLeftBarNavigation}
              className="absolute top-7 right-5 md:right-10 md:top-10  "
            >
              <X className="text-gray-100 hover:text-gray-500" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
