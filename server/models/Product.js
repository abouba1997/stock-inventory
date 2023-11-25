const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class ProductModel extends BaseSQLModel {
  static tableName = "Products";

  static async findAllProductsByCustomId(field, id) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${field} = ?`;
    const [results] = await this.executeQuery(query, [id]);
    return results;
  }
}

module.exports = ProductModel;
