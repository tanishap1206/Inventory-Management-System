const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Auth endpoints
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/admin/login', auth.adminLogin);

// Login statistics endpoints (protected, admin only)
router.get('/stats/login-attempts', protect, auth.getLoginAttempts);
router.get('/stats/user-logins/:userId', protect, auth.getUserLoginHistory);

module.exports = router;
