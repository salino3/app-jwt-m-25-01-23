import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import ProductForm from '../../components/ProductForm';
import { AuthGlobalContext } from '../../context/authContext/AuthGlobalContext';
import { ProductGlobalContext } from '../../context/productContext/ProductGlobalContext';

export const ProductsList = () => {

  const { currentUser } = useContext(AuthGlobalContext);
  const { state, deleteProduct } = useContext(ProductGlobalContext);
  const { datos} = state;
  
console.log("P", datos);
  return (
    <>
      <ProductForm />

      {currentUser && (
        <h3 className="div1 mt-2">
          {currentUser.username} - {currentUser.email}
        </h3>
      )}
      <div className="divListP">
        <hr  />
        <table className=" divlist table table-striped table-dark ">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Name Product</th>
              <th scope="col">description</th>
              <th scope="col">Image</th>
              <th scope="col">Categories</th>
              <th scope="col">Price</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>

          <tbody>
            {datos.map((item: any) => (
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

                <th className="text-success">{item.price}</th>
                <th className="text-warning ">
                  <button
                    className="btn-danger btn-sm rounded  my-1"
                    onClick={() => deleteProduct(item._id)}
                  >
                    <b>Delete</b>
                  </button>{" "}
                  <Link to={`/admin_page/update_p_form/${item._id}`}>
                    <button className="btn-warning btn-sm rounded my-1">
                      Update
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
