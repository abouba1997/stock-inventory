const ProductModel = require("../models/Product");

const getAllProducts = async (req, res) => {
  // Retrieve all users
  try {
    const results = await ProductModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const getProduct = async (req, res) => {
  // Retrieve user by id
  const { id } = req.params;
  try {
    const result = await ProductModel.findById(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
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
    return res.status(201).send("Product added successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
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

  try {
    if (imagePath) {
      await ProductModel.update(productId, {
        product_name,
        description,
        price,
        quantity_on_hand,
        category_id,
        imagePath,
        productId,
        supplier_id,
      });
    } else {
      await ProductModel.update(productId, {
        product_name,
        description,
        price,
        quantity_on_hand,
        category_id,
        productId,
        supplier_id,
      });
    }
    return res.status(200).send("Product updated successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const deleteProduct = async (req, res) => {
  const productId = req.params.id;

  try {
    const deletedProduct = await ProductModel.delete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ msg: "Erreur de suppression du produit" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
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
    return res.status(500).json({ msg: "Server error" });
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
