const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("../config");

//* createUser
const createUser = async (req, res) => {
  const { username, email, password, active, isAdmin } = req.body;
  // const { body } = req;

 


  if (req.body && email ) {
    const newUser = new User({
      username,
      email,
      active,
      isAdmin,
      password: await User.encriptPassword(password),
    });


    const theemail = await User.findOne({ email: req.body.email });
    if (theemail) {
      return res.status(400).json({ message: "This email already esxists" });
    };

    try {
      const savedUser = await newUser.save();

      const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
        expiresIn: 86400, // <- 24h
      });

      const { password, ...others } = savedUser._doc;
      res.status(200).json({ ...others, token });
      // res.status(200).json(savedUser, token);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(500).json("Enter your datas");
  };
}; 


//* loginUser
const loginUser = async (req, res) => {
 const { email, password } = req.body;

// check if user exists
const user = await User.findOne({ email });
if (!user ) {
return res.status(400).json({ message: "User not found" });
};

if(!user.active){
  return res.status(400).json({ message: "You are not registered" });
}

// check if password is correct
const isMatch = await User.comparePassword(password, user.password);
if (!isMatch) {
return res.status(401).json({ message: "Invalid password" });
}
 
// create token
const token = jwt.sign({ id: user._id, username: user.username, email: user.email,
active: user.active, isAdmin: user.isAdmin }, config.SECRET, {
expiresIn: 86400,
});

// return user and token
const {  password: hiddenPassword, ...others } = user._doc;
res.status(200).json({ ...others, token });
};

module.exports = { createUser, loginUser };



