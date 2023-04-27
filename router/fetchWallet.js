const express = require("express");
const router = express.Router();
const walletController = require("../controller/wallet");

router.get("/:id", walletController.getWallet);

module.exports = router;
