const router = require("express").Router();
const { handleUserSignup, handleUserLogin, handleShowProfile } = require("../../controllers/user");
const verifyToken = require ('../../middlewares/index')
router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);
router.get('/profile',verifyToken,handleShowProfile);

module.exports = router;
