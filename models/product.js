const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: String,
    description: String,
    price: Number,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
