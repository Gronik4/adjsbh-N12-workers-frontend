
const apiUrl = 'http://localhost:8080';
const files = ['./', './app.js', '../css/style.css', '../css/stamp.css', '../img/sqr1.png', '../img/sec2.svg'];
if ('workbox' in self) { workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []); };

console.log('Started', self);
self.addEventListener('install', (e) => {
  self.skipWaiting();
  console.log('Installed', e);
});
self.addEventListener('activate', (e) => {
  console.log('Activated', e);
});
