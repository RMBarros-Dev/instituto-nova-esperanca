/**
 * INSTITUTO NOVA ESPERANÇA — SERVICE WORKER V7.2+
 * PWA Hardening: Cache Inteligente, Stale-While-Revalidate para JSON,
 * Fallback Resiliente para Imagens e Suporte Offline Total.
 */

const CACHE_VERSION = 'ine-v7.2-plus-cache';
const STATIC_ASSETS = [
  './',
  'index.html',
  'sobre.html',
  'projetos.html',
  'impacto.html',
  'empresas.html',
  'voluntariado.html',
  'transparencia.html',
  'blog.html',
  'doacoes.html',
  'contato.html',
  'faq.html',
  'acessibilidade.html',
  'privacidade.html',
  'cookies.html',
  '404.html',
  'manifest.webmanifest',
  'assets/css/tokens.css',
  'assets/css/accessibility.css',
  'assets/css/components.css',
  'assets/css/dashboard.css',
  'assets/css/style.css',
  'assets/css/pages.css',
  'assets/js/toast.js',
  'assets/js/a11y.js',
  'assets/js/i18n.js',
  'assets/js/media.js',
  'assets/js/forms.js',
  'assets/js/donations.js',
  'assets/js/dashboard.js',
  'assets/js/transparency.js',
  'assets/js/blog.js',
  'assets/js/main.js',
  'assets/data/dashboard.json',
  'assets/data/transparency.json',
  'assets/data/projects.json',
  'assets/data/blog.json',
  'assets/locales/pt-BR.json',
  'assets/locales/en-US.json',
  'assets/locales/es-ES.json',
  'assets/locales/fr-FR.json',
  'assets/locales/de-DE.json',
  'assets/locales/ja-JP.json',
  'assets/img/institutions/placeholder.svg',
  'assets/img/icon-192.svg',
  'assets/img/icon-512.svg'
];

// Instalação do Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Interceptação de requisições com estratégia inteligente
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  const url = new URL(event.request.url);

  // 1. Dados estruturados JSON: Stale-While-Revalidate
  if (url.pathname.endsWith('.json')) {
    event.respondWith(
      caches.open(CACHE_VERSION).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => cachedResponse);

          return cachedResponse || fetchPromise;
        });
      })
    );
    return;
  }

  // 2. Imagens: Cache-First com Fallback SVG Instantâneo
  if (event.request.destination === 'image' || url.pathname.match(/\.(svg|webp|png|jpg|jpeg)$/)) {
    event.respondWith(
      caches.match(event.request).then((cachedImage) => {
        if (cachedImage) return cachedImage;

        return fetch(event.request).then((networkImage) => {
          if (networkImage && networkImage.status === 200) {
            const imageToCache = networkImage.clone();
            caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, imageToCache));
          }
          return networkImage;
        }).catch(() => {
          return caches.match('assets/img/institutions/placeholder.svg');
        });
      })
    );
    return;
  }

  // 3. Demais recursos estáticos: Cache-First com fallback para rede
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const toCache = networkResponse.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, toCache));
        return networkResponse;
      }).catch(() => {
        // Fallback para navegação HTML offline
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('index.html') || caches.match('404.html');
        }
      });
    })
  );
});
