// ✅ utils/injectComponentStealth.js

function generateShortClassName(length = 6) {
    const base = Math.random().toString(36).substring(2);
    const time = Date.now().toString(36);
    const raw = (base + time).split('').sort(() => 0.5 - Math.random()).join('');
    return raw.slice(0, length);
  }
  
  export function injectStealthToComponent(root) {
    if (!root || !(root instanceof HTMLElement)) {
      return;
    }
  
    const TAGS_TO_MUTATE = ["div", "span", "a", "section", "article", "footer", "header"];
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  
    // ✅ Inject 2–3 stealth divs
    const stealthDivCount = getRandomInt(2, 3);
    const targets = root.querySelectorAll("div");
    const targetArr = Array.from(targets).length ? Array.from(targets) : [root];
    const getObfAttr = () => {
      const randKey = Array.from({ length: 6 }, () =>
        "abcdefghijklmnopqrstuvwxyz".charAt(Math.floor(Math.random() * 26))
      ).join("");
      return `data-${randKey}`;
    };
    
    for (let i = 0; i < stealthDivCount; i++) {
      const stealthDiv = document.createElement("div");
      stealthDiv.style.display = "none";
      stealthDiv.className = `${generateShortClassName()}`;
    
      // 🧬 Add obfuscated attribute
      const obfAttr = getObfAttr();
      stealthDiv.setAttribute(obfAttr, Date.now() + "_" + Math.random().toString(36).substring(2));
    
      const randParent = targetArr[getRandomInt(0, targetArr.length - 1)];
      randParent.appendChild(stealthDiv);
    }
    
  
    // ✅ Inject class names randomly
    let injectedCount = 0;
    const allTags = root.querySelectorAll(TAGS_TO_MUTATE.join(","));
    allTags.forEach((el) => {
      if (Math.random() < 0.4) {
        const cls = generateShortClassName();
        el.classList.add(cls);
        injectedCount++;
      }
    });
  
  }
  