const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class ClientModel extends BaseSQLModel {
  static tableName = "Clients";
}

module.exports = ClientModel;
