const express = require("express");
const router = express.Router();

const testController = require("../controller/test");

router.get("/search/:testId", testController.getTest);

module.exports = router;
