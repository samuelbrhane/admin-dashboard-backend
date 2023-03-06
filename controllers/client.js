const Product = require("../models/product");
const ProductStat = require("../models/productStat");

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productStat = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return { ...product._doc, stat };
      })
    );

    res.status(200).json(productStat);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts };
