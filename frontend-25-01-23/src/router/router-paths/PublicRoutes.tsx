import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthGlobalContext } from "../../context/authContext/AuthGlobalContext";

export const PublicRoutes = () => {

    const { isAuthenticated } = useContext(AuthGlobalContext);


  if (isAuthenticated) {
    return <Navigate to={"/private"} />;
  }

  return <Outlet />;
};
