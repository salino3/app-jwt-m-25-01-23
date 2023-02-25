import React, { useCallback, useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import { OrderGlobalContext } from './OrderGlobalContext';
import { OrderReducer } from './OrderReducer';
import { T } from '../userContext/Interfaces';

interface Props {
    children: JSX.Element | JSX.Element[]
};


export const OrderProvider = ({children}: Props) => {
  const [oneOrder, setOneOrder] = useState({});

  const [state, dispatch] = useReducer(OrderReducer, {
    datos: [],
    oneOrder: null,
  });

  //* API call
  const fetchApi = useCallback(async () => {
    await fetch("http://localhost:4100/api/orders")
      .then((response) => response.json())
      .then((data) => {
        // Envía la acción de carga de datos al reducer
        dispatch({
          type: "UPDATE_ORDERS_CHECK_TRUE",
          payload: data,
        });
      });
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  //* Create Order
  const createOrder = useCallback(async (formData: any) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .post(
          "http://localhost:4100/api/orders",
          {
            userId: formData.userId,
            products: formData.products,
            // products:  [
            //     {
            //         productId: formData.productId,
            //         quantity: formData.quantity
            //     }
            // ]
          },
          {
            headers: {
              "Content-Type": "application/json",
              authtoken: token,
            },
          }
        )
        .then(() => {
          // window.location.reload();
          fetchApi();
          alert("Added to your cart!");
        })
        .catch((error) => {
          console.log(error);
          alert("An error has occurred!");
        });
    } catch (error) {
      console.error(error);
      alert("An error has occurred..");
    }
  }, []);

  //* Look One Order
  const loadOrder = useCallback(async (id: T) => {
    try {
      const result = await axios.get(`http://localhost:4100/api/orders/${id}`);
      //   const pData = JSON.parse(JSON.stringify(result.data));
      //   localStorage.setItem("pData", JSON.stringify(pData));
      setOneOrder(result.data);
    } catch (error) {
      console.log(error);
      alert("Product with this code is not in the database");
    }
  }, []);

  //* Delete Order
  const deleteOrder = useCallback(async (id: T) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:4100/api/orders/${id}`, {
        headers: { authtoken: token },
      });
      alert("Order deleted!");
      // window.location.reload();
      fetchApi();
    } catch (error) {
      alert("Has been an error..");
    };
  }, []);

  return (
    <>
      <OrderGlobalContext.Provider value={{ state, loadOrder, createOrder, deleteOrder }}>
        {children}
      </OrderGlobalContext.Provider>
    </>
  );
}
