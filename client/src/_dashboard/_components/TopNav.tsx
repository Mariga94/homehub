
import HomeHubLogo from "@/components/shared/Logo";
import { ProfileAvatar } from "@/components/shared/ProfileAvatar";
import { Link } from "react-router-dom";
const TopNav = () => {
  return (
    <div className=" sticky top-0 z-50 h-12 w-full border-b flex flex-row justify-between items-center py-2 px-5 bg-white">
      <div className="flex flex-row justify-center items-center gap-5">
        <HomeHubLogo />
        <Link to='listing/for-sale'>Sale</Link>
        <Link to='listing/for-rent'>Rent</Link>
      </div>
      <ProfileAvatar />
    </div>
  );
};

export default TopNav;
