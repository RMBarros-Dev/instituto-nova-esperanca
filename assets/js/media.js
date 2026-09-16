/**
 * INSTITUTO NOVA ESPERANÇA — MEDIA MANAGER V7.4
 * Sistema de Imagens à Prova de Falhas com Resolução de Caminhos Inteligente
 * Prevenção Total de Layout Shift (CLS = 0), WebP/SVG, Srcset Responsivo,
 * Fallback em Camadas (Arquivo Local -> Inline SVG Data-URI) e Lazy Loading.
 */

(function () {
  // Fallback SVG inline garantido contra falhas de rede ou servidor offline
  const INLINE_FALLBACK_SVG = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
      <rect width="800" height="450" fill="#0F2439" />
      <rect x="20" y="20" width="760" height="410" rx="16" fill="none" stroke="#2A9D8F" stroke-width="2" stroke-dasharray="8 8" opacity="0.4" />
      <g transform="translate(400, 200)" text-anchor="middle">
        <circle cx="0" cy="0" r="48" fill="#075E54" opacity="0.3" />
        <circle cx="0" cy="0" r="38" fill="#075E54" />
        <path d="M-14 -6 L0 -20 L14 -6 L8 -6 L8 14 L-8 14 L-8 -6 Z" fill="#D4AF37" />
        <text x="0" y="65" fill="#FFFFFF" font-family="'Manrope', -apple-system, sans-serif" font-size="18" font-weight="700">INSTITUTO NOVA ESPERANÇA</text>
        <text x="0" y="90" fill="#94A3B8" font-family="'Inter', -apple-system, sans-serif" font-size="13" font-weight="500">Imagem Institucional V7.4</text>
      </g>
    </svg>
  `);

  class MediaManager {
    constructor() {
      this.initGlobalErrorHandler();
    }

    /**
     * Detecta o prefixo relativo correto baseado na profundidade da URL atual
     * Suporta páginas na raiz (./) e páginas em subdiretórios de idioma como /pt-BR/ (../)
     */
    getRootPrefix() {
      const pathname = window.location.pathname.replace(/\\/g, '/');
      const supportedLangs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];
      const isSubdir = supportedLangs.some(lang => pathname.includes('/' + lang + '/') || pathname.endsWith('/' + lang));
      return isSubdir ? '../' : '';
    }

    /**
     * Resolve um caminho relativo de ativo para funcionar independente de onde a página está rodando
     */
    resolvePath(relativePath) {
      if (!relativePath) return '';
      if (
        relativePath.startsWith('http://') ||
        relativePath.startsWith('https://') ||
        relativePath.startsWith('//') ||
        relativePath.startsWith('data:') ||
        relativePath.startsWith('blob:')
      ) {
        return relativePath;
      }

      // Se já começa com ../ ou /, mantém
      if (relativePath.startsWith('../') || relativePath.startsWith('/')) {
        return relativePath;
      }

      const prefix = this.getRootPrefix();
      return prefix + relativePath.replace(/^\.?\//, '');
    }

    /**
     * Retorna o URL do placeholder padrão devidamente resolvido para a página atual
     */
    getFallbackUrl() {
      return this.resolvePath('assets/img/institutions/placeholder.svg');
    }

    /**
     * Intercepta qualquer falha de carregamento de imagem globalmente
     */
    initGlobalErrorHandler() {
      window.addEventListener('error', (event) => {
        const target = event.target;
        if (target && target.tagName === 'IMG') {
          const fallbackCount = parseInt(target.getAttribute('data-fallback-count') || '0', 10);
          
          if (fallbackCount >= 2) {
            // Previne loops infinitos
            return;
          }

          target.setAttribute('data-fallback-count', String(fallbackCount + 1));
          target.classList.add('has-fallback');

          // Mantém dimensões reservadas para CLS = 0
          if (!target.getAttribute('width') && target.clientWidth) {
            target.setAttribute('width', target.clientWidth);
          }
          if (!target.getAttribute('height') && target.clientHeight) {
            target.setAttribute('height', target.clientHeight);
          }

          if (fallbackCount === 0) {
            console.warn(`[MediaManager] Imagem não encontrada: "${target.src}". Aplicando fallback local SVG.`);
            target.src = this.getFallbackUrl();
          } else {
            console.warn(`[MediaManager] Fallback local também falhou. Aplicando inline SVG Data-URI.`);
            target.src = INLINE_FALLBACK_SVG;
          }
        }
      }, true);
    }

    /**
     * Helper para gerar HTML semântico de imagem resiliente com suporte a srcset e aspect-ratio
     */
    createImageHTML({
      src,
      srcset = '',
      sizes = '(max-width: 768px) 100vw, 50vw',
      width = 800,
      height = 450,
      alt = 'Instituto Nova Esperança',
      className = '',
      loading = 'lazy',
      decoding = 'async',
      credit = ''
    }) {
      const resolvedSrc = this.resolvePath(src);
      
      let resolvedSrcset = '';
      if (srcset) {
        resolvedSrcset = srcset.split(',').map(entry => {
          const parts = entry.trim().split(' ');
          const url = parts[0];
          const descriptor = parts[1] || '';
          return `${this.resolvePath(url)} ${descriptor}`.trim();
        }).join(', ');
      }

      const creditHTML = credit ? `<figcaption class="media-credit"><small>${credit}</small></figcaption>` : '';

      return `
        <figure class="resilient-media-wrap ${className}" style="aspect-ratio: ${width} / ${height}; margin: 0;">
          <img 
            src="${resolvedSrc}" 
            ${resolvedSrcset ? `srcset="${resolvedSrcset}" sizes="${sizes}"` : ''}
            alt="${alt || 'Instituto Nova Esperança'}" 
            width="${width}" 
            height="${height}" 
            loading="${loading}" 
            decoding="${decoding}" 
            class="resilient-img"
            onload="this.classList.add('is-loaded')"
          >
          ${creditHTML}
        </figure>
      `;
    }

    /**
     * Varre imagens existentes no DOM para assegurar atributos anti-quebra e caminhos corretos
     */
    hardenDOMImages() {
      const prefix = this.getRootPrefix();

      document.querySelectorAll('img').forEach(img => {
        if (img.hasAttribute('data-media-hardened')) return;
        img.setAttribute('data-media-hardened', 'true');
        
        if (!img.hasAttribute('loading')) {
          img.setAttribute('loading', 'lazy');
        }
        if (!img.hasAttribute('decoding')) {
          img.setAttribute('decoding', 'async');
        }

        // Se estiver em subdiretório e o src relativo não tiver ../
        const originalSrc = img.getAttribute('src');
        if (prefix && originalSrc && originalSrc.startsWith('assets/')) {
          img.src = prefix + originalSrc;
        }

        // Listener individual de transição suave
        if (img.complete && img.naturalHeight !== 0) {
          img.classList.add('is-loaded');
        } else {
          img.addEventListener('load', () => img.classList.add('is-loaded'));
        }
      });
    }
  }

  window.MediaManager = new MediaManager();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.MediaManager.hardenDOMImages());
  } else {
    window.MediaManager.hardenDOMImages();
  }
})();
