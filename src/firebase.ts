import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAsiclSA9rvBi34_OMPMwWYn-bNKvYi_n8",
  authDomain: "bob-8a8f9.firebaseapp.com",
  projectId: "bob-8a8f9",
  storageBucket: "bob-8a8f9.firebasestorage.app",
  messagingSenderId: "370304423066",
  appId: "1:370304423066:web:38f53ffa33b108383cfb23",
  measurementId: "G-K2C7C3YG0R",
};

const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

// 🔹 Service Worker 명시적으로 등록 후 푸시 토큰 가져오기
export const getPushToken = async () => {
  try {
    // 🛑 Service Worker 등록
    const registration = await navigator.serviceWorker.register(
      "/firebase-messaging-sw.js",
    );

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
      serviceWorkerRegistration: registration, // ✅ 명확하게 Service Worker 전달
    });

    console.log("푸시 토큰:", token);
    return token;
  } catch (error) {
    console.error("Error getting push token:", error);
  }
};
