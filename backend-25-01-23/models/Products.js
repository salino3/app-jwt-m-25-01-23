const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
  },
  img: {
    type: String, 
  },
  categories: {
    type: Array
  },
  price: {
    type: Number,
    required: true,
  }
 },
  {
    timestamps: true,
    versionKey: false        
  }
);


module.exports = mongoose.model('Product', productSchema);

