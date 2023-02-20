import { Navigate, Outlet } from "react-router-dom";

export const AdminRoutes = () => {
  
  const currentUser: any = JSON.parse(localStorage.getItem("USER") || "");
  const checkAdmin = currentUser.isAdmin;

if (!checkAdmin) {
  return <Navigate to={"/private"} />;
}
  
  return (
    <>
      <Outlet />
    </>
  );
};


