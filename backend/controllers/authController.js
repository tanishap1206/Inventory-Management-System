const User = require('../models/User');
const jwtUtil = require('../utils/jwt');

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

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.verifyPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwtUtil.sign({ id: user._id, role: user.role });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role }});
  } catch (err) { next(err); }
};
