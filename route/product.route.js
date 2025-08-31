const express = require("express")
const router = express.Router()
const productModel = require("../Models/product.model")
const {getAllProducts, getProductById, searchProducts, getByCategory} = require("../controller/product.controller")


router.get("/", getAllProducts)
router.get("/:id", getProductById)
router.get("/search/query", searchProducts)
router.get("/category/:cat", getByCategory)

module.exports = router
