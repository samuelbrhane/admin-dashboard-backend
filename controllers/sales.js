const TotalStat = require("../models/totalStat");

// get all statistics
const getAllStats = async (req, res) => {
  try {
    const stats = await TotalStat.find();
    res.status(200).json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllStats };
