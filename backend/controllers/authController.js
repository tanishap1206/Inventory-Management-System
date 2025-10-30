const User = require('../models/User');
const LoginAttempt = require('../models/LoginAttempt');
const jwtUtil = require('../utils/jwt');

// Helper function to log login attempts
const logLoginAttempt = async (email, success, role, userId = null, failureReason = null, req) => {
  try {
    await LoginAttempt.create({
      userId,
      email,
      success,
      role: role || 'guest',
      ipAddress: req.ip,
      userAgent: req.get('user-agent'),
      failureReason
    });
  } catch (error) {
    console.error('Error logging login attempt:', error);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password required' });
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'User exists' });

    const user = new User({ name, email, role: role || 'guest' });
    await user.setPassword(password);
    await user.save();

    const token = jwtUtil.sign({ id: user._id, role: user.role });
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) { next(err); }
};

// Get login attempts statistics
exports.getLoginAttempts = async (req, res, next) => {
  try {
    const { days = 7, success, role } = req.query;
    const query = {
      timestamp: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) }
    };

    if (success !== undefined) {
      query.success = success === 'true';
    }
    if (role) {
      query.role = role;
    }

    // Get total attempts and group by success/failure
    const [attempts, summary] = await Promise.all([
      LoginAttempt.find(query).sort('-timestamp').limit(100),
      LoginAttempt.aggregate([
        { $match: query },
        { 
          $group: {
            _id: {
              success: '$success',
              role: '$role'
            },
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    res.json({
      summary,
      recentAttempts: attempts.map(a => ({
        email: a.email,
        success: a.success,
        role: a.role,
        timestamp: a.timestamp,
        failureReason: a.failureReason,
        ipAddress: a.ipAddress
      }))
    });
  } catch (err) { 
    console.error('Error getting login attempts:', err);
    next(err); 
  }
};

// Get login history for a specific user
exports.getUserLoginHistory = async (req, res, next) => {
  try {
    // Check if user is admin or the user themselves
    if (req.user.role !== 'admin' && req.user.id !== req.params.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { days = 30 } = req.query;
    const attempts = await LoginAttempt.find({
      userId: req.params.userId,
      timestamp: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) }
    }).sort('-timestamp');

    res.json({
      attempts: attempts.map(a => ({
        success: a.success,
        timestamp: a.timestamp,
        ipAddress: a.ipAddress,
        userAgent: a.userAgent,
        failureReason: a.failureReason
      })),
      summary: {
        total: attempts.length,
        successful: attempts.filter(a => a.success).length,
        failed: attempts.filter(a => !a.success).length
      }
    });
  } catch (err) { next(err); }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    
    // If no user found
    if (!user) {
      await logLoginAttempt(email, false, 'user', null, 'User not found', req);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If user is not a regular user
    if (user.role !== 'user') {
      await logLoginAttempt(email, false, user.role, user._id, 'Wrong login endpoint', req);
      return res.status(401).json({ message: 'Please use the correct login page' });
    }

    // Verify password
    const isValidPassword = await user.verifyPassword(password);
    if (!isValidPassword) {
      await logLoginAttempt(email, false, user.role, user._id, 'Invalid password', req);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Successful login
    await logLoginAttempt(email, true, user.role, user._id, null, req);
    
    const token = jwtUtil.sign({ id: user._id, role: user.role });
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      }
    });
  } catch (err) { 
    await logLoginAttempt(req.body.email, false, 'user', null, 'Server error', req);
    next(err); 
  }
};

exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      await logLoginAttempt(email, false, 'admin', null, 'Missing credentials', req);
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find admin user
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      await logLoginAttempt(email, false, 'admin', null, 'User not found', req);
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Check if user is admin
    if (user.role !== 'admin') {
      await logLoginAttempt(email, false, user.role, user._id, 'Not an admin', req);
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    // Verify password
    const isValid = await user.verifyPassword(password);
    if (!isValid) {
      await logLoginAttempt(email, false, user.role, user._id, 'Invalid password', req);
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Log successful login
    await logLoginAttempt(email, true, user.role, user._id, null, req);

    // Generate token
    const token = jwtUtil.sign({ 
      id: user._id, 
      role: user.role,
      email: user.email
    });

    // Send response
    res.json({ 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Admin login error:', err);
    next(err);
  }
};
