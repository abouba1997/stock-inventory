const express = require("express");
const {
  getAllSaleItems,
  getSaleItem,
  createSaleItem,
  updateSaleItem,
  deleteSaleItem,
  getAllSaleItemsBySaleId,
} = require("../controllers/sale_item");

const router = express.Router();

// GET all SaleItemss
router.get("/", getAllSaleItems);

// GET a SaleItems by ID
router.get("/:id", getSaleItem);

// POST a new SaleItems
router.post("/", createSaleItem);

// PUT update a SaleItems
router.put("/:id", updateSaleItem);

// DELETE a SaleItems
router.delete("/:id", deleteSaleItem);

router.get("/sale/:id", getAllSaleItemsBySaleId);

module.exports = router;
