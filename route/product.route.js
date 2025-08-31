const express = require("express")
const router = express.Router()
const productModel = require("../Models/product.model")
const {getAllProducts, getProductById, searchProducts, getByCategory} = require("../controller/product.controller")


router.get("/categories", (req, res) => {
  productModel
  .distinct("category")
    .then((categories) => {
      res.json(categories);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});


router.get("/search/query", searchProducts)
router.get("/category/:cat", getByCategory)

router.get("/", getAllProducts)
router.get("/:id", getProductById)

module.exports = router
