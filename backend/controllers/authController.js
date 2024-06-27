const User = require('../model/userModel');
//Register
const register = async (req, res) => {
    console.log(req.body)
    const { username, email,address,phoneNumber, password } = req.body;
  try {
    const user = new User({ username, email,address,phoneNumber, password });
    await user.save();
    res.status(200).json({ message: 'User registered' });
  } catch (err) {
    res.status(400).json({ error:'unable to register the user' });
  }
};
//Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    // if (!user || !(await user.matchPassword(password))) {
        if(user.password !== password) {
      return res.status(400).json({ message: 'Incorrect email/password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(400).json({ error: 'error during signup' });
  }
};
// Get user by ID
const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  // Update user by ID
  const updateUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  // Delete user by ID
  const deleteUserById = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { register, login ,getUserById,updateUserById,deleteUserById};
