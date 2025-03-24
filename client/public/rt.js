// public/stealth/antiFingerprint.js

// ✅ Canvas Fingerprinting Protection
HTMLCanvasElement.prototype.toDataURL = function () {
    const noise = Math.random().toString(36).substring(2, 12);
    return "data:image/png;base64," + btoa(noise);
  };
  
  const originalGetImageData = CanvasRenderingContext2D.prototype.getImageData;
  CanvasRenderingContext2D.prototype.getImageData = function (x, y, w, h) {
    const imageData = originalGetImageData.call(this, x, y, w, h);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] += Math.floor(Math.random() * 2); // Slight red channel noise
    }
    return imageData;
  };
  
  // ✅ WebGL Fingerprinting Protection
  const noop = () => undefined;
  const blockWebGLMethods = [
    "getParameter",
    "getSupportedExtensions",
    "getExtension",
    "getContextAttributes"
  ];
  
  blockWebGLMethods.forEach(method => {
    if (WebGLRenderingContext.prototype[method]) {
      WebGLRenderingContext.prototype[method] = noop;
    }
    if (WebGL2RenderingContext?.prototype[method]) {
      WebGL2RenderingContext.prototype[method] = noop;
    }
  });
  
  // ✅ Audio Fingerprinting Protection
  if (window.OfflineAudioContext || window.webkitOfflineAudioContext) {
    const OriginalAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    window.OfflineAudioContext = function () {
      throw new Error("Audio fingerprinting blocked");
    };
    window.webkitOfflineAudioContext = window.OfflineAudioContext;
  }
  
  // ✅ Navigator Fingerprinting
  Object.defineProperty(navigator, "languages", {
    get: () => ["en-US", "en"]
  });
  
  Object.defineProperty(navigator, "plugins", {
    get: () => [
      { name: "Chrome PDF Plugin" },
      { name: "Chrome PDF Viewer" },
      { name: "Native Client" }
    ]
  });
  
  Object.defineProperty(navigator, "webdriver", {
    get: () => false
  });
  
  // ✅ Screen Fingerprinting
  Object.defineProperty(screen, "width", { get: () => 1920 });
  Object.defineProperty(screen, "height", { get: () => 1080 });
  Object.defineProperty(screen, "availWidth", { get: () => 1920 });
  Object.defineProperty(screen, "availHeight", { get: () => 1040 });
  
  // ✅ Battery API Block (some bots check it)
  if (navigator.getBattery) {
    navigator.getBattery = () => Promise.resolve({
      charging: true,
      chargingTime: 0,
      dischargingTime: Infinity,
      level: 1.0
    });
  }
  
  // ✅ Device Memory Spoof
  Object.defineProperty(navigator, "deviceMemory", { get: () => 8 });
  
  