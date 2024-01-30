import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ProfileAvatar } from "./ProfileAvatar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import checkAuth from "@/services/checkAuth";
import HomeHubLogo from "./Logo";

const TopBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleManagePropertyClick = () => {
    checkAuth()
      ? navigate("/dashboard/create-listing")
      : alert("Please log in to manage your property");
  };

  return (
    <nav
      className={`relative h-16 flex flex-row items-center justify-between px-5 shadow-sm ${isMobileMenuOpen}`}
    >
      <div className="flex flex-row items-center justify-between w-full lg:hidden md:hidden">
        <HomeHubLogo />
        {!checkAuth() && (
          <div>
            {!isMobileMenuOpen ? (
              <Menu onClick={toggleMobileMenu} />
            ) : (
              <X onClick={toggleMobileMenu} />
            )}
          </div>
        )}
      </div>

      {isMobileMenuOpen && (
        <div
          className={`bg-white flex flex-col gap-y-6 p-5 absolute w-full z-50 top-16 right-0
          cursor-pointer
           `}
        >
          <Link to="/listing/for-sale" className="py-2 px-4 hover:bg-blue-100">
            Sale
          </Link>
          <Link to="/listing/for-rent" className="py-2 px-4 hover:bg-blue-100">
            Rent
          </Link>
          <div className="flex flex-row gap-x-5 bg">
            <Button asChild variant="outline">
              <Link to="/sign-in">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/sign-up">Sign up</Link>
            </Button>
          </div>
        </div>
      )}
      <div className="hidden lg:flex md:flex">
        <HomeHubLogo />
      </div>
      <div className="hidden lg:flex md:flex flex-row gap-x-5">
        <Button variant="ghost" asChild>
          <Link to="/listing/for-sale">Sale</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/listing/for-rent">Rent</Link>
        </Button>
        <Button
          variant="link"
          className="text-black no-underline hover:bg-blue-50 hover:no-underline"
          onClick={() => handleManagePropertyClick()}
        >
          Manage Property
        </Button>
      </div>
      {checkAuth() ? (
        <ProfileAvatar />
      ) : (
        <div className="hidden lg:flex md:flex flex-row gap-x-5">
          <Button asChild variant="outline">
            <Link to="/sign-in">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/sign-up">Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default TopBar;
