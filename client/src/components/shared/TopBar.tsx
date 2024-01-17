import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ProfileAvatar } from "./ProfileAvatar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import checkAuth from "@/services/checkAuth";
import HomeHubLogo from "./Logo";

const TopBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
  

    <nav className="relative h-16 flex flex-row items-center justify-between px-5 shadow-sm">
      <div className="flex flex-row items-center justify-between w-full lg:hidden md:hidden">
        <HomeHubLogo/>
        {!isMobileMenuOpen ? (
          <Menu onClick={toggleMobileMenu} />
        ) : (
          <X onClick={toggleMobileMenu} />
        )}
      </div>

      {isMobileMenuOpen && (
        <div
          className={` flex flex-col gap-y-6 p-5 absolute w-full z-50 top-16 right-0 bg-white transition-transform duration-300 transform ${
            isMobileMenuOpen ? "translate-y-0" : "translate-y-full"
          } ease-in-out`}
        >
          <Link to="/listing/for-sale" className="py-2 px-4 hover:bg-gray-300">
            Sale
          </Link>
          <Link to="/listing/for-rent" className="py-2 px-4 hover:bg-gray-300">
            Rent
          </Link>
          <div className="flex flex-row gap-x-5">
            <Button variant="outline">Login</Button>
            <Button>Sign up</Button>
          </div>
        </div>
      )}
      <div className="hidden lg:flex md:flex">
      <HomeHubLogo/>
      </div>
      <div className="hidden lg:flex md:flex flex-row gap-x-5">
        <Button variant="ghost" asChild>
          <Link to="/listing/for-sale">Sale</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link to="/listing/for-rent">Rent</Link>
        </Button>
        <Button variant="ghost">Sell</Button>
        <Button variant="ghost">Manage Property</Button>
      </div>
      {checkAuth() ? (
        <ProfileAvatar />
      ) : (
        <div className="hidden lg:flex md:flex flex-row gap-x-5">
          <Button asChild variant="outline">
            <Link to='/sign-in'>Login</Link>
          </Button>
          <Button asChild>
            <Link to='/sign-up'>Sign up</Link>
          </Button>
        </div>
      )}
    </nav>
  );
};

export default TopBar;
