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
