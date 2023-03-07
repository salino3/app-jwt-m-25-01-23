import React, { useContext, useState } from "react";
import { AuthGlobalContext } from "../context/authContext/AuthGlobalContext";
import { GlobalContext } from "../context/userContext/GlobalContext";

export const UpdateUser = () => {
  const { currentUser } = useContext(AuthGlobalContext);
  const { ModifyUser } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  const { username, email } = formData;

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (email && username) {
      await ModifyUser(currentUser.id, formData);

      window.localStorage.removeItem("USER");
      window.localStorage.removeItem("authToken");
      window.location.href = "/login";
      alert("Info User modified! Now login again for renew the token");

    };
  };

  console.log({ currentUser });

  return (
    <>
      <h1>Update User</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          autoComplete="username"
          value={username}
          onChange={handleInputChange}
        />
        <br /> <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          autoComplete="username"
          value={email}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

