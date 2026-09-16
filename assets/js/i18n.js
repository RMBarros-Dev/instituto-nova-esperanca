/**
 * INSTITUTO NOVA ESPERANÇA — I18N MANAGER V7.3 PRODUCTION READINESS
 * Motor de Internacionalização Integral para 6 Idiomas (PT, EN, ES, FR, DE, JA)
 * Conformidade com a Diretriz "🌐 INTERNATIONALIZATION — ZERO TOLERANCE"
 * Suporte a Roteamento Nativo por Diretórios (/pt-BR/, /en-US/, etc.) com Preservação de Deep Links.
 */

// Interceptor de Fetch para resolução transparente de assets e data em subdiretórios
(function () {
  const originalFetch = window.fetch;
  if (originalFetch) {
    window.fetch = function (input, init) {
      if (typeof input === 'string') {
        const isSubdir = /\/(pt-BR|en-US|es-ES|fr-FR|de-DE|ja-JP)(\/|$)/.test(window.location.pathname);
        if (isSubdir && (input.startsWith('assets/') || input.startsWith('lang/'))) {
          input = '../' + input;
        }
      }
      return originalFetch.call(this, input, init);
    };
  }
})();

const CANONICAL_ROUTES = {
  home: {
    "pt-BR": "/pt-BR/index.html",
    "en-US": "/en-US/index.html",
    "es-ES": "/es-ES/index.html",
    "fr-FR": "/fr-FR/index.html",
    "de-DE": "/de-DE/index.html",
    "ja-JP": "/ja-JP/index.html"
  },
  about: {
    "pt-BR": "/pt-BR/sobre.html",
    "en-US": "/en-US/about.html",
    "es-ES": "/es-ES/nosotros.html",
    "fr-FR": "/fr-FR/a-propos.html",
    "de-DE": "/de-DE/ueber-uns.html",
    "ja-JP": "/ja-JP/about.html"
  },
  projects: {
    "pt-BR": "/pt-BR/projetos.html",
    "en-US": "/en-US/projects.html",
    "es-ES": "/es-ES/proyectos.html",
    "fr-FR": "/fr-FR/projets.html",
    "de-DE": "/de-DE/projekte.html",
    "ja-JP": "/ja-JP/projects.html"
  },
  impact: {
    "pt-BR": "/pt-BR/impacto.html",
    "en-US": "/en-US/impact.html",
    "es-ES": "/es-ES/impacto.html",
    "fr-FR": "/fr-FR/impact.html",
    "de-DE": "/de-DE/wirkung.html",
    "ja-JP": "/ja-JP/impact.html"
  },
  companies: {
    "pt-BR": "/pt-BR/empresas.html",
    "en-US": "/en-US/companies.html",
    "es-ES": "/es-ES/empresas.html",
    "fr-FR": "/fr-FR/entreprises.html",
    "de-DE": "/de-DE/unternehmen.html",
    "ja-JP": "/ja-JP/companies.html"
  },
  volunteering: {
    "pt-BR": "/pt-BR/voluntariado.html",
    "en-US": "/en-US/volunteering.html",
    "es-ES": "/es-ES/voluntariado.html",
    "fr-FR": "/fr-FR/benevolat.html",
    "de-DE": "/de-DE/ehrenamt.html",
    "ja-JP": "/ja-JP/volunteer.html"
  },
  transparency: {
    "pt-BR": "/pt-BR/transparencia.html",
    "en-US": "/en-US/transparency.html",
    "es-ES": "/es-ES/transparencia.html",
    "fr-FR": "/fr-FR/transparence.html",
    "de-DE": "/de-DE/transparenz.html",
    "ja-JP": "/ja-JP/transparency.html"
  },
  blog: {
    "pt-BR": "/pt-BR/blog.html",
    "en-US": "/en-US/blog.html",
    "es-ES": "/es-ES/blog.html",
    "fr-FR": "/fr-FR/blog.html",
    "de-DE": "/de-DE/blog.html",
    "ja-JP": "/ja-JP/blog.html"
  },
  donations: {
    "pt-BR": "/pt-BR/doacoes.html",
    "en-US": "/en-US/donations.html",
    "es-ES": "/es-ES/donaciones.html",
    "fr-FR": "/fr-FR/dons.html",
    "de-DE": "/de-DE/spenden.html",
    "ja-JP": "/ja-JP/donations.html"
  },
  contact: {
    "pt-BR": "/pt-BR/contato.html",
    "en-US": "/en-US/contact.html",
    "es-ES": "/es-ES/contacto.html",
    "fr-FR": "/fr-FR/contact.html",
    "de-DE": "/de-DE/kontakt.html",
    "ja-JP": "/ja-JP/contact.html"
  },
  faq: {
    "pt-BR": "/pt-BR/faq.html",
    "en-US": "/en-US/faq.html",
    "es-ES": "/es-ES/faq.html",
    "fr-FR": "/fr-FR/faq.html",
    "de-DE": "/de-DE/faq.html",
    "ja-JP": "/ja-JP/faq.html"
  },
  press: {
    "pt-BR": "/pt-BR/imprensa.html",
    "en-US": "/en-US/press.html",
    "es-ES": "/es-ES/prensa.html",
    "fr-FR": "/fr-FR/presse.html",
    "de-DE": "/de-DE/presse.html",
    "ja-JP": "/ja-JP/press.html"
  }
};

