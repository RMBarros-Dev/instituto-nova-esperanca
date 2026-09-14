/**
 * INSTITUTO NOVA ESPERANÇA — GERENCIADOR DE ACESSIBILIDADE WCAG 2.2 AAA
 * Contraste, modo escuro, fonte legível, redimensionamento e trap de foco
 */

(function () {
  const STORAGE_KEY = 'ine_a11y_prefs';

  const defaultState = {
    fontSizePercent: 100,
    highContrast: false,
    darkMode: false,
    dyslexicFont: false,
    underlineLinks: false,
    reducedMotion: false,
    lineSpacing: false,
    wordSpacing: false
  };

  let state = Object.assign({}, defaultState);

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = Object.assign({}, defaultState, JSON.parse(saved));
      }
      
      // Expõe pro metrics.js ler antes do applyState se necessário
      localStorage.setItem('a11y-reduced-motion', state.reducedMotion ? 'true' : 'false');
    } catch (e) {
      console.warn('A11y storage not accessible:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      localStorage.setItem('a11y-reduced-motion', state.reducedMotion ? 'true' : 'false');
    } catch (e) {}
  }

  function applyState() {
    const root = document.documentElement;

    // Font size
    root.style.fontSize = state.fontSizePercent + '%';

    // Contrast
    if (state.highContrast) {
      root.setAttribute('data-contrast', 'high');
    } else {
      root.removeAttribute('data-contrast');
    }

    // Dark mode
    if (state.darkMode) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }

    // Dyslexic font
    if (state.dyslexicFont) {
      root.setAttribute('data-font', 'dyslexic');
    } else {
      root.removeAttribute('data-font');
    }

    // Underline links
    if (state.underlineLinks) {
      root.setAttribute('data-underline', 'true');
    } else {
      root.removeAttribute('data-underline');
    }

    // Reduced motion
    if (state.reducedMotion) {
      root.setAttribute('data-reduced-motion', 'true');
    } else {
      root.removeAttribute('data-reduced-motion');
    }

    // Line spacing
    if (state.lineSpacing) {
      root.setAttribute('data-line-spacing', 'true');
    } else {
      root.removeAttribute('data-line-spacing');
    }

    // Word spacing
    if (state.wordSpacing) {
      root.setAttribute('data-word-spacing', 'true');
    } else {
      root.removeAttribute('data-word-spacing');
    }

    // Sync UI buttons state
    document.querySelectorAll('[data-a11y-action]').forEach(btn => {
      const action = btn.getAttribute('data-a11y-action');
      if (action === 'contrast') {
        btn.setAttribute('aria-pressed', state.highContrast ? 'true' : 'false');
      } else if (action === 'dark') {
        btn.setAttribute('aria-pressed', state.darkMode ? 'true' : 'false');
      } else if (action === 'dyslexia') {
        btn.setAttribute('aria-pressed', state.dyslexicFont ? 'true' : 'false');
      } else if (action === 'underline') {
        btn.setAttribute('aria-pressed', state.underlineLinks ? 'true' : 'false');
      } else if (action === 'motion') {
        btn.setAttribute('aria-pressed', state.reducedMotion ? 'true' : 'false');
      } else if (action === 'linespacing') {
        btn.setAttribute('aria-pressed', state.lineSpacing ? 'true' : 'false');
      } else if (action === 'wordspacing') {
        btn.setAttribute('aria-pressed', state.wordSpacing ? 'true' : 'false');
      }
    });
  }

  function setupEventListeners() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-a11y-action]');
      if (!btn) return;

      const action = btn.getAttribute('data-a11y-action');
      switch (action) {
        case 'font-inc':
          if (state.fontSizePercent < 150) {
            state.fontSizePercent += 10;
            saveState();
            applyState();
            if (window.showToast) window.showToast('Tamanho da fonte aumentado para ' + state.fontSizePercent + '%');
          }
          break;
        case 'font-dec':
          if (state.fontSizePercent > 80) {
            state.fontSizePercent -= 10;
            saveState();
            applyState();
            if (window.showToast) window.showToast('Tamanho da fonte reduzido para ' + state.fontSizePercent + '%');
          }
          break;
        case 'font-reset':
          state.fontSizePercent = 100;
          saveState();
          applyState();
          if (window.showToast) window.showToast('Tamanho da fonte redefinido');
          break;
        case 'contrast':
          state.highContrast = !state.highContrast;
          saveState();
          applyState();
          if (window.showToast) window.showToast(state.highContrast ? 'Alto contraste ativado' : 'Alto contraste desativado');
          break;
        case 'dark':
          state.darkMode = !state.darkMode;
          saveState();
          applyState();
          if (window.showToast) window.showToast(state.darkMode ? 'Modo escuro ativado' : 'Modo escuro desativado');
          break;
        case 'dyslexia':
          state.dyslexicFont = !state.dyslexicFont;
          saveState();
          applyState();
          if (window.showToast) window.showToast(state.dyslexicFont ? 'Fonte legível ativada' : 'Fonte legível desativada');
          break;
        case 'underline':
          state.underlineLinks = !state.underlineLinks;
          saveState();
          applyState();
          if (window.showToast) window.showToast(state.underlineLinks ? 'Sublinhado em links ativado' : 'Sublinhado em links desativado');
          break;
        case 'motion':
          state.reducedMotion = !state.reducedMotion;
          saveState();
          applyState();
          if (window.showToast) window.showToast(state.reducedMotion ? 'Movimento reduzido ativado' : 'Movimento reduzido desativado');
          break;
        case 'linespacing':
          state.lineSpacing = !state.lineSpacing;
          saveState();
          applyState();
          if (window.showToast) window.showToast(state.lineSpacing ? 'Espaçamento de linhas aumentado' : 'Espaçamento de linhas padrão');
          break;
        case 'wordspacing':
          state.wordSpacing = !state.wordSpacing;
          saveState();
          applyState();
          if (window.showToast) window.showToast(state.wordSpacing ? 'Espaçamento de palavras aumentado' : 'Espaçamento de palavras padrão');
          break;
        case 'reset':
          state = Object.assign({}, defaultState);
          saveState();
          applyState();
          if (window.showToast) window.showToast('Opções de acessibilidade redefinidas');
          break;
      }
    });

    // Fechamento com tecla ESC para qualquer modal ou drawer aberto
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' || e.keyCode === 27) {
        const openModal = document.querySelector('.modal-backdrop.is-open');
        if (openModal) {
          openModal.classList.remove('is-open');
          if (openModal._triggerEl) openModal._triggerEl.focus();
        }
        const openNav = document.querySelector('.main-nav.is-open');
        if (openNav) {
          openNav.classList.remove('is-open');
          const toggle = document.querySelector('.mobile-nav-toggle');
          if (toggle) {
            toggle.setAttribute('aria-expanded', 'false');
            toggle.focus();
          }
        }
      }
    });
  }

  // Trapping focus helper
  window.trapFocus = function (element) {
    const focusableEls = element.querySelectorAll('a[href], button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
    if (!focusableEls.length) return;

    const firstFocusable = focusableEls[0];
    const lastFocusable = focusableEls[focusableEls.length - 1];

    element.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable.focus();
          e.preventDefault();
        }
      }
    });
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadState();
    applyState();
    setupEventListeners();
  });
})();
