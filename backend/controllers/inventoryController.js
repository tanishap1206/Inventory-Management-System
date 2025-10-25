const db = require('../middleware/dbAdapter');

exports.create = async (req, res, next) => {
  try {
    const created = await db.createInventory(req.body);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

exports.list = async (req, res, next) => {
  try {
    const items = await db.getAllInventory();
    res.json(items);
  } catch (err) { next(err); }
};

exports.get = async (req, res, next) => {
  try {
    const item = await db.getInventoryById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const updated = await db.updateInventory(req.params.id, req.body);
    res.json(updated);
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    await db.deleteInventory(req.params.id);
    res.status(204).end();
  } catch (err) { next(err); }
};
