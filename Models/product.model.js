const { default: mongoose, Model } = require("mongoose");

const productSchema = new mongoose.Schema({
  id: Number,
  name: String,
  category: String,
  price: Number,
  rating: Number,
  stock: Number,
  description: String,
  image: String,
});

let productModel = mongoose.model("product_collection", productSchema)

module.exports = productModel;