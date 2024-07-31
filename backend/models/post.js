const mongoose = require("mongoose")
// const userModel = require("")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    caption: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        // required: true

    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            text: {
                type: String,
                required: true
            },
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel