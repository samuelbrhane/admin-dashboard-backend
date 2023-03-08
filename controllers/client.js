const Product = require("../models/product");
const ProductStat = require("../models/productStat");
const User = require("../models/user");
const Transaction = require("../models/transaction");
const getCountryISO3 = require("country-iso-2-to-3");

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
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get transactions
const getGeography = async (req, res) => {
  try {
    const users = await User.find();
    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryISO3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formattedLocations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProducts, getCustomers, getTransactions, getGeography };
