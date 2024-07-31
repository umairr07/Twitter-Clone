const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const postController = require("../controller/post.controller")

const router = express.Router()

router.get("/all", authMiddleware, postController.getAllPosts)
router.post("/create", authMiddleware, postController.createPost)
router.post("/like/:id", authMiddleware, postController.likeUnlikePost)
router.post("/comment/:id", authMiddleware, postController.commentOnPost)
router.delete("/:id", authMiddleware, postController.deletePost)
router.get("/likedposts/:id", authMiddleware, postController.likedPosts)
router.get("/followingPosts", authMiddleware, postController.followingPosts)
router.get("/userPosts/:username", authMiddleware, postController.userPosts)

module.exports = router