const express = require("express");
const { generatorNum } = require("unique-sequence");
const pool = require("../helpers/db");
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllProductsByCategoryId,
} = require("../controllers/category");

const router = express.Router();

// GET all categories
router.get("/", getAllCategories);

// GET a category by ID
router.get("/:id", getCategory);

// POST a new category
router.post("/", createCategory);

// PUT update a category
router.put("/:id", updateCategory);

// DELETE a category
router.delete("/:id", deleteCategory);

router.get("/products/:id", getAllProductsByCategoryId);

module.exports = router;
