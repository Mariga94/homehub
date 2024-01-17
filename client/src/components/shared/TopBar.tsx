import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { ProfileAvatar } from "./ProfileAvatar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import checkAuth from "@/services/checkAuth";

import logo from "../../../public/logos/logo-no-background.svg";

const TopBar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // <nav
    //   className={`flex flex-row items-center justify-between lg:w-full
    //   lg:px-8 md:px-6 h-16 border-b border-[#DBDFEC] px-4 ${textcolor} gap-4`}
    // >
    //   <HomeHubLogo />

    //   {/* Mobile Menu */}

    //   {isMobileMenuOpen && (
    //     <div
    //       className={`lg:hidden md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white t${textcolor} absolute top-16 left-0
    //      w-full flex flex-col items-start pb-5 px-3`}
    //     >
    //       <Button
    //         variant="link"
    //         asChild
    //         className={cn("text-sm ", "text-gray-500")}
    //       >
    //         <Link to="/listing/for-sale">Sale</Link>
    //       </Button>
    //       <Button variant="link" asChild className={cn("text-gray-500")}>
    //         <Link to="/listing/for-rent">Rent</Link>
    //       </Button>
    //       <div className="flex flex-row gap-5 ">
    //         <Button variant="outline" asChild className="text-gray-800 text-sm">
    //           <Link to="/sign-in">Sign In</Link>
    //         </Button>
    //         <Button variant="default" className=" text-slate-50">
    //           <Link to="/sign-up">Sign Up</Link>
    //         </Button>
    //       </div>
    //     </div>
    //   )}

    //     <div className="block lg:hidden md:hidden">
    //       {checkAuth() ? (
    //         <ProfileAvatar />
    //       ) : (
    //         <Button variant="ghost" onClick={() => toggleMobileMenu()}>
    //           {isMobileMenuOpen ? <X /> : <Menu />}
    //         </Button>
    //       )}
    //     </div>

    //   {/* Fullscreen Navigation */}

    //   <div className="hidden lg:flex md:flex ">
    //     <Button variant="link" asChild className={cn("text-sm ", textcolor)}>
    //       <Link to="/listing/for-sale">Sale</Link>
    //     </Button>
    //     <Button variant="link" asChild className={cn(textcolor)}>
    //       <Link to="/listing/for-rent">Rent</Link>
    //     </Button>
    //   </div>
    //   <div className="hidden ml-auto lg:flex md:flex gap-4">
    //     {checkAuth() ? (
    //       <ProfileAvatar />
    //     ) : (
    //       <div className="hidden lg:flex flex-row gap-5 ">
    //         <Button variant="outline" asChild className="text-gray-800 text-sm">
    //           <Link to="/sign-in">Sign In</Link>
    //         </Button>
    //         <Button variant="default" className=" text-slate-50">
    //           <Link to="/sign-up">Sign Up</Link>
    //         </Button>
    //       </div>
    //       // <div className="block lg:hidden md:hidden">
    //       //   <Button variant="ghost" onClick={() => toggleMobileMenu()}>
    //       //     {isMobileMenuOpen ? <X /> : <Menu />}
    //       //   </Button>
    //       // </div>
    //     )}
    //   </div>
    // </nav>

    <nav className="relative h-16 flex flex-row items-center justify-between px-5 shadow-sm">
      <div className="flex flex-row items-center justify-between w-full lg:hidden md:hidden">
        <div>
          <img src={logo} alt="" className="h-8" />
        </div>
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
      <div className="hidden lg:block md:block">
        <img src={logo} alt="" className="h-8" />
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
          <Button variant="outline">Login</Button>
          <Button>Sign up</Button>
        </div>
      )}
    </nav>
  );
};

export default TopBar;
