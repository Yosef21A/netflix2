import crypto from 'crypto-js';

export const getEncryptedPath = (secretKey) => {
  const now = new Date();
  now.setMinutes(0, 0, 0); // round to current hour
  const base = `${now.getTime()}:${secretKey}`;
  return crypto.SHA256(base).toString().substring(0, 32);
};
export const getObfuscatedLoginPath = (secret) => {
    const hour = new Date().getUTCHours().toString().padStart(2, '0');
    return crypto.SHA1(secret + hour).toString().substring(0, 16);
};
  
export const getDynamicPath = (secretKey) => {
  const now = new Date();
  now.setSeconds(0, 0); // round to current minute
  const base = `${now.getTime()}:${secretKey}`;
  return crypto.SHA256(base).toString().substring(0, 32);
};