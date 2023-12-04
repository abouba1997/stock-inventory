const ProductModel = require("../models/Product");

const getAllProducts = async (req, res) => {
  // Retrieve all users
  try {
    const results = await ProductModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getProduct = async (req, res) => {
  // Retrieve user by id
  const { id } = req.params;
  try {
    const result = await ProductModel.findById(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createProduct = async (req, res) => {
  const {
    product_name,
    description,
    price,
    quantity_on_hand,
    category_id,
    supplier_id,
  } = req.body;

  const imagePath = req?.file?.path;

  try {
    if (imagePath) {
      await ProductModel.create({
        product_name,
        description,
        price,
        quantity_on_hand,
        category_id,
        supplier_id,
        imagePath,
      });
    } else {
      await ProductModel.create({
        product_name,
        description,
        price,
        quantity_on_hand,
        category_id,
        supplier_id,
      });
    }
    return res.status(201).send("Produit ajouté avec succès");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const imagePath = req?.file?.path;

  const {
    product_name,
    description,
    price,
    quantity_on_hand,
    category_id,
    supplier_id,
  } = req.body;

  console.log(imagePath);

  try {
    if (imagePath) {
      await ProductModel.update(productId, {
        product_name,
        description,
        price,
        quantity_on_hand,
        category_id,
        imagePath,
        supplier_id,
      });
    } else {
      await ProductModel.update(productId, {
        product_name,
        description,
        price,
        quantity_on_hand,
        category_id,
        supplier_id,
      });
    }
    return res.status(200).send("Produit mis à jour avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.delete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Erreur de suppression du produit" });
    }
    return res.status(200).send("Produit supprimé avec succès");
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur", error });
  }
};

const getProductsSupplier = async (req, res) => {
  const supplierId = req.params.id;
  // Retrieve all users
  try {
    const results = await ProductModel.findAllProductsByCustomId(
      "supplier_id",
      supplierId
    );
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsSupplier,
};
