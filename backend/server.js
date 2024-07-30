const express = require("express")
const dotenv = require("dotenv")
const connectToMongoDb = require("./db/connnectDb.js")
const cloudinary = require("cloudinary")

//routes
const authRoutes = require("./routes/authRoute.js")
const userRoutes = require("./routes/userRoutes.js")
const postRoutes = require("./routes/postRoutes.js")


dotenv.config() // with this we can able to read the value
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT || 8000


app.use(express.json())

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/posts", postRoutes)


app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
    connectToMongoDb()
})
