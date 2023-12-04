const BaseSQLModel = require("./BaseSQLModel");
const SaleItemModel = require("./SaleItem");

// Create a new class for a specific table
class PaymentMethod extends BaseSQLModel {
  static tableName = "paymentMethod";
}

module.exports = PaymentMethod;
