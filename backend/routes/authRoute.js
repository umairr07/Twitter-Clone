const express = require("express")
const authController = require("../controller/auth.controller")

const router = express.Router()

router.get("/signup", authController.signUp)
router.get("/login", authController.logIn)
router.get("/logout", authController.logOut)

module.exports = router;