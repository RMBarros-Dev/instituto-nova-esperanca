/**
 * INSTITUTO NOVA ESPERANÇA — ACCESSIBILITY MODULE V7.4 (WCAG 2.2 AAA)
 * Controle de Fontes, Contraste, Modo Escuro, Dislexia, Sublinhado, TTS & Persistência
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'ine_a11y_prefs';

  const defaultState = {
    fontSizePercent: 100,
    highContrast: false,
    darkMode: false,
    dyslexicFont: false,
    underlineLinks: false,
    reducedMotion: false
  };

  let state = Object.assign({}, defaultState);

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        state = Object.assign({}, defaultState, JSON.parse(saved));
      }
    } catch (e) {
      console.warn('[A11y V7.4] Storage inacessível:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function applyState() {
    const root = document.documentElement;

    // Tamanho da fonte
    root.style.fontSize = state.fontSizePercent + '%';

    // Alto contraste
    if (state.highContrast) {
      root.setAttribute('data-contrast', 'high');
      root.classList.add('theme-high-contrast');
    } else {
      root.removeAttribute('data-contrast');
      root.classList.remove('theme-high-contrast');
    }

    // Modo escuro
    if (state.darkMode) {
      root.setAttribute('data-theme', 'dark');
      root.classList.add('theme-dark');
    } else {
      root.removeAttribute('data-theme');
      root.classList.remove('theme-dark');
    }

    // Fonte dislexia
    if (state.dyslexicFont) {
      root.classList.add('font-dyslexia');
    } else {
      root.classList.remove('font-dyslexia');
    }

    // Sublinhar links
    if (state.underlineLinks) {
      root.classList.add('underline-links');
    } else {
      root.classList.remove('underline-links');
    }

    // Atualiza estados aria-pressed nos botões da barra
    document.querySelectorAll('[data-a11y-action]').forEach(btn => {
      const action = btn.getAttribute('data-a11y-action');
      if (action === 'contrast') btn.setAttribute('aria-pressed', state.highContrast ? 'true' : 'false');
      if (action === 'dark') btn.setAttribute('aria-pressed', state.darkMode ? 'true' : 'false');
      if (action === 'dyslexia') btn.setAttribute('aria-pressed', state.dyslexicFont ? 'true' : 'false');
      if (action === 'underline') btn.setAttribute('aria-pressed', state.underlineLinks ? 'true' : 'false');
    });
  }

  /**
   * 🗣️ Leitor por Voz (TTS — Web Speech API)
   */
  let isSpeaking = false;
  function toggleSpeech() {
    if (!('speechSynthesis' in window)) {
      if (window.ineToast) window.ineToast('Síntese de voz não suportada neste navegador.', 'error');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      isSpeaking = false;
      if (window.ineToast) window.ineToast('Leitura pausada.');
      return;
    }

    const mainContent = document.getElementById('main-content') || document.body;
    const textToRead = mainContent.innerText;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = document.documentElement.lang || 'pt-BR';
    utterance.rate = 1.0;

    utterance.onend = () => { isSpeaking = false; };
    utterance.onerror = () => { isSpeaking = false; };

    window.speechSynthesis.speak(utterance);
    isSpeaking = true;
    if (window.ineToast) window.ineToast('Iniciando leitura em voz alta...');
  }

  function bindButtons() {
    document.querySelectorAll('[data-a11y-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-a11y-action');

        switch (action) {
          case 'font-inc':
            if (state.fontSizePercent < 150) state.fontSizePercent += 10;
            break;
          case 'font-dec':
            if (state.fontSizePercent > 80) state.fontSizePercent -= 10;
            break;
          case 'font-reset':
            state.fontSizePercent = 100;
            break;
          case 'contrast':
            state.highContrast = !state.highContrast;
            break;
          case 'dark':
            state.darkMode = !state.darkMode;
            break;
          case 'dyslexia':
            state.dyslexicFont = !state.dyslexicFont;
            break;
          case 'underline':
            state.underlineLinks = !state.underlineLinks;
            break;
          case 'speech':
          case 'read':
            toggleSpeech();
            return;
          case 'reset':
            state = Object.assign({}, defaultState);
            break;
        }

        saveState();
        applyState();
      });
    });
  }

  // Executa imediatamente para evitar flash of unstyled theme
  loadState();
  applyState();

  document.addEventListener('DOMContentLoaded', () => {
    bindButtons();
    applyState();
  });

  window.ineA11y = {
    getState: () => Object.assign({}, state),
    applyState,
    toggleSpeech
  };

})();
