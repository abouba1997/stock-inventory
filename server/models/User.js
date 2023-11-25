const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class UserModel extends BaseSQLModel {
  static tableName = "Users";
}

module.exports = UserModel;
