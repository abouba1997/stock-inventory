const SupplierModel = require("../models/Supplier");

const getAllSuppliers = async (req, res) => {
  // Retrieve all users
  try {
    const results = await SupplierModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const getSupplier = async (req, res) => {
  // Retrieve user by id
  const { id } = req.params;
  try {
    const result = await SupplierModel.findById(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Server error" });
  }
};

const createSupplier = async (req, res) => {
  const { supplier_email, supplier_name, supplier_contact, supplier_address } =
    req.body;

  const imagePath = req?.file?.path;

  try {
    if (imagePath) {
      await SupplierModel.create({
        supplier_email,
        supplier_name,
        supplier_contact,
        supplier_address,
        imagePath,
      });
    } else {
      await SupplierModel.create({
        supplier_email,
        supplier_name,
        supplier_contact,
        supplier_address,
      });
    }
    return res.status(201).send("Supplier added successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server error" });
  }
};

const updateSupplier = async (req, res) => {
  const supplierId = req.params.id;
  const imagePath = req?.file?.path;

  const { supplier_email, supplier_name, supplier_contact, supplier_address } =
    req.body;

  try {
    if (imagePath) {
      await SupplierModel.update(productId, {
        supplier_email,
        supplier_name,
        supplier_contact,
        supplier_address,
        imagePath,
        supplierId,
      });
    } else {
      await SupplierModel.update(productId, {
        supplier_email,
        supplier_name,
        supplier_contact,
        supplier_address,
        supplierId,
      });
    }
    return res.status(200).send("Fournisseur mis a jour avec succes");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

const deleteSupplier = async (req, res) => {
  const supplierId = req.params.id;

  try {
    const result = await SupplierModel.delete(supplierId);

    if (!result) {
      return res
        .status(404)
        .json({ msg: "Erreur de suppression de fournisseur" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
