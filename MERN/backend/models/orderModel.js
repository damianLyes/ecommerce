const mongoose = require("mongoose");

//schema are similar to phpmyadmin tables 
const orderSchema = mongoose.Schema({
    items: {type: Array},
    user: {type: mongoose.Types.ObjectId, ref: "User"},
    name: {type: String},
    address: {type: String},
    number: {type: Number},
    totalPrice: {type: Number}, 
    status: {type: String}
},
{
    timestamps: true
});


const Order = mongoose.model("Order", orderSchema);
module.exports = Order;