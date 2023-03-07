import { useCallback, useEffect, useReducer, useState } from "react";
import { AuthReducer } from "./AuthReducer";
import axios from 'axios';
import { AuthGlobalContext } from "./AuthGlobalContext";
import jwt_decode from "jwt-decode";


interface Props {
    children: JSX.Element | JSX.Element[];
};


export const AuthProvider = ({children}: Props) => {
  //* Personal Info during Login
  let USER = "USER";
  const [currentUser, setCurrentUser] = useState(null);

  //* useReducer
  const [stateAuth, dispatch] = useReducer(AuthReducer, currentUser);

  //* Register
  const RegisterUser = useCallback(async (formData: any) => {
    console.log({ formData });
    // Send a POST request to the backend with the user's username, email, password, and roles
   await axios
      .post(
        "http://localhost:4100/api/users/register",
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        alert("User Registered!");
        //
        window.location.href = "/login";
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

   //* Login
  const LoginUser = useCallback(async (formdata: any) => {
    console.log("dentro SignInuser");

    await axios
      .post(
        "http://localhost:4100/api/users/login",
        {
          email: formdata.email,
          password: formdata.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setCurrentUser(response.data);
        // If the login was successful, store the authorization token in local storage
        localStorage.setItem("authToken", response.data.token);

        if (response.data.token) {
          const decodedToken: any = jwt_decode(response.data.token);

          loggedUser(decodedToken);
           login();
          console.log("checkUserEmail", typeof decodedToken.id);
        } else {
          console.log("Token is null or undefined");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //* loginUser
  const loggedUser = useCallback(function (info: any) {
    dispatch({
      type: "UPDATE_USER_CHECK_TRUE",
      payload: window.localStorage.setItem(USER, JSON.stringify(info)),
    });
  }, []);

  //* logoutUser
  // const loggedoutUser = useCallback(function () {
  //   dispatch({
  //     type: "UPDATE_USER_CHECK_FALSE",
  //     payload: window.localStorage.removeItem(USER),
  //   });
  //   setCurrentUser(null);
  // }, []);

  //!!

  //* isAuthenticated
  let auth = "auth";
  const [isAuthenticated, setIsAuthenticated] = useState(
    window.localStorage.getItem(auth) ?? false
  );

  const login = useCallback(function () {
    window.localStorage.setItem(auth, "true");
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(function () {
    window.localStorage.removeItem(auth);
    setIsAuthenticated(false);
  }, []);
 


  ///* authToken
   let authToken = localStorage.getItem("authToken");
  useEffect(() => {
    
    if (authToken) {
    const decodedToken: any = jwt_decode(authToken);
    setCurrentUser(decodedToken);

    };
  }, [authToken]);
  
//
    let user: any;
    useEffect(() => {
      const storedUser = localStorage.getItem("USER") || "";
      if (storedUser) {
        user = JSON.parse(storedUser);
        setCurrentUser(user);
      };
    }, []);
 

  return (
    <>
      <AuthGlobalContext.Provider
        value={{
          stateAuth,
          currentUser,
          isAuthenticated,
          setCurrentUser,
          RegisterUser,
          LoginUser,
          logout,
        }}
      >
        {children}
      </AuthGlobalContext.Provider>
    </>
  );
}

