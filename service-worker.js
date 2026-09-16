/**
 * INSTITUTO NOVA ESPERANÇA — SERVICE WORKER V7.4
 * PWA 2.0: App Shell, Limpeza de Versões Anteriores, Cache Inteligente,
 * Stale-While-Revalidate para JSON, Fallback Offline Elegante e Resiliência Total de Mídias.
 */

const CACHE_VERSION = 'ine-v7.4-cache';
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
  'assets/css/base.css',
  'assets/css/layout.css',
  'assets/css/components.css',
  'assets/css/utilities.css',
  'assets/css/accessibility.css',
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
  'assets/js/certificate.js',
  'assets/js/map.js',
  'assets/js/main.js',
  'assets/data/dashboard.json',
  'assets/data/transparency.json',
  'assets/data/projects.json',
  'assets/data/blog.json',
  'assets/data/polos.json',
  'assets/data/routes.json',
  'assets/locales/pt-BR.json',
  'assets/locales/en-US.json',
  'assets/locales/es-ES.json',
  'assets/locales/fr-FR.json',
  'assets/locales/de-DE.json',
  'assets/locales/ja-JP.json',
  'assets/img/institutions/placeholder.svg',
  'assets/img/icon-192.svg',
  'assets/img/icon-512.svg',
  'assets/img/brand/logo-primary.svg',
  'assets/img/brand/logo-white.svg',
  'assets/img/brand/logo-mono.svg'
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

// Ativação e limpeza de caches antigos (v7.2, v7.3)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_VERSION).map((key) => {
          console.log(`[ServiceWorker V7.4] Removendo cache obsoleto: ${key}`);
          return caches.delete(key);
        })
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

  // 2. Imagens: Cache-First com Fallback Resiliente
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
        // Fallback elegante offline para navegação HTML
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return new Response(`
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Offline | Instituto Nova Esperança</title>
              <style>
                body { font-family: system-ui, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #0F2439; color: #FFFFFF; text-align: center; padding: 2rem; }
                .offline-card { max-width: 480px; background: rgba(255,255,255,0.05); padding: 2.5rem; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); }
                h1 { color: #5EEAD4; margin-bottom: 0.75rem; font-size: 1.75rem; }
                p { color: #94A3B8; line-height: 1.6; margin-bottom: 1.5rem; }
                .btn { display: inline-block; background: #075E54; color: #fff; text-decoration: none; padding: 0.75rem 1.5rem; border-radius: 8px; font-weight: 700; }
              </style>
            </head>
            <body>
              <div class="offline-card">
                <h1>📡 Você está offline</h1>
                <p>Alguns conteúdos da plataforma podem estar temporariamente indisponíveis sem conexão com a internet.</p>
                <a href="javascript:window.location.reload()" class="btn">Tentar Conectar Novamente</a>
              </div>
            </body>
            </html>
          `, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
      });
    })
  );
});
