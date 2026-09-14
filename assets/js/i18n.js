/**
 * INSTITUTO NOVA ESPERANÇA — I18N MANAGER V7.2+
 * Motor de Internacionalização para 6 Idiomas (PT, EN, ES, FR, DE, JP)
 * Suporte a Dashboards, Busca Global, Estados de Interface e Formatação Internacional
 */

class I18nManager {
  constructor() {
    this.supportedLangs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];
    this.defaultLang = 'pt-BR';
    this.currentLang = this.defaultLang;
    this.dictionary = {};
    this.fallbackDictionary = {};
    this.storageKey = 'ine_current_lang';
  }

  detectInitialLanguage() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && this.supportedLangs.includes(langParam)) {
      return langParam;
    }

    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved && this.supportedLangs.includes(saved)) {
        return saved;
      }
    } catch (e) {}

    const navLang = (navigator.language || '').toLowerCase();
    const map = {
      'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR'
    };
    const prefix = navLang.substring(0, 2);
    return map[prefix] || this.defaultLang;
  }

  flattenObject(obj, prefix = '') {
    let result = {};
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        const nested = this.flattenObject(obj[key], `${prefix}${key}.`);
        Object.assign(result, nested);
      } else {
        result[`${prefix}${key}`] = obj[key];
        // Adiciona alias com underscore para compatibilidade (ex: nav_home -> navigation.home)
        const parts = `${prefix}${key}`.split('.');
        if (parts.length > 1) {
          const alias = `${parts[0]}_${parts[1]}`;
          if (!result[alias]) result[alias] = obj[key];
        }
      }
    }
    return result;
  }

  async loadDictionary(lang) {
    try {
      const res = await fetch(`assets/locales/${lang}.json`);
      if (res.ok) {
        const json = await res.json();
        return this.flattenObject(json);
      }
    } catch (e) {
      console.warn(`[i18n] Não foi possível carregar assets/locales/${lang}.json:`, e);
    }
    return {};
  }

  async setLanguage(lang) {
    if (!this.supportedLangs.includes(lang)) lang = this.defaultLang;
    this.currentLang = lang;

    try {
      localStorage.setItem(this.storageKey, lang);
    } catch (e) {}

    // Carrega dicionário ativo
    this.dictionary = await this.loadDictionary(lang);

    // Carrega fallback pt-BR se não for o padrão
    if (lang !== this.defaultLang) {
      if (Object.keys(this.fallbackDictionary).length === 0) {
        this.fallbackDictionary = await this.loadDictionary(this.defaultLang);
      }
    } else {
      this.fallbackDictionary = this.dictionary;
    }

    this.translateDOM();
  }

  get(key) {
    if (this.dictionary[key] !== undefined && this.dictionary[key] !== '') {
      return this.dictionary[key];
    }
    if (this.fallbackDictionary[key] !== undefined && this.fallbackDictionary[key] !== '') {
      return this.fallbackDictionary[key];
    }
    return '';
  }

  translateDOM() {
    document.documentElement.lang = this.currentLang;

    // Textos
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.get(key);
      if (text) el.textContent = text;
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      const text = this.get(key);
      if (text) el.setAttribute('placeholder', text);
    });

    // Aria-Labels
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria-label');
      const text = this.get(key);
      if (text) el.setAttribute('aria-label', text);
    });

    // Titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      const text = this.get(key);
      if (text) el.setAttribute('title', text);
    });

    // Sincroniza seletor de idiomas
    document.querySelectorAll('[data-lang-code]').forEach(btn => {
      const code = btn.getAttribute('data-lang-code');
      const map = { 'PT': 'pt-BR', 'EN': 'en-US', 'ES': 'es-ES', 'FR': 'fr-FR', 'DE': 'de-DE', 'JP': 'ja-JP' };
      const isCurrent = map[code] === this.currentLang;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    window.currentLangFormat = this.currentLang;

    // Dispara evento para que gráficos, tabelas e filtros atualizem suas formatações
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: this.currentLang } }));
  }

  async init() {
    const lang = this.detectInitialLanguage();
    await this.setLanguage(lang);
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang-code]');
      if (!btn) return;
      const code = btn.getAttribute('data-lang-code');
      const map = { 'PT': 'pt-BR', 'EN': 'en-US', 'ES': 'es-ES', 'FR': 'fr-FR', 'DE': 'de-DE', 'JP': 'ja-JP' };
      if (map[code]) {
        this.setLanguage(map[code]);
      }
    });
  }
}

// Formatadores Globais Nativos
window.formatCurrency = function (amount, currency = 'BRL') {
  return new Intl.NumberFormat(window.currentLangFormat || 'pt-BR', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 2
  }).format(amount);
};

window.formatDate = function (dateObj) {
  return new Intl.DateTimeFormat(window.currentLangFormat || 'pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(dateObj);
};

window.i18n = new I18nManager();
document.addEventListener('DOMContentLoaded', () => {
  window.i18n.init();
});
