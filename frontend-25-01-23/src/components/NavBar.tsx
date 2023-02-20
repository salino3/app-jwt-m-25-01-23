import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthGlobalContext } from '../context/authContext/AuthGlobalContext';
import { useLocation } from "react-router-dom";


export const NavBar = () => {

  const { currentUser } = useContext(AuthGlobalContext);

  const location = useLocation();

    if (location.pathname !== "/admin_page/users_form/:_id" && localStorage.getItem("userData")) {
      window.localStorage.removeItem("userData");
    };
    
   if (location.pathname !== "/admin_page/update_p_form/:_id" && localStorage.getItem("pData")) {
       window.localStorage.removeItem("pData");
    };



  return (
    <nav className="mb-5 text-success border border-success p-3 pb-2 rounded">
      <div className="pb-2 border-bottom border-danger  w-25">
        <Link to={"/"}>
          <button className="btn-sm  mr-3 rounded bg-info text-warning border-warning">
            <b>Home</b>
          </button>
        </Link>
        <Link className="text-success  px-3" to={"#"}>
          <u>List</u>
        </Link>{" "}
        <Link className="text-success  px-3" to={"/login"}>
          <u>Login</u>
        </Link>{" "}
        <Link className="text-success  pl-3" to={"register"}>
          <u>Register</u>
        </Link>
      </div>
      {/*  */}
      <div className="ml-5 pt-3 text-success d-flex flex-row  ">
        <ul className="ml-2  pb-2 border-bottom border-danger w-auto">
          {currentUser ? (
            <li className="d-inline-block  mr-3">
              <Link className="text-success" to={"/private/delete"}>
                <u>Dalete Account</u>
              </Link>
            </li>
          ) : (
            ""
          )}
          <li className="d-inline-block mr-3 px-3">
            {currentUser ? (
              <Link className="text-success" to={"/private"}>
                <u>Private Info</u>
              </Link>
            ) : (
              ""
            )}
          </li>{" "}
          <li className="d-inline-block mr-4  ">
            {currentUser ? (
              <Link className="text-success" to={`#`}>
                <u>Make product</u>
              </Link>
            ) : (
              ""
            )}
          </li>
          <li className="d-inline-block mr-4   px-3">
            <Link className="text-success" to={`#`}>
              <u>Your Products List</u>
            </Link>
          </li>
        </ul>
        <div className="d-inline-block  mr-3 ms-5">
          <ul className="pb-2 border-bottom border-danger px-2 ">
            <li>
                <Link className="text-success" to={"/private/buy"}>
                  <u>Products shop</u>
                </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
