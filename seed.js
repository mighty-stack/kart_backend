const mongoose = require("mongoose");
const fs = require("fs");
const userModel = require("../Models/user.model")

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerceDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Define a simple product schema (customize as needed)
const productSchema = new mongoose.Schema({
  name: String,
const products = JSON.parse(
  fs.readFileSync("./ecommerce_products.json", "utf-8")
)});

productModel.insertMany(products)
  .then(() => {
    console.log("Database seeded with 500 products");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  });

