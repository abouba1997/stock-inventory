const CategoryModel = require("../models/Category");

const getAllCategories = async (req, res) => {
  // Retrieve all users
  try {
    const results = await CategoryModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getCategory = async (req, res) => {
  const categoryId = req.params.id;
  try {
    const result = await CategoryModel.findById(categoryId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createCategory = async (req, res) => {
  const { category_name } = req.body;

  try {
    const createdCategory = await CategoryModel.create({ category_name });
    if (createdCategory) {
      return res.status(201).json({ msg: "Categorie ajoutée avec succès" });
    }
    return res.status(400).json({ msg: "Echec de la creation de catégorie" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
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
      return res.status(200).send("Categorie mise à jour avec succès");
    }
    res.status(400).send("Echec de la mise à jour de catégorie");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const deleteCategory = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const deletedCategory = CategoryModel.delete(categoryId);

    if (deletedCategory) {
      return res.status(200).send("Catégorie supprimée avec succès");
    }

    res.status(400).send("Echec de la suppression de catégorie");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const getAllProductsByCategoryId = async (req, res) => {
  const categoryId = req.params.id;

  try {
    const results = await CategoryModel.findAllByCategoryId(categoryId);
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

module.exports = {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllProductsByCategoryId,
};
