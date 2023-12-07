const SaleModel = require("../models/Sale");

const getAllSales = async (req, res) => {
  try {
    const results = await SaleModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getSale = async (req, res) => {
  const saleId = req.params.id;
  try {
    const result = await SaleModel.findById(saleId);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createSale = async (req, res) => {
  const { client_id, Sale_name, total } = req.body;

  try {
    const createdSale = await SaleModel.create({ Sale_name });
    if (createdSale) {
      return res.status(201).json({ msg: "Categorie ajoutée avec succès" });
    }
    return res.status(400).json({ msg: "Echec de la creation de catégorie" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const updateSale = async (req, res) => {
  const saleId = req.params.id;
  const { Sale_name } = req.body;

  try {
    const updatedSale = await SaleModel.update(saleId, {
      Sale_name,
    });

    if (updatedSale) {
      return res.status(200).send("Categorie mise à jour avec succès");
    }
    res.status(400).send("Echec de la mise à jour de catégorie");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const deleteSale = async (req, res) => {
  const saleId = req.params.id;

  try {
    const deletedSale = SaleModel.delete(saleId);

    if (deletedSale) {
      return res.status(200).send("Catégorie supprimée avec succès");
    }

    res.status(400).send("Echec de la suppression de catégorie");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const saveSales = async (req, res) => {
  const { salesData, salesItemsData } = req.body;

  try {
    const sale_id = await SaleModel.createSaleTransaction(
      salesData,
      salesItemsData
    );

    if (sale_id) {
      return res
        .status(200)
        .json({ msg: "Vente effectuée avec succès", sale_id: sale_id });
    } else {
      return res.status(400).json("Vente non effectuée, problème survenu!!");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json("Erreur du serveur");
  }
};

module.exports = {
  getAllSales,
  getSale,
  createSale,
  updateSale,
  deleteSale,
  saveSales,
};
