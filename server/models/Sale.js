const BaseSQLModel = require("./BaseSQLModel");
const SaleItemModel = require("./SaleItem");
const ProductModel = require("./Product");
const pool = require("../helpers/db");

class SaleModel extends BaseSQLModel {
  static tableName = "Sales";

  static async create(data, connection) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    const [result] = await connection.query(query, data);
    return result.insertId;
  }

  static async createSaleTransaction(saleData, saleItemsData) {
    let connection;

    try {
      // Get a connection from the pool
      connection = await this.getConnection();

      // Begin transaction using the connection
      await this.startTransaction(connection);

      // Set isolation level for the current transaction
      await this.setIsolationLevel(connection, "READ COMMITTED");
      // Insert sale data
      const saleId = await this.create(saleData, connection);

      // Insert sale items associated with the sale
      const saleItemsPromises = saleItemsData.map(async (saleItem) => {
        const { product_id, quantity, unit_price } = saleItem;
        const total_price = quantity * unit_price;

        const saleItemData = {
          ...saleItem,
          sale_id: saleId,
          total_price: total_price,
        };
        const saleItemId = await SaleItemModel.createWithConnexion(
          saleItemData,
          connection
        );

        await this.decrementProductQuantity(product_id, quantity, connection);
      });
      await Promise.all(saleItemsPromises);

      // Commit transaction
      await this.commitTransaction(connection);

      return saleId;
    } catch (error) {
      // Rollback transaction if an error occurs
      await this.rollbackTransaction(connection);
      throw error;
    } finally {
      // Release the connection back to the pool
      if (connection) {
        connection.release();
      }
    }
  }

  static async decrementProductQuantity(product_id, quantity, connection) {
    try {
      const [product] = await ProductModel.findByIdWithConnection(
        product_id,
        connection
      );
      if (product) {
        const updatedQuantity = product.quantity_on_hand - quantity;
        if (updatedQuantity >= 0) {
          // Update product quantity
          const result = await ProductModel.updateQuantityWithConnexion(
            product_id,
            updatedQuantity,
            connection
          );
        } else {
          throw new Error("Insufficient quantity on hand");
        }
      } else {
        throw new Error("Product not found");
      }
    } catch (error) {
      throw error;
    }
  }

  // Other methods...

  static async getConnection() {
    return pool.getConnection();
  }

  static async startTransaction(connection) {
    return connection.query("START TRANSACTION");
  }

  static async setIsolationLevel(connection, isolationLevel) {
    return connection.query(
      `SET SESSION TRANSACTION ISOLATION LEVEL ${isolationLevel}`
    );
  }

  static async commitTransaction(connection) {
    return connection.query("COMMIT");
  }

  static async rollbackTransaction(connection) {
    return connection.query("ROLLBACK");
  }
}

module.exports = SaleModel;
