// server/routes/telegram.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { getDynamicPath } = require('../utils/encPath');
const { TG_SEC } = process.env;

const validateDynamicPath = (req, res, next) => {
    const { dynamicPath } = req.params;
    const expectedPath = getDynamicPath(TG_SEC);
  
    if (dynamicPath !== expectedPath) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
  
    next();
  };
  
router.post('/tg/:dynamicPath', validateDynamicPath, async (req, res) => {
    const { message } = req.body;
    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
        });
        res.status(200).json({ success: 'Message sent successfully' });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
});

module.exports = router;
