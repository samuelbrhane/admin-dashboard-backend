const Product = require("../models/product");
const ProductStat = require("../models/productStat");
const User = require("../models/user");
const Transaction = require("../models/transaction");

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
    const customers = await User.find().select("-password");
    res.status(200).json(customers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get transactions
const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = "" } = req.body;

    const generateSort = () => {
      const sortParse = JSON.parse(sort);
      const sortFormatted = {
        [sortParse.field]: sortParse.sort === "asc" ? 1 : -1,
      };
      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i") } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const totalTransactions = await Transaction.countDocuments({
      name: { $regex: search, options: "i" },
    });

    res.status(200).json({ transactions, totalTransactions });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, getCustomers, getTransactions };
