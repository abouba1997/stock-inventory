const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class SupplierModel extends BaseSQLModel {
  static tableName = "Suppliers";
}

module.exports = SupplierModel;
