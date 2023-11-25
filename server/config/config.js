const dotenv = require("dotenv");
dotenv.config();

const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_PASS = process.env.DATABASE_PASS;
const DATABASE_NAME = process.env.DATABASE_NAME;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_PASS,
  DATABASE_NAME,
  JWT_SECRET,
};
