const BaseSQLModel = require("./BaseSQLModel");

// Create a new class for a specific table
class ProductModel extends BaseSQLModel {
  static tableName = "Products";

  static async findAllProductsByCustomId(field, id) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${field} = ?`;
    const [results] = await this.executeQuery(query, [id]);
    return results;
  }

  static async updateQuantity(product_id, newQuantity) {
    const query = `UPDATE ${this.tableName} SET quantity_on_hand = ? WHERE id = ?`;
    const [results] = await this.executeQuery(query, [newQuantity, product_id]);
    return results;
  }

  static async updateQuantityWithConnexion(
    product_id,
    newQuantity,
    connection
  ) {
    const query = `UPDATE ${this.tableName} SET quantity_on_hand = ? WHERE id = ?`;
    const [results] = await connection.query(query, [newQuantity, product_id]);
    return results;
  }

  static async findByIdWithConnection(id, connection) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const [results] = await connection.query(query, [id]);
    return results;
  }
}

module.exports = ProductModel;
