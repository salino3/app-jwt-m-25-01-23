import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthGlobalContext } from "../context/authContext/AuthGlobalContext";

export const Private = () => {
  const { currentUser, setCurrentUser, logout } = useContext(AuthGlobalContext);

  
  const { username, active, email, id, isAdmin } = currentUser || {};;

console.log("checkeando", username);


  function handleLogout() {
    window.localStorage.removeItem("USER");
    window.localStorage.removeItem("authToken");
    setCurrentUser(false);
    logout();
  }

  return (
    <>
      <h1>Private</h1>
      <Link to="/admin_page">Go to Admin Page</Link>
      <div className="infoUser">
        <h2>{username && username}</h2> <br />
        <span>{email && email}</span> <br />
        <span>{id && id}</span> <br />
        {isAdmin ? <span> You are Administrator</span> : ""} <br />
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
    </>
  );
};
