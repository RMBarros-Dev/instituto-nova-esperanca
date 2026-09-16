/**
 * INSTITUTO NOVA ESPERANÇA — BLOG INSTITUCIONAL PREMIUM V7.2+
 * Fonte Única da Verdade: assets/data/blog.json
 * Progresso de leitura, áudio TTS nativo, compartilhamento, artigos relacionados,
 * histórico de navegação limpo e imagens resilientes via MediaManager.
 */

(function () {
  let articles = [];
  let activeCategory = 'all';
  let searchQuery = '';
  let activeDateRange = 'all';
  let savedScrollPosition = 0;
  let currentArticle = null;
  let speechUtterance = null;
  let isSpeaking = false;
  let lastTriggerElement = null;
  let originalDocumentTitle = '';

  function getBlogModule() {
    if (window.i18n && typeof window.i18n.getModule === 'function') {
      return window.i18n.getModule('blog') || {};
    }
    return {};
  }

  async function loadArticles() {
    const grid = document.getElementById('blog-articles-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="state-container state-loading" style="grid-column: 1 / -1;">
          <div class="state-spinner" aria-hidden="true"></div>
          <p class="state-title">Carregando artigos e análises...</p>
        </div>
      `;
    }

    const mod = getBlogModule();
    if (mod && Array.isArray(mod.articles) && mod.articles.length > 0) {
      articles = mod.articles;
      renderArticles();
      checkUrlParams();
      return;
    }

    const lang = window.currentLangFormat || 'pt-BR';
    const resolve = (p) => window.MediaManager ? window.MediaManager.resolvePath(p) : p;

    try {
      // Tenta carregar do módulo de idioma ativo
      const res = await fetch(resolve(`lang/${lang}/blog.json`));
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.articles)) {
          articles = data.articles;
          renderArticles();
          checkUrlParams();
          return;
        }
      }
    } catch (e) {}

    try {
      const res = await fetch(resolve('assets/data/blog.json'));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      articles = await res.json();
      renderArticles();
      checkUrlParams();
    } catch (err) {
      console.error('[Blog] Falha ao carregar blog.json:', err);
      if (grid) {
        grid.innerHTML = `
          <div class="state-container state-error" style="grid-column: 1 / -1;">
            <span class="state-error-icon">⚠️</span>
            <h3 class="state-title">Não foi possível carregar os artigos</h3>
            <p class="state-desc">Verifique sua conexão ou tente recarregar a página.</p>
            <button type="button" class="btn btn-primary btn-sm" id="btn-retry-blog">Recarregar</button>
          </div>
        `;
        const btn = document.getElementById('btn-retry-blog');
        if (btn) btn.addEventListener('click', loadArticles);
      }
    }
  }

  function renderArticles() {
    const grid = document.getElementById('blog-articles-grid');
    if (!grid) return;

    const filtered = articles.filter(art => {
      const matchCat = activeCategory === 'all' || art.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchQuery = !q || 
        art.title.toLowerCase().includes(q) || 
        art.lead.toLowerCase().includes(q) || 
        art.author.toLowerCase().includes(q) ||
        (art.tags && art.tags.some(t => t.toLowerCase().includes(q)));
      
      let matchDate = true;
      if (activeDateRange === '2026') matchDate = art.date.startsWith('2026');
      else if (activeDateRange === 'recent') matchDate = art.date >= '2026-06-01';

      return matchCat && matchQuery && matchDate;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="state-container state-empty" style="grid-column: 1 / -1;">
          <span class="state-empty-icon">🔍</span>
          <h3 class="state-title">Nenhum artigo encontrado</h3>
          <p class="state-desc">Tente refinar sua busca ou selecione "Todas as Áreas".</p>
          <button type="button" class="btn btn-outline btn-sm" id="btn-reset-blog-filter">Ver todos os artigos</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-blog-filter');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          activeCategory = 'all';
          searchQuery = '';
          const input = document.getElementById('blog-search-input');
          if (input) input.value = '';
          document.querySelectorAll('[data-blog-category]').forEach(b => {
            b.classList.toggle('is-active', b.getAttribute('data-blog-category') === 'all');
          });
          renderArticles();
        });
      }
      return;
    }

    const mod = getBlogModule();
    const readMoreText = mod.read_more || 'Ler Artigo →';

    grid.innerHTML = filtered.map(art => {
      const baseCover = (art.coverImage || '').replace(/\.svg$/, '');
      const imgHtml = window.MediaManager ? 
        window.MediaManager.createImageHTML({
          src: art.coverImage,
          srcset: `${baseCover}-480.svg 480w, ${baseCover}-768.svg 768w, ${baseCover}-1200.svg 1200w`,
          sizes: '(max-width: 768px) 100vw, 33vw',
          alt: art.title,
          width: 800,
          height: 450,
          className: 'blog-card-media'
        }) : 
        `<img src="${art.coverImage}" alt="${art.title}" class="blog-card-img" loading="lazy">`;

      const dateFormatted = window.formatDate ? window.formatDate(new Date(art.date + 'T12:00:00')) : art.date;

      return `
        <article class="card blog-card" style="display: flex; flex-direction: column; overflow: hidden; padding: 0;">
          ${imgHtml}
          <div style="padding: 1.5rem; display: flex; flex-direction: column; flex-grow: 1;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <span class="badge badge-primary">${art.category}</span>
              <span style="font-size: 0.75rem; color: var(--text-muted); font-weight: 600;">⏱️ ${art.readingTime}</span>
            </div>
            <h3 style="font-size: 1.15rem; font-weight: 800; line-height: 1.3; margin-bottom: 0.5rem;">
              <a href="?id=${art.slug}" data-article-link="${art.slug}" style="text-decoration: none; color: inherit;">
                ${art.title}
              </a>
            </h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem; flex-grow: 1;">
              ${art.lead}
            </p>
            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 0.75rem; font-size: 0.8125rem;">
              <span style="color: var(--text-muted);">${dateFormatted}</span>
              <button type="button" class="btn btn-outline btn-sm" data-article-open="${art.slug}">${readMoreText}</button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Bind event listeners on cards
    grid.querySelectorAll('[data-article-link], [data-article-open]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const slug = el.getAttribute('data-article-link') || el.getAttribute('data-article-open');
        openArticle(slug, true);
      });
    });
  }

  function openArticle(slugOrId, pushState = true) {
    const art = articles.find(a => a.slug === slugOrId || String(a.id) === String(slugOrId));
    if (!art) return;

    if (isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
    }

    if (!originalDocumentTitle) {
      originalDocumentTitle = document.title;
    }
    document.title = `${art.title} | Instituto Nova Esperança`;

    if (document.activeElement && document.activeElement !== document.body) {
      lastTriggerElement = document.activeElement;
    }

    currentArticle = art;
    const hero = document.getElementById('blog-hero');
    const listSec = document.getElementById('blog-list-section');
    const articleContainer = document.getElementById('article-view-container');
    const contentBox = document.getElementById('article-reader-content');
    const mod = getBlogModule();
    const reader = mod.reader || {};

    if (pushState) {
      savedScrollPosition = window.scrollY;
      history.pushState({ articleSlug: art.slug }, '', `?id=${art.slug}`);
    }

    // Artigos relacionados (mesma categoria)
    const related = articles.filter(a => a.id !== art.id && a.category === art.category).slice(0, 3);
    const prevArticle = articles.find(a => a.id === art.id - 1);
    const nextArticle = articles.find(a => a.id === art.id + 1);

    const baseCover = (art.coverImage || '').replace(/\.svg$/, '');
    const imgHeader = window.MediaManager ?
      window.MediaManager.createImageHTML({
        src: art.coverImage,
        srcset: `${baseCover}-480.svg 480w, ${baseCover}-768.svg 768w, ${baseCover}-1200.svg 1200w`,
        sizes: '(max-width: 1200px) 100vw, 1200px',
        alt: art.title,
        width: 1200,
        height: 600,
        className: 'mb-xl'
      }) : '';

    const authorLabel = reader.by_author || 'Por:';
    const dateFormatted = window.formatDate ? window.formatDate(new Date(art.date + 'T12:00:00')) : art.date;
    const readingTimeLabel = reader.reading_time_prefix || 'Tempo de leitura:';
    const listenLabel = reader.listen_button || 'Ouvir Artigo';
    const shareTitle = reader.share_title || 'Compartilhar este conhecimento:';
    const shareWhatsApp = reader.share_whatsapp || 'WhatsApp';
    const shareLinkedIn = reader.share_linkedin || 'LinkedIn';
    const shareTwitter = reader.share_twitter || 'Twitter / X';
    const shareCopy = reader.share_copy || 'Copiar Link';
    const relatedTitle = reader.related_title || 'Artigos Relacionados';

    if (contentBox) {
      contentBox.innerHTML = `
        <article class="article-reader-wrapper">
          <header class="article-header mb-lg">
            <span class="badge badge-primary mb-xs">${art.category}</span>
            <h1 class="article-title" style="font-size: clamp(1.75rem, 3.5vw, 2.4rem); font-weight: 800; line-height: 1.2; margin-block: 0.5rem 1rem;">
              ${art.title}
            </h1>
            <p class="article-subtitle" style="font-size: 1.15rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 1.25rem;">
              ${art.subtitle}
            </p>
            
            <div class="article-meta-bar" style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: center; padding-block: 0.75rem; border-block: 1px solid var(--border); font-size: 0.85rem; color: var(--text-muted);">
              <span>✍️ <strong>${authorLabel}</strong> ${art.author}</span>
              <span>📅 <strong>${dateFormatted}</strong></span>
              <span>⏱️ <strong>${readingTimeLabel}</strong> ${art.readingTime}</span>
              
              <!-- Controles de Áudio TTS -->
              <div class="tts-player-bar ml-auto">
                <button type="button" class="btn btn-outline btn-sm" id="btn-tts-toggle" aria-label="${listenLabel}">
                  🔊 <span id="tts-label">${listenLabel}</span>
                </button>
              </div>
            </div>
          </header>

          ${imgHeader}

          <div class="article-body-content" style="font-size: 1.1rem; line-height: 1.8; color: var(--text);">
            <p class="article-lead" style="font-size: 1.25rem; font-weight: 600; line-height: 1.6; margin-bottom: 1.5rem; color: var(--primary);">
              ${art.lead}
            </p>
            ${art.content}
          </div>

          <!-- Ações de Compartilhamento, Impressão e Tags -->
          <footer class="article-footer mt-3xl pt-xl" style="border-top: 1px solid var(--border);">
            <div class="article-tags-wrap mb-lg" style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${(art.tags || []).map(t => `<span class="badge badge-accent">#${t}</span>`).join('')}
            </div>

            <div class="article-share-panel card p-lg" style="background: var(--surface-alt); margin-bottom: 2rem;">
              <h4 style="font-size: 0.95rem; font-weight: 800; margin-bottom: 0.75rem;">${shareTitle}</h4>
              <div style="display: flex; flex-wrap: wrap; gap: 0.6rem;">
                <button type="button" class="btn btn-primary btn-sm" id="share-native">Compartilhar ↗</button>
                <button type="button" class="btn btn-outline btn-sm" id="share-whatsapp">${shareWhatsApp}</button>
                <button type="button" class="btn btn-outline btn-sm" id="share-linkedin">${shareLinkedIn}</button>
                <button type="button" class="btn btn-outline btn-sm" id="share-copy">${shareCopy}</button>
                <button type="button" class="btn btn-outline btn-sm" id="share-print">🖨️ Imprimir</button>
              </div>
            </div>

            <!-- Navegação Anterior / Próximo -->
            <div style="display: flex; justify-content: space-between; gap: 1rem; margin-bottom: 2.5rem; flex-wrap: wrap;">
              ${prevArticle ? `
                <button type="button" class="btn btn-outline btn-sm" data-nav-article="${prevArticle.slug}">
                  ← ${prevArticle.title.substring(0, 32)}...
                </button>
              ` : '<div></div>'}
              ${nextArticle ? `
                <button type="button" class="btn btn-outline btn-sm" data-nav-article="${nextArticle.slug}">
                  ${nextArticle.title.substring(0, 32)}... →
                </button>
              ` : '<div></div>'}
            </div>

            <!-- Artigos Relacionados -->
            ${related.length > 0 ? `
              <div class="related-articles-box">
                <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem;">${relatedTitle} (${art.category})</h3>
                <div class="grid-3">
                  ${related.map(r => `
                    <div class="card p-md" style="font-size: 0.875rem;">
                      <span class="badge badge-primary mb-xs">${r.category}</span>
                      <h4 style="font-size: 0.95rem; font-weight: 700; margin-bottom: 0.4rem;">
                        <a href="?id=${r.slug}" data-nav-article="${r.slug}" style="color: inherit; text-decoration: none;">
                          ${r.title}
                        </a>
                      </h4>
                      <span style="color: var(--text-muted); font-size: 0.75rem;">⏱️ ${r.readingTime}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}
          </footer>
        </article>
      `;

      bindArticleEvents(art, reader);
    }

    if (hero) hero.style.display = 'none';
    if (listSec) listSec.style.display = 'none';
    if (articleContainer) articleContainer.style.display = 'block';

    window.scrollTo(0, 0);
    initReadingProgress();

    setTimeout(() => {
      const backBtn = document.getElementById('btn-back-to-blog');
      if (backBtn) {
        backBtn.focus();
      } else if (contentBox) {
        contentBox.setAttribute('tabindex', '-1');
        contentBox.focus();
      }
    }, 50);
  }

  function bindArticleEvents(art, reader = {}) {
    const url = window.location.href;
    const title = art.title;
    const listenLabel = reader.listen_button || 'Ouvir Artigo';
    const stopLabel = reader.btn_stop || 'Parar Áudio ⏹️';

    // TTS Áudio
    const ttsBtn = document.getElementById('btn-tts-toggle');
    const ttsLabel = document.getElementById('tts-label');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        if (!('speechSynthesis' in window)) {
          if (window.showToast) window.showToast('Síntese de voz não suportada pelo seu navegador.', 'info');
          return;
        }

        if (isSpeaking) {
          window.speechSynthesis.cancel();
          isSpeaking = false;
          if (ttsLabel) ttsLabel.textContent = listenLabel;
        } else {
          window.speechSynthesis.cancel();
          const cleanText = `${art.title}. ${art.subtitle}. ${art.lead}.`;
          speechUtterance = new SpeechSynthesisUtterance(cleanText);
          speechUtterance.lang = window.currentLangFormat || 'pt-BR';
          speechUtterance.rate = 1.0;
          speechUtterance.onend = () => {
            isSpeaking = false;
            if (ttsLabel) ttsLabel.textContent = listenLabel;
          };
          window.speechSynthesis.speak(speechUtterance);
          isSpeaking = true;
          if (ttsLabel) ttsLabel.textContent = stopLabel;
        }
      });
    }

    // Share actions
    const nativeBtn = document.getElementById('share-native');
    if (nativeBtn) {
      nativeBtn.addEventListener('click', () => {
        if (navigator.share) {
          navigator.share({ title, url }).catch(err => {
            if (err.name !== 'AbortError') console.error(err);
          });
        } else {
          navigator.clipboard.writeText(url).then(() => {
            if (window.showToast) window.showToast('Link do artigo copiado!', 'success');
          });
        }
      });
    }

    const waBtn = document.getElementById('share-whatsapp');
    if (waBtn) {
      waBtn.addEventListener('click', () => {
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(title + ' — ' + url)}`, '_blank');
      });
    }

    const inBtn = document.getElementById('share-linkedin');
    if (inBtn) {
      inBtn.addEventListener('click', () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
      });
    }

    const copyBtn = document.getElementById('share-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(url).then(() => {
          if (window.showToast) window.showToast('Link copiado para a área de transferência!', 'success');
        });
      });
    }

    const printBtn = document.getElementById('share-print');
    if (printBtn) {
      printBtn.addEventListener('click', () => window.print());
    }

    // Prev / Next / Related navigation
    document.querySelectorAll('[data-nav-article]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const nextSlug = btn.getAttribute('data-nav-article');
        openArticle(nextSlug, true);
      });
    });
  }

  function closeArticle(pushState = true) {
    if (isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
    }

    if (originalDocumentTitle) {
      document.title = originalDocumentTitle;
    }

    const hero = document.getElementById('blog-hero');
    const listSec = document.getElementById('blog-list-section');
    const articleContainer = document.getElementById('article-view-container');
    const progressBar = document.getElementById('reading-progress-bar');

    if (hero) hero.style.display = 'block';
    if (listSec) listSec.style.display = 'block';
    if (articleContainer) articleContainer.style.display = 'none';
    if (progressBar) progressBar.style.width = '0%';

    if (pushState) {
      history.pushState(null, '', window.location.pathname);
    }

    window.scrollTo(0, savedScrollPosition);

    if (lastTriggerElement && typeof lastTriggerElement.focus === 'function') {
      setTimeout(() => lastTriggerElement.focus(), 50);
    }
  }

  function initReadingProgress() {
    let progressBar = document.getElementById('reading-progress-bar');
    if (!progressBar) {
      progressBar = document.createElement('div');
      progressBar.id = 'reading-progress-bar';
      document.body.appendChild(progressBar);
    }

    window.addEventListener('scroll', () => {
      const articleContainer = document.getElementById('article-view-container');
      if (!articleContainer || articleContainer.style.display === 'none') return;

      const totalHeight = articleContainer.clientHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        progressBar.style.width = `${progress}%`;
      }
    }, { passive: true });
  }

  function checkUrlParams() {
    const params = new URLSearchParams(window.location.search);
    let id = params.get('id');
    if (!id && window.location.hash) {
      const cleanHash = window.location.hash.replace(/^#/, '');
      if (cleanHash.startsWith('artigo-')) {
        id = cleanHash.replace(/^artigo-/, '');
      } else {
        id = cleanHash;
      }
    }
    if (id) {
      openArticle(id, false);
    }
  }

  function initBlog() {
    loadArticles();

    // Filtro por texto
    const searchInput = document.getElementById('blog-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderArticles();
      });
    }

    // Filtro por categoria
    document.querySelectorAll('[data-blog-category]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-blog-category]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeCategory = btn.getAttribute('data-blog-category');
        renderArticles();
      });
    });

    // Botão Voltar para Notícias
    const backBtn = document.getElementById('btn-back-to-blog');
    if (backBtn) {
      backBtn.addEventListener('click', () => closeArticle(true));
    }

    // Histórico do navegador (Voltar / Avançar)
    window.addEventListener('popstate', (e) => {
      const params = new URLSearchParams(window.location.search);
      const id = params.get('id');
      if (id) {
        openArticle(id, false);
      } else {
        closeArticle(false);
      }
    });

    // Listener de Mudança Global de Idioma
    window.addEventListener('languageChanged', (e) => {
      const mod = getBlogModule();
      if (mod && Array.isArray(mod.articles) && mod.articles.length > 0) {
        articles = mod.articles;
      }
      renderArticles();
      if (currentArticle) {
        const updated = articles.find(a => a.id === currentArticle.id || a.slug === currentArticle.slug);
        if (updated) {
          if (isSpeaking && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            isSpeaking = false;
          }
          openArticle(updated.slug || updated.id, false);
        }
      }
    });
  }

  document.addEventListener('DOMContentLoaded', initBlog);
})();
