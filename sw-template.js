/*
 * @Description: sw
 * @Author: wzk
 * @Email: 2463960567@qq.com
 * @Date: 2022-02-22 11:23:58
 * @LastEditTime: 2022-03-08 12:24:30
 * @LastEditors: wzk
 */
const workboxVersion = "5.1.3";

importScripts(`https://storage.googleapis.com/workbox-cdn/releases/${workboxVersion}/workbox-sw.js`);

workbox.core.setCacheNameDetails({
  prefix: "wzk",
});

workbox.core.skipWaiting();

workbox.core.clientsClaim();

// ע��ɹ���Ҫ�����������Դ�б�
// ���建���б���gulpfile.js�����ã�������
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST, {
  directoryIndex: null,
});

// ��չ��ڻ���
workbox.precaching.cleanupOutdatedCaches();

// ͼƬ��Դ����ѡ������Ҫ��ע�͵���
// workbox.routing.registerRoute(
//   /\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'images',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 1000,
//         maxAgeSeconds: 60 * 60 * 24 * 30,
//       }),
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// )

// �����ļ�����ѡ������Ҫ��ע�͵���
workbox.routing.registerRoute(
  /\.(?:eot|ttf|woff|woff2)$/,
  new workbox.strategies.CacheFirst({
    cacheName: "fonts",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// �ȸ����壨��ѡ������Ҫ��ע�͵���
workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);
workbox.routing.registerRoute(
  /^https:\/\/fonts\.gstatic\.com/,
  new workbox.strategies.CacheFirst({
    cacheName: "google-fonts-webfonts",
    plugins: [
      new workbox.expiration.ExpirationPlugin({
        maxEntries: 1000,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
      new workbox.cacheableResponse.CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

// jsdelivr��CDN��Դ����ѡ������Ҫ��ע�͵���
// workbox.routing.registerRoute(
//   /^https:\/\/cdn\.jsdelivr\.net/,
//   new workbox.strategies.CacheFirst({
//     cacheName: 'static-libs',
//     plugins: [
//       new workbox.expiration.ExpirationPlugin({
//         maxEntries: 1000,
//         maxAgeSeconds: 60 * 60 * 24 * 30,
//       }),
//       new workbox.cacheableResponse.CacheableResponsePlugin({
//         statuses: [0, 200],
//       }),
//     ],
//   })
// )

workbox.googleAnalytics.initialize();