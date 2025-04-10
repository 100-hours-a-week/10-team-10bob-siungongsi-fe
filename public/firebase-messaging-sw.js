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
  const { title, body, url } = payload.data;
  // eslint-disable-next-line no-restricted-globals
  self.registration.showNotification(title, {
    body,

    icon: '/icon-192x192.png', // 알림 아이콘 (public 폴더에 있는 이미지 사용 가능)
    data: { url },
  });
  // eslint-disable-next-line no-restricted-globals
});
// eslint-disable-next-line no-restricted-globals
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = event.notification.data.url;

  event.waitUntil(
    // 현재 열린 탭(윈도우)들 중에서 서비스워커가 컨트롤 할 수 있는 것들을 가져옴
    clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        for (const client of clientList) {
          if (client.url.includes('siun') && 'focus' in client) {
            return client.focus().then((focusedClient) => {
              if ('postMessage' in focusedClient) {
                focusedClient.postMessage(targetUrl);
              }
            });
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
