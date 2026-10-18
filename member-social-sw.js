self.addEventListener("push", (event) => {
  event.waitUntil(
    self.registration.showNotification("탁구 소식이 도착했어요", {
      body: "팔로우와 조인 소식을 알림함에서 확인해 주세요.",
      icon: new URL("modutt-favicon.png", self.registration.scope).toString(),
      badge: new URL("modutt-favicon.png", self.registration.scope).toString(),
      tag: "member-social",
      data: { path: "account/activity" },
    }),
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const target = new URL("account/activity", self.registration.scope).toString();
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((client) => client.url === target);
      if (existing && "focus" in existing) return existing.focus();
      return self.clients.openWindow(target);
    }),
  );
});
