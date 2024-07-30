const notificationModel = require("../models/notification")
const postModel = require("../models/post")
const userModel = require("../models/user.model")
const cloudinary = require("cloudinary")
const createPost = async (req, res) => {
    try {
        const { caption } = req.body
        console.log(caption)
        let { image } = req.body
        console.log(image)
        const userId = req.user._id.toString()

        const user = await userModel.findById(userId)
        if (!user) return res.json({ message: "User not found", success: false })

        if (image) {
            const uploadedResponse = await cloudinary.uploader.upload(img)
            image = uploadedResponse.secure_url
        }

        const newPost = new postModel({
            user: userId,
            caption: caption,
            image: image
        })

        await newPost.save()
        res.status(200).json({ message: "Post created successfully", success: true, newPost })

    } catch (error) {
        return res.json({ error })
    }
}

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 })
            .populate({
                path: "user",
                select: "-password"
            })
            .populate({
                path: "comments.user",
                select: "-password"
            })


        if (posts.length === 0) {
            return res.status(404).json({ message: "No posts found", success: false })
        }

        res.status(200).json({ message: "Posts fetched successfully", success: true, posts })
    } catch (error) {
        return res.json({ message: error.message, success: false })
    }
}

const likeUnlikePost = async (req, res) => {
    try {
        const userId = req.user._id.toString()
        const { id: postId } = req.params

        const post = await postModel.findById(postId)

        if (!post) {
            return res.status(404).json({ message: "Post not found", success: false })
        }

        const userLikedPost = post.likes.includes(userId)

        if (userLikedPost) {
            //unlike the post
            await postModel.findByIdAndUpdate(postId, { $pull: { likes: userId } })
            return res.status(200).json({ message: "Post unliked successfully", success: true })
        } else {
            //like the post
            post.likes.push(userId)
            await post.save()

            const notification = new notificationModel({
                sender: userId,
                receiver: post.user,
                type: "like",
                read: false
            })
            await notification.save()
            return res.status(200).json({ message: "Post liked successfully", success: true })
        }

    } catch (error) {
        return res.json({ error })
    }
}

const commentOnPost = async (req, res) => {
    try {
        const { text } = req.body
        const postId = req.params.id
        const userId = req.user._id;

        if (!text) {
            return res.status(400).json({ message: "Please add comment", success: false })
        }

        const post = await postModel.findById(postId)

        if (!post) {
            return res.status(404).json({ message: "Post not found", success: false })
        }

        const comment = {
            user: userId,
            text
        }

        post.comments.push(comment)
        await post.save()

        res.status(200).json({ message: "Comment added successfully", success: true, post })

    } catch (error) {
        return res.json({ error })
    }
}

const deletePost = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
        // console.log(post)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        if (post.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to delete this post" })
        }

        if (post.image) {
            const imageId = post.image.split("/").pop().split(".")[0]

            await cloudinary.uploader.destroy(imageId)
        }

        await postModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: "Post deleted successfully", success: true })

    } catch (error) {
        return res.json({ error })
    }
}

const postController = {
    createPost,
    getAllPosts,
    likeUnlikePost,
    commentOnPost,
    deletePost
}

module.exports = postController