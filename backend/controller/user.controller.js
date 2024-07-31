const bcrypt = require("bcryptjs")
const cloudinary = require("cloudinary")

//models
const notificationModel = require("../models/notification")
const userModel = require("../models/user.model")

const getUserProfile = async (req, res) => {
    try {
        const { username } = req.params
        // console.log(username)

        const user = await userModel.findOne({ username })
        if (user) {
            res.status(200).json({
                message: "Welcome to user profile",
                succcess: true,
                user: user
            })
        } else {
            res.status(404).json({
                message: "User not found",
                succcess: false,
            })
        }
    } catch (error) {
        res.status(400).json({
            error
        })
    }

}

const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;

        const userToModify = await userModel.findById(id)
        const currentUser = await userModel.findById(req.user._id)
        // console.log(userToModify)
        // console.log(currentUser)

        if (id === req.user._id.toString()) {
            return res.status(404).json({
                message: "User can not follow/unfollow himself/herself",
                succcess: true
            })
        }

        if (!userToModify || !currentUser) res.status(404).json({ message: "User not found" })


        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            //unfollow the user
            await userModel.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            await userModel.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            res.status(200).json({ message: "User unfollowed successfully" })
        } else {
            //follow the user
            await userModel.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await userModel.findByIdAndUpdate(req.user._id, { $push: { following: id } })

            //send the notification 
            const newNotification = new notificationModel({
                sender: req.user._id,
                receiver: id,
                type: "follow",
                read: false
            })

            await newNotification.save()

            res.status(200).json({ message: "User followed successfully" })
        }
    } catch (error) {
        return res.json({ error })
    }

}

const getSuggestedUsers = async (req, res) => {
    try {
        const userId = req.user._id;

        const userFollowedByMe = await userModel.findById(userId).select("following")

        const users = await userModel.aggregate([
            {
                $match: {
                    _id: { $ne: userId },
                }
            },
            {
                $sample: { size: 10 }
            }
        ])

        const filteredUsers = users.filter(user => {
            return !userFollowedByMe.following.includes(user._id)
        })

        const suggestedUsers = filteredUsers.slice(0, 4)
        suggestedUsers.forEach(user => {
            user.password = null
        })

        res.status(200).json({
            message: "Suggested users fetched successfully",
            success: true,
            users: suggestedUsers
        })

    } catch (error) {
        return res.json({ error })
    }
}

const updateProfile = async (req, res) => {
    const { username, email, fullname, currentpassword, newpassword, bio, link } = req.body
    let { profileImage, coverImage } = req.body

    const userId = req.user._id
    try {
        let user = await userModel.findById(userId)
        if (!user) return res.status(404).json({ message: "User not found" })

        if ((!currentpassword && newpassword) || (currentpassword && !newpassword)) {
            return res.status(400).json({ message: "Please provide both current password and new password" })
        }

        if (currentpassword && newpassword) {
            const isPasswordSame = await bcrypt.compare(currentpassword, user.password)

            if (!isPasswordSame) {
                return res.status(400).json({ message: "Current password is incorrect" })
            }
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newpassword, salt)
            user.password = hashedPassword
        }

        if (profileImage) {
            if (user.profileImage) {
                await cloudinary.uploader.destroy(user.profileImage).split("/").pop().split(".")[0]
            }
            const uploadedRespone = await cloudinary.uploader.upload(profileImage)
            profileImage = uploadedRespone.secure_url
        }

        if (coverImage) {
            if (user.coverImage) {
                await cloudinary.uploader.destroy(user.coverImage).split("/").pop().split(".")[0]
            }
            const uploadedRespone = await cloudinary.uploader.upload(coverImage)
            coverImage = uploadedRespone.secure_url
        }


        user.fullname = fullname || user.fullname
        user.username = username || user.username
        user.email = email || user.email
        user.bio = bio || user.bio
        user.link = link || user.link
        user.profileImage = profileImage || user.profileImage
        user.coverImage = coverImage || user.coverImage

        user = await user.save()

        user.password = null

        res.status(200).json({ message: "Profile updated successfully", success: true, user })


    } catch (error) {
        console.log(error)
        res.json({ error })
    }
}

const userController = {
    getUserProfile,
    getSuggestedUsers,
    followUnfollowUser,
    updateProfile
}

module.exports = userController