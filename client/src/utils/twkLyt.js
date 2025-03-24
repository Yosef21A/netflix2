export const twkLyt = () => {
    const root = document.getElementById("root");
    if (!root) return;
  
    const getRandomPx = () => Math.floor(Math.random() * 2); // 0–1 px
    const shouldApply = () => Math.random() < 0.15;
  
    const allDivs = root.querySelectorAll("div");
  
    allDivs.forEach(div => {
      const depth = getDomDepth(div);
      const styles = window.getComputedStyle(div);
  
      // 🔒 Safety filters to avoid major layout containers
      if (
        depth < 3 || // Avoid top-level containers
        styles.position === "absolute" ||
        styles.position === "fixed" ||
        styles.display.includes("flex") ||
        styles.display.includes("grid") ||
        div.offsetWidth > 800 // Likely a main container
      ) return;
  
      // ✅ Safe to inject tiny layout noise
      const tweaks = [
        { prop: "paddingTop", chance: 0.3 },
        { prop: "paddingBottom", chance: 0.3 },
        { prop: "marginLeft", chance: 0.2 },
        { prop: "marginRight", chance: 0.2 }
      ];
  
      tweaks.forEach(({ prop, chance }) => {
        if (Math.random() < chance) {
          const current = parseFloat(styles[prop]) || 0;
          div.style[prop] = `${current + getRandomPx()}px`;
        }
      });
    });
  
  };
  
  // 🧠 Helper to get DOM depth of an element
  function getDomDepth(el) {
    let depth = 0;
    while (el && el.parentElement && el !== document.body) {
      el = el.parentElement;
      depth++;
    }
    return depth;
  }
  