function rPyl(input) {
    const entries = Object.entries(input).sort(() => Math.random() - 0.5);
    const out = {};
  
    for (const [k, v] of entries) out[k] = v;
  
    const n = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < n; i++) {
      const k = "_" + Array.from({ length: rand(5, 9) }, () =>
        abc[Math.floor(Math.random() * abc.length)]
      ).join("");
      out[k] = dkFsOfit();
    }
  
    return out;
  }
  
  const abc = "abcdefghijklmnopqrstuvwxyz";
  
  function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  function dkFsOfit() {
    const pool = [
      Math.random().toString(36).substring(2, 10),
      Date.now(),
      Math.floor(Math.random() * 99999999),
      true,
      false,
      null,
    ];
    return pool[Math.floor(Math.random() * pool.length)];
  }
  
  module.exports = { rPyl };
  