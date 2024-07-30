const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const userController = require("../controller/user.controller")

const router = express.Router()

router.get("/profile/:username", authMiddleware, userController.getUserProfile)
router.get("/suggested", authMiddleware, userController.getSuggestedUsers)
router.post("/profile/:id", authMiddleware, userController.followUnfollowUser)
router.post("/update", authMiddleware, userController.updateProfile)


module.exports = router