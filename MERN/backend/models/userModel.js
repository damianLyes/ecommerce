const mongoose = require("mongoose");

//schema are similar to phpmyadmin tables 
const userSchema = mongoose.Schema({
    email: {type: String},
    username: {type: String},
    password: {type: String},
    isAdmin: {type: Boolean, default: false},
},
{
    timestamps: true
});


const User = mongoose.model("User", userSchema);
module.exports = User;