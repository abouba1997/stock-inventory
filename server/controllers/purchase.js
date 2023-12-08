const PurchaseModel = require("../models/Purchase");

const getAllPurchases = async (req, res) => {
  try {
    const results = await PurchaseModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getPurchase = async (req, res) => {
  const purchaseId = req.params.id;
  try {
    const result = await PurchaseModel.findById(purchaseId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createPurchase = async (req, res) => {
  const { supplier_id, purchase_name, total } = req.body;

  try {
    const createdPurchase = await PurchaseModel.create({ purchase_name });
    if (createdPurchase) {
      return res.status(201).json({ msg: "Categorie ajoutée avec succès" });
    }
    return res.status(400).json({ msg: "Echec de la creation de catégorie" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const updatePurchase = async (req, res) => {
  const purchaseId = req.params.id;
  const { purchase_name } = req.body;

  try {
    const updatedPurchase = await PurchaseModel.update(purchaseId, {
      purchase_name,
    });

    if (updatedPurchase) {
      return res.status(200).send("Categorie mise à jour avec succès");
    }
    res.status(400).send("Echec de la mise à jour de catégorie");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const deletePurchase = async (req, res) => {
  const purchaseId = req.params.id;

  try {
    const deletedPurchase = PurchaseModel.delete(purchaseId);

    if (deletedPurchase) {
      return res.status(200).send("Catégorie supprimée avec succès");
    }

    res.status(400).send("Echec de la suppression de catégorie");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports = {
  getAllPurchases,
  getPurchase,
  createPurchase,
  updatePurchase,
  deletePurchase,
};
