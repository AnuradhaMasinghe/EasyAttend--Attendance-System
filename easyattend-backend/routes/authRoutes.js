const express = require('express');
const router = express.Router();
const db = require('../db');

// Login API (plain text password check)
router.post('/login', async (req, res) => {
   
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password required' });
  }

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = rows[0];

    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // Success — send user info (omit password)
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/test', (req, res) => res.send('User route working!'));


module.exports = router;
