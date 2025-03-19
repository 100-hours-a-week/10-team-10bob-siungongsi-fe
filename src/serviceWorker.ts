export {};

declare let self: ServiceWorkerGlobalScope;

self.addEventListener("push", (event: PushEvent) => {
  const data = event.data?.json();

  if (data) {
    self.registration.showNotification(data.title ?? "알림", {
      body: data.body ?? "메시지가 도착했습니다.",
      icon: "/icon-192x192.png",
      vibrate: [200, 100, 200],
      actions: [
        { action: "confirm", title: "확인" },
        { action: "close", title: "닫기" },
      ],
    });
  }
});
