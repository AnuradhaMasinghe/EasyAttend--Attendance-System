const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// Get all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
});

// Add user (optional)
router.post('/', async (req, res) => {
  const { name, email, password, role, group_id } = req.body;

  try {
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role, group_id) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role, group_id]
    );

    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Insert error' });
  }
});
// Update a user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, role, group_id } = req.body;

  try {
    const result = await db.query(
      'UPDATE users SET name = ?, email = ?, role = ?, group_id = ? WHERE id = ?',
      [name, email, role, group_id, id]
    );
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user' });
  }
});
// DELETE user
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
