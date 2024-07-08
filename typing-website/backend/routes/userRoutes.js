const express = require('express');
const User = require('../models/userModel');
const router = express.Router();
// Register new user
router.post('/register', async (req, res) => {
 const { username, email, password } = req.body;
 try {
 const newUser = new User({ username, email, password });
 await newUser.save();
 res.status(201).json(newUser);
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
});
// Get all users
router.get('/', async (req, res) => {
 try {
 const users = await User.find();
 res.json(users);
 } catch (error) {
 res.status(500).json({ message: error.message });
 }
});
module.exports = router;
