const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class CategoryModel extends BaseSQLModel {
  static tableName = "Categories";

  static async findAllByCategoryId(id) {
    const query = `SELECT * FROM Products WHERE category_id = ?`;
    const [results] = await this.executeQuery(query, [id]);
    return results;
  }
}

module.exports = CategoryModel;
