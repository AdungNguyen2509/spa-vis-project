const mongoose = require("mongoose")
const validator = require("validator")


const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        date: {
            type: Date,
            require: true
        },
    }
)

module.exports = mongoose.model("User", userSchema)