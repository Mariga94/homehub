import HomeHubLogo from "./Logo";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const TopBar = ({ textcolor = "text-white" }: { textcolor?: string }) => {
  return (
    <nav
      className={`flex flex-row items-center w-full h-16 border-b border-[#DBDFEC] px-4 ${textcolor} gap-4`}
    >
      <HomeHubLogo />
      <div className="">
        <Button variant="link" asChild className={cn("text-sm ", textcolor)}>
          <Link to="/listing/for-sale" >Sale</Link>
        </Button>
        <Button variant="link" asChild className={cn(textcolor)}>
          <Link to="/listing/for-rent">Rent</Link>
        </Button>
      </div>
      <div className="flex flex-row gap-5 ml-auto">
        <Button variant="outline" asChild className="text-gray-800 text-sm">
          <Link to="/sign-in">Sign In</Link>
        </Button>
        <Button variant="default" className=" text-slate-50">
          <Link to="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default TopBar;
