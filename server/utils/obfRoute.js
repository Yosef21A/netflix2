const crypto = require('crypto');

const getEncryptedKeyFor = (secretKey) => {
  const now = new Date();
  now.setMinutes(0, 0, 0); // Round to hour
  const base = `${now.getTime()}:${secretKey}`;
  return crypto.createHash('sha256').update(base).digest('hex').slice(0, 32);
};

module.exports = { getEncryptedKeyFor };