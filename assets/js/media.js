/**
 * INSTITUTO NOVA ESPERANÇA — MEDIA MANAGER V7.2+
 * Sistema de Imagens à Prova de Quebra com Prevenção de Layout Shift (CLS = 0)
 * Fallback visual instantâneo, WebP, lazy loading e decodificação assíncrona
 */

(function () {
  const DEFAULT_FALLBACK_SVG = 'assets/img/institutions/placeholder.svg';

  class MediaManager {
    constructor() {
      this.fallbackUrl = DEFAULT_FALLBACK_SVG;
      this.initGlobalErrorHandler();
    }

    /**
     * Intercepta qualquer falha de carregamento de imagem globalmente
     */
    initGlobalErrorHandler() {
      window.addEventListener('error', (event) => {
        const target = event.target;
        if (target && target.tagName === 'IMG') {
          // Previne loops infinitos se o próprio fallback falhar
          if (target.getAttribute('data-has-fallback') === 'true') {
            return;
          }

          console.warn(`[MediaManager] Imagem não encontrada: "${target.src}". Aplicando fallback sem layout shift.`);
          target.setAttribute('data-has-fallback', 'true');
          target.classList.add('has-fallback');

          // Mantém dimensões reservadas
          if (!target.getAttribute('width') && target.clientWidth) {
            target.setAttribute('width', target.clientWidth);
          }
          if (!target.getAttribute('height') && target.clientHeight) {
            target.setAttribute('height', target.clientHeight);
          }

          target.src = this.fallbackUrl;
        }
      }, true);
    }

    /**
     * Helper para gerar HTML semântico de imagem resiliente
     */
    createImageHTML({
      src,
      alt,
      width = 800,
      height = 450,
      className = '',
      loading = 'lazy',
      decoding = 'async'
    }) {
      return `
        <div class="resilient-media-wrap ${className}" style="aspect-ratio: ${width} / ${height};">
          <img 
            src="${src}" 
            alt="${alt || 'Imagem do Instituto Nova Esperança'}" 
            width="${width}" 
            height="${height}" 
            loading="${loading}" 
            decoding="${decoding}" 
            class="resilient-img"
            onload="this.classList.add('is-loaded')"
          >
        </div>
      `;
    }

    /**
     * Varre imagens existentes no DOM para assegurar atributos anti-quebra
     */
    hardenDOMImages() {
      document.querySelectorAll('img:not([data-media-hardened])').forEach(img => {
        img.setAttribute('data-media-hardened', 'true');
        
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }

        // Listener individual de sucesso para transição suave
        if (img.complete) {
          img.classList.add('is-loaded');
        } else {
          img.addEventListener('load', () => img.classList.add('is-loaded'));
        }
      });
    }
  }

  window.MediaManager = new MediaManager();

  document.addEventListener('DOMContentLoaded', () => {
    window.MediaManager.hardenDOMImages();
  });
})();
