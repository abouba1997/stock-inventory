const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class SaleItemModel extends BaseSQLModel {
  static tableName = "Sales_Items";
}

module.exports = SaleItemModel;
