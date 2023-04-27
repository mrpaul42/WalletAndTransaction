const mongoose = require("mongoose");
const { Schema } = mongoose;

const WalletSchema = new Schema({
  balance: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
});

WalletSchema.set("timestamps", true);

module.exports = mongoose.model("wallet", WalletSchema);
