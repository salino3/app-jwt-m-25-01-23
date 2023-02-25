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

  };

  return (
    <>
      <h1>Register Page</h1>

      <form
        className="w-25 m-auto my-5 form-container formR"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username: </label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          required
          placeholder="Your name"
        />{" "}
        <br />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          required
          placeholder="Your email"
        />{" "}
        <br />
        <label htmlFor="username">Password: </label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          required
          placeholder="Your password"
        />{" "}
        <br /> <br />
        <button
          className="btn btn-success rounded mt-2  m-auto "
          type="submit"
        >
          <b>Submit</b>
        </button>
      </form>
    </>
  );
};
