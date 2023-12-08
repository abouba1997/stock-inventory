const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class PurchaseModel extends BaseSQLModel {
  static tableName = "Purchases";
}

module.exports = PurchaseModel;
