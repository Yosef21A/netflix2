export const generateObfuscatedId = (prefix = 'id') => {
    return `${prefix}_${Math.random().toString(36).substring(2, 10)}`;
  };
  