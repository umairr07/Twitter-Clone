const mongoose = require("mongoose")

const connectToMongoDb = async () => {
    const conn = mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log("Db connected succefully"))
        .catch((err) => console.log("Errro connecting to DB", err))
}

module.exports = connectToMongoDb;