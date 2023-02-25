import { useContext } from "react";
import { AuthGlobalContext } from "../context/authContext/AuthGlobalContext";
import { GlobalContext } from "../context/userContext/GlobalContext";

export const DeleteUser = () => {
  const { currentUser, setCurrentUser, logout } = useContext(AuthGlobalContext);

  const { state, deactivateUser } = useContext(GlobalContext);
  const { oneUser } = state;

  console.log("oneUser", oneUser);
  console.log("currentUser", currentUser);

  //
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    let Email = event.target.email.value;
    let Password = event.target.password.value;

    if (Email === currentUser.email) {
      await deactivateUser(currentUser.id, Password);

    } else {
      alert("The data does not match");
    };
  };

  return (
    <>
      <h1>Delete Account</h1>
      <h5 className="text-warning">
        ~ {currentUser && currentUser.username} ~
      </h5>
      <form className="formDelete" onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label className="labelEmail" htmlFor="email">
            Email:
          </label>

          <input type="email" name="email" autoComplete="username" />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
          />
        </div>
        <br />
        <button className="btn-sm bg-danger text-white" type="submit">
          <b>Submit</b>
        </button>
      </form>
    </>
  );
};
