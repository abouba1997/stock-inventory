const express = require("express");
const {
  getAllPaymentMethods,
  getPaymentMethod,
  createPaymentMethod,
} = require("../controllers/payment_method");

const router = express.Router();

// GET all PaymentMethods
router.get("/", getAllPaymentMethods);

// GET a PaymentMethod by ID
router.get("/:id", getPaymentMethod);

// POST Create a new PaymentMethod
router.post("/", createPaymentMethod);

module.exports = router;
