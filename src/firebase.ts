import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_PUBLIC_FIREBASE_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
export { messaging, onMessage };

// 🔹 Service Worker 명시적으로 등록 후 푸시 토큰 가져오기
export const getPushToken = async () => {
  try {
    // 🛑 Service Worker 등록
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js?v=8",
    );

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration, // ✅ 명확하게 Service Worker 전달
    });

    return token;
  } catch (error) {
    console.error("Error getting push token:", error);
  }
};
