import { Link } from "react-router-dom";
import logo from "../../../public/logos/logo-no-background.svg";
const HomeHubLogo = () => {
  return (
    <Link to="/">
      <img src={logo} alt="" className="h-8" />
    </Link>
  );
};

export default HomeHubLogo;
