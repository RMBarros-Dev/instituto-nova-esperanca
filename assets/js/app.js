/**
 * INSTITUTO NOVA ESPERANÇA — CORE APPLICATION ORCHESTRATOR V7.4
 * Error Boundary Central, Busca Global Unificada, Registro PWA & Ciclo de Vida
 */

(function () {
  'use strict';

  /**
   * 🛡️ Error Boundary Central
   */
  window.safeRun = function (moduleName, fn) {
    try {
      fn();
    } catch (err) {
      console.error(`[INE V7.4 Error Boundary] Falha contida no módulo "${moduleName}":`, err);
    }
  };

  /**
   * 🔎 Busca Global Unificada (Ctrl+K)
   */
  class GlobalSearch {
    constructor() {
      this.modal = null;
      this.input = null;
      this.resultsContainer = null;
      this.isOpen = false;
      this.searchIndex = [];
      this.selectedIndex = -1;
      this.init();
    }

    async init() {
      this.injectModalHTML();
      this.bindTriggers();
      await this.buildSearchIndex();
    }

    injectModalHTML() {
      if (document.getElementById('global-search-modal')) return;

      const modalHTML = `
        <div id="global-search-modal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="global-search-title">
          <div class="modal-container search-modal-container">
            <button type="button" class="modal-close" id="btn-close-global-search" aria-label="Fechar busca">✕</button>
            
            <div class="search-input-header">
              <span class="search-icon-inside" aria-hidden="true">🔍</span>
              <input type="search" id="global-search-input" class="search-global-input" 
                     placeholder="Pesquisar projetos, artigos, transparência, doações..." 
                     autocomplete="off" aria-label="Pesquisar em todo o portal">
            </div>

            <div id="global-search-results" class="search-results-list" role="region" aria-live="polite">
              <div class="state-desc text-center" style="margin-top: 1.5rem; color: var(--color-muted, #64748B);">
                Digite para buscar em todos os projetos, dados de transparência, artigos e páginas institucionais.
              </div>
            </div>

            <div class="search-footer-hint">
              <span>Navegação: <kbd>↑</kbd> <kbd>↓</kbd> para mover • <kbd>Enter</kbd> para selecionar</span>
              <span><kbd>Esc</kbd> para fechar</span>
            </div>
          </div>
        </div>
      `;

      document.body.insertAdjacentHTML('beforeend', modalHTML);

      this.modal = document.getElementById('global-search-modal');
      this.input = document.getElementById('global-search-input');
      this.resultsContainer = document.getElementById('global-search-results');

      document.getElementById('btn-close-global-search')?.addEventListener('click', () => this.close());
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    bindTriggers() {
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.toggle();
        }
        if (e.key === 'Escape' && this.isOpen) {
          this.close();
        }
      });

      document.querySelectorAll('.btn-search-trigger, [data-action="search"]').forEach(btn => {
        btn.addEventListener('click', () => this.open());
      });

      this.input?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }

    async buildSearchIndex() {
      try {
        const basePath = document.querySelector('script[src*="app.js"]')?.getAttribute('src')?.includes('../') ? '../' : './';
        const [projRes, blogRes, transpRes] = await Promise.allSettled([
          fetch(`${basePath}assets/data/projects.json`).then(r => r.json()),
          fetch(`${basePath}assets/data/blog.json`).then(r => r.json()),
          fetch(`${basePath}assets/data/transparency.json`).then(r => r.json())
        ]);

        if (projRes.status === 'fulfilled' && projRes.value?.projects) {
          projRes.value.projects.forEach(p => {
            this.searchIndex.push({
              title: p.title,
              category: 'Projeto',
              url: `${basePath}projetos.html#${p.id}`,
              desc: p.description || p.summary || ''
            });
          });
        }

        if (blogRes.status === 'fulfilled' && blogRes.value?.articles) {
          blogRes.value.articles.forEach(a => {
            this.searchIndex.push({
              title: a.title,
              category: 'Blog',
              url: `${basePath}blog.html#artigo-${a.id}`,
              desc: a.summary || ''
            });
          });
        }

        if (transpRes.status === 'fulfilled' && transpRes.value?.relatorios) {
          transpRes.value.relatorios.forEach(r => {
            this.searchIndex.push({
              title: r.titulo,
              category: 'Transparência',
              url: `${basePath}transparencia.html`,
              desc: `Ano ${r.ano} — ${r.tipo}`
            });
          });
        }
      } catch (err) {
        console.warn('[GlobalSearch] Índice inicializado com fallback local');
      }
    }

    handleSearch(query) {
      const q = query.trim().toLowerCase();
      if (!q) {
        this.resultsContainer.innerHTML = '<div class="state-desc text-center" style="margin-top: 1.5rem; color: var(--color-muted, #64748B);">Digite para buscar...</div>';
        return;
      }

      const results = this.searchIndex.filter(item => 
        item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
      ).slice(0, 8);

      if (results.length === 0) {
        this.resultsContainer.innerHTML = `<div class="state-desc text-center" style="margin-top: 1.5rem; color: var(--color-muted, #64748B);">Nenhum resultado encontrado para "<strong>${this.escapeHtml(q)}</strong>".</div>`;
        return;
      }

      this.resultsContainer.innerHTML = results.map((r, i) => `
        <a href="${r.url}" class="search-result-item" data-index="${i}">
          <span class="search-result-badge">${r.category}</span>
          <div class="search-result-info">
            <strong class="search-result-title">${this.escapeHtml(r.title)}</strong>
            <span class="search-result-desc">${this.escapeHtml(r.desc)}</span>
          </div>
        </a>
      `).join('');
    }

    escapeHtml(str) {
      if (!str) return '';
      return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
    }

    open() {
      this.modal.classList.add('is-open');
      this.isOpen = true;
      document.body.style.overflow = 'hidden';
      setTimeout(() => this.input?.focus(), 50);
    }

    close() {
      this.modal.classList.remove('is-open');
      this.isOpen = false;
      document.body.style.overflow = '';
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }
  }

  /**
   * 📲 Registro de Service Worker PWA
   */
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      const swPath = document.querySelector('script[src*="app.js"]')?.getAttribute('src')?.includes('../') ? '../service-worker.js' : './service-worker.js';
      navigator.serviceWorker.register(swPath).then(reg => {
        // SW registrado com sucesso
      }).catch(err => {
        console.debug('[PWA] SW register skipped:', err.message);
      });
    }
  }

  // Inicialização no DOM Ready
  document.addEventListener('DOMContentLoaded', () => {
    window.safeRun('GlobalSearch', () => new GlobalSearch());
    window.safeRun('ServiceWorker', () => registerServiceWorker());
  });

})();
