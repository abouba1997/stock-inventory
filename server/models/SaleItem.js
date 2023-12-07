const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class SaleItemModel extends BaseSQLModel {
  static tableName = "Sales_Items";

  static async createWithConnexion(data, connection) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    const [result] = await connection.query(query, data);
    return result.insertId;
  }

  static async findAllBySaleId(sale_id) {
    const query = `SELECT * FROM ${this.tableName} WHERE sale_id = ?`;
    const [results] = await this.executeQuery(query, [sale_id]);
    return results;
  }
}

module.exports = SaleItemModel;
