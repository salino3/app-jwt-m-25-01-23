import { useContext } from "react";
import { AuthGlobalContext } from "../context/authContext/AuthGlobalContext";

export const Private = () => {
  const { currentUser, setCurrentUser, logout } = useContext(AuthGlobalContext);

  
  const { username, active, email, id, isAdmin } = currentUser || {};;


  function handleLogout() {
    window.localStorage.removeItem("USER");
    window.localStorage.removeItem("authToken");
    setCurrentUser(false);
    logout();
  }; 

  // console.log(currentUser.email)

  return (
    <div className="divPrivate w-75 m-auto">
      <h1 className="text-success">Private</h1>
      {isAdmin ? <h2 className="text-warning"> Welcome Administrator</h2> : ""}
      <div className="infoUser mt-3">
        <h3>
          <div>
            <span className="span1">Your username: </span>{" "}
          </div>
          <div>
            <span className="text-primary span2"> {username && username}</span>
          </div>
        </h3>{" "}
        <br />
        <h3>
          <div>
            <span className="span1">Your email: </span>
          </div>
          <div>
            <span className="text-primary span2"> {email && email}</span> <br />
          </div>
        </h3>
        <br />
        <h3>
          <div>
            <span className="span1">Your code: </span>
          </div>
          <div>
            <span className="text-primary span2"> {id && id}</span>
          </div>
        </h3>
        <br />
        <button
          className="mt-5 bg-danger text-white rounded btn-sm"
          onClick={() => handleLogout()}
        >
          <b>Logout</b>
        </button>
      </div>
    </div>
  );
};
