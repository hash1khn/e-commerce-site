const express = require('express');
const { register, login, forgotPassword,resetPassword,verifyEmail} = require('../controllers/authController');
const {
    getUserById,
    updateUserById,
    deleteUserById
  } = require('../controllers/authController');
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token',resetPassword);
router.post('/verify-email/:token', verifyEmail);
// Get, update, and delete user by ID
router.route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
