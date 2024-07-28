const express = require("express")
const authRoutes = require("./routes/authRoute.js")
const dotenv = require("dotenv")
const connectToMongoDb = require("./db/connnectDb.js")


dotenv.config() // with this we can able to read the value

const app = express()
const PORT = process.env.PORT || 8000


app.use(express.json())

app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})

connectToMongoDb();