const notificationModel = require("../models/notification")

const allNotifications = async (req, res) => {
    try {
        const userId = req.user._id

        const notifications = await notificationModel.find({ receiver: userId }).populate({
            path: "sender",
            select: "username profileImage"
        })

        await notificationModel.updateMany({ receiver: userId }, { read: true })

        res.json({ notifications, success: true })
    } catch (error) {
        res.json({ error })
    }
}

const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id
        await notificationModel.deleteMany({ receiver: userId })

        res.json({ success: true, message: "Notifications deleted successfully" })
    } catch (error) {

    }
}

const notificationController = {
    allNotifications,
    deleteNotifications
}

module.exports = notificationController