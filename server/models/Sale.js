const BaseSQLModel = require("./BaseSQLModel");
const SaleItemModel = require("./SaleItem");

// Create a new class for a specific table
class SaleModel extends BaseSQLModel {
  static tableName = "Sales";

  static async createSaleTransaction(saleData, saleItemsData) {
    try {
      // Begin transaction
      console.log("saleData =>", saleData);
      await this.executeQuery("START TRANSACTION");

      // Insert sale data
      const saleId = await this.create(saleData);

      console.log("Operations success");

      // Insert sale items associated with the sale
      const saleItemsPromises = saleItemsData.map(async (saleItem) => {
        const saleItemData = {
          ...saleItem,
          sale_id: saleId, // Assuming there's a field sale_id in the SaleItems table linking to Sale table
        };
        await SaleItemModel.create(saleItemData); // Assuming SaleItemsModel is the model for sale items
      });
      await Promise.all(saleItemsPromises);

      // Commit transaction
      await this.executeQuery("COMMIT");

      console.log("Selling processed successfully");
      return saleId;
    } catch (error) {
      // Rollback transaction if an error occurs
      await this.executeQuery("ROLLBACK");
      throw error;
    }
  }
}

module.exports = SaleModel;
