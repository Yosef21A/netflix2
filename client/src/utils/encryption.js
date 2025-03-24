// utils/encryption.js

const SECRET_KEY = "az8910vscs1fdqs0a4t9a8474g1gzs4"; // Replace with a strong, secure key in production

/**
 * Convert string to ArrayBuffer (for encryption)
 */
const encodeText = (text) => new TextEncoder().encode(text);

/**
 * Generate a CryptoKey from a password
 */
const getCryptoKey = async () => {
    const keyMaterial = await window.crypto.subtle.importKey(
        "raw",
        encodeText(SECRET_KEY),
        { name: "PBKDF2" },
        false,
        ["deriveKey"]
    );

    return window.crypto.subtle.deriveKey(
        {
            name: "PBKDF2",
            salt: encodeText("random_salt"),
            iterations: 100000,
            hash: "SHA-256",
        },
        keyMaterial,
        { name: "AES-GCM", length: 256 },
        false,
        ["encrypt", "decrypt"]
    );
};

/**
 * Encrypt data using AES-GCM
 */
const encryptData = async (data) => {
    const key = await getCryptoKey();
    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // Random initialization vector
    const encryptedData = await window.crypto.subtle.encrypt(
        { name: "AES-GCM", iv },
        key,
        encodeText(JSON.stringify(data))
    );

    return {
        iv: Array.from(iv),
        data: Array.from(new Uint8Array(encryptedData)),
    };
};

/**
 * Decrypt data using AES-GCM
 */
const decryptData = async (encryptedObject) => {
    const key = await getCryptoKey();
    const iv = new Uint8Array(encryptedObject.iv);
    const encryptedData = new Uint8Array(encryptedObject.data);

    const decryptedData = await window.crypto.subtle.decrypt(
        { name: "AES-GCM", iv },
        key,
        encryptedData
    );

    return JSON.parse(new TextDecoder().decode(decryptedData));
};

/**
 * Store encrypted routes in sessionStorage
 */
const storeEncryptedRoutes = async (routes) => {
    const encrypted = await encryptData(routes);
    sessionStorage.setItem("thJdRbaz", JSON.stringify(encrypted));
};

/**
 * Retrieve and decrypt routes from sessionStorage
 */
const getEncryptedRoutes = async () => {
    const storedRoutes = sessionStorage.getItem("thJdRbaz");
    if (!storedRoutes) return null;

    try {
        return await decryptData(JSON.parse(storedRoutes));
    } catch (error) {
        return null;
    }
};

export { storeEncryptedRoutes, getEncryptedRoutes };
