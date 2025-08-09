const express = require('express');
const router = express.Router();
const db = require('../db');

// // Mark attendance
// router.post('/', async (req, res) => {
//   const { user_id, date, status } = req.body;

//   try {
//     const [existing] = await db.query(
//       'SELECT * FROM attendance WHERE user_id = ? AND date = ?',
//       [user_id, date]
//     );

//     if (existing.length > 0) {
//       return res.status(400).json({ message: 'Already marked' });
//     }

//     const [result] = await db.query(
//       'INSERT INTO attendance (user_id, date, status) VALUES (?, ?, ?)',
//       [user_id, date, status]
//     );

//     res.json({ id: result.insertId });
//   } catch (err) {
//     res.status(500).json({ error: 'Database error' });
//   }
// });

router.post('/', async (req, res) => {
  let { user_id, date, status } = req.body;

  if (!date) {
    // If date not provided, use today's date (from server)
    date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  try {
    // Check if attendance for that user and date already exists
    const [existing] = await db.query(
      'SELECT * FROM attendance WHERE user_id = ? AND date = ?',
      [user_id, date]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: 'Already marked' });
    }

    const [result] = await db.query(
      'INSERT INTO attendance (user_id, date, status) VALUES (?, ?, ?)',
      [user_id, date, status]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


// Get all attendance
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM attendance');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Get attendance by user ID
router.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db.query(
      'SELECT * FROM attendance WHERE user_id = ?',
      [userId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});


module.exports = router;
