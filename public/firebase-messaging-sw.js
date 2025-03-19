// public/firebase-messaging-sw.js

// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/11.4.0/firebase-app-compat.js'
);
// eslint-disable-next-line no-undef
importScripts(
  'https://www.gstatic.com/firebasejs/11.4.0/firebase-messaging-compat.js'
);

// Firebase 설정 (여기서 Firebase를 초기화)
// eslint-disable-next-line no-undef
firebase.initializeApp({
  apiKey: process.env.REACT_APP_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_PUBLIC_FIREBASE_MEASUREMENTID,
});

// 메시징 핸들러
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신: ', payload);
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/logo192.png', // 알림 아이콘 (public 폴더에 있는 이미지 사용 가능)
  });
});
