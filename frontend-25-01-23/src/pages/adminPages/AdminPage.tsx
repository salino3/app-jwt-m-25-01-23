import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthGlobalContext } from "../../context/authContext/AuthGlobalContext";

export const AdminPage = () => {

    const {currentUser} = useContext(AuthGlobalContext);


  return (
    <div>
      <h1>Admin Page</h1>
      {currentUser && (
        <small className="div1 ">
          {currentUser.username} - {currentUser.email}
        </small>
      )}
      <div className="divLinks mt-5">
        <div className="divProduct">
          <Link to="/admin_page/products_list">Product list</Link>
        </div>
        <div className="divUsers">
          <Link to="/admin_page/users_list">Users list</Link>
        </div>
      </div>
    </div>
  );
}

