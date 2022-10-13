const mongoose = require("mongoose");
const { Schema } = mongoose;

const usersSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,

        required: [true, "Email required"],
    },
    password: {
        type: String,
        required: true,
    },
    addDate: { type: Date, default: Date.now },
});

const Users = mongoose.model("Users", usersSchema);
module.exports = Users;