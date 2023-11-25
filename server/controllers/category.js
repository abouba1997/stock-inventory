const CategoryModel = require("../models/Category");

const getAllCategories = async (req, res) => {
  // Retrieve all users
  try {
    const results = await CategoryModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const getCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const result = await CategoryModel.findById(categoryId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const createCategory = async (req, res) => {
  const { category_name } = req.body;

  try {
    const createdCategory = await CategoryModel.create({ category_name });
    if (createdCategory) {
      return res.status(201).json({ msg: "Category creation successfully" });
    }
    return res.status(400).json({ msg: "Category creation failed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const updateCategory = async (req, res) => {
  const categoryId = req.params.id;
  const { category_name } = req.body;

  try {
    const updatedCategory = await CategoryModel.update(categoryId, {
      category_name,
    });

    if (updatedCategory) {
      return res.status(200).send("Category updated successfully");
    }
    res.status(400).send("Category updated failed");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = CategoryModel.delete(categoryId);

    if (deletedCategory) {
      return res.status(200).send("Category updated successfully");
    }

    res.status(400).send("Category deletion failed");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
