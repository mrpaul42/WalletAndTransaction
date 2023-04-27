const mongoose = require("mongoose");
const { Schema } = mongoose;

const TransactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  walletId: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["Credit", "Debit"],
    default: "Credit",
  },
});

TransactionSchema.set("timestamps", true);

module.exports = mongoose.model("transaction", TransactionSchema);
