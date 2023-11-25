const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const randomstring = require("randomstring");
const { validationResult } = require("express-validator");
const pool = require("../helpers/db");
// import { sendMail } from "../utils/sendMail";
const {
  checkLogin,
  checkRegister,
  verifyToken,
} = require("../middlewares/checkMiddlewares");
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
} = require("../controllers/user");

const router = express.Router();

// Get all users
router.get("/", getAllUsers);

// Get one user
router.get("/:id", getUser);

// Create a new user
router.post("/", checkRegister, createUser);

// Update a user
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

// User Registration
router.post("/register", checkRegister, registerUser);

// User Login
router.post("/login", checkLogin, loginUser);

// User Profile Route (protected route)
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const [user, _] = await pool.query(
      "SELECT * FROM Users WHERE user_id = ?",
      [req.user.id]
    );
    res.json(user[0]); // Return user profile
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// User verification email
router.post("/verify-emailToken", async (req, res) => {
  const { emailToken } = req.body;
  if (!emailToken)
    return res.status(404).json({ msg: "Email token pas trouvée" });
  try {
    // Check if the user exists
    let [user, _] = await pool.query(
      "SELECT * FROM Users WHERE emailToken = ?",
      [emailToken]
    );

    // If user doesn't exists
    if (user.length === 0) {
      return res
        .status(404)
        .json({ msg: "La vérification de votre email a échouée" });
    }

    // Update the user
    await pool.query(
      "UPDATE Users SET emailToken = ?, isVerified = ? WHERE user_id = ?",
      [null, true, user[0].user_id]
    );

    return res.status(201).json({
      msg: "Verification de l'email effectuée avec succès",
    });
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
