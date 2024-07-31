const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const notificationController = require("../controller/notification.conroller")

const router = express.Router()

router.get("/all", authMiddleware, notificationController.allNotifications)
router.delete("/delete", authMiddleware, notificationController.deleteNotifications)


module.exports = router