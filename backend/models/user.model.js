const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: []
        }
    ],
    profileImage: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    likedPosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "post"
        }
    ],

}, { timeseries: true })

const userModel = mongoose.model("User", userSchema)

module.exports = userModel;