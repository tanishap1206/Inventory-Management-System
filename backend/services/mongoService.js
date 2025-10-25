const Inventory = require('../models/Inventory');
const Asset = require('../models/Asset');

module.exports = {
  createInventory: async (data) => new Inventory(data).save(),
  getAllInventory: async () => Inventory.find().lean().exec(),
  getInventoryById: async (id) => Inventory.findById(id).lean().exec(),
  updateInventory: async (id, update) => Inventory.findByIdAndUpdate(id, update, { new: true }).exec(),
  deleteInventory: async (id) => Inventory.findByIdAndDelete(id).exec(),

  createAsset: async (data) => new Asset(data).save(),
  getAllAssets: async () => Asset.find().lean().exec(),
  getAssetById: async (id) => Asset.findById(id).lean().exec(),
  updateAsset: async (id, update) => Asset.findByIdAndUpdate(id, update, { new: true }).exec(),
  deleteAsset: async (id) => Asset.findByIdAndDelete(id).exec(),
  addMaintenanceEntry: async (id, entry) =>
    Asset.findByIdAndUpdate(id, { $push: { maintenanceHistory: entry }, $set: { lastUpdated: new Date() } }, { new: true }).exec()
};
