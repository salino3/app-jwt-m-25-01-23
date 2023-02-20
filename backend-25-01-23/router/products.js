const router = require('express').Router();
const {
  getProducts,
  getProduct,
  createProduct,
  modifyProduct,
  deleteProduct
} = require("../controller/product");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");


router.get('/',  getProducts);

router.get('/:productId', getProduct);

router.post("/", [verifyToken, verifyAdmin], createProduct);

router.put("/:productId", [verifyToken, verifyAdmin], modifyProduct);

router.delete("/:productId", [verifyToken, verifyAdmin], deleteProduct);


module.exports = router;








