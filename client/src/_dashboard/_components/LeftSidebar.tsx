import { Hotel, UserRound, Star } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
const LeftSidebar = () => {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <nav className="leftsidebar md:h-screen">
      <div className="lg:mt-10 md:mt-10 mt-2 flex flex-col lg:gap-5 md:gap-5 gap-3 lg:mx-3 cursor-pointer">
        <Link
          to="/dashboard/my-listing"
          className={`py-4 px-2 flex flex-row items-center gap-3 rounded-md hover:bg-primary hover:opacity-80
           hover:text-white transition-colors duration-100 ease-in-out ${
             currentUrl === "/dashboard/my-listing"
               ? "bg-primary text-white"
               : ""
           }`}
        >
          <Hotel />
          <span>My Listing</span>
        </Link>
        <Link
          to="/dashboard/my-favourites"
          className={`py-4 px-2 flex flex-row items-center gap-2 rounded-md hover:bg-primary hover:opacity-80
           hover:text-white transition-colors duration-100 ease-in-out ${
             currentUrl === "/dashboard/my-favourites"
               ? "bg-primary text-white"
               : ""
           }`}
        >
          <Star />
          <span>My Favourites</span>
        </Link>
        <Link
          to="/dashboard/my-profile"
          className={`py-4 px-2 flex flex-row items-center gap-2 rounded-md hover:bg-primary hover:opacity-80 hover:text-white transition-colors duration-100 ease-in-out ${
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
  );
};

export default LeftSidebar;
