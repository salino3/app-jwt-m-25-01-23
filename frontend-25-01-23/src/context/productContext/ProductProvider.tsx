import { useCallback, useEffect, useReducer, useState } from 'react'
import axios from 'axios';
import { T } from '../userContext/Interfaces';
import { ProductGlobalContext } from './ProductGlobalContext'
import { ProductReducer } from './ProductReducer';


interface Props {
    children: JSX.Element | JSX.Element[]
};


export const ProductProvider = ({children}: Props) => {
  const [oneProduct, setOneProduct] = useState({});

  const [state, dispatch] = useReducer(ProductReducer, {
    datos: [],
    oneProduct: null,
  });

  //* API call
  const fetchApi = useCallback(async () => {
    await fetch("http://localhost:4100/api/products")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "LOAD_DATA",
          payload: data,
        });
      });
  }, []);

  useEffect(() => {
    fetchApi();
  }, []);

  //* Create Product
  const createProduct = useCallback(async (formData: any) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios
        .post(
          "http://localhost:4100/api/products",
          {
            name: formData.name,
            desc: formData.desc,
            img: formData.img,
            categories: [
              formData.categories[0],
              formData.categories[1],
              formData.categories[2],
            ],
            price: formData.price,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authtoken: token,
            },
          }
        )
        .then((res) => {
          fetchApi();
          alert("Product added!");
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

  //* Look One Product
  const loadProduct = useCallback(async (id: T) => {
    try {
      const result = await axios.get(
        `http://localhost:4100/api/products/${id}`
      );
      const pData = JSON.parse(JSON.stringify(result.data));
      localStorage.setItem("pData", JSON.stringify(pData));
      setOneProduct(result.data);

    } catch (error) {
      console.log(error);
      alert("Product with this code is not in the database");
    }
  }, []);

  //* Modify Product
  const ModifyProduct = useCallback(async (id: T, formData: any) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios
        .put(`http://localhost:4100/api/products/${id}`, formData, {
          headers: {
            // "Content-Type": "application/json",
            authtoken: token,
          },
        })
        .then(() => {
          fetchApi();
          alert("Product modified!");  
          window.location.href = "/admin_page/products_list";
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
      alert("An error has occurred..");
    };
  }, []);


  //* Delete Product
  const deleteProduct = useCallback(async (id: T) => {
    const token = localStorage.getItem("authToken");
    try {
      await axios.delete(`http://localhost:4100/api/products/${id}`, {
        headers: { authtoken: token },
      });
      alert("Product deleted!");
                fetchApi();
    } catch (error) {
      alert("Has been an error..");
    };
  }, []);

  return (
    <>
      <ProductGlobalContext.Provider
        value={{
          state,
          fetchApi,
          loadProduct,
          deleteProduct,
          createProduct,
          ModifyProduct,
          setOneProduct, 
        }}
      >
        {children}
      </ProductGlobalContext.Provider>
    </>
  );
}

