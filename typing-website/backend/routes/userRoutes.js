import express from 'express';
import User from '../models/userModel.js';
import passport from 'passport';

const router = express.Router();

// Registration route
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
  const user = new User({ email, password });
  await user.save();
  res.status(201).send('User registered');
  } catch (error) {
  res.status(400).send('Error registering user');
  }
 });
 // Login route
 router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
  const user = await User.findOne({ email, password });
  if (user) {
  res.status(200).send('Login successful');
  } else {
  res.status(400).send('Invalid credentials');
  }
  } catch (error) {
  res.status(400).send('Error logging in');
  }
 });
 // Google OAuth routes
 router.get('/auth/google',
  passport.authenticate('google', { scope:
 ['https://www.googleapis.com/auth/plus.login', 
 'https://www.googleapis.com/auth/userinfo.email'] })
 );
 router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
    }
   );
   // Logout route
   router.get('/logout', (req, res) => {
    req.logout();
    res.send('Logged out');
   });
   // Current user route
   router.get('/current_user', (req, res) => {
    res.send(req.user);
   });
   module.exports = router;
   

