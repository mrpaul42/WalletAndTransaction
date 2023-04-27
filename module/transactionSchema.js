const mongoose = require("mongoose");
const { Schema } = mongoose;
// { amount, description }

const TransactionSchema = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  walletId: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ["Credit", "Debit"],
  },
});

TransactionSchema.set("timestamps", true);

module.exports = mongoose.model("transaction", TransactionSchema);
