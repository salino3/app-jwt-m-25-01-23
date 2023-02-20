const mongoose = require("../db");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: { 
      type: String,
      required: true,
    },
    active: {
      type: Boolean, 
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, 
    versionKey: false }
);
 
userSchema.statics.encriptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivePassword) => {
  return await bcrypt.compare(password, receivePassword);
};

module.exports = mongoose.model('User', userSchema);

