const mongoose = require("mongoose");

//schema are similar to phpmyadmin tables 
const categorySchema = mongoose.Schema({
    name: {type: String},
},
{
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;