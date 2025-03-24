export const generateObfuscatedId = (prefix = 'x') => {
    return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
  };
  