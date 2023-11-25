const express = require("express");
const upload = require("../fileUpload/fileUpload");
const {
  getAllSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier");

const router = express.Router();

// GET all Suppliers
router.get("/", getAllSuppliers);

// GET a Supplier by ID
router.get("/:id", getSupplier);

// POST a new Supplier
router.post("/", upload.single("supplierImage"), createSupplier);

// PUT update a Supplier
router.put("/:id", upload.single("supplierImage"), updateSupplier);

// DELETE a Supplier
router.delete("/:id", deleteSupplier);

module.exports = router;
