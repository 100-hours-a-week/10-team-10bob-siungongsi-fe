// public/firebase-messaging-sw.js

const { url } = require('inspector');

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
  apiKey: 'AIzaSyAsiclSA9rvBi34_OMPMwWYn-bNKvYi_n8',
  authDomain: 'bob-8a8f9.firebaseapp.com',
  projectId: 'bob-8a8f9',
  storageBucket: 'bob-8a8f9.firebasestorage.app',
  messagingSenderId: '370304423066',
  appId: '1:370304423066:web:38f53ffa33b108383cfb23',
  measurementId: 'G-K2C7C3YG0R',
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
