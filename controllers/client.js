const Product = require("../models/product");
const ProductStat = require("../models/productStat");
const User = require("../models/user");

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

// get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "user" }).select("-password");
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, getCustomers };
