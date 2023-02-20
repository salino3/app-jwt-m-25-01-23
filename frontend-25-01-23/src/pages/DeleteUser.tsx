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

      // await logout();

      // let user: any = JSON.parse(localStorage.getItem("USER") || "");
      // console.log("user", user);
      // setCurrentUser(user);
    } else {
      alert("The data does not match");
    }
  };

  return (
    <>
      <h1>Delete Account</h1>
      {currentUser && currentUser.username}
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" autoComplete="username" />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
