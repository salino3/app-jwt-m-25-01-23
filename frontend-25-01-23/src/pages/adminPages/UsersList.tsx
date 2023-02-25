import { useContext } from "react"
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/userContext/GlobalContext"
import { AuthGlobalContext } from "../../context/authContext/AuthGlobalContext";

export const UsersList = () => {

    const { state, deleteUser } = useContext(GlobalContext);
    const {datos} = state;
    const {currentUser} = useContext(AuthGlobalContext);


  function handleDelete(user: any) {
  
    if (currentUser.id !== user._id) {
      deleteUser(currentUser.id, user._id);
    } else {
      alert("You cannot delete yourself in this section");
    };
  };

  return (
    <>
      {currentUser && (
        <h3 className="div1">
          {currentUser.username} - {currentUser.email}
        </h3>
      )}
      <div className="">
        <hr />
        <table className=" divlist table table-striped table-dark ">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Active</th>
              <th scope="col">Admin/Client</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {datos.map((user: any) => (
              <tr key={user._id} className={"divlist "}>
                <th scope="row">{user._id}</th>
                <th>{user.username}</th>
                <th>{user.email}</th>
                <th>{user.active ? "Yes" : "No"}</th>
                <th>{user.isAdmin ? "Admin" : "client"}</th>
                <th>
                  <button
                    className="btn-sm bg-danger text-white"
                    onClick={() => handleDelete(user)}
                  >
                    {" "}
                    <b>Delete</b>{" "}
                  </button>{" "}
                  <Link to={`/admin_page/users_form/${user._id}`}>
                    <button className="btn-sm bg-warning mt-1 text-white">
                      <b>Update</b>
                    </button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
