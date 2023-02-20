const router = require('express').Router();
const { verifyToken } = require('../middlewares/verifyToken');
const {
  getOrders,
  getOrder,
  createOrder,
  modifyOrder,
  deleteOrder,
} = require("../controller/order");


router.get('/', getOrders);

router.get("/:orderId", getOrder);

router.post("/", verifyToken, createOrder);

router.put("/:orderId", verifyToken, modifyOrder);

router.delete("/:orderId", verifyToken, deleteOrder);

module.exports = router;