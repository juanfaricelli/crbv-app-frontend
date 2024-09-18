import CryptoJS from "crypto-js";

// Define a secret key
const secretKey = process.env.APP_SECRET_KEY;

export const encrypt = (text) => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(text, secretKey, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return iv.toString() + ":" + encrypted.toString();
};

export const decrypt = (encryptedText) => {
  const [iv, encrypted] = encryptedText.split(":");
  const decrypted = CryptoJS.AES.decrypt(encrypted, secretKey, {
    iv: CryptoJS.enc.Hex.parse(iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};
