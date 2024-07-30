const mongoose = require("mongoose")

const connectToMongoDb = async () => {
    const conn = mongoose.connect("mongodb://localhost:27017/twitter-db")
        .then(() => console.log("Db connected succefully"))
        .catch((err) => console.log("Errro connecting to DB", err))
}

module.exports = connectToMongoDb;