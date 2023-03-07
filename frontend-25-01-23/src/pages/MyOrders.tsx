import React, { useContext } from 'react';
import { AuthGlobalContext } from '../context/authContext/AuthGlobalContext';
import { OrderGlobalContext } from "../context/orderContext/OrderGlobalContext";
import { ProductGlobalContext } from '../context/productContext/ProductGlobalContext';


export const MyOrders = () => {


    const { currentUser } = useContext(AuthGlobalContext);
    const { state: stateP } = useContext(ProductGlobalContext);
    const { state: stateO, deleteOrder } = useContext(OrderGlobalContext);
  

  return (
    <>
      <h1>My Orders</h1>
      {stateO.datos
        .filter((x: any) => x.userId === currentUser.id)
        .map((item: any) => (
          <div
            key={item._id}
            className="border w-50 text-info m-auto my-1 py-1 rounded "
          >
            <h6>
              <span className="text-warning">code order: </span>
              {item._id}
            </h6>
            {/*  */}
            <button
              onClick={() => deleteOrder(item._id)}
              className="p-3 bg-danger text-white"
            >
              <b>Delete</b>
            </button>
            <h5>
              <span className="text-warning"> your code: </span>
              {item.userId}
            </h5>
            {item.products.map((product: any, index: number) => (
              <div key={index}>
                <p>
                  {" "}
                  {stateP.datos
                    .filter((x: any) => x._id === product.productId)
                    .map((y: any) => (
                    <> 
                     <p> <span className="text-warning">product: </span>{y.name}</p> <img src={y.img} alt="product" width={"70"} />
                    </>
                    ))}
                </p>
                <div>
                  {" "}
                  <span className="text-warning">quanity: </span>
                  {product.quantity}
                </div>
              </div>
            ))}
          </div>
        ))}
    </>
  );
};

