const express = require("express");
const {
  getAllSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
  saveSales,
} = require("../controllers/sale");

const router = express.Router();

// GET all Sales
router.get("/", getAllSales);

// GET a Sale by ID
router.get("/:id", getSale);

// POST a new Sale
router.post("/", createSale);

// PUT update a Sale
router.put("/:id", updateSale);

// DELETE a Sale
router.delete("/:id", deleteSale);

router.post("/save-sales", saveSales);

module.exports = router;
