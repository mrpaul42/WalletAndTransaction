const express = require("express");
const router = express.Router();
const walletController = require("../controller/wallet");

router.post("/", walletController.initializeWallet);

module.exports = router;
