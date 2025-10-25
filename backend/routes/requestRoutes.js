const express = require('express');
const router = express.Router();
const controller = require('../controllers/requestController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, controller.createRequest);
router.get('/', protect, controller.listRequests);
router.get('/:id', protect, controller.getRequest);
router.put('/:id/status', protect, authorize(['admin','staff']), controller.updateRequestStatus);

module.exports = router;
