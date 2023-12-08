const PaymentMethodModel = require("../models/PaymentMethod");

const getAllPaymentMethods = async (req, res) => {
  // Retrieve all users
  try {
    const results = await PaymentMethodModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getPaymentMethod = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await PaymentMethodModel.findById(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createPaymentMethod = async (req, res) => {
  const { method_name } = req.body;
  try {
    await PaymentMethodModel.create({ method_name });
    return res.status(201).send("Methode de paiement ajoutée avec succès");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

module.exports = {
  getAllPaymentMethods,
  getPaymentMethod,
  createPaymentMethod,
};
