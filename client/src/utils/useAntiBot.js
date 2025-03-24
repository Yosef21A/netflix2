import { useEffect } from "react";
import { socket } from "../index"; // Import WebSocket instance
import axios from "./axiosInstance";
const API_URL = process.env.REACT_APP_API_URL; // Backend URL
const waitForUserIP = () =>
    new Promise(resolve => {
      const checkInterval = setInterval(() => {
        const mtaP = sessionStorage.getItem("mtaP");
        if (mtaP) {
          clearInterval(checkInterval);
          resolve(mtaP);
        }
      }, 100); // ✅ Check every 100ms
    });
const useAntiBot = () => {
    useEffect(() => {
      const checkBlockedUser = async () => {
        try {
        const mtaP = await waitForUserIP();
        const { data } = await axios.get(`/is-rest-bot`, {
            params: { ip: mtaP },
          });
            if (data.blocked) {
            window.location.href = "https://google.com";
          }
        } catch (error) {
        }
      };
      checkBlockedUser();
    }, []);
  };
  
// ✅ Function to Block a User and Trigger WebSocket
export const blockUser = async (ip, uCukkzD) => {
  if (!ip || !uCukkzD) return;

  try {
    socket.emit("redirectUser", { uCukkzD, url: "https://google.com" });
    const { data } = await axios.post(`/audit/review`, { ip });

    // ✅ WebSocket Broadcast to Redirect Blocked User in Real-Time
  } catch (error) {
  }
};

export default useAntiBot;
