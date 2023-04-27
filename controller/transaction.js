const transactionSchema = require("../module/transactionSchema");
const walletSchema = require("../module/walletSchema");

const checkRequiredFields = (res, ...args) => {
  if (args.some((ele) => !ele)) {
    res.status(400).json({
      status: "failure",
      message: "Required fields are missing.",
    });
    return false;
  }
  return true;
};

const balanceCheck = (res, walletData, amount, transactionType) => {
  if (walletData.balance < Math.abs(amount) && transactionType === "Debit") {
    res.status(400).json({
      status: "failure",
      message: "Insufficient balance to processed the transaction.",
    });
    return false;
  }
  return true;
};

const updateWallet = async (walletData, amount, walletId) => {
  const updateWalletData = {
    balance: walletData.balance + amount,
  };
  await walletSchema.findOneAndUpdate({ _id: walletId }, updateWalletData, {
    new: true,
  });
};

exports.createTransaction = async (req, res, next) => {
  try {
    let { amount, description } = req.body;
    const { id: walletId } = req.params;
    let transactionType = "Credit";
    if (amount < 0) {
      transactionType = "Debit";
    }
    if (!checkRequiredFields(res, amount, description)) return;
    const walletData = await walletSchema.findOne({ _id: walletId });
    if (!balanceCheck(res, walletData, amount, transactionType)) return;

    updateWallet(walletData, amount, walletId);

    const data = {
      amount: Math.abs(amount),
      description,
      transactionType,
      walletId,
    };
    const transactionCreated = await transactionSchema.create(data);
    res.status(201).json({
      status: "Success",
      message: "Transaction successful",
      data: transactionCreated,
    });
  } catch (err) {
    console.log("catch exception in create Transaction", err);
    res.status(400).json({ status: "failure", message: err.message });
  }
};
