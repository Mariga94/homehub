import { Home } from "lucide-react";
import { Link } from "react-router-dom";
const HomeHubLogo = () => {
  return (
    <Link to="/" className="flex flex-row items-center mb-2 cursor-pointer">
      <Home className="" />
      <div className=" font-semibold inline p-0 mt-2 ">HomeHub</div>
    </Link>
  );
};

export default HomeHubLogo;
