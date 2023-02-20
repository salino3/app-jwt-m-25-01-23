import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/userContext/GlobalContext";

export const Home = () => {
  const { state } = useContext(GlobalContext);
  const { datos } = state;

  console.log("state", state);

  return (
    <>
      <h1>Home</h1>
      <div className="divLinks">
        <Link to={"/register"}>Go to Register page</Link>
        <Link to={"/login"}>Go to Login page</Link>
      </div>
      {datos.map((item: any) => (
        <div key={item._id} className="itemList">
          <span>{item.email}</span>
          <hr />
          <br />
        </div>
      ))}
    </>
  );
};
