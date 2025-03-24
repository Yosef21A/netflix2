const express = require('express');
const router = express.Router();
const { getHourlyPassword } = require('../utils/adminAuth');
const { getObfuscatedLoginPath } = require('../utils/adminAuth');

const ADMIN_SECRET = process.env.ADMIN_SECRET;

// Catch-all for obfuscated login path
router.post('/:obfPath', (req, res) => {
  const { obfPath } = req.params;
  const { password } = req.body;

  const expectedPath = getObfuscatedLoginPath(ADMIN_SECRET);
  const expectedPassword = getHourlyPassword(ADMIN_SECRET);
    console.log(obfPath)
    console.log(expectedPath)
    console.log(password)
    console.log(expectedPassword)
  // 🔐 Path must match

  // 🔐 Password must match
  if (password !== expectedPassword) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  // ✅ Auth successful
  res.cookie('TSecTok', expectedPassword, {
    secure: true,
    sameSite: 'Strict',
    maxAge: 1000 * 60 * 60, // 1 hour
  });

  return res.status(200).json({ success: true });
});

module.exports = router;
