const crypto = require('crypto');
const CryptoJS = require("crypto-js");

const getHourlyPassword = (secret) => {
  const hour = new Date().getUTCHours().toString().padStart(2, '0');
  return crypto.createHmac('sha256', secret).update(hour).digest('hex');
};

const isAdminAuthenticated = (req, secret) => {
  const token = req.cookies.TSecTok;
  const expected = getHourlyPassword(secret);
  return token === expected;
};
const getObfuscatedLoginPath = (secret) => {
    const hour = new Date().getUTCHours().toString().padStart(2, '0');
    return CryptoJS.SHA1(secret + hour).toString().substring(0, 16);
  };
  
  
  
module.exports = { getHourlyPassword, isAdminAuthenticated, getObfuscatedLoginPath };
