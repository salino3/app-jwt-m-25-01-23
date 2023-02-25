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

  return (
    <>
      <h1>Login</h1>
      {currentUser && currentUser.username}
      <form
        className="w-25 m-auto my-5 form-container formL"
        onSubmit={handleSubmit}
      >
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          autoComplete="username"
          placeholder="Text your Email"
          value={email}
          onChange={handleInputChange}
        />
        <br />
          <label htmlFor="password">
            Password:
          </label>
          <input
            placeholder="Text your Password"
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={handleInputChange}
          />
        <br />
        <button className="mt-2 btn btn-primary m-auto" type="submit">Submit</button>
      </form>
    </>
  );
};
