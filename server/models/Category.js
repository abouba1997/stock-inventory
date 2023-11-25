const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class CategoryModel extends BaseSQLModel {
  static tableName = "Categories";
}

module.exports = CategoryModel;
