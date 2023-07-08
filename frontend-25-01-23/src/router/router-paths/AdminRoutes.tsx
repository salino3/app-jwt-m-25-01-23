import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthGlobalContext } from "../../context/authContext/AuthGlobalContext";

export const AdminRoutes = () => {
  const currentUser: any = JSON.parse(localStorage.getItem("USER") || "");
  const checkAdmin = currentUser.isAdmin;
  const { isAuthenticated } = useContext(AuthGlobalContext);

  if (!checkAdmin) {
    return <Navigate to={"/private"} />;
  }

  if (!isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
