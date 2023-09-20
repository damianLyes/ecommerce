//import express package
const express = require("express");
const cors = require("cors");

const { default: mongoose } = require("mongoose");
const User = require("./models/userModel");
const Product = require("./models/productModel");
const Order = require("./models/orderModel");
const Category = require("./models/categoryModel");

//configure your app
const app = express();

//GET Requests
//app.use(express());
app.use(express.json());
app.use(cors());

//configuring a database(mongodb)
const MongoDBURL = "mongodb://localhost/mernclass";
mongoose
  .connect(MongoDBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((err) => console.log(err));

//api's
// app.post("/api/users/register", function (req, res) {
//   console.log(req.body);
// });

//REGISTER USER ROUTE
app.post("/api/users/register", async (req, res) => {
  //check if email already exists & cancelling registeration if true
  const existingEmail = await User.findOne({ email: req.body.email });
  if (existingEmail) {
    res.send({ error: "Email has already been used" }); //sends error message to frontend
    console.log({ error: "Email has already been used" }); //logs error msg to terminal
    return;
  }

  //creating a new user in db
  const newUser = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    //isAdmin: true               //creating an admin
  });

  //saving a new user
  const user = await newUser.save();
  res.send({ success: "Registeration Successful" });
  console.log({ success: "Registeration Successful" });
});

// app.get("/", function (req, res) {
//   // req->request object, res->respose object
//   res.send("First Route");
// });

// app.get("/api/users/register", function (req, res) {
//   res.send("Register User");
// });



//LOGIN ROUTE
app.post("/api/users/login", async (req, res) => {
  //checking if email exists
  const existingUser = await User.findOne({ email: req.body.email });
  if (!existingUser) {
    //if there is no existing email
    res.send({ error: "Email does not exist" });
    console.log({ error: "Email does not exist" });
    return;
  }

  //check for correct password
  if (existingUser.password !== req.body.password) {
    res.send({ error: "Password is Incorrect" });
    console.log({ error: "Password is Incorrect" });
    return;
  }
  let user = {
    _id: existingUser._id,
    email: existingUser.email,
    username: existingUser.username,
    isAdmin: existingUser.isAdmin,
  }

  res.send({ success: "Login Successful" , user});    // 'user' can also be written as user: user.
  console.log({ success: "Login Successful"}); 
});


//ADD PRODUCT Route
app.post("/api/products", async (req, res) => {
  // const newProduct = new Product(req.body);
  const newProduct = new Product({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image
  });

  const product = await newProduct.save();
  res.send({success : "Product Saved Successfully"});
  console.log({success : "Product Saved Successfully"});
});


//API FOR GETTING PRODUCTS
app.get("/api/products", async (req, res) => {
  //search function
  let text = req.query.text;
  let nameFilter = text ? {name: {$regex: text, $options: 'i'}} : {};
  //search end

  const products = await Product.find({...nameFilter});
  // const products = await Product.find();
  res.send(products);
});

//GET SINGLE PRODUCT (for edit)
app.get("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  //get product from the database using productId
  const product = await Product.findById(productId).populate("category");
  res.send(product);   //sending product to the frontend
  //console.log(product);
});

//UPDATE A SINGLE PRODUCT
app.put("/api/products/:id", async (req, res) => {
  const productId = req.params.id;
  //get product from the database using productId
  const product = await Product.findById(productId);
  
  //updating product
  product.name = req.body.name;
  product.category = req.body.category;
  product.price = req.body.price;
  product.description = req.body.description;
  product.image = req.body.image;

  //saving product
  await product.save();
  res.send({success: "Product Updated Successfully"});
  //console.log({success: "Product Updated Successfully"});
});

 
//DELETE SINGLE PRODUCT API
app.delete("/api/products/:id", async (req, res) => {
  //getting ID of product to delete
  const productId = req.params.id;
  //delete product from DB
  await Product.findByIdAndRemove(productId);
  res.send({success: "Product Deleted Successfully"});
});


//Order Routes
app.post("/api/orders", async(req, res) => { 
  let items = req.body.items;
  //  console.log(items) 
  let totalPrice = 0;
    for(let i = 0 ; i <items.length ; i++){
      totalPrice = totalPrice + items[i].price* items[i].qty;
    }
    //console.log(totalPrice) 
  
  const order = new Order({
    items: req.body.items,
    user: req.body.user,
    name: req.body.name,
    address: req.body.address,
    number: req.body.number,
    totalPrice: totalPrice
  });

  const newOrder = await order.save();
  res.send({success: "Order Saved Successfully", orderId: newOrder._id})
});

//Get All orders 
app.get("/api/orders", async(req, res) => {
  const orders = await Order.find();
  res.send(orders);
});

//Get orders of logged in user
app.get("/api/orders/mine/:id", async(req,res)=>{
  const uid = req.params.id;
  //get the orders of aparticular user
  const orders = await Order.find({user: uid});
  // const orders = await Order.find().populate("user");

  res.send(orders.reverse());
  //console.log(orders);
});

//get single order details
app.get("/api/orders/:id", async(req, res) => {
  const order = await Order.findById(req.params.id);;
  res.send(order);
  //console.log(order);
});

//Update Order Status
app.put("/api/orders/:id", async(req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();
  res.send({success: "Order Status Updated Successfully"});
});


//Add New Caategory Route
app.post("/api/categories", async(req, res) => {
  const category = new Category({
    name: req.body.name
  });

  const newCategory = await category.save();
  
  res.send({success: "Category Added Successfully"});
});

//Get Categories Route
app.get("/api/categories", async(req, res) => {
  const categories = await Category.find();

  res.send(categories);
});

//Get Single Category
app.get("/api/categories/:id", async(req, res) => {
  const catId = req.params.id;
  const category = await Category.findById(catId);
  res.send(category)
});

//Update Category
app.put("/api/categories/:id", async(req, res) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  category.name = req.body.name;
  await category.save();
  res.send({success: "Category Updated Successfully"});
});

//Delete A Category
app.delete("/api/categories/:id", async(req, res) => {
  const idToDelete = req.params.id;

  await Category.findByIdAndRemove(idToDelete);

  res.send({success: "Category Deleted Successfully"});
});

app.get("/api/dashboard/info", async(req, res) => {
  const products = await Product.countDocuments();
  const users = await User.countDocuments();
  const categories = await Category.countDocuments();
  const orders = await Order.countDocuments();

  res.send({products, users, categories, orders});
});


//listen on a server(starting a server)
app.listen("5000", () => {
  console.log("Listening on port:5000");
});