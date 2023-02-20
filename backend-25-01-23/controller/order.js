const Order = require('../models/Order');

//* Get Alls Orders
const getOrders = async (req, res) => {
 
    try {
        const orders = await Order.find();
    
        if(!orders){
          return  res.status(404).res("Error..");
        };
    
        res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    };
};


//* Get one Order
const getOrder = async (req, res) => {

    try {
      const order = await Order.findById(req.params.orderId);

      if (!order) {
        return res.status(404).res("Error..");
      };
      res.status(200).json(order);

    } catch (error) {
               return res.status(404).json(error);
    };
};


//* Post CreateOrder
const createOrder = async (req, res) => {
   const {body} = req;

   const order = new Order(req.body);

  try {
    const savedOrder = await order.save();

    if(savedOrder){
       res.status(200).json(savedOrder);
    }
  } catch (error) {
    res.status(200).json(error);
  };

};

//* Put Modify Order
const modifyOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const { userId } = await Order.findById(orderId);
  const updatedOrder = { ...req.body, userId };

  try {
    const result = await Order.findByIdAndUpdate(orderId, updatedOrder, {
      new: true,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};


//* Delete 
const deleteOrder = async (req, res) => {

 try {
    const deleteOrder = await Order.findByIdAndDelete(req.params.orderId);

    if(!deleteOrder){
      return res.status(404).json("Order not found");
    };

    res.status(200).json("Order nº " + deleteOrder._id + " deleted!");

 } catch (error) {
    return res.status(500).json(error);
 };
};
 
module.exports = { getOrders, getOrder, createOrder, modifyOrder, deleteOrder };