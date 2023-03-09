const Product = require("../models/Products");


//* Get products
const getProducts = async (req, res) => {
  const qNew = req.query.new;
  //* localhost:4100/api/products?new=true   <lasts 5>

  const qCategory = req.query.category;
  //* localhost:4100/api/products?category=cap

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

//* Get One Product
const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findById(productId);
    //   const product = await Product.findOne({ _id: productId });

    if(product){
   res.status(200).json(product)
    };
  } catch (error) {
    res.status(500).json(error);
  };
};

//* Post Make Product
const createProduct = async (req, res) => {

  const numId = await assignNumId();
  //
  const { body } = req;
    const { name, desc, img, categories, price } = body;
  const product = new Product({ numId, name, desc, img, categories, price });
  // const product = new Product(body);

  const thename = await Product.findOne({ name: req.body.name });
  if (thename) {
    return res.status(400).json({ message: "This name already esxists" });
  };

 try { 
  const savedProduct = await product.save();
   res.status(200).json(savedProduct);
   
 } catch (error) {
    res.status(404).json(error);
 };
};

//* Put Modify Product
const modifyProduct = async (req, res) => {

 try {
   const updateProduct = await Product.findByIdAndUpdate(
     req.params.productId,
     {
       $set: req.body,
     },
     { new: true }
   );

   res.status(200).json(updateProduct);
 } catch (error) {
   res.status(500).json(error);
 };
};

//* Delete Product
const deleteProduct = async (req, res) => {
const {productId} = req.params;
    try {
      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return res.status(404).json("Product not found");
      }

      res.status(200).json("Product " + productId + " has been deleted!");
    } catch (error) {
        res.status(500).json(error);    
    };
};


module.exports = {
  getProducts,
  getProduct,
  createProduct,
  modifyProduct,
  deleteProduct,
}; 