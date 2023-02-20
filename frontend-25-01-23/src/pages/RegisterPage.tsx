import { useContext, useState } from "react";
import { AuthGlobalContext } from "../context/authContext/AuthGlobalContext";

export const RegisterPage = () => {
  const { RegisterUser } = useContext(AuthGlobalContext);

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event: any) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }
  console.log(user);
  function handleSubmit(event: any) {
    event.preventDefault();

    RegisterUser(user);
  }

  return (
    <>
      <h1>Register Page</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          required
          placeholder="Your name"
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
          placeholder="Your email"
        />{" "}
        <br />
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
          placeholder="Your password"
        />{" "}
        <br /> <br />
        <button type="submit">
          <b>Submit</b>
        </button>
      </form>
    </>
  );
};
