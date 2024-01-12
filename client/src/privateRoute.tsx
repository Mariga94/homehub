import { ReactNode } from "react";
import checkAuth from "./services/checkAuth";

import { Navigate, Outlet } from "react-router-dom";

interface ComponentProps {
  redirectTo: string;
  children: ReactNode;
}
const ProtectedRoute: React.FC<ComponentProps> = ({
  redirectTo = "/",
  children,
}) => {
  if (!checkAuth()) {
    return <Navigate to={redirectTo} />;
  }
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
