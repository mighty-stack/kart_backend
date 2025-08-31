const productModel = require("../Models/product.model")


getAllProducts = (req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: err.message }));
};


getProductById = (req, res) => {
  Product.findOne({ id: req.params.id })
    .then((product) => {
      if (!product) return res.status(404).json({ error: "Product not found" });
      res.json(product);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};


searchProducts = (req, res) => {
  const query = req.query.q;
  Product.find({ name: new RegExp(query, "i") })
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: err.message }));
};


getByCategory = (req, res) => {
  Product.find({ category: req.params.cat })
    .then((products) => res.json(products))
    .catch((err) => res.status(500).json({ error: err.message }));
}

module.exports = {
    getAllProducts,
    getProductById,
    searchProducts,
    getByCategory
}
