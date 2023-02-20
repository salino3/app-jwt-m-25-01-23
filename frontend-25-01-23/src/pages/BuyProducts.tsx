
import React, { useContext, useEffect, useState } from "react";
import { AuthGlobalContext } from "../context/authContext/AuthGlobalContext";
import { OrderGlobalContext } from "../context/orderContext/OrderGlobalContext";
import { ProductGlobalContext } from "../context/productContext/ProductGlobalContext";

export const BuyProducts = () => {
  const { currentUser } = useContext(AuthGlobalContext);
  const { createOrder } = useContext(OrderGlobalContext);
  const { state } = useContext(ProductGlobalContext);
  const { datos } = state;


  const [count, setCount] = useState<number[]>(new Array(datos.length).fill(0));
  const [indexState, setIndexState] = useState(-1);
  const [takeItem, setTakeItem] = useState<any>();

  
  function handleCountPlus(index: number) {
    setCount((prevCount: number[]) => {
      let newCount = [...prevCount];
      newCount[index]++;
      console.log("x", newCount[index]);
      return newCount;
    });
  };

  function handleCountMines(index: number) {
    setCount((prevCount: number[]) => {
      let newCount = [...prevCount];
      newCount[index]--;
      console.log("y", newCount[index]);
      return newCount;
    });
  };


  let myObj: any[] = [{}];
  for (let i = 0; i < datos.length; i++) {
    myObj.push(datos[i]);
  }; 

 


  //! creo no necessito más - // function handleClick(item: any, index: number) {
  //   setIndexState(index);

  //   if (indexState !== index) {
  //     setIndexState(index);
  //     console.log("dentro de while")
  //   }



  //   console.log("su valor indexState", indexState);
  //   //count[myObj.indexOf(item)],
  //   const formData: any = {
  //     userId: currentUser.id,
  //     products: [
  //       {
  //         productId: item._id,
  //         quantity: count[indexState],
  //       },
  //     ],
  //   };
  //   console.log("formData2 ->", formData);

  //   if (currentUser && indexState === index) {
  //     console.log(
  //       "count indexOf test ->",
  //       // count.filter((item: any) => item > 0 && item === indexState) -    count[indexState]
  //       count[indexState]
  //     );
  //      createOrder(formData);
  //     //  .filter((item: any) => item > 0)   -  .filter((item: any) => item === count[myObj.indexOf(item)])
  //     // .filter((item: any) =>(  item > 0 || item))
  //   }
  //   setCount(Array(datos.length).fill(0));
  // };
  //

      console.log("cerca el return", indexState);

      useEffect(() => {
   console.log("takeItem ->", takeItem);
      console.log("EFFECT", indexState);
      //
    if(takeItem){
       const formData: any = {
         userId: currentUser.id,
         products: [
           {
             productId: takeItem._id,
             quantity: count[indexState],
           },
         ],
       };
//
    if (currentUser && indexState !== -1) {
   if(count[indexState] > 0  ){
      createOrder(formData);
}else{
  alert("Select how many items you want buy")
};
    };
    setCount(Array(datos.length).fill(0));
};
   return () => {
     setIndexState(-1);    
   };
  }, [indexState]);

  
 

  return (
    <>
      <div className="divListP">
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
              <th scope="col">Actions</th>
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

                  <th className="text-success">{item.price}</th>
                  <th className="text-warning ">
                    <div>
                      {" "}
                      <button
                        className="btn-info btn-sm rounded  my-1"
                        onClick={() => handleCountPlus(index && index)}
                      >
                        <b className="text-white">+ 1</b>
                      </button>{" "}
                      <button
                        className="btn-secondary btn-sm rounded  my-1"
                        onClick={() => handleCountMines(index && index)}
                      >
                        <b className="text-white">- 1</b>
                      </button>{" "}
                      <span className="text-warning">
                        <b>{count[index] && count[index]}</b>
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setIndexState(index);
                          setTakeItem(item);
                      }}
                      className="btn-warning btn-sm rounded my-1"
                    >
                      Buy
                    </button>
                  </th>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};











