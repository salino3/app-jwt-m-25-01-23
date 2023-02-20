import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthGlobalContext } from "../../context/authContext/AuthGlobalContext";

export const PrivateRoutes = () => {
  
  const {isAuthenticated} = useContext(AuthGlobalContext);


  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return <Outlet />;
};
