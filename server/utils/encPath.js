const crypto = require('crypto-js');

const getDynamicPath = (secretKey) => {
  const now = new Date();
  now.setSeconds(0, 0); // round to current minute
  const base = `${now.getTime()}:${secretKey}`;
  return crypto.SHA256(base).toString().substring(0, 32);
};

module.exports = { getDynamicPath };