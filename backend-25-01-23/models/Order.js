const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: [
    {
      productId: {
        type: String,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
 }, 
 {timestamps: true,
   versionKey: false}
 );

 module.exports = mongoose.model("Order", orderSchema);
