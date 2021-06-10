const staticAlertify = "alertify-pwa"
const assets = [
  "/media",
]

self.addEventListener("install", installEvent => {
     installEvent.waitUntil(
          caches.open(staticAlertify).then(cache => {
               cache.addAll(assets)
          })
     )
})

self.addEventListener("fetch", fetchEvent => {
     fetchEvent.respondWith(
          caches.match(fetchEvent.request).then(res => {
               return res || fetch(fetchEvent.request)
          })
     )
})