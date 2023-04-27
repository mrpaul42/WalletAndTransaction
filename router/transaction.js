const express = require("express");
const router = express.Router();
const transactionController = require("../controller/transaction");

router.post("/:id", transactionController.createTransaction);
router.get("/", transactionController.getTransaction);

module.exports = router;
