import HomeHubLogo from "./Logo";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { ProfileAvatar } from "./ProfileAvatar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import checkAuth from "@/services/checkAuth";

const TopBar = ({ textcolor = "text-white" }: { textcolor?: string }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const toggleMobileMenu = (): void => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`flex flex-row items-center justify-between lg:w-full 
      lg:px-8 md:px-6 h-16 border-b border-[#DBDFEC] px-4 ${textcolor} gap-4`}
    >
      <HomeHubLogo />

      {/* Mobile Menu */}
      {checkAuth() ? (
        <ProfileAvatar />
      ) : (
        <div className="block lg:hidden md:hidden">
          <Button variant="ghost" onClick={() => toggleMobileMenu()}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      )}


      {isMobileMenuOpen && (
        <div
          className={`lg:hidden md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white t${textcolor} absolute top-16 left-0
         w-full flex flex-col items-start pb-5 px-3`}
        >
          <Button
            variant="link"
            asChild
            className={cn("text-sm ", "text-gray-500")}
          >
            <Link to="/listing/for-sale">Sale</Link>
          </Button>
          <Button variant="link" asChild className={cn("text-gray-500")}>
            <Link to="/listing/for-rent">Rent</Link>
          </Button>
          <div className="flex flex-row gap-5 ">
            <Button variant="outline" asChild className="text-gray-800 text-sm">
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button variant="default" className=" text-slate-50">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Fullscreen Navigation */}
      <div className="hidden lg:flex md:flex ">
        <Button variant="link" asChild className={cn("text-sm ", textcolor)}>
          <Link to="/listing/for-sale">Sale</Link>
        </Button>
        <Button variant="link" asChild className={cn(textcolor)}>
          <Link to="/listing/for-rent">Rent</Link>
        </Button>
      </div>
      <div className="hidden ml-auto lg:flex md:flex gap-4">
        {checkAuth() ? (
          <ProfileAvatar />
        ) : (
          <div className="flex flex-row gap-5 ">
            <Button variant="outline" asChild className="text-gray-800 text-sm">
              <Link to="/sign-in">Sign In</Link>
            </Button>
            <Button variant="default" className=" text-slate-50">
              <Link to="/sign-up">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
