import { useContext, useEffect, useState } from "react";
import { AuthGlobalContext } from "../context/authContext/AuthGlobalContext";

export const LoginPage = () => {
  const { LoginUser, currentUser } = useContext(AuthGlobalContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (email && password) {
      LoginUser(formData);
    }
  };

  // useEffect(() => {
  //   let user: any = JSON.parse(localStorage.getItem("USER") || "");
  //   console.log("user", user);
  //   setCurrentUser(user);
  // }, []);
  console.log("currentUser", currentUser);

  return (
    <>
      <h1>Login</h1>
      {currentUser && currentUser.username}
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          autoComplete="username"
          value={email}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          autoComplete="current-password"
          value={password}
          onChange={handleInputChange}
        />
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
