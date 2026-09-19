/* Service worker : rend le site utilisable hors ligne une fois visité.
   Stratégie « réseau d'abord, cache sinon » : les mises à jour arrivent
   dès qu'on est connecté, et tout reste consultable sans connexion. */

importScripts("chapitres.js");

const VERSION = "v2";
const CACHE = "physique-chimie-" + VERSION;

const FICHIERS_STATIQUES = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "chapitres.js",
  "manifest.json",
  "icones/icone.svg",
  "icones/icone-180.png",
  "icones/icone-192.png",
  "icones/icone-512.png",
  "lib/marked.js",
  "lib/katex/katex.min.js",
  "lib/katex/katex.min.css",
  "lib/katex/contrib/auto-render.min.js",
  "lib/katex/contrib/mhchem.min.js",
  "lib/katex/fonts/KaTeX_Main-Regular.woff2",
  "lib/katex/fonts/KaTeX_Main-Bold.woff2",
  "lib/katex/fonts/KaTeX_Main-Italic.woff2",
  "lib/katex/fonts/KaTeX_Math-Italic.woff2",
  "lib/katex/fonts/KaTeX_Size1-Regular.woff2",
  "lib/katex/fonts/KaTeX_Size2-Regular.woff2",
  "lib/katex/fonts/KaTeX_Size3-Regular.woff2",
  "lib/katex/fonts/KaTeX_Size4-Regular.woff2",
  "lib/katex/fonts/KaTeX_AMS-Regular.woff2",
];

const FICHIERS_CONTENU = [];
(self.CHAPITRES || []).forEach(function (chap) {
  chap.fichiers.forEach(function (f) { FICHIERS_CONTENU.push("contenu/" + chap.id + "/" + f + ".js"); });
});

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE).then(function (cache) {
      return cache.addAll(FICHIERS_STATIQUES.concat(FICHIERS_CONTENU));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (cles) {
      return Promise.all(cles.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request).then(function (reponse) {
      const copie = reponse.clone();
      caches.open(CACHE).then(function (cache) { cache.put(e.request, copie); });
      return reponse;
    }).catch(function () {
      return caches.match(e.request).then(function (r) { return r || caches.match("index.html"); });
    })
  );
});
