import React, { useContext, useState } from "react";
import { AuthGlobalContext } from "../context/authContext/AuthGlobalContext";
import { ProductGlobalContext } from "../context/productContext/ProductGlobalContext";


const ProductForm = () => {
  
  const { currentUser } = useContext(AuthGlobalContext);
  const { createProduct } = useContext(ProductGlobalContext);

  const [myObj, setMyObj] = useState<any>({
    name: "",
    desc: "",
    img: "",
    price: undefined
  });

  const {name, desc, img, price} = myObj;

  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");


  function handleChange(event: any) {
    const {name, value} = event.target;
   setMyObj({ ...myObj, [name]: value});
  };

//
  const handleSubmit = (event: any) => {
    event.preventDefault();

    
if(currentUser.isAdmin){
let count: number = 1;
       const categories = [category1];

       if (category2) {
         categories.push(category2);
         count++
       };
    if (category3) {
        categories.push(category3);
        count++
      };

    const formData = {
      name,
      desc,
      img,
      categories: [category1, category2, category3].slice(0, count),
      price,
    };

   createProduct(formData);

  }else{
    alert("You are not a Admin");
  };
};

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center">
        <div className="pt-3">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Product name.."
            required
            name="name"
            value={name}
          />
        </div>{" "}
        &nbsp;
        <div className="pt-3">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Product Description.."
            required
            name="desc"
            value={desc}
          />
        </div>{" "}
        &nbsp;
        <textarea
          className="w-25 rounded"
          onChange={handleChange}
          placeholder="Image Product.."
          required
          name="img"
          value={img}
        ></textarea>
      </div>
      <div className="div_cat my-3">
        <label htmlFor="categories1 categories2 categories3">
          Categories Products
        </label>{" "}
        <br />
        <input
          type="text"
          onChange={(event) => setCategory1(event.target.value)}
          placeholder="Category Product 1.."
          required
          name="categories1"
          value={category1}
        />{" "}
        &nbsp;
        <input
          type="text"
          onChange={(event) => setCategory2(event.target.value)}
          placeholder="Category Product 2.."
          name="categories2"
          value={category2}
        />{" "}
        &nbsp;
        <input
          type="text"
          onChange={(event) => setCategory3(event.target.value)}
          placeholder="Category Product 3.."
          name="categories3"
          value={category3}
        />
      </div>
      <input
        type="number"
        onChange={handleChange}
        placeholder="Price.."
        required
        name="price"
        value={price}
      />{" "}
      &nbsp;
      <button className=" btn-sm bg-primary text-info" type="submit">
        <b >Submit</b>
      </button>
      
    </form>
  );
};

export default ProductForm;