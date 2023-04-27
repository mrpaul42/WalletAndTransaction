const walletSchema = require("../module/walletSchema");

exports.initializeWallet = async (req, res, next) => {
  try {
    const { balance, name } = req.body;
    if (!balance || !name) {
      res.status(400).json({
        status: "failure",
        message: "Required fields are missing.",
      });
      return;
    }
    const data = {
      balance,
      name,
    };
    const walletInitialized = await walletSchema.create(data);
    res.status(201).json({
      status: "Success",
      message: "Wallet Initialized successfully",
      data: walletInitialized,
    });
  } catch (err) {
    console.log("catch exception in initialize wallet", err);
    res.status(400).json({ status: "failure", message: err.message });
  }
};

exports.getWallet = async (req, res, next) => {
  try {
    const { id: walletId } = req.params;
    const walletData = await walletSchema.findOne({ _id: walletId });
    if (!walletData) {
      res.status(404).json({ status: "failure", message: "Data not found." });
      return;
    }
    res.status(200).json({
      status: "Success",
      message: "Fetched Wallet data successfully.",
      data: walletData,
    });
  } catch (err) {
    console.log("catch exception in initialize wallet", err);
    res.status(400).json({ status: "failure", message: err.message });
  }
};
