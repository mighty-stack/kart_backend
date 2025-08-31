const mongoose = require("mongoose");
const fs = require("fs");
require("dotenv").config()
const productModel = require("./models/product.model");

// MongoDB connection
let URI = process.env.MONGO_DB_URI

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


//

const products = JSON.parse(
  fs.readFileSync("./ecommerce_products.json", "utf-8")
);


productModel.insertMany(products)
  .then(() => {
    console.log("Database seeded with 500 products");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Seeding error:", err);
    mongoose.connection.close();
  });

