const express = require("express");
const {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/client");

const router = express.Router();

// GET all Clients
router.get("/", getAllClients);

// GET a Client by ID
router.get("/:id", getClient);

// POST Create a new Client
router.post("/", createClient);

// PUT update a Client
router.put("/:id", updateClient);

// DELETE a Client
router.delete("/:id", deleteClient);

module.exports = router;
