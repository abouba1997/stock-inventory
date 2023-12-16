const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const randomstring = require("randomstring");
const UserModel = require("../models/User");
const { generateToken } = require("../middlewares/checkMiddlewares");

const getAllUsers = async (req, res) => {
  // Retrieve all users
  try {
    const results = await UserModel.findAll();
    return res.status(201).json(results);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const getUser = async (req, res) => {
  // Retrieve user by id
  const { id } = req.params;
  try {
    const result = await UserModel.findById(id);
    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur" });
  }
};

const createUser = async (req, res) => {
  // Validate request data
  const validationError = validationResult(req).array({ onlyFirstError: true });
  const errors = {};
  if (validationError.length > 0) {
    validationError.forEach((error) => {
      errors[error.path] = error.msg;
    });

    return res.status(400).json({ errors });
  }

  // Check if exists this user
  const { fullName, email, password } = req.body;
  try {
    const user = await UserModel.findByColumnField("email", email);

    if (user) {
      return res.status(404).json({ msg: "Cet utilisateur existe déjà" });
    }

    // Creating new user
    const createdUser = await UserModel.create({ fullName, email, password });

    // Get the created user
    const newUser = await UserModel.findById(createdUser);

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur", error });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updatedUser = await UserModel.update(id, data);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ msg: "Erreur de mise à jour de l'utilisateur" });
    }
    // Get the created user
    const user = await UserModel.findById(id);

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur", error });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await UserModel.delete(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json({ msg: "Erreur de suppression de l'utilisateur" });
    }
    return res.status(201).json({ msg: "Utilisateur supprime avec succès" });
  } catch (error) {
    return res.status(500).json({ msg: "Erreur du serveur", error });
  }
};

const registerUser = async (req, res) => {
  // Validate request data
  const validationError = validationResult(req).array({ onlyFirstError: true });
  const errors = {};
  if (validationError.length > 0) {
    validationError.forEach((error) => {
      errors[error.path] = error.msg;
    });

    return res.status(400).json({ errors });
  }

  try {
    const { fullName, email, password } = req.body;
    // Check if the user already exists
    const user = await UserModel.findByColumnField("email", email);
    if (user) {
      return res.status(400).json({ msg: "Cet utilisateur existe déjà" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate the email Token
    const emailToken = randomstring.generate(60);

    // Create new user
    const createdUser_id = await UserModel.create({
      fullName,
      email,
      password: hashedPassword,
      emailToken,
      isVerified: false,
    });

    // Return the new created user
    const newCreatedUser = await UserModel.findById(createdUser_id);

    // Send email to verify the email address
    // sendMail(newCreatedUser[0]);

    return res.status(201).json({
      msg: "Inscription effectuée avec succès",
      user: {
        id: newCreatedUser.id,
        fullName: newCreatedUser.fullName,
        email: newCreatedUser.email,
        emailToken,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

const loginUser = async (req, res) => {
  // Validate request data
  const validationError = validationResult(req).array({ onlyFirstError: true });
  const errors = {};
  if (validationError.length > 0) {
    validationError.forEach((error) => {
      errors[error.path] = error.msg;
    });

    return res.status(400).json({ errors });
  }

  try {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await UserModel.findByColumnField("email", email);

    if (!user) {
      return res.status(400).json({ msg: "Email ou Mot de passe invalide" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Email ou Mot de passe invalide" });
    }

    // Generate and return a JWT token
    const token = generateToken(user.id);

    // Return user
    return res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  registerUser,
  loginUser,
};
