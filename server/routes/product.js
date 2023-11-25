const express = require("express");
const upload = require("../fileUpload/fileUpload");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsSupplier,
} = require("../controllers/product");

const router = express.Router();

// GET all products
router.get("/", getAllProducts);

// GET a product by ID
router.get("/:id", getProduct);

// POST a new product
router.post("/", upload.single("productImage"), createProduct);

// PUT update a product
router.put("/:id", upload.single("productImage"), updateProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

// GET all product by supplier ID
router.get("/supplier/:id", getProductsSupplier);

module.exports = router;
