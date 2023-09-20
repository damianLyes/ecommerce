const mongoose = require("mongoose");

//schema are similar to phpmyadmin tables 
const productSchema = mongoose.Schema({
    name: {type: String},
    category: {type: mongoose.Types.ObjectId, ref: "Category"},
    price: {type: Number},
    description: {type: String},
    image: {type: String},
},
{
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;