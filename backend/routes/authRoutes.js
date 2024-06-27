const express = require('express');
const { register, login } = require('../controllers/authController');
const {
    getUserById,
    updateUserById,
    deleteUserById
  } = require('../controllers/authController');
const router = express.Router();
router.post('/register', register);
router.post('/login', login);
// Get, update, and delete user by ID
router.route('/:id')
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

module.exports = router;
