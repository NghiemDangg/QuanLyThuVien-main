const router = require("express").Router();
const siteController = require("../app/controllers/siteController");
const adminController = require("../app/controllers/manageAdmin");
const authController = require("../app/controllers/authController")

router.get("/delete/user/:userid", adminController.deleteUser);
router.get("/search", siteController.search);
router.post("/login", authController.userLogin)
router.get("/logout", authController.userLogout)
router.get("/", siteController.index)

module.exports = router;
