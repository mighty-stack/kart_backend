const express = require("express");
const router = express.Router();
const { initializePayment, verifyPayment } = require("../controller/payment.controller");

router.post("/initialize", initializePayment);
router.get("/verify/:reference", verifyPayment);

module.exports = router;
