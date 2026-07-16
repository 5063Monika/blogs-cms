const User = require('../models/User');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
};
exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "User not found" });
  if (user.password !== req.body.password)
    return res.status(400).json({ message: "Wrong password" });
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
  res.json({ token, user });
};
