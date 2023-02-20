import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthGlobalContext } from "../../context/authContext/AuthGlobalContext";
import { ProductGlobalContext } from "../../context/productContext/ProductGlobalContext";

export const ProductUpdateForm = () => {

  const { currentUser } = useContext(AuthGlobalContext);
  const { state, loadProduct, ModifyProduct } =   useContext(ProductGlobalContext); 
    const { oneProduct } = state;


  const { _id } = useParams();

  const [localOneProduct, setLocalOneProduct] = useState<any>(oneProduct);
  const [toggle, setToggle] = useState<boolean>(false);
  
  useEffect(() => {
    loadProduct(String(_id));
  }, [_id, loadProduct]);

  useEffect(() => {
    setLocalOneProduct(oneProduct);
    window.localStorage.removeItem("pData");
  }, [oneProduct]);


  const { name, desc, img, categories, price } = localOneProduct || {};

  //
  const [category1, setCategory1] = useState("");
  const [category2, setCategory2] = useState("");
  const [category3, setCategory3] = useState("");


  const userFromLocalStorage = localStorage.getItem("pData");
  if (userFromLocalStorage && !localOneProduct) {
    setLocalOneProduct(JSON.parse(userFromLocalStorage));
  };

    if(!category1 && !toggle){
      if(categories){
        setCategory1( categories[0]);
        setCategory2(categories[1]);
        setCategory3(categories[2]);
        setToggle(true);
  }
};

  
  function handleChange(event: any) {
    const { name, value } = event.target;
    setLocalOneProduct({ ...localOneProduct, [name]: value });
  };

 
  if (!localOneProduct) {
    return <div>Loading...</div>;
  };

  //
  function handleSubmit(event: any) {
    event.preventDefault();

    if (currentUser.isAdmin) {
      let count: number = 1;

      const categories = [category1.trim()];

      if (category2) {
        categories.push(category2.trim());
        count++;
      };
      if (category3) {
        categories.push(category3.trim());
        count++;
      };

    //    setLocalOneProduct({
    //     name,
    //     desc,
    //     img,
    // categories: [category1 ? category1 : category2 ? category2 : category3, 
    //       category2 ? category2 : category3, 
    //       category3].slice(0, count),
    //     price,
    //   });
      //*
      const formData = {
        name: name.trim(),
        desc: desc.trim(),
        img: img.trim(),
        categories: [
          category1 ? category1 : category2 ? category2 : category3,
          category2 ? category2 : category3,
          category3,
        ].slice(0, count),
        price,
      };

    ModifyProduct(_id, formData); 

    }
  };

  return (
    <>
      <h1>Update Product Form</h1>
      <div>
        <span className="text-success">
          <b>Name:</b>
        </span>{" "}
        {localOneProduct && localOneProduct.name} {" - "}
        <span className="text-success">
          <b>Code:</b>
        </span>{" "}
        {localOneProduct && localOneProduct._id}
      </div>
      <br />
      <form className="mb-5" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label> <br />
        <input
          className="my-2"
          type="text"
          name="name"
          value={name || ""}
          placeholder="Product name.."
          onChange={handleChange}
        />{" "}
        <br />
        <label htmlFor="desc">Description</label> <br />
        <input
          className="w-50 my-2"
          type="text"
          name="desc"
          placeholder="Product Description.."
          value={desc || ""}
          onChange={handleChange}
        />{" "}
        <br />{" "}
        <label className="mb-2" htmlFor="img">
          Image
        </label>{" "}
        <br />
        <textarea
          className="w-50 rounded"
          name="img"
          value={img || ""}
          placeholder="Image Product.."
          onChange={handleChange}
        ></textarea>{" "}
        <div className="div_categories mt-3">
          {/*  */}
          <br />
          <div>
            <label htmlFor="categories0">1º Category</label> <br />
            <input
              type="text"
              name="categories0"
              placeholder="Category Product 1.."
              // defaultValue={category1 ? category1 : categories[0]}
              value={category1 || ""}
              onChange={(event) => setCategory1(event.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="categories1">2º Category</label> <br />
            <input
              type="text"
              name="categories1"
              placeholder="Category Product 2.."
              value={category2}
              onChange={(event) => setCategory2(event.target.value)}
            />
          </div>{" "}
          <br />
          <div>
            <label htmlFor="categories2">3º Category</label> <br />
            <input
              type="text"
              name="categories2"
              placeholder="Category Product 3.."
              value={category3 || ""}
              onChange={(event) => setCategory3(event.target.value)}
            />
          </div>
          <br />{" "}
        </div>{" "}
        <label className="mt-2" htmlFor="price">
          Price
        </label>{" "}
        <br />
        <input
          type="number"
          name="price"
          placeholder="Price.."
          value={price || ""}
          onChange={handleChange}
        />{" "}
        <br />
        <button className="btn-sm text-info bg-warning my-3 mb-5" type="submit">
          <b> Submit</b>{" "}
        </button>
        <br />
      </form>
    </>
  );
}
   











 

