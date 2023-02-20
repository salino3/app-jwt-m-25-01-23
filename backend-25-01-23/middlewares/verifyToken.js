const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");


 const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["authtoken"];

    if (!token) return res.status(403).json({ message: "No token provided" });

    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    console.log(decoded);

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "no user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "In valid token" });
  }
};


const verifyAdmin = async (req, res, next) => {
  try {

    //  { password: 0 } .In the return data we don't include password
    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "no user found" });
    if (!user.isAdmin)
      return res.status(403).json({ message: "You are not an admin" });
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyToken, verifyAdmin };




    // const token = req.headers["authtoken"];
    // if (!token) return res.status(403).json({ message: "No token provided" });
    // const decoded = jwt.verify(token, config.SECRET);
    // req.userId = decoded.id;