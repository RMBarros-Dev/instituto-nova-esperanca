/**
 * INSTITUTO NOVA ESPERANÇA — MAIN APPLICATION ORCHESTRATOR V7.2+
 * JavaScript Error Boundary Central, Busca Global Unificada, PWA & Resiliência Offline
 */

(function () {
  const COOKIE_STORAGE_KEY = 'ine_cookie_consent';

  /**
   * 🛡️ 14. Error Boundary Central para JavaScript
   * Executa módulos isoladamente: falhas em um módulo nunca quebram o restante
   */
  window.safeRun = function (moduleName, fn) {
    try {
      fn();
    } catch (err) {
      console.error(`[Error Boundary] Falha contida no módulo "${moduleName}":`, err);
      // Interface principal permanece intacta
    }
  };

  /**
   * 🔎 6. Busca Global Institucional ("Pesquisar no Instituto...")
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
              <div class="state-desc text-center" style="margin-top: 1.5rem;">
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

      // Fechar modal
      document.getElementById('btn-close-global-search')?.addEventListener('click', () => this.close());
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    async buildSearchIndex() {
      this.searchIndex = [];
      try {
        // Carrega projetos do módulo i18n ativo se disponível
        let projs = [];
        if (window.i18n && typeof window.i18n.getModule === 'function') {
          const mod = window.i18n.getModule('projects');
          if (mod && Array.isArray(mod.projects)) projs = mod.projects;
        }
        if (projs.length === 0) {
          const projRes = await fetch('assets/data/projects.json');
          if (projRes.ok) projs = await projRes.json();
        }
        const projGroup = (window.i18n && window.i18n.get('nav_projects')) || 'Projetos';
        projs.forEach(p => {
          this.searchIndex.push({
            group: projGroup,
            title: p.name || p.title,
            desc: p.summary || p.lead,
            url: `projetos.html#${p.slug}`
          });
        });

        // Carrega artigos do blog do módulo i18n ativo se disponível
        let arts = [];
        if (window.i18n && typeof window.i18n.getModule === 'function') {
          const mod = window.i18n.getModule('blog');
          if (mod && Array.isArray(mod.articles)) arts = mod.articles;
        }
        if (arts.length === 0) {
          const blogRes = await fetch('assets/data/blog.json');
          if (blogRes.ok) arts = await blogRes.json();
        }
        const blogGroup = (window.i18n && window.i18n.get('nav_blog')) || 'Blog';
        arts.forEach(a => {
          this.searchIndex.push({
            group: blogGroup,
            title: a.title,
            desc: a.lead,
            url: `blog.html?id=${a.slug}`
          });
        });

        // Páginas institucionais fixas com títulos e descrições localizadas
        const getT = (key, fallback) => (window.i18n ? window.i18n.get(key) || fallback : fallback);
        const staticPages = [
          { group: getT('nav_about', 'Quem Somos'), title: getT('about.hero.title', 'Quem Somos & Teoria da Mudança'), desc: getT('about.hero.subtitle', 'História, missão, visão e equipe de governança do Instituto.'), url: 'sobre.html' },
          { group: getT('nav_transparency', 'Transparência'), title: getT('transparency.header.title', 'Portal da Transparência Ativa'), desc: getT('transparency.header.subtitle', 'Demonstrações contábeis auditadas, taxas de eficiência de 91% e balanços.'), url: 'transparencia.html' },
          { group: getT('nav_impact', 'Impacto Social'), title: getT('impact.header.title', 'Dashboard de Impacto Territorial'), desc: getT('impact.header.subtitle', 'Métricas de pessoas atendidas, refeições distribuídas e evolução anual.'), url: 'impacto.html' },
          { group: getT('nav_donate', 'Doações'), title: getT('donations.header.title', 'Como Doar via PIX ou Cartão'), desc: getT('donations.header.subtitle', 'Contribuições pontuais e recorrentes com simulador de impacto direto.'), url: 'doacoes.html' },
          { group: getT('nav_companies', 'Empresas & ESG'), title: 'Parcerias Corporativas e Grandes Doadores', desc: 'Alianças ESG, matching gifts, voluntariado corporativo e cotas de apoio.', url: 'empresas.html' },
          { group: getT('nav_volunteer', 'Voluntariado'), title: 'Programa de Voluntariado', desc: 'Cadastro de voluntários especialistas e comunitários em 7 etapas.', url: 'voluntariado.html' },
          { group: getT('nav_faq', 'Central de Ajuda'), title: getT('faq.header.title', 'Perguntas Frequentes (FAQ)'), desc: getT('faq.header.subtitle', 'Esclarecimentos sobre doações, projetos, visitas territoriais e prestação de contas.'), url: 'faq.html' }
        ];

        this.searchIndex.push(...staticPages);
      } catch (e) {
        console.warn('[GlobalSearch] Falha parcial ao construir índice:', e);
      }
    }

    bindTriggers() {
      // Atalho de teclado Ctrl + K ou "/"
      window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
          e.preventDefault();
          this.toggle();
        } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
          e.preventDefault();
          this.open();
        } else if (e.key === 'Escape' && this.isOpen) {
          this.close();
        } else if (this.isOpen) {
          this.handleKeyNavigation(e);
        }
      });

      // Recarrega índice quando o idioma for alterado
      window.addEventListener('languageChanged', () => {
        this.buildSearchIndex();
      });

      // Botões de busca com classe .btn-search-trigger
      document.querySelectorAll('.btn-search-trigger').forEach(btn => {
        btn.addEventListener('click', () => this.open());
      });

      // Input listener
      this.input?.addEventListener('input', (e) => {
        this.performSearch(e.target.value);
      });
    }

    open() {
      if (!this.modal) return;
      this.modal.classList.add('is-open');
      this.isOpen = true;
      this.selectedIndex = -1;
      setTimeout(() => this.input?.focus(), 100);
    }

    close() {
      if (!this.modal) return;
      this.modal.classList.remove('is-open');
      this.isOpen = false;
      if (this.input) this.input.value = '';
    }

    toggle() {
      if (this.isOpen) this.close();
      else this.open();
    }

    performSearch(query) {
      const q = query.toLowerCase().trim();
      if (!q) {
        this.resultsContainer.innerHTML = `
          <div class="state-desc text-center" style="margin-top: 1.5rem;">
            Digite para buscar em todos os projetos, dados de transparência, artigos e páginas institucionais.
          </div>
        `;
        return;
      }

      const results = this.searchIndex.filter(item => {
        return item.title.toLowerCase().includes(q) ||
               item.desc.toLowerCase().includes(q) ||
               item.group.toLowerCase().includes(q);
      });

      if (results.length === 0) {
        this.resultsContainer.innerHTML = `
          <div class="state-container state-empty" style="padding: 1.5rem;">
            <span class="state-empty-icon">🔍</span>
            <h4 class="state-title">Nenhum resultado para "${query}"</h4>
            <p class="state-desc">Tente utilizar termos mais gerais como "educação", "alimentação" ou "doação".</p>
          </div>
        `;
        return;
      }

      // Agrupa por categoria
      const groups = {};
      results.forEach(r => {
        if (!groups[r.group]) groups[r.group] = [];
        groups[r.group].push(r);
      });

      let html = '';
      Object.entries(groups).forEach(([groupName, items]) => {
        html += `
          <div class="search-result-group">
            <div class="search-group-title">${groupName} (${items.length})</div>
            <div style="display: flex; flex-direction: column; gap: 0.4rem;">
              ${items.map(item => {
                const highlightedTitle = this.highlightMatch(item.title, q);
                const highlightedDesc = this.highlightMatch(item.desc, q);
                return `
                  <a href="${item.url}" class="search-item-card" data-search-item="true">
                    <span class="search-item-title">${highlightedTitle}</span>
                    <span class="search-item-desc">${highlightedDesc}</span>
                  </a>
                `;
              }).join('')}
            </div>
          </div>
        `;
      });

      this.resultsContainer.innerHTML = html;
      this.selectedIndex = -1;
    }

    highlightMatch(text, query) {
      if (!query) return text;
      const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
      return text.replace(regex, '<mark class="search-highlight">$1</mark>');
    }

    handleKeyNavigation(e) {
      const items = this.resultsContainer.querySelectorAll('[data-search-item="true"]');
      if (items.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex + 1) % items.length;
        this.updateFocusedItem(items);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.selectedIndex = (this.selectedIndex - 1 + items.length) % items.length;
        this.updateFocusedItem(items);
      } else if (e.key === 'Enter' && this.selectedIndex >= 0) {
        e.preventDefault();
        items[this.selectedIndex]?.click();
      }
    }

    updateFocusedItem(items) {
      items.forEach((item, idx) => {
        const isSelected = idx === this.selectedIndex;
        item.classList.toggle('is-focused', isSelected);
        if (isSelected) {
          item.scrollIntoView({ block: 'nearest' });
        }
      });
    }
  }

  /**
   * 📱 9. Monitoramento de Conectividade e PWA Hardening
   */
  function initConnectivityMonitor() {
    window.addEventListener('online', () => {
      if (window.showToast) {
        window.showToast('Conexão restabelecida! Você está online novamente.', 'success');
      }
    });

    window.addEventListener('offline', () => {
      if (window.showToast) {
        window.showToast('Você está sem conexão. Exibindo dados locais do cache offline.', 'info');
      }
    });
  }

  function initServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
          .then(reg => {
            console.log('[PWA] Service Worker ativo:', reg.scope);
            // Detecta atualização
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              newWorker?.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  if (window.showToast) {
                    window.showToast('Nova versão da plataforma disponível. Recarregue para atualizar.', 'info');
                  }
                }
              });
            });
          })
          .catch(err => console.warn('[PWA] Falha ao registrar Service Worker:', err));
      });
    }
  }

  /**
   * Menu Mobile Acessível
   */
  function initMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (!toggleBtn || !mainNav) return;

    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('is-open', !isExpanded);
    });

    document.addEventListener('click', (e) => {
      if (mainNav.classList.contains('is-open') && !mainNav.contains(e.target) && !toggleBtn.contains(e.target)) {
        mainNav.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /**
   * Banner de Consentimento de Cookies (LGPD)
   */
  function initCookieBanner() {
    const banner = document.getElementById('cookie-consent-banner');
    if (!banner) return;

    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        setTimeout(() => banner.classList.add('is-visible'), 600);
      }
    } catch (e) {
      banner.classList.add('is-visible');
    }

    document.getElementById('btn-cookie-accept')?.addEventListener('click', () => {
      try { localStorage.setItem(COOKIE_STORAGE_KEY, 'accepted'); } catch (e) {}
      banner.classList.remove('is-visible');
      if (window.showToast) window.showToast('Preferências de cookies salvas.', 'success');
    });

    document.getElementById('btn-cookie-reject')?.addEventListener('click', () => {
      try { localStorage.setItem(COOKIE_STORAGE_KEY, 'rejected'); } catch (e) {}
      banner.classList.remove('is-visible');
      if (window.showToast) window.showToast('Apenas cookies essenciais habilitados.', 'info');
    });
  }

  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      if (input && input.value.trim()) {
        if (window.showToast) {
          window.showToast('Inscrição no boletim informativo realizada com sucesso!', 'success');
        }
        input.value = '';
      }
    });
  }

  // Inicialização com proteção do Error Boundary
  document.addEventListener('DOMContentLoaded', () => {
    window.safeRun('MenuMobile', initMobileMenu);
    window.safeRun('CookieBanner', initCookieBanner);
    window.safeRun('Newsletter', initNewsletter);
    window.safeRun('ServiceWorker', initServiceWorker);
    window.safeRun('Conectividade', initConnectivityMonitor);
    window.safeRun('GlobalSearch', () => {
      window.globalSearch = new GlobalSearch();
    });
  });
})();
