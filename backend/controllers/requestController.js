const Request = require('../models/Request');

exports.createRequest = async (req, res, next) => {
  try {
    const payload = req.body;
    payload.raisedBy = req.user._id;
    const r = new Request(payload);
    await r.save();
    res.status(201).json(r);
  } catch (err) { next(err); }
};

exports.listRequests = async (req, res, next) => {
  try {
    // Admins see all; staff see assigned and those raised by them; guests see their own
    let query = {};
    if (req.user.role === 'staff') {
      query = { $or: [{ raisedBy: req.user._id }, { assignedTo: req.user._id }] };
    } else if (req.user.role === 'guest') {
      query = { raisedBy: req.user._id };
    }
    const items = await Request.find(query).populate('raisedBy assignedTo assetId itemId', 'name email');
    res.json(items);
  } catch (err) { next(err); }
};

exports.getRequest = async (req, res, next) => {
  try {
    const r = await Request.findById(req.params.id).populate('raisedBy assignedTo assetId itemId');
    if (!r) return res.status(404).json({ message: 'Not found' });
    res.json(r);
  } catch (err) { next(err); }
};

exports.updateRequestStatus = async (req, res, next) => {
  try {
    // Admins or assigned staff can change status
    const r = await Request.findById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Not found' });
    // optionally check permission
    const { status, comment, assignedTo } = req.body;
    if (status) r.status = status;
    if (assignedTo) r.assignedTo = assignedTo;
    if (comment) r.comments.push({ by: req.user._id, text: comment, date: new Date() });
    r.updatedAt = new Date();
    await r.save();
    res.json(r);
  } catch (err) { next(err); }
};