class I18nManager {
  constructor() {
    this.supportedLangs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];
    this.defaultLang = 'pt-BR';
    this.currentLang = this.defaultLang;
    this.dictionary = {};
    this.fallbackDictionary = {};
    this.rawBundle = {};
    this.fallbackRawBundle = {};
    this.storageKey = 'ine_current_lang';
    this.ROUTES = CANONICAL_ROUTES;
  }

  detectInitialLanguage() {
    // 1. Detecta via caminho URL (arquitetura nativa de diretórios)
    const pathname = window.location.pathname;
    for (const lang of this.supportedLangs) {
      if (pathname.includes(`/${lang}/`) || pathname.endsWith(`/${lang}`)) {
        return lang;
      }
    }

    // 2. Detecta via atributo lang do HTML
    const htmlLang = document.documentElement.lang;
    if (htmlLang && this.supportedLangs.includes(htmlLang)) {
      return htmlLang;
    }

    // 3. Detecta via parâmetro da URL
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && this.supportedLangs.includes(langParam)) {
      return langParam;
    }

    // 4. Detecta via preferência salva
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved && this.supportedLangs.includes(saved)) {
        return saved;
      }
    } catch (e) {}

    // 5. Detecta via navegador do usuário
    const navLang = (navigator.language || '').toLowerCase();
    const map = {
      'en': 'en-US', 'es': 'es-ES', 'fr': 'fr-FR', 'de': 'de-DE', 'ja': 'ja-JP', 'pt': 'pt-BR'
    };
    const prefix = navLang.substring(0, 2);
    return map[prefix] || this.defaultLang;
  }

  getCurrentRouteKey() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    const filename = pathname.split('/').pop() || 'index.html';

    // Procura na tabela de rotas canônicas
    for (const [key, langMap] of Object.entries(this.ROUTES)) {
      for (const [lang, routePath] of Object.entries(langMap)) {
        const routeFile = routePath.split('/').pop();
        if (filename === routeFile && (pathname.includes(`/${lang}/`) || !pathname.includes('/'))) {
          return key;
        }
      }
    }

    // Mapeamento de compatibilidade para arquivos na raiz
    const legacyMap = {
      'index.html': 'home',
      'sobre.html': 'about',
      'projetos.html': 'projects',
      'impacto.html': 'impact',
      'empresas.html': 'companies',
      'voluntariado.html': 'volunteering',
      'transparencia.html': 'transparency',
      'blog.html': 'blog',
      'doacoes.html': 'donations',
      'contato.html': 'contact',
      'faq.html': 'faq',
      'imprensa.html': 'press'
    };

    return legacyMap[filename] || 'home';
  }

  flattenObject(obj, prefix = '') {
    let result = {};
    for (const key in obj) {
      if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;
      const val = obj[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;

      if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
        const nested = this.flattenObject(val, fullKey);
        Object.assign(result, nested);
      } else {
        result[fullKey] = val;

        // Atalhos para compatibilidade com seletores data-i18n
        const parts = fullKey.split('.');
        if (parts.length >= 3 && parts[1] === 'nav') {
          const alias = `nav_${parts[2]}`;
          if (!result[alias]) result[alias] = val;
        } else if (parts.length >= 3 && parts[1] === 'skip') {
          const alias = `skip_${parts[2]}`;
          if (!result[alias]) result[alias] = val;
        } else if (parts.length >= 3 && parts[1] === 'a11y') {
          const alias = `a11y_${parts[2]}`;
          if (!result[alias]) result[alias] = val;
        } else if (parts.length >= 3 && parts[1] === 'footer') {
          const alias = `footer_${parts[2]}`;
          if (!result[alias]) result[alias] = val;
        } else if (parts.length >= 3 && parts[1] === 'states') {
          const alias = `state_${parts[2]}`;
          if (!result[alias]) result[alias] = val;
        } else if (parts.length >= 2) {
          const alias = `${parts[0]}_${parts[1]}`;
          if (!result[alias]) result[alias] = val;
        }
      }
    }
    return result;
  }

  async loadDictionary(lang) {
    const isSubdir = this.supportedLangs.some(l => window.location.pathname.includes(`/${l}/`) || window.location.pathname.endsWith(`/${l}`));
    const prefix = isSubdir ? '../' : '';

    // 1. Tenta carregar o pacote consolidado em assets/locales/
    try {
      const res = await fetch(`${prefix}assets/locales/${lang}.json`);
      if (res.ok) {
        const json = await res.json();
        return {
          raw: json,
          flat: this.flattenObject(json)
        };
      }
    } catch (e) {
      console.warn(`[i18n] Fallback para carregamento modular de lang/${lang}/`, e);
    }

    // 2. Fallback para carregar diretamente de lang/<lang>/*.json
    const modules = [
      'common', 'home', 'about', 'projects', 'impact', 'donations',
      'blog', 'transparency', 'contact', 'faq', 'accessibility', 'forms'
    ];
    const raw = {};
    for (const mod of modules) {
      try {
        const res = await fetch(`${prefix}lang/${lang}/${mod}.json`);
        if (res.ok) {
          raw[mod] = await res.json();
        }
      } catch (err) {}
    }
    return {
      raw: raw,
      flat: this.flattenObject(raw)
    };
  }

  async setLanguage(lang, shouldNavigate = true) {
    if (!this.supportedLangs.includes(lang)) lang = this.defaultLang;

    try {
      localStorage.setItem(this.storageKey, lang);
    } catch (e) {}

    // Se estiver em uma página nativa e o usuário solicitou troca de idioma
    if (shouldNavigate && lang !== this.currentLang) {
      const currentKey = this.getCurrentRouteKey();
      const targetRoute = (this.ROUTES[currentKey] && this.ROUTES[currentKey][lang]) || `/${lang}/index.html`;

      const pathname = window.location.pathname.replace(/\\/g, '/');
      const isSubdir = /\/(pt-BR|en-US|es-ES|fr-FR|de-DE|ja-JP)(\/|$)/.test(pathname);
      const targetRelative = isSubdir ? ('../' + targetRoute.replace(/^\//, '')) : ('.' + targetRoute);

      const search = window.location.search || '';
      const hash = window.location.hash || '';

      // Redireciona para a página nativa correspondente preservando deep links
      window.location.href = targetRelative + search + hash;
      return;
    }

    this.currentLang = lang;

    // Carrega dicionário ativo
    const bundle = await this.loadDictionary(lang);
    this.dictionary = bundle.flat;
    this.rawBundle = bundle.raw;

    // Carrega fallback pt-BR se não for o padrão
    if (lang !== this.defaultLang) {
      if (Object.keys(this.fallbackDictionary).length === 0) {
        const fallbackBundle = await this.loadDictionary(this.defaultLang);
        this.fallbackDictionary = fallbackBundle.flat;
        this.fallbackRawBundle = fallbackBundle.raw;
      }
    } else {
      this.fallbackDictionary = this.dictionary;
      this.fallbackRawBundle = this.rawBundle;
    }

    this.translateDOM();
  }

  getModule(name) {
    if (this.rawBundle && this.rawBundle[name]) {
      return this.rawBundle[name];
    }
    if (this.fallbackRawBundle && this.fallbackRawBundle[name]) {
      return this.fallbackRawBundle[name];
    }
    return {};
  }

  get(key) {
    if (this.dictionary[key] !== undefined && this.dictionary[key] !== '') {
      return this.dictionary[key];
    }
    if (this.fallbackDictionary[key] !== undefined && this.fallbackDictionary[key] !== '') {
      console.warn(`[i18n ZERO TOLERANCE] Chave "${key}" usando fallback no idioma "${this.currentLang}"`);
      return this.fallbackDictionary[key];
    }
    console.error(`[i18n ZERO TOLERANCE] Chave ausente: "${key}" no idioma "${this.currentLang}"`);
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

    // Sincroniza botões seletores de idioma
    document.querySelectorAll('[data-lang-code]').forEach(btn => {
      const code = btn.getAttribute('data-lang-code');
      const map = { 'PT': 'pt-BR', 'EN': 'en-US', 'ES': 'es-ES', 'FR': 'fr-FR', 'DE': 'de-DE', 'JP': 'ja-JP' };
      const isCurrent = map[code] === this.currentLang;
      btn.classList.toggle('is-active', isCurrent);
      btn.setAttribute('aria-pressed', isCurrent ? 'true' : 'false');
    });

    window.currentLangFormat = this.currentLang;

    // Dispara evento global para sincronização de componentes e dashboards
    window.dispatchEvent(new CustomEvent('languageChanged', {
      detail: {
        lang: this.currentLang,
        bundle: this.rawBundle
      }
    }));
  }

  async init() {
    const lang = this.detectInitialLanguage();
    await this.setLanguage(lang, false); // inicializa sem forçar redirecionamento
    this.bindEvents();
  }

  bindEvents() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-lang-code]');
      if (!btn) return;
      e.preventDefault();
      const code = btn.getAttribute('data-lang-code');
      const map = { 'PT': 'pt-BR', 'EN': 'en-US', 'ES': 'es-ES', 'FR': 'fr-FR', 'DE': 'de-DE', 'JP': 'ja-JP' };
      if (map[code]) {
        this.setLanguage(map[code], true);
      }
    });
  }
}

// Formatadores Globais Nativos com Sensibilidade Regional
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
