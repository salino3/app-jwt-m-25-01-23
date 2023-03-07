import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductGlobalContext } from "../context/productContext/ProductGlobalContext";
import { GlobalContext } from "../context/userContext/GlobalContext";

export const Home = () => {
  // const { state } = useContext(GlobalContext);
 const { state } = useContext(ProductGlobalContext);
 const { datos } = state;
  console.log("state", state);

  return (
    <>
      <h1>Home</h1>
      <h3>Register to buy our products</h3>
      <div className="divLinks p-5 m-2">
        <Link className="border border-success rounded p-2 " to={"/register"}>Go to Register page</Link>
        <Link className="border border-warning rounded p-2 "  to={"/login"}>Go to Login page</Link>
      </div>

      <div className="divListP divListHome">
        <hr />
        <table className=" divlist table table-striped table-dark ">
          <thead>
            <tr>

              <th scope="col">Code</th>
              <th scope="col">Name Product</th>
              <th scope="col">description</th>
              <th scope="col">Image</th>
              <th scope="col">Categories</th>
              <th scope="col">Price</th>
            </tr>
          </thead>

          <tbody>
            {datos &&
              datos.map((item: any, index: number) => (
                <tr key={item._id} className={" p divlist"}>
                  <th className="text-warning " scope="row">
                    {item._id}
                  </th>
                  <th className="text-success">{item.name}</th>
                  <th className="text-warning">{item.desc}</th>
                  <th className="text-success rounded ">
                    <img
                      className="rounded imgP"
                      src={item.img}
                      alt={item.name}
                    />
                  </th>
                  <th className="text-warning">
                    {item.categories.map((item2: any, index: number) => (
                      <React.Fragment key={index}>
                        {item2}
                        {index !== item.categories.length - 1 ? ", " : ""}
                      </React.Fragment>
                    ))}
                  </th>
                  <th className="text-success">{item.price} €</th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
