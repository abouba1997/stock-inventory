const SaleItemModel = require("../models/SaleItem");

const getAllSaleItems = async (req, res) => {
  try {
    const results = await SaleItemModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getSaleItem = async (req, res) => {
  const SaleItemId = req.params.id;
  try {
    const result = await SaleItemModel.findById(SaleItemId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createSaleItem = async (req, res) => {
  const { Sale_id, product_id, quantity_Saled, unit_price, total_price } =
    req.body;

  try {
    const createdSaleItem = await SaleItemModel.create({
      Sale_id,
      product_id,
      quantity_Saled,
      unit_price,
      total_price,
    });

    if (createdSaleItem) {
      return res.status(201).json({ msg: "Une achat ajoutée avec succès" });
    }
    return res.status(400).json({ msg: "Echec de la creation d'achat" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const updateSaleItem = async (req, res) => {
  const SaleItemId = req.params.id;
  const { Sale_id, product_id, quantity_Saled, unit_price, total_price } =
    req.body;

  try {
    const updatedSaleItem = await SaleItemModel.update(SaleItemId, {
      Sale_id,
      product_id,
      quantity_Saled,
      unit_price,
      total_price,
    });

    if (updatedSaleItem) {
      return res.status(200).send("Achat mise à jour avec succès");
    }
    res.status(400).send("Echec de la mise à jour d'achat");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const deleteSaleItem = async (req, res) => {
  const SaleItemId = req.params.id;

  try {
    const deletedSaleItem = SaleItemModel.delete(SaleItemId);

    if (deletedSaleItem) {
      return res.status(200).send("Achat supprimée avec succès");
    }

    res.status(400).send("Echec de la suppression d'achat");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const getAllSaleItemsBySaleId = async (req, res) => {
  const sale_id = req.params.id;

  try {
    const results = await SaleItemModel.findAllBySaleId(sale_id);
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

module.exports = {
  getAllSaleItems,
  getSaleItem,
  createSaleItem,
  updateSaleItem,
  deleteSaleItem,
  getAllSaleItemsBySaleId,
};
