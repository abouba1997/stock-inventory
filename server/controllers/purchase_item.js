const PurchaseItemModel = require("../models/PurchaseItem");

const getAllPurchaseItems = async (req, res) => {
  try {
    const results = await PurchaseItemModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getPurchaseItem = async (req, res) => {
  const purchaseItemId = req.params.id;
  try {
    const result = await PurchaseItemModel.findById(purchaseItemId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createPurchaseItem = async (req, res) => {
  const {
    purchase_id,
    product_id,
    quantity_purchased,
    unit_price,
    total_price,
  } = req.body;

  try {
    const createdPurchaseItem = await PurchaseItemModel.create({
      purchase_id,
      product_id,
      quantity_purchased,
      unit_price,
      total_price,
    });

    if (createdPurchaseItem) {
      return res.status(201).json({ msg: "Une achat ajoutée avec succès" });
    }
    return res.status(400).json({ msg: "Echec de la creation d'achat" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const updatePurchaseItem = async (req, res) => {
  const purchaseItemId = req.params.id;
  const {
    purchase_id,
    product_id,
    quantity_purchased,
    unit_price,
    total_price,
  } = req.body;

  try {
    const updatedPurchaseItem = await PurchaseItemModel.update(purchaseItemId, {
      purchase_id,
      product_id,
      quantity_purchased,
      unit_price,
      total_price,
    });

    if (updatedPurchaseItem) {
      return res.status(200).send("Achat mise à jour avec succès");
    }
    res.status(400).send("Echec de la mise à jour d'achat");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const deletePurchaseItem = async (req, res) => {
  const purchaseItemId = req.params.id;

  try {
    const deletedPurchaseItem = PurchaseItemModel.delete(purchaseItemId);

    if (deletedPurchaseItem) {
      return res.status(200).send("Achat supprimée avec succès");
    }

    res.status(400).send("Echec de la suppression d'achat");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports = {
  getAllPurchaseItems,
  getPurchaseItem,
  createPurchaseItem,
  updatePurchaseItem,
  deletePurchaseItem,
};
