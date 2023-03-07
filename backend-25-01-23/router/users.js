const router = require("express").Router();
const { createUser, loginUser } = require("../controller/auth");
const {
  getUsers,
  getUser,
  updateUser,
  deactivateUser,
  deactivateUserByAdmin,
  deleteUser,
} = require("../controller/user");
const { verifyToken, verifyAdmin } = require("../middlewares/verifyToken");


router.post("/register", createUser);
 
router.post("/login", loginUser);

router.get("/", getUsers);
            
router.get("/:userId", getUser);     

router.put("/:userId", verifyToken, updateUser); 
    
router.patch("/:userId", verifyToken, deactivateUser); 

// 1º admin
router.patch("/:userId/:secondUser", [verifyToken, verifyAdmin], deactivateUserByAdmin); //< at the end I didn't need

// 1º admin
router.delete("/:userId/:secondUser", [verifyToken, verifyAdmin], deleteUser); 


module.exports = router; 
 