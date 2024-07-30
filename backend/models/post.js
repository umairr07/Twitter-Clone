const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
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
            ref: "userModel"
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
                ref: "userModel",
                required: true
            }
        }
    ]
}, {
    timestamps: true
})

const postModel = mongoose.model("post", postSchema)

module.exports = postModel