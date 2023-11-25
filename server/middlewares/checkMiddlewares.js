const { body } = require("express-validator");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const checkLogin = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Adresse email requise")
    .isEmail()
    .withMessage("Adresse email invalide"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Mot de passe requis")
    .isLength({ min: 6 })
    .withMessage("Minimum 6 caractères de mot de passe"),
];

const checkRegister = [
  body("fullName")
    .exists({ checkFalsy: true })
    .withMessage("Prénom et Nom requis")
    .isLength({ min: 3 })
    .withMessage("Minimum 3 caractères pour le prénom et nom"),
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("Adresse email requise")
    .isEmail()
    .withMessage("Adresse email invalide"),
  body("password")
    .exists({ checkFalsy: true })
    .withMessage("Mot de passe requis.")
    .isLength({ min: 6 })
    .withMessage("Minimum 6 caractères de mot de passe"),
];

// Generate a token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1 day" });
};

// Verify JWT Token Middleware
function verifyToken(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Access Denied - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "jwtSecret");
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}

module.exports = {
  checkLogin,
  checkRegister,
  generateToken,
  verifyToken,
};
