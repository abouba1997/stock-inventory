const SupplierModel = require("../models/Supplier");

// Retrieve all users
const getAllSuppliers = async (req, res) => {
  try {
    const results = await SupplierModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

// Retrieve user by id
const getSupplier = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SupplierModel.findById(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
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
    return res.status(201).send("Fournisseur ajouté avec succès");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const updateSupplier = async (req, res) => {
  const supplierId = req.params.id;
  const imagePath = req?.file?.path;

  const { supplier_email, supplier_name, supplier_contact, supplier_address } =
    req.body;

  try {
    if (imagePath) {
      await SupplierModel.update(supplierId, {
        supplier_email,
        supplier_name,
        supplier_contact,
        supplier_address,
        imagePath,
      });
    } else {
      await SupplierModel.update(supplierId, {
        supplier_email,
        supplier_name,
        supplier_contact,
        supplier_address,
      });
    }
    return res.status(200).send("Fournisseur mis à jour avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
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
    return res.status(200).send("Fournisseur supprimé avec succès");
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur", error });
  }
};

module.exports = {
  getAllSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
