// utils/scheduleAdminPassword.js
const axios = require('axios');
const { getHourlyPassword } = require('./adminAuth');

let lastSentPassword = null;

const sendAdminPasswordToTelegram = async () => {
  const password = getHourlyPassword(process.env.ADMIN_SECRET);

  if (password === lastSentPassword) return; // ⛔ Already sent this hour

  const message = `🔐 Hourly Admin Password: ${password}`;
  const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: process.env.TELEGRAM_CHAT_ID,
      text: message,
    });

    console.log("✅ Sent hourly password to Telegram.");
    lastSentPassword = password; // ✅ Update tracker
  } catch (err) {
    console.error("❌ Failed to send hourly password:", err.message);
  }
};

const scheduleHourlyPassword = () => {
  // Check every 15 seconds for precision with low overhead
  setInterval(() => {
    sendAdminPasswordToTelegram();
  }, 15000);
};

module.exports = scheduleHourlyPassword;
