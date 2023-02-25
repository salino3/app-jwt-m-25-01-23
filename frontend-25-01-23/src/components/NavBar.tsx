import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthGlobalContext } from '../context/authContext/AuthGlobalContext';
import { useLocation } from "react-router-dom";


export const NavBar = () => {

    const { currentUser, setCurrentUser, logout } = useContext(AuthGlobalContext);


  const location = useLocation();

    if (location.pathname !== "/admin_page/users_form/:_id" && localStorage.getItem("userData")) {
      window.localStorage.removeItem("userData");
    };
    
   if (location.pathname !== "/admin_page/update_p_form/:_id" && localStorage.getItem("pData")) {
       window.localStorage.removeItem("pData");
    };

//

  function handleLogout() {
    window.localStorage.removeItem("USER");
    window.localStorage.removeItem("authToken");
    setCurrentUser(false);
    logout();
  };

  return (
    <nav className="mb-5 text-success border border-success  p-3 pb-2 rounded">
      <img
        id="imgNav"
        src="/assets/pc.jfif"
        className=" mb-3 rounded"
        alt="e-commerce"
      />
      <div className="pb-2 border-bottom border-danger  w-25">
        <Link to={"/"}>
          <button className="btn-sm  mr-3  rounded bg-info text-warning border-warning">
            <b>Home</b>
          </button>
        </Link>
        <Link className="text-success  px-2 ps-3 " to={"/login"}>
          <u>Login</u>
        </Link>{" "}
        <Link className="text-success  " to={"register"}>
          <u>Register</u>
        </Link>
      </div>
      {/*  */}
      <div className={`ul2  ml-5 pt-3 text-success d-flex flex-row  `}>
        <div>
          {currentUser ? (
            <ul className="ml-2  pb-2 border-bottom border-danger w-auto">
              <li className="d-inline-block  mr-3">
                <Link className="text-success" to={"/private/delete"}>
                  <u>Dalete Account</u>
                </Link>
              </li>
              <li className="d-inline-block mr-3 px-3">
                <Link className="text-success" to={"/private"}>
                  <u>Private Info</u>
                </Link>
              </li>{" "}
              <li className="d-inline-block mr-4  ">
                <Link className="text-success" to={"/private/buy"}>
                  <u>Products shop</u>
                </Link>
              </li>
              <li className="d-inline-block mr-4   px-3">
                <Link className="text-success" to={`/private/myorders`}>
                  <u>Your Products List</u>
                </Link>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
        <div className="  mr-3 ms-5 ">
          {currentUser && currentUser.isAdmin ? (
            <ul className="  pb-2 border-bottom border-danger px-2 horizontal">
              <li className="d-inline-block mr-4  ">
                <Link className="text-success" to={`/admin_page/products_list`}>
                  <u>Make product</u>
                </Link>
              </li>
              <li className="d-inline-block mr-4">
                <Link className="text-success" to="/admin_page">
                  <u>Admin Page</u>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => handleLogout()}
                  className="btn-sm bg-danger text-white"
                >
                  <b>Logout</b>
                </button>
              </li>
            </ul>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
}
