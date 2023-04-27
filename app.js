const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const testRouter = require("./router/test");
const walletRouter = require("./router/wallet");
const transactionRouter = require("./router/transaction");

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl);
const db = mongoose.connection;

db.on("error", console.error.bind(console, "db connect error"));
db.once("open", () => {
  console.log("db connected");
});

app.use(bodyParser.json());

app.use("/test", testRouter);
app.use("/setup", walletRouter);
app.use("/transaction", transactionRouter);

module.exports = app.listen(3000, () => {
  console.log("App is running on port 3000");
});
