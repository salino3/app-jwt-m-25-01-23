const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require('../config');


//* GET ALL
const getUsers = async (req, res) => {

 try {
     const users = await User.find();
 
     const filteredUsers = users.map((user) => {
       const { password, ...others } = user._doc;
       return others;
     });
     res.status(200).json(filteredUsers);
 } catch (error) {
  console.error(error);
 };
};
 

//* Get one User
const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findOne({ _id: userId }); 

  if (user) {
        const { password, ...others } = user._doc;
    res.status(200).json(others); 
  } else {
    res.status(404).json({ 
      msg: `Doesn't exists a user with id ${_id}`,
    });
  }; 
};


//* Update
const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { body } = req;
   
  try {
    let user = await User.findById(userId);


    if (!user) {
      return res.status(404).json({
        msg: "don't exist a user with id " + userId,
      });
    }

    // check if email already exists
    const existeEmail = await User.findOne({
      where: {
        email: body.email,
        _id: { $ne: userId }
      },
    });
    
    if (
      existeEmail &&
      existeEmail.email === body.email &&
      existeEmail._id != userId
    ) {
      return res.status(400).json({
        msg: "already exists a user with email " + body.email,
      });
    }

    // update user with new data
    user = await User.findByIdAndUpdate(userId, body, { new: true });

    // remove password from the returned user object
    const { password: hiddenPassword, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


//* Patch User
const deactivateUser = async (req, res) => {
  const { userId } = req.params;
  //?
  const { password } = req.body;

  const user = await User.findById(req.params.userId);
  if (!user) { 
    return res.status(404).json({
      msg: "Does not exist a user with id " + userId,
    });
  };

  // check if password is correct
  const isMatch = await User.comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  };

  const updatedUser = await User.findOneAndUpdate( 
    { _id: req.params.userId },
    { active: false },
    { new: true }
  );

  //  const token = jwt.sign({ updatedUser }, process.env.JWT_SECRET);

  res.status(200).json(updatedUser);
};


//* Patch User By Admin
const deactivateUserByAdmin = async (req, res) => {
  const { userId } = req.params;
  const { secondUser } = req.params;

  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(404).json({
      msg: "Does not exist a admin with id " + userId,
    });
  }
  const user2 = await User.findById(req.params.secondUser);
  if (!user2) {
    return res.status(404).json({
      msg: "Does not exist the other user with id " + secondUser,
    });
  };

  if(!user.isAdmin){
   return res.status(404).json({
     msg: "You are not a administrator",
   });
  };

  const updatedUser = await User.findOneAndUpdate(
    { _id: req.params.secondUser },
    { active: false },
    { new: true }
  );

  res.status(200).json(updatedUser);
};
 

const deleteUser = async (req, res) => {
 
  try {
  const deleteUser = await User.findByIdAndDelete(req.params.secondUser);

    if (!deleteUser) {
      return res.status(404).json("User not found");
    };
    res.status(200).json("User with email " + deleteUser.email + " deleted!");

  } catch (error) {
    return res.status(500).json(error);
  };
};




module.exports = {
  getUsers,
  getUser,
  updateUser,
  deactivateUser,
  deactivateUserByAdmin,
  deleteUser
};
