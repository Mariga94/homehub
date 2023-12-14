import HomeHubLogo from "./Logo";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
const TopBar = () => {
  return (
    <nav className="flex flex-row items-center w-full h-16 border-b border-[#DBDFEC] px-4 text-white gap-4">
      <HomeHubLogo />
      <div className="">
        <Button variant="link" asChild className={cn('text-white text-sm ')}>
          <Link to="/">Sale</Link>
        </Button>
        <Button variant="link" asChild className={cn('text-white')}>
          <Link to="/">Rent</Link>
        </Button>
      </div>
      <div className="flex flex-row gap-5 ml-auto">
        <Button variant="outline" asChild className="text-black">
          <Link to="/">Sign In</Link>
        </Button>
        <Button variant="default" className=" text-slate-50">
          <Link to="/">Sign Up</Link>
        </Button>
      </div>
    </nav>
  );
};

export default TopBar;
