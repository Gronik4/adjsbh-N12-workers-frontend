
const apiUrl = 'http://localhost:8080';
const files = ['./', './app.js'];
if ('workbox' in self) { workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []); };
console.log('Исполняем sw.js');

self.addEventListener('install', async (e) => {
  self.skipWaiting();
  const cash = await caches.open('files');// Получаем ссылку на кеш
  console.log('Installed sw.js', cash);
  cash.addAll(files);// Сохраняем в кеше файлы приложения и заглушки для данных
});
/**
 * Проверка, что url запроса является url нашего api
 * @param req
 * @returns {boolean}
 */
function controlApi(req) {
  return req.url.startsWith(apiUrl);
};
/**
 * Получаем результаты запроса из кеша
 * @param req
 * @returns {Promise<*>}
 */
async function getCach(req) {
  const res = await caches.match(reg);// Запрос в кеш
  if (!res) {// В кеше нет данных для запроса
    return getFromNetwork(req);// Отправляем запрос в сеть
  }
  return res;
};
/**
 * Сеть недоступна и в кеше нет результатов запроса - возвращаем данные-заглушки
 * @param req
 * @returns {Promise<any>}
 */
async function getPlug(req) {
  return caches.match('../save.json');
};
/**
 * Выполняем сетевой запрос. сохраняем результат в кеш
 * @param req
 * @returns {Promise<*>}
 */
async function getFromNetwork(req) {
  const cach = await caches.open('data');// Ссылка на кеш с тэгом "data"
  try {
    const res = await fetch(reg);// Выполняем запрос в сеть
    cach.put(req, res.clone());// Cохраняем результат в кеш
    return res;
  } catch (e) {// Если что-то пошло не так, извлекаем результат запроса из кеша
      const res = await cach.match(req);
      // Возвращаем результат запроса если он найден в кеше или возвращаем данные-заглушки если в кеше нет результатов запроса
      return res || getPlug(req);
  }
};
self.addEventListener('activate', (e) => {
  console.log('Activated sw.js');
});
/**
 * перехватываем событие обозревателя "fetch" - запрос в сеть
 */
/*self.addEventListener('fetch', async (e) => {
  const req = e.request;// Извлекаем запрос из события
  // Запрос соответствует нашему api url - обращаемся в сеть
  // Прочие запросы (html, css, js, json и любые другие файлы) - пытаемся получить результаты из кеша
  // эти файлы являются частями нашего приложения и сохраняются при первой загрузке
  const res = controlApi(req) ? getFromNetwork(req) : getCach(req);
  // Подсовываем событию "fetch" результат сформированный нами в вызовах getFromNetwork или getCache.
  // Этот результат будет использован в нашем приложении.
  await e.respondWith(res);
});*/
