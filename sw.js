/*
  Service Worker von Mimir.
  Er läuft im Hintergrund des Browsers und speichert die App-Dateien auf dem Handy,
  damit Mimir auch ohne Internet startet.

  Wichtig: Bei jeder neuen Version die Nummer in CACHE erhöhen (v1 -> v2 ...).
  Dann lädt der Browser die neuen Dateien und räumt die alten weg.
*/
const CACHE = "mimir-v2";
const FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-32.png",
  "./icons/icon-64.png",
  "./icons/icon-180.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png"
];

// 1. Installieren: alle App-Dateien in den Zwischenspeicher legen
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(FILES)));
  self.skipWaiting();
});

// 2. Aktivieren: Zwischenspeicher alter Versionen löschen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 3. Abrufen: erst im Netz nach der neuesten Version fragen,
//    ohne Internet die gespeicherte Kopie nehmen
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const copy = response.clone();
        if (response.ok && new URL(event.request.url).origin === location.origin) {
          caches.open(CACHE).then((cache) => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then((hit) => hit || caches.match("./index.html")))
  );
});
