const ClientModel = require("../models/Client");

const getAllClients = async (req, res) => {
  // Retrieve all users
  try {
    const results = await ClientModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getClient = async (req, res) => {
  // Retrieve user by id
  const { id } = req.params;
  try {
    const result = await ClientModel.findById(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createClient = async (req, res) => {
  const { client_email, client_name, client_contact, client_address } =
    req.body;
  try {
    await ClientModel.create({
      client_email,
      client_name,
      client_contact,
      client_address,
    });
    return res.status(201).send("Client ajoutée avec succès");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const updateClient = async (req, res) => {
  const clientId = req.params.id;

  const { client_email, client_name, client_contact, client_address } =
    req.body;

  try {
    await ClientModel.update(clientId, {
      client_email,
      client_name,
      client_contact,
      client_address,
    });
    return res.status(200).send("Client mis à jour avec succès");
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur du serveur");
  }
};

const deleteClient = async (req, res) => {
  const clientId = req.params.id;

  try {
    const result = await ClientModel.delete(clientId);

    if (!result) {
      return res.status(404).json({ msg: "Erreur de suppression du client" });
    }
    return res.status(200).send("Client supprimé avec succès");
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur", error });
  }
};

module.exports = {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
};
