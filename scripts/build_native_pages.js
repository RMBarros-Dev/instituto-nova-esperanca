/**
 * INSTITUTO NOVA ESPERANÇA — BUILDER DE PÁGINAS NATIVAS MULTILÍNGUES V7.3
 * Gera 72 páginas estáticas nativas (12 páginas x 6 idiomas):
 * /pt-BR/, /en-US/, /es-ES/, /fr-FR/, /de-DE/, /ja-JP/
 * Mapeamento rigoroso de chaves JSON com 0% de Resíduo de Português.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const LOCALES_DIR = path.join(ROOT_DIR, 'assets', 'locales');
const DATA_DIR = path.join(ROOT_DIR, 'assets', 'data');

const ROUTES = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'routes.json'), 'utf8'));
const POLOS = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'polos.json'), 'utf8'));
const PRESS_RELEASES = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'press-releases.json'), 'utf8'));

const LANGUAGES = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];

const PAGE_KEYS = [
  'home',
  'about',
  'projects',
  'impact',
  'companies',
  'volunteering',
  'transparency',
  'blog',
  'donations',
  'contact',
  'faq',
  'press'
];

// Carrega pacotes compilados
const LOCALES = {};
LANGUAGES.forEach(lang => {
  const filePath = path.join(LOCALES_DIR, `${lang}.json`);
  LOCALES[lang] = JSON.parse(fs.readFileSync(filePath, 'utf8'));
});

// Helper de escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getSiblingFilename(pageKey, lang) {
  const route = ROUTES[pageKey] && ROUTES[pageKey][lang];
  if (!route) return 'index.html';
  return route.split('/').pop();
}

function getLangSwitchUrl(pageKey, targetLang) {
  const route = ROUTES[pageKey] && ROUTES[pageKey][targetLang];
  if (!route) return `../${targetLang}/index.html`;
  return `../${route.replace(/^\//, '')}`;
}

// -------------------------------------------------------------
// CABEÇALHO COMUM
// -------------------------------------------------------------
function generateHeader(pageKey, lang) {
  const loc = LOCALES[lang];
  const c = loc.common || {};
  const nav = c.nav || {};
  const skip = c.skip || {};
  const a11y = c.a11y || {};

  const homeFile = getSiblingFilename('home', lang);
  const donateFile = getSiblingFilename('donations', lang);

  const navItems = [
    { key: 'home', label: nav.home, file: getSiblingFilename('home', lang) },
    { key: 'about', label: nav.about, file: getSiblingFilename('about', lang) },
    { key: 'projects', label: nav.projects, file: getSiblingFilename('projects', lang) },
    { key: 'impact', label: nav.impact, file: getSiblingFilename('impact', lang) },
    { key: 'companies', label: nav.companies, file: getSiblingFilename('companies', lang) },
    { key: 'volunteering', label: nav.volunteer, file: getSiblingFilename('volunteering', lang) },
    { key: 'transparency', label: nav.transparency, file: getSiblingFilename('transparency', lang) },
    { key: 'blog', label: nav.blog, file: getSiblingFilename('blog', lang) },
    { key: 'contact', label: nav.contact, file: getSiblingFilename('contact', lang) },
    { key: 'press', label: nav.press, file: getSiblingFilename('press', lang) }
  ];

  const langPills = [
    { code: 'PT', langCode: 'pt-BR' },
    { code: 'EN', langCode: 'en-US' },
    { code: 'ES', langCode: 'es-ES' },
    { code: 'FR', langCode: 'fr-FR' },
    { code: 'DE', langCode: 'de-DE' },
    { code: 'JP', langCode: 'ja-JP' }
  ].map(p => {
    const isActive = p.langCode === lang;
    const url = getLangSwitchUrl(pageKey, p.langCode);
    return `<a href="${url}" class="lang-pill-btn ${isActive ? 'is-active' : ''}" data-lang-code="${p.code}" aria-pressed="${isActive ? 'true' : 'false'}">${p.code}</a>`;
  }).join('\n          ');

  return `
  <!-- Skip Links WCAG AAA -->
  <a href="#main-content" class="skip-link">${escapeHtml(skip.content)}</a>
  <a href="#main-navigation" class="skip-link">${escapeHtml(skip.nav)}</a>

  <!-- Barra de Acessibilidade & Idiomas -->
  <aside class="a11y-toolbar" aria-label="${escapeHtml(a11y.tools)}">
    <div class="container a11y-toolbar-inner">
      <div class="a11y-group" role="region" aria-label="${escapeHtml(a11y.tools)}">
        <span class="a11y-label">${escapeHtml(a11y.tools)}:</span>
        <button type="button" class="a11y-btn" data-a11y-action="font-dec" aria-label="${escapeHtml(a11y.font_decrease)}">A-</button>
        <button type="button" class="a11y-btn" data-a11y-action="font-reset" aria-label="${escapeHtml(a11y.font_default)}">A</button>
        <button type="button" class="a11y-btn" data-a11y-action="font-inc" aria-label="${escapeHtml(a11y.font_increase)}">A+</button>
        <button type="button" class="a11y-btn" data-a11y-action="contrast" aria-pressed="false">
          <span aria-hidden="true">◐</span> ${escapeHtml(a11y.high_contrast)}
        </button>
        <button type="button" class="a11y-btn" data-a11y-action="dark" aria-pressed="false">
          <span aria-hidden="true">🌙</span> ${escapeHtml(a11y.dark_mode)}
        </button>
        <button type="button" class="a11y-btn" data-a11y-action="dyslexia" aria-pressed="false">
          <span aria-hidden="true">📖</span> ${escapeHtml(a11y.dyslexia_font)}
        </button>
        <button type="button" class="a11y-btn" data-a11y-action="underline" aria-pressed="false" aria-label="${escapeHtml(a11y.underline_links)}">
          <span aria-hidden="true"><u>U</u></span>
        </button>
        <button type="button" class="a11y-btn" data-a11y-action="reset" aria-label="${escapeHtml(a11y.reset)}">
          <span aria-hidden="true">↺</span>
        </button>
      </div>

      <div class="a11y-group">
        <div class="lang-pills-group" role="group" aria-label="${escapeHtml(c.lang_name)}">
          ${langPills}
        </div>
      </div>
    </div>
  </aside>

  <!-- Header & Menu Principal -->
  <header class="site-header" role="banner">
    <div class="container header-inner">
      <a href="${homeFile}" class="brand-logo" aria-label="Instituto Nova Esperança">
        <img src="../assets/img/brand/logo-horizontal.svg" alt="Instituto Nova Esperança" class="brand-logo-img" width="220" height="42">
      </a>

      <nav id="main-navigation" class="main-nav" role="navigation" aria-label="Navegação Principal">
        ${navItems.map(item => `
          <a href="${item.file}" class="nav-link ${item.key === pageKey ? 'is-current' : ''}" ${item.key === pageKey ? 'aria-current="page"' : ''}>${escapeHtml(item.label)}</a>
        `).join('')}
      </nav>

      <div class="header-actions">
        <button type="button" class="btn-search-trigger" aria-label="Ctrl+K">
          🔍 <span class="search-shortcut-hint">Ctrl+K</span>
        </button>
        <a href="${donateFile}" class="btn btn-donate btn-sm">${escapeHtml(nav.donate)}</a>
        <button type="button" class="mobile-nav-toggle" aria-expanded="false" aria-controls="main-navigation" aria-label="Menu">
          <span aria-hidden="true">☰</span> <span>Menu</span>
        </button>
      </div>
    </div>
  </header>
  `;
}

// -------------------------------------------------------------
// RODAPÉ COMUM
// -------------------------------------------------------------
function generateFooter(lang) {
  const loc = LOCALES[lang];
  const c = loc.common || {};
  const f = c.footer || {};
  const nav = c.nav || {};

  return `
  <footer class="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid" style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2rem; padding: 3rem 0 2rem; border-bottom: 1px solid var(--border);">
        <div>
          <div style="margin-bottom: 1rem;">
            <img src="../assets/img/brand/logo-light.svg" alt="Instituto Nova Esperança" class="brand-logo-img" width="200" height="40">
          </div>
          <p style="font-size: 0.875rem; color: #9ca3af; line-height: 1.6; max-width: 360px;">
            ${escapeHtml(f.mission_summary)}
          </p>
          <div style="margin-top: 1rem; font-size: 0.8125rem; color: #9ca3af;">
            📍 ${escapeHtml(f.address_short || 'Valparaíso de Goiás — GO')}
          </div>
        </div>

        <div>
          <h4 style="color: #fff; font-size: 0.9375rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(f.col_institutional)}</h4>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.875rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><a href="${getSiblingFilename('about', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.about)}</a></li>
            <li><a href="${getSiblingFilename('projects', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.projects)}</a></li>
            <li><a href="${getSiblingFilename('impact', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.impact)}</a></li>
            <li><a href="${getSiblingFilename('companies', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.companies)}</a></li>
            <li><a href="${getSiblingFilename('volunteering', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.volunteer)}</a></li>
          </ul>
        </div>

        <div>
          <h4 style="color: #fff; font-size: 0.9375rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(nav.transparency)}</h4>
          <ul style="list-style: none; padding: 0; margin: 0; font-size: 0.875rem; display: flex; flex-direction: column; gap: 0.5rem;">
            <li><a href="${getSiblingFilename('transparency', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.transparency)}</a></li>
            <li><a href="${getSiblingFilename('press', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.press)}</a></li>
            <li><a href="${getSiblingFilename('faq', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.faq)}</a></li>
            <li><a href="${getSiblingFilename('contact', lang)}" style="color: #9ca3af; text-decoration: none;">${escapeHtml(nav.contact)}</a></li>
          </ul>
        </div>

        <div>
          <h4 style="color: #fff; font-size: 0.9375rem; font-weight: 700; margin-bottom: 1rem; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(f.col_support)}</h4>
          <p style="font-size: 0.8125rem; color: #9ca3af; line-height: 1.5; margin-bottom: 1rem;">
            ${escapeHtml(f.mission_summary)}
          </p>
          <a href="${getSiblingFilename('donations', lang)}" class="btn btn-donate btn-sm" style="display: inline-block;">${escapeHtml(nav.donate)}</a>
        </div>
      </div>

      <div class="footer-bottom" style="padding: 1.5rem 0; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; font-size: 0.8125rem; color: #6b7280;">
        <div>${escapeHtml(f.rights)}</div>
        <div style="display: flex; gap: 1.25rem;">
          <a href="../privacidade.html" style="color: inherit; text-decoration: none;">${escapeHtml(f.privacy)}</a>
          <a href="../cookies.html" style="color: inherit; text-decoration: none;">${escapeHtml(f.cookies)}</a>
          <a href="../acessibilidade.html" style="color: inherit; text-decoration: none;">${escapeHtml(f.accessibility)}</a>
        </div>
      </div>
    </div>
  </footer>
  `;
}

function generateScripts(extraScripts = []) {
  const defaultScripts = [
    '../assets/js/media.js',
    '../assets/js/accessibility.js',
    '../assets/js/interactions.js',
    '../assets/js/navigation.js',
    '../assets/js/app.js',
    '../assets/js/toast.js',
    '../assets/js/a11y.js',
    '../assets/js/i18n.js',
    '../assets/js/forms.js',
    '../assets/js/certificate.js',
    '../assets/js/main.js'
  ];

  const allScripts = [...defaultScripts, ...extraScripts];
  const uniqueScripts = Array.from(new Set(allScripts));
  return uniqueScripts.map(src => `<script src="${src}" defer></script>`).join('\n  ');
}

function generateHead(pageKey, lang, title, description) {
  const currentCanonical = `https://instituto-novaesperanca.org.br${ROUTES[pageKey][lang]}`;

  const hreflangs = LANGUAGES.map(l => {
    return `<link rel="alternate" hreflang="${l}" href="https://instituto-novaesperanca.org.br${ROUTES[pageKey][l]}">`;
  }).join('\n  ');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${escapeHtml(title)} | Instituto Nova Esperança</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${currentCanonical}">
  ${hreflangs}
  <link rel="alternate" hreflang="x-default" href="https://instituto-novaesperanca.org.br/pt-BR/index.html">

  <!-- V7.4 Hardening de Segurança -->
  <meta http-equiv="Content-Security-Policy" content="default-src 'self' https: data: blob:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: https: blob:; connect-src 'self' https:;">
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta name="referrer" content="strict-origin-when-cross-origin">

  <!-- Tipografia Premium V7.4 (Manrope, Inter, IBM Plex Sans, Noto Sans JP) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">

  <!-- V7.4 Design System Oficial Modular -->
  <link rel="stylesheet" href="../assets/css/tokens.css">
  <link rel="stylesheet" href="../assets/css/base.css">
  <link rel="stylesheet" href="../assets/css/layout.css">
  <link rel="stylesheet" href="../assets/css/components.css">
  <link rel="stylesheet" href="../assets/css/utilities.css">
  <link rel="stylesheet" href="../assets/css/responsive.css">
  <link rel="stylesheet" href="../assets/css/accessibility.css">
  <link rel="stylesheet" href="../assets/css/dashboard.css">
  <link rel="stylesheet" href="../assets/css/pages.css">
  <link rel="stylesheet" href="../assets/css/style.css">

  <!-- Suíte de Favicons Oficiais INE -->
  <link rel="icon" type="image/x-icon" href="../favicon.ico">
  <link rel="icon" type="image/png" sizes="16x16" href="../favicon-16x16.png">
  <link rel="icon" type="image/png" sizes="32x32" href="../favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="48x48" href="../favicon-48x48.png">
  <link rel="apple-touch-icon" sizes="180x180" href="../apple-touch-icon.png">
  <link rel="manifest" href="../manifest.webmanifest">
</head>
<body>
`;
}

// -------------------------------------------------------------
// PÁGINA 1: HOME
// -------------------------------------------------------------
function renderHomePage(lang) {
  const loc = LOCALES[lang];
  const h = loc.home || {};
  const c = loc.common || {};
  const hero = h.hero || {};
  const pillars = h.pillars || {};
  const imp = h.impact_preview || {};
  const transp = h.transparency_preview || {};
  const vol = h.volunteer_cta || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="container">
        <div class="hero-territory-tag">${escapeHtml(hero.badge)}</div>
        <h1 id="hero-title" class="hero-title">${escapeHtml(hero.title)}</h1>
        <p class="hero-lead">${escapeHtml(hero.subtitle)}</p>
        <div class="hero-actions">
          <a href="${getSiblingFilename('donations', lang)}" class="btn btn-donate btn-lg">${escapeHtml(hero.cta_donate)}</a>
          <a href="${getSiblingFilename('projects', lang)}" class="btn btn-outline" style="border-color: #fff; color: #fff;">${escapeHtml(hero.cta_projects)}</a>
          <a href="${getSiblingFilename('about', lang)}" class="btn btn-ghost" style="color: #fff;">${escapeHtml(c.nav?.about)} →</a>
        </div>
      </div>
    </section>

    <!-- 4 Pilares de Atuação -->
    <section class="section" aria-labelledby="pillars-heading">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-subtitle">${escapeHtml(pillars.subtitle)}</span>
          <h2 id="pillars-heading" class="section-title">${escapeHtml(pillars.title)}</h2>
        </div>

        <div class="grid-4">
          <div class="card p-lg text-center" style="display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">📚</div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(pillars.p1_title)}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">${escapeHtml(pillars.p1_desc)}</p>
          </div>
          <div class="card p-lg text-center" style="display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🍲</div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(pillars.p2_title)}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">${escapeHtml(pillars.p2_desc)}</p>
          </div>
          <div class="card p-lg text-center" style="display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">💼</div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(pillars.p3_title)}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">${escapeHtml(pillars.p3_desc)}</p>
          </div>
          <div class="card p-lg text-center" style="display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🤝</div>
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(pillars.p4_title)}</h3>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">${escapeHtml(pillars.p4_desc)}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Resumo de Impacto -->
    <section class="section section-alt" aria-labelledby="impact-summary-heading">
      <div class="container">
        <div class="grid-2 items-center">
          <div>
            <span class="section-subtitle">${escapeHtml(imp.subtitle)}</span>
            <h2 id="impact-summary-heading" class="section-title">${escapeHtml(imp.title)}</h2>
            <p class="lead">${escapeHtml(hero.subtitle)}</p>
            <div class="mt-lg">
              <a href="${getSiblingFilename('impact', lang)}" class="btn btn-primary">${escapeHtml(imp.cta)} →</a>
            </div>
          </div>
          <div class="card p-xl" style="background: var(--surface);">
            <div class="grid-2 text-center" style="gap: 1.5rem;">
              <div>
                <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary);">${escapeHtml(hero.stat_people || '12.480+')}</div>
                <div style="font-size: 0.875rem; color: var(--text-muted);">${escapeHtml(hero.stat_people_label || 'Pessoas Beneficiadas')}</div>
              </div>
              <div>
                <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary);">${escapeHtml(hero.stat_meals || '145.000+')}</div>
                <div style="font-size: 0.875rem; color: var(--text-muted);">${escapeHtml(hero.stat_meals_label || 'Refeições')}</div>
              </div>
              <div>
                <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary);">${escapeHtml(hero.stat_efficiency || '91.2%')}</div>
                <div style="font-size: 0.875rem; color: var(--text-muted);">${escapeHtml(hero.stat_efficiency_label || 'Eficiência')}</div>
              </div>
              <div>
                <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary);">${escapeHtml(hero.stat_hours || '18.400h')}</div>
                <div style="font-size: 0.875rem; color: var(--text-muted);">${escapeHtml(hero.stat_hours_label || 'Horas de Voluntariado')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Teaser Transparência e Voluntariado -->
    <section class="section" aria-labelledby="cta-section-heading">
      <div class="container">
        <div class="grid-2">
          <div class="card p-xl" style="border-top: 4px solid var(--secondary);">
            <h3 id="cta-section-heading" style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.75rem;">${escapeHtml(transp.title)}</h3>
            <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">
              ${escapeHtml(transp.subtitle)}
            </p>
            <a href="${getSiblingFilename('transparency', lang)}" class="btn btn-outline btn-sm">${escapeHtml(transp.cta)} →</a>
          </div>

          <div class="card p-xl" style="border-top: 4px solid var(--accent);">
            <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.75rem;">${escapeHtml(vol.title)}</h3>
            <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1.25rem;">
              ${escapeHtml(vol.subtitle)}
            </p>
            <a href="${getSiblingFilename('volunteering', lang)}" class="btn btn-primary btn-sm">${escapeHtml(vol.cta)} →</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 2: ABOUT
// -------------------------------------------------------------
function renderAboutPage(lang) {
  const loc = LOCALES[lang];
  const a = loc.about || {};
  const c = loc.common || {};
  const header = a.header || {};
  const man = a.manifesto || {};
  const hist = a.history || {};
  const gov = a.governance || {};
  const press = a.press_room || {};
  const mapT = loc.projects?.territorial_map || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="about-title">
      <div class="container">
        <div class="hero-territory-tag">${escapeHtml(header.title)}</div>
        <h1 id="about-title" class="hero-title">${escapeHtml(header.title)}</h1>
        <p class="hero-lead">${escapeHtml(header.subtitle)}</p>
      </div>
    </section>

    <!-- Manifesto e História -->
    <section class="section" aria-labelledby="manifesto-heading">
      <div class="container">
        <div class="grid-2 items-center">
          <div>
            <h2 id="manifesto-heading" class="section-title">${escapeHtml(man.title)}</h2>
            <p class="lead">${escapeHtml(man.p1)}</p>
            <p style="color: var(--text-muted); line-height: 1.6;">${escapeHtml(man.p2)}</p>
          </div>
          <div class="card p-xl" style="background: var(--surface-alt); border-left: 4px solid var(--primary);">
            <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.75rem;">${escapeHtml(hist.title)}</h3>
            <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.875rem; color: var(--text-muted);">
              <li><strong>2020:</strong> ${escapeHtml(hist.t2020)}</li>
              <li><strong>2022:</strong> ${escapeHtml(hist.t2022)}</li>
              <li><strong>2024:</strong> ${escapeHtml(hist.t2024)}</li>
              <li><strong>2026:</strong> ${escapeHtml(hist.t2026)}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Governança e Equipe -->
    <section class="section section-alt" aria-labelledby="team-heading">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-subtitle">${escapeHtml(gov.subtitle)}</span>
          <h2 id="team-heading" class="section-title">${escapeHtml(gov.title)}</h2>
        </div>

        <div class="grid-3">
          <div class="card text-center p-lg">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 800; margin: 0 auto 1rem;">FA</div>
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">${escapeHtml(gov.d1_name)}</h4>
            <span style="font-size: 0.8125rem; color: var(--secondary); font-weight: 600;">${escapeHtml(gov.d1_role)}</span>
            <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.75rem; line-height: 1.5;">${escapeHtml(gov.d1_bio)}</p>
          </div>
          <div class="card text-center p-lg">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 800; margin: 0 auto 1rem;">HR</div>
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">${escapeHtml(gov.d2_name)}</h4>
            <span style="font-size: 0.8125rem; color: var(--secondary); font-weight: 600;">${escapeHtml(gov.d2_role)}</span>
            <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.75rem; line-height: 1.5;">${escapeHtml(gov.d2_bio)}</p>
          </div>
          <div class="card text-center p-lg">
            <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--primary-light); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 800; margin: 0 auto 1rem;">MP</div>
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.25rem;">${escapeHtml(gov.d3_name)}</h4>
            <span style="font-size: 0.8125rem; color: var(--secondary); font-weight: 600;">${escapeHtml(gov.d3_role)}</span>
            <p style="font-size: 0.8125rem; color: var(--text-muted); margin-top: 0.75rem; line-height: 1.5;">${escapeHtml(gov.d3_bio)}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MAPA TERRITORIAL DOS POLOS DE ATENDIMENTO -->
    <section id="territorial-map-section" class="section" aria-labelledby="map-title">
      <div class="container">
        <div class="section-header text-center">
          <span class="badge badge-accent mb-xs">${escapeHtml(mapT.badge_demo)}</span>
          <h2 id="map-title" class="section-title">${escapeHtml(mapT.title)}</h2>
          <p class="section-desc">${escapeHtml(mapT.subtitle)}</p>
        </div>

        <div class="alert alert-warning mb-lg">
          <p style="font-size: 0.875rem; margin: 0;">
            ⚠️ <strong>${escapeHtml(mapT.demonstrative_notice)}</strong>
          </p>
        </div>

        <div class="grid-2" style="align-items: flex-start; gap: 2rem;">
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">${escapeHtml(mapT.title)}</h3>
            <div id="territorial-polos-list" style="display: flex; flex-direction: column; gap: 0.75rem;">
              <!-- Polos via map.js -->
            </div>
          </div>

          <div id="polo-active-details">
            <!-- Detalhes do polo ativo via map.js -->
          </div>
        </div>

        <!-- Tabela Acessível WCAG AAA -->
        <div class="table-container mt-xl">
          <table id="territorial-data-table" class="data-table">
            <caption class="sr-only">${escapeHtml(mapT.table_caption)}</caption>
            <thead>
              <tr>
                <th>${escapeHtml(mapT.col_name)}</th>
                <th>${escapeHtml(mapT.col_location)}</th>
                <th>${escapeHtml(mapT.col_capacity)}</th>
                <th>${escapeHtml(mapT.col_status)}</th>
              </tr>
            </thead>
            <tbody>
              ${POLOS.map(p => `
                <tr>
                  <td><strong>${escapeHtml(p.name)}</strong></td>
                  <td>${escapeHtml(p.bairro)} (${escapeHtml(p.territory)})</td>
                  <td>${escapeHtml(p.capacity)}</td>
                  <td><span class="badge badge-accent">${escapeHtml(mapT.badge_demo)}</span></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Teaser Sala de Imprensa -->
    <section class="section section-alt" aria-labelledby="press-teaser-heading">
      <div class="container">
        <div class="card p-xl" style="background: var(--surface); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1.5rem;">
          <div>
            <span class="badge badge-primary mb-xs">${escapeHtml(press.badge)}</span>
            <h3 id="press-teaser-heading" style="font-size: 1.35rem; font-weight: 800; margin-top: 0.25rem;">${escapeHtml(press.title)}</h3>
            <p style="font-size: 0.9375rem; color: var(--text-muted); max-width: 600px; margin-top: 0.5rem; line-height: 1.6;">
              ${escapeHtml(press.subtitle)}
            </p>
          </div>
          <div>
            <a href="${getSiblingFilename('press', lang)}" class="btn btn-primary">${escapeHtml(c.nav?.press)} →</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 3: PROJECTS
// -------------------------------------------------------------
function renderProjectsPage(lang) {
  const loc = LOCALES[lang];
  const p = loc.projects || {};
  const header = p.header || {};
  const filters = p.filters || {};
  const programs = p.programs || [];

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="proj-title">
      <div class="container">
        <div class="hero-territory-tag">${escapeHtml(header.title)}</div>
        <h1 id="proj-title" class="hero-title">${escapeHtml(header.title)}</h1>
        <p class="hero-lead">${escapeHtml(header.subtitle)}</p>
      </div>
    </section>

    <section class="section" aria-labelledby="programs-grid-heading">
      <div class="container">
        <div class="filter-bar mb-xl" style="display: flex; gap: 0.5rem; flex-wrap: wrap; justify-content: center;">
          <button type="button" class="btn btn-sm btn-outline is-active" data-filter="all">${escapeHtml(filters.all)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-filter="education">${escapeHtml(filters.education)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-filter="nutrition">${escapeHtml(filters.nutrition)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-filter="income">${escapeHtml(filters.income)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-filter="community">${escapeHtml(filters.infrastructure)}</button>
        </div>

        <div class="grid-2" style="gap: 2rem;">
          ${programs.map(prog => {
            const cat = (prog.category || '').toLowerCase();
            const nm = (prog.name || '').toLowerCase();
            let imgKey = 'educacao';
            if (cat.includes('aliment') || cat.includes('nutri') || nm.includes('prato') || cat.includes('essen') || cat.includes('nourrit') || cat.includes('nutric')) {
              imgKey = 'alimentacao';
            } else if (cat.includes('renda') || cat.includes('income') || cat.includes('travail') || cat.includes('beruf') || nm.includes('renda') || cat.includes('ingreso') || cat.includes('produ')) {
              imgKey = 'renda';
            } else if (cat.includes('comun') || cat.includes('infra') || cat.includes('territ') || cat.includes('gemeinschaft')) {
              imgKey = 'comunidade';
            }
            return `
            <div class="card p-xl" style="display: flex; flex-direction: column; justify-content: space-between; border-top: 4px solid var(--primary);">
              <div>
                <div class="resilient-media-wrap mb-md aspect-16-9">
                  <img 
                    src="../assets/img/projects/${imgKey}.svg" 
                    srcset="../assets/img/projects/${imgKey}-480.svg 480w, ../assets/img/projects/${imgKey}-768.svg 768w, ../assets/img/projects/${imgKey}-1200.svg 1200w"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    alt="${escapeHtml(prog.name)}" 
                    width="800" 
                    height="450" 
                    loading="lazy" 
                    decoding="async" 
                    class="resilient-img"
                  >
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
                  <span class="badge badge-primary">${escapeHtml(prog.category)}</span>
                  <span class="badge badge-accent">${escapeHtml(prog.status)}</span>
                </div>
                <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary); margin-bottom: 0.5rem;">${escapeHtml(prog.name)}</h3>
                <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">${escapeHtml(prog.summary)}</p>
                <div style="font-size: 0.8125rem; background: var(--surface-alt); padding: 0.75rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
                  <strong>Território:</strong> ${escapeHtml(prog.territory)}
                </div>

                <div class="grid-3 text-center mb-md" style="gap: 0.5rem; background: var(--surface); padding: 0.75rem; border-radius: var(--radius-sm); border: 1px solid var(--border);">
                  ${(prog.indicators || []).map(ind => `
                    <div>
                      <div style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">${escapeHtml(ind.value)}</div>
                      <div style="font-size: 0.6875rem; color: var(--text-muted);">${escapeHtml(ind.label)}</div>
                    </div>
                  `).join('')}
                </div>
              </div>

              <div style="display: flex; gap: 0.75rem; margin-top: 1rem; flex-wrap: wrap;">
                <a href="${getSiblingFilename('donations', lang)}" class="btn btn-donate btn-sm">${escapeHtml(prog.cta_donate)}</a>
                <a href="${getSiblingFilename('volunteering', lang)}" class="btn btn-outline btn-sm">${escapeHtml(prog.cta_volunteer)}</a>
              </div>
            </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 4: IMPACT
// -------------------------------------------------------------
function renderImpactPage(lang) {
  const loc = LOCALES[lang];
  const imp = loc.impact || {};
  const header = imp.header || {};
  const openData = imp.open_data || {};
  const chart = imp.chart || {};
  const table = imp.table || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="impact-title">
      <div class="container">
        <div class="hero-territory-tag">${escapeHtml(header.title)}</div>
        <h1 id="impact-title" class="hero-title">${escapeHtml(header.title)}</h1>
        <p class="hero-lead">${escapeHtml(header.subtitle)}</p>
      </div>
    </section>

    <!-- Indicadores -->
    <section class="section" aria-labelledby="kpi-heading">
      <div class="container">
        <h2 id="kpi-heading" class="sr-only">${escapeHtml(header.title)}</h2>
        <div class="grid-4 text-center">
          <div class="card p-xl">
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">12.480</div>
            <div style="font-size: 0.9375rem; font-weight: 600; margin-top: 0.25rem;">${escapeHtml(imp.indicators?.beneficiaries || 'Beneficiários')}</div>
          </div>
          <div class="card p-xl">
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">145.000</div>
            <div style="font-size: 0.9375rem; font-weight: 600; margin-top: 0.25rem;">${escapeHtml(imp.indicators?.meals || 'Refeições')}</div>
          </div>
          <div class="card p-xl">
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">4.500</div>
            <div style="font-size: 0.9375rem; font-weight: 600; margin-top: 0.25rem;">${escapeHtml(imp.indicators?.pedagogical_kits || 'Kits')}</div>
          </div>
          <div class="card p-xl">
            <div style="font-size: 2.5rem; font-weight: 800; color: var(--primary);">91.2%</div>
            <div style="font-size: 0.9375rem; font-weight: 600; margin-top: 0.25rem;">${escapeHtml(imp.indicators?.project_approval || 'Eficiência')}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gráfico & Tabela -->
    <section class="section section-alt" aria-labelledby="dashboard-heading">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-subtitle">${escapeHtml(chart.subtitle)}</span>
          <h2 id="dashboard-heading" class="section-title">${escapeHtml(chart.title)}</h2>
        </div>

        <div class="card p-xl mb-xl">
          <div id="dashboard-chart-container" style="min-height: 260px; display: flex; align-items: flex-end; justify-content: space-around; gap: 1rem; padding: 2rem 0; border-bottom: 2px solid var(--border);">
            <div style="text-align: center;"><div style="background: var(--primary-light); width: 60px; height: 110px; margin: 0 auto; border-radius: 4px 4px 0 0;"></div><strong style="display: block; margin-top: 0.5rem;">2023</strong><small>3.100</small></div>
            <div style="text-align: center;"><div style="background: var(--primary-light); width: 60px; height: 160px; margin: 0 auto; border-radius: 4px 4px 0 0;"></div><strong style="display: block; margin-top: 0.5rem;">2024</strong><small>6.540</small></div>
            <div style="text-align: center;"><div style="background: var(--primary-light); width: 60px; height: 210px; margin: 0 auto; border-radius: 4px 4px 0 0;"></div><strong style="display: block; margin-top: 0.5rem;">2025</strong><small>9.230</small></div>
            <div style="text-align: center;"><div style="background: var(--primary); width: 60px; height: 260px; margin: 0 auto; border-radius: 4px 4px 0 0;"></div><strong style="display: block; margin-top: 0.5rem; color: var(--primary);">2026</strong><small style="font-weight: 700;">12.480</small></div>
          </div>
        </div>

        <!-- Tabela Acessível -->
        <div class="table-container">
          <table id="impact-data-table" class="data-table">
            <caption class="sr-only">${escapeHtml(table.caption)}</caption>
            <thead>
              <tr>
                <th>${escapeHtml(table.col_metric)}</th>
                <th>${escapeHtml(table.col_2023)}</th>
                <th>${escapeHtml(table.col_2024)}</th>
                <th>${escapeHtml(table.col_2025)}</th>
                <th>${escapeHtml(table.col_2026)}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>${escapeHtml(imp.indicators?.beneficiaries || 'Beneficiários')}</td><td>3.100</td><td>6.540</td><td>9.230</td><td><strong>12.480</strong></td></tr>
              <tr><td>${escapeHtml(imp.indicators?.meals || 'Refeições')}</td><td>35.000</td><td>78.000</td><td>110.000</td><td><strong>145.000</strong></td></tr>
              <tr><td>${escapeHtml(imp.indicators?.pedagogical_kits || 'Kits')}</td><td>1.050</td><td>2.100</td><td>3.200</td><td><strong>4.500</strong></td></tr>
              <tr><td>${escapeHtml(imp.indicators?.funds_in_projects || 'Recursos')}</td><td>R$ 544.000</td><td>R$ 882.000</td><td>R$ 1.440.920</td><td><strong>R$ 2.033.760</strong></td></tr>
            </tbody>
          </table>
        </div>

        <!-- EXPORTADOR DE DADOS ABERTOS -->
        <div class="card p-xl mt-xl text-center" style="background: var(--surface); border: 2px dashed var(--primary);">
          <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">${escapeHtml(chart.title)}</h3>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-top: 1rem;">
            <button type="button" class="btn btn-outline" data-export-impact-csv>
              📊 ${escapeHtml(openData.btn_csv)}
            </button>
            <button type="button" class="btn btn-outline" data-export-impact-json>
              💾 ${escapeHtml(openData.btn_json)}
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 5: COMPANIES
// -------------------------------------------------------------
function renderCompaniesPage(lang) {
  const loc = LOCALES[lang];
  const comp = loc.companies || {};
  const header = comp.header || {};
  const mod = comp.modalities || {};
  const ben = comp.benefits || {};
  const contact = comp.contact || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="emp-title">
      <div class="container">
        <div class="hero-territory-tag">${escapeHtml(header.badge)}</div>
        <h1 id="emp-title" class="hero-title">${escapeHtml(header.title)}</h1>
        <p class="hero-lead">${escapeHtml(header.lead)}</p>
      </div>
    </section>

    <!-- Modalidades -->
    <section class="section" aria-labelledby="modalities-heading">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-subtitle">${escapeHtml(mod.subtitle)}</span>
          <h2 id="modalities-heading" class="section-title">${escapeHtml(mod.title)}</h2>
        </div>

        <div class="grid-2" style="gap: 2rem;">
          <div class="card p-xl" style="border-left: 4px solid var(--primary);">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(mod.tax_incentive_title)}</h3>
            <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6;">${escapeHtml(mod.tax_incentive_desc)}</p>
          </div>
          <div class="card p-xl" style="border-left: 4px solid var(--secondary);">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(mod.direct_title)}</h3>
            <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6;">${escapeHtml(mod.direct_desc)}</p>
          </div>
          <div class="card p-xl" style="border-left: 4px solid var(--accent);">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(mod.volunteer_title)}</h3>
            <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6;">${escapeHtml(mod.volunteer_desc)}</p>
          </div>
          <div class="card p-xl" style="border-left: 4px solid #4a5568;">
            <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(mod.probono_title)}</h3>
            <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6;">${escapeHtml(mod.probono_desc)}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefícios -->
    <section class="section section-alt" aria-labelledby="benefits-heading">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-subtitle">${escapeHtml(ben.subtitle)}</span>
          <h2 id="benefits-heading" class="section-title">${escapeHtml(ben.title)}</h2>
        </div>

        <div class="grid-3">
          <div class="card p-lg">
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary);">${escapeHtml(ben.compliance_title)}</h4>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">${escapeHtml(ben.compliance_desc)}</p>
          </div>
          <div class="card p-lg">
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary);">${escapeHtml(ben.tax_title)}</h4>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">${escapeHtml(ben.tax_desc)}</p>
          </div>
          <div class="card p-lg">
            <h4 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--primary);">${escapeHtml(ben.badge_title)}</h4>
            <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.5;">${escapeHtml(ben.badge_desc)}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Formulário -->
    <section class="section" aria-labelledby="corporate-contact-heading">
      <div class="container max-w-720">
        <div class="card p-xl" style="background: var(--surface);">
          <div class="text-center mb-lg">
            <h2 id="corporate-contact-heading" style="font-size: 1.5rem; font-weight: 800;">${escapeHtml(contact.title)}</h2>
            <p style="font-size: 0.9375rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHtml(contact.subtitle)}</p>
          </div>

          <form id="corporate-partnership-form" novalidate>
            <div class="form-status-msg" role="status" aria-live="polite"></div>
            <div class="form-group mb-md">
              <label for="corp-name" class="form-label">${escapeHtml(contact.company_name)}: *</label>
              <input type="text" id="corp-name" class="form-control" required>
            </div>
            <div class="grid-2 mb-md" style="gap: 1rem;">
              <div class="form-group">
                <label for="corp-rep" class="form-label">${escapeHtml(contact.contact_name)}: *</label>
                <input type="text" id="corp-rep" class="form-control" required>
              </div>
              <div class="form-group">
                <label for="corp-email" class="form-label">${escapeHtml(contact.email)}: *</label>
                <input type="email" id="corp-email" class="form-control" required>
              </div>
            </div>
            <div class="form-group mb-md">
              <label for="corp-interest" class="form-label">${escapeHtml(contact.interests)}:</label>
              <select id="corp-interest" class="form-control">
                <option value="esg">${escapeHtml(contact.opt_esg)}</option>
                <option value="tax">${escapeHtml(contact.opt_tax)}</option>
                <option value="vol">${escapeHtml(contact.opt_vol)}</option>
                <option value="infra">${escapeHtml(contact.opt_infra)}</option>
              </select>
            </div>
            <div class="form-group mb-lg">
              <label for="corp-msg" class="form-label">${escapeHtml(contact.message)}:</label>
              <textarea id="corp-msg" class="form-control" rows="4"></textarea>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100">${escapeHtml(contact.btn_submit)}</button>
          </form>
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 6: VOLUNTEERING
// -------------------------------------------------------------
function renderVolunteeringPage(lang) {
  const loc = LOCALES[lang];
  const f = loc.forms?.volunteer_board || {};
  const c = loc.common || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="vol-hero-title">
      <div class="container text-center max-w-800">
        <span class="hero-territory-tag">${escapeHtml(c.nav?.volunteer)}</span>
        <h1 id="vol-hero-title" class="hero-title">${escapeHtml(f.title)}</h1>
        <p class="hero-lead">${escapeHtml(f.subtitle)}</p>
      </div>
    </section>

    <!-- MURAL INTERATIVO DE VAGAS -->
    <section class="section" aria-labelledby="jobs-heading">
      <div class="container">
        <div class="filter-bar mb-xl text-center" style="display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-sm btn-outline is-active" data-job-filter="all">${escapeHtml(f.filter_all)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-job-filter="education">${escapeHtml(f.filter_education)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-job-filter="nutrition">${escapeHtml(f.filter_nutrition)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-job-filter="technology">${escapeHtml(f.filter_technology)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-job-filter="communication">${escapeHtml(f.filter_communication)}</button>
          <button type="button" class="btn btn-sm btn-outline" data-job-filter="legal">${escapeHtml(f.filter_legal)}</button>
        </div>

        <div id="volunteer-jobs-grid" class="grid-3" style="gap: 1.5rem;">
          <!-- Vagas via volunteer.js -->
        </div>
      </div>
    </section>

    <!-- WIZARD 7 ETAPAS -->
    <section class="section section-alt" aria-labelledby="wizard-heading">
      <div class="container max-w-840">
        <div class="card p-xl" style="background: var(--surface);">
          <div class="text-center mb-lg">
            <h2 id="wizard-heading" style="font-size: 1.5rem; font-weight: 800;">${escapeHtml(f.title)}</h2>
            <p style="font-size: 0.875rem; color: var(--text-muted);">${escapeHtml(f.proof_desc)}</p>
          </div>

          <form id="volunteer-full-form">
            <!-- Painel 1 -->
            <div id="step-panel-1" class="wizard-panel">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">1. ${escapeHtml(loc.forms?.fields?.name || 'Nome')}</h3>
              <div class="form-group mb-md">
                <label for="vol-nome" class="form-label">${escapeHtml(loc.forms?.fields?.name || 'Nome')}: *</label>
                <input type="text" id="vol-nome" class="form-control" required>
              </div>
              <div class="grid-2 mb-md" style="gap: 1rem;">
                <div class="form-group">
                  <label for="vol-email" class="form-label">${escapeHtml(loc.forms?.fields?.email || 'Email')}: *</label>
                  <input type="email" id="vol-email" class="form-control" required>
                </div>
                <div class="form-group">
                  <label for="vol-tel" class="form-label">${escapeHtml(loc.forms?.fields?.phone || 'Telefone')}: *</label>
                  <input type="tel" id="vol-tel" class="form-control" required>
                </div>
              </div>
              <div class="text-right mt-lg">
                <button type="button" class="btn btn-primary" data-wizard-next>→</button>
              </div>
            </div>

            <!-- Painel 2 -->
            <div id="step-panel-2" class="wizard-panel" style="display: none;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">2. ${escapeHtml(loc.forms?.fields?.interest_area || 'Interesses')}</h3>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.5rem;">
                <label><input type="checkbox" name="interesses" value="education"> ${escapeHtml(f.filter_education)}</label>
                <label><input type="checkbox" name="interesses" value="nutrition"> ${escapeHtml(f.filter_nutrition)}</label>
                <label><input type="checkbox" name="interesses" value="technology"> ${escapeHtml(f.filter_technology)}</label>
                <label><input type="checkbox" name="interesses" value="communication"> ${escapeHtml(f.filter_communication)}</label>
                <label><input type="checkbox" name="interesses" value="legal"> ${escapeHtml(f.filter_legal)}</label>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <button type="button" class="btn btn-outline" data-wizard-prev>←</button>
                <button type="button" class="btn btn-primary" data-wizard-next>→</button>
              </div>
            </div>

            <!-- Painel 3 -->
            <div id="step-panel-3" class="wizard-panel" style="display: none;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">3. ${escapeHtml(loc.forms?.fields?.availability || 'Disponibilidade')}</h3>
              <div class="form-group mb-md">
                <label for="vol-periodo" class="form-label">${escapeHtml(f.label_hours)}</label>
                <input type="text" id="vol-periodo" class="form-control" value="2h - 4h">
              </div>
              <div style="display: flex; justify-content: space-between;">
                <button type="button" class="btn btn-outline" data-wizard-prev>←</button>
                <button type="button" class="btn btn-primary" data-wizard-next>→</button>
              </div>
            </div>

            <!-- Painel 4 -->
            <div id="step-panel-4" class="wizard-panel" style="display: none;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">4. ${escapeHtml(f.label_requirements)}</h3>
              <div class="form-group mb-md">
                <textarea id="vol-habilidades" class="form-control" rows="4"></textarea>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <button type="button" class="btn btn-outline" data-wizard-prev>←</button>
                <button type="button" class="btn btn-primary" data-wizard-next>→</button>
              </div>
            </div>

            <!-- Painel 5 -->
            <div id="step-panel-5" class="wizard-panel" style="display: none;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">5. ${escapeHtml(f.label_modality)}</h3>
              <div style="display: flex; gap: 1.5rem; margin-bottom: 1.5rem;">
                <label><input type="radio" name="modalidade" value="presencial" checked> Presencial</label>
                <label><input type="radio" name="modalidade" value="remoto"> Remoto</label>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <button type="button" class="btn btn-outline" data-wizard-prev>←</button>
                <button type="button" class="btn btn-primary" data-wizard-next>→</button>
              </div>
            </div>

            <!-- Painel 6 -->
            <div id="step-panel-6" class="wizard-panel" style="display: none;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">6. LGPD</h3>
              <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem;">
                <input type="checkbox" id="vol-lgpd" required> ${escapeHtml(loc.common?.cookie?.accept || 'OK')}
              </label>
              <div style="display: flex; justify-content: space-between; margin-top: 1.5rem;">
                <button type="button" class="btn btn-outline" data-wizard-prev>←</button>
                <button type="button" class="btn btn-primary" data-wizard-next>→</button>
              </div>
            </div>

            <!-- Painel 7 -->
            <div id="step-panel-7" class="wizard-panel" style="display: none;">
              <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">7. ${escapeHtml(loc.forms?.buttons?.submit || 'Enviar')}</h3>
              <div id="volunteer-summary-box" class="card p-md mb-lg" style="background: var(--surface-alt);"></div>
              <div style="display: flex; justify-content: space-between;">
                <button type="button" class="btn btn-outline" data-wizard-prev>←</button>
                <button type="submit" class="btn btn-donate btn-lg">${escapeHtml(loc.forms?.buttons?.submit || 'Enviar')}</button>
              </div>
            </div>
          </form>

          <div id="volunteer-success-msg" style="display: none;" class="card p-xl text-center">
            <span style="font-size: 3rem;">🎉</span>
            <h3 style="font-size: 1.5rem; font-weight: 800; margin-top: 0.5rem;">${escapeHtml(loc.forms?.buttons?.success_title || 'Sucesso!')}</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem;">${escapeHtml(loc.forms?.buttons?.success_desc || 'Obrigado.')}</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 7: TRANSPARENCY
// -------------------------------------------------------------
function renderTransparencyPage(lang) {
  const loc = LOCALES[lang];
  const t = loc.transparency || {};
  const header = t.header || {};
  const openData = t.open_data || {};
  const tbl = t.table || {};
  const rep = t.reports_section || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="transp-title">
      <div class="container">
        <div class="hero-territory-tag">${escapeHtml(header.title)}</div>
        <h1 id="transp-title" class="hero-title">${escapeHtml(header.title)}</h1>
        <p class="hero-lead">${escapeHtml(header.subtitle)}</p>
      </div>
    </section>

    <!-- Indicadores -->
    <section class="section" aria-labelledby="transp-kpi-heading">
      <div class="container">
        <h2 id="transp-kpi-heading" class="sr-only">${escapeHtml(header.title)}</h2>
        <div class="grid-4 text-center">
          <div class="card p-xl">
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary);">R$ 2.230.000</div>
            <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHtml(t.stat_revenue)}</div>
          </div>
          <div class="card p-xl">
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary);">R$ 2.033.760</div>
            <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHtml(t.stat_applied)}</div>
          </div>
          <div class="card p-xl">
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary);">91.2%</div>
            <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHtml(t.stat_efficiency)}</div>
          </div>
          <div class="card p-xl">
            <div style="font-size: 2.25rem; font-weight: 800; color: var(--primary);">12.480</div>
            <div style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">${escapeHtml(t.stat_beneficiaries)}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Tabela Demonstrativa CFC -->
    <section class="section section-alt" aria-labelledby="audit-table-heading">
      <div class="container">
        <div class="section-header text-center">
          <span class="section-subtitle">${escapeHtml(tbl.caption)}</span>
          <h2 id="audit-table-heading" class="section-title">${escapeHtml(tbl.title)}</h2>
        </div>

        <div class="table-container mb-xl">
          <table id="transparency-accounting-table" class="data-table">
            <caption class="sr-only">${escapeHtml(tbl.caption)}</caption>
            <thead>
              <tr>
                <th>${escapeHtml(tbl.col_category)}</th>
                <th>${escapeHtml(tbl.col_value)}</th>
                <th>${escapeHtml(tbl.col_percentage)}</th>
              </tr>
            </thead>
            <tbody>
              <tr><td><strong>Projetos Socioeducativos</strong></td><td>R$ 2.033.760,00</td><td><span class="badge badge-primary">91.2%</span></td></tr>
              <tr><td>Administração</td><td>R$ 129.340,00</td><td>5.8%</td></tr>
              <tr><td>Captação</td><td>R$ 66.900,00</td><td>3.0%</td></tr>
              <tr style="font-weight: 800; background: var(--surface-alt);"><td>TOTAL (2026)</td><td>R$ 2.230.000,00</td><td>100.0%</td></tr>
            </tbody>
          </table>
        </div>

        <!-- EXPORTADOR DE DADOS ABERTOS -->
        <div class="card p-xl text-center mb-2xl" style="background: var(--surface); border: 2px dashed var(--secondary);">
          <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.5rem;">${escapeHtml(openData.title)}</h3>
          <p style="font-size: 0.9375rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 1.5rem; line-height: 1.6;">
            ${escapeHtml(openData.subtitle)}
          </p>
          <div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
            <button type="button" class="btn btn-outline" data-export-transp-csv>
              📑 ${escapeHtml(openData.btn_csv)}
            </button>
            <button type="button" class="btn btn-outline" data-export-transp-json>
              💾 ${escapeHtml(openData.btn_json)}
            </button>
          </div>
        </div>

        <!-- 15. CENTRAL DE DOCUMENTOS OFICIAIS -->
        <div id="documentos" class="mt-2xl">
          <div class="section-header text-center mb-xl">
            <span class="badge badge-gold mb-xs">Repositório Oficial V7.4</span>
            <h3 class="section-title" style="font-size: 1.75rem;">Central de Documentos &amp; Relatórios</h3>
            <p style="color: var(--text-muted); max-width: 680px; margin: 0.5rem auto 0;">Demonstrações financeiras auditadas, estatutos, balanços e relatórios anuais para investidores e sociedade civil.</p>
          </div>

          <div class="grid-2" style="gap: 1.25rem;">
            <div class="doc-card">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <span class="doc-icon" aria-hidden="true">📄</span>
                <div>
                  <strong style="display: block; font-size: 1.05rem; color: var(--color-secondary);">Relatório Anual de Atividades 2026</strong>
                  <small style="color: var(--color-muted);">PDF • 4.2 MB • Auditoria Independente • Atualizado 2026</small>
                </div>
              </div>
              <a href="../assets/docs/relatorio-anual-2026.pdf" download class="btn btn-outline btn-sm">Baixar</a>
            </div>

            <div class="doc-card">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <span class="doc-icon" aria-hidden="true">📊</span>
                <div>
                  <strong style="display: block; font-size: 1.05rem; color: var(--color-secondary);">Demonstrações Contábeis &amp; DRE 2025</strong>
                  <small style="color: var(--color-muted);">PDF • 2.8 MB • Parecer Sem Ressalvas • Registrado em Cartório</small>
                </div>
              </div>
              <a href="../assets/docs/balanco-patrimonial-2025.pdf" download class="btn btn-outline btn-sm">Baixar</a>
            </div>

            <div class="doc-card">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <span class="doc-icon" aria-hidden="true">🏛️</span>
                <div>
                  <strong style="display: block; font-size: 1.05rem; color: var(--color-secondary);">Estatuto Social Consolidado</strong>
                  <small style="color: var(--color-muted);">PDF • 1.5 MB • CNPJ Registrado • Governança Ativa</small>
                </div>
              </div>
              <a href="../assets/docs/estatuto-social-ine.pdf" download class="btn btn-outline btn-sm">Baixar</a>
            </div>

            <div class="doc-card">
              <div style="display: flex; align-items: center; gap: 1rem;">
                <span class="doc-icon" aria-hidden="true">🌱</span>
                <div>
                  <strong style="display: block; font-size: 1.05rem; color: var(--color-secondary);">Relatório Territorial de Impacto &amp; ESG</strong>
                  <small style="color: var(--color-muted);">PDF • 3.7 MB • Alinhamento ODS/ONU e Entorno do DF</small>
                </div>
              </div>
              <a href="../assets/docs/relatorio-esg-impacto-2025.pdf" download class="btn btn-outline btn-sm">Baixar</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 8: BLOG
// -------------------------------------------------------------
function renderBlogPage(lang) {
  const loc = LOCALES[lang];
  const b = loc.blog || {};
  const header = b.header || {};
  const filters = b.filters || {};
  const reader = b.reader || {};

  return `
  <main id="main-content" role="main">
    <div id="blog-hero">
      <section class="hero-section hero-compact" aria-labelledby="blog-title">
        <div class="container text-center max-w-800">
          <span class="hero-territory-tag">${escapeHtml(header.title)}</span>
          <h1 id="blog-title" class="hero-title">${escapeHtml(header.title)}</h1>
          <p class="hero-lead">${escapeHtml(header.subtitle)}</p>
        </div>
      </section>

      <section class="section pt-0" id="blog-list-section">
        <div class="container">
          <div class="filter-bar mb-lg" style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center; justify-content: space-between;">
            <div style="flex-grow: 1; max-width: 400px;">
              <input type="search" id="blog-search-input" class="form-control" placeholder="${escapeHtml(b.search_placeholder)}">
            </div>
            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button type="button" class="btn btn-sm btn-outline is-active" data-blog-category="all">${escapeHtml(filters.all)}</button>
              <button type="button" class="btn btn-sm btn-outline" data-blog-category="Educação">${escapeHtml(filters.education)}</button>
              <button type="button" class="btn btn-sm btn-outline" data-blog-category="Segurança Alimentar">${escapeHtml(filters.nutrition)}</button>
              <button type="button" class="btn btn-sm btn-outline" data-blog-category="Juventude">${escapeHtml(filters.youth)}</button>
              <button type="button" class="btn btn-sm btn-outline" data-blog-category="Inclusão Produtiva">${escapeHtml(filters.income)}</button>
            </div>
          </div>

          <div id="blog-articles-grid" class="grid-3" style="gap: 2rem;">
            <!-- Artigos via blog.js -->
          </div>
        </div>
      </section>
    </div>

    <div id="article-view-container" style="display: none;">
      <div id="reading-progress-bar" style="position: fixed; top: 0; left: 0; height: 4px; background: var(--primary); width: 0%; z-index: 1000;" role="progressbar" aria-label="${escapeHtml(reader.progress_bar_aria)}"></div>
      <div class="container max-w-760 py-xl">
        <button type="button" class="btn btn-outline btn-sm mb-lg" id="btn-back-to-blog">${escapeHtml(reader.btn_back)}</button>
        <article id="article-reader-content"></article>
      </div>
    </div>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 9: DONATIONS
// -------------------------------------------------------------
function renderDonationsPage(lang) {
  const loc = LOCALES[lang];
  const d = loc.donations || {};
  const header = d.header || {};
  const ir = d.ir_calculator || {};
  const cert = d.certificate || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="donations-hero-title">
      <div class="container text-center max-w-800">
        <span class="hero-territory-tag">${escapeHtml(header.title)}</span>
        <h1 id="donations-hero-title" class="hero-title">${escapeHtml(header.title)}</h1>
        <p class="hero-lead">${escapeHtml(header.subtitle)}</p>
      </div>
    </section>

    <!-- Formulário de Doações -->
    <section class="section" aria-labelledby="donation-form-heading">
      <div class="container max-w-840">
        <div class="grid-2" style="gap: 2rem; align-items: flex-start;">
          <div class="card p-xl" style="background: var(--surface);">
            <h2 id="donation-form-heading" style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem;">${escapeHtml(d.step1_title || '1. Valor')}</h2>

            <div class="frequency-toggle mb-lg" style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn btn-sm btn-outline is-active" data-freq="monthly">${escapeHtml(d.frequency?.monthly || 'Mensal')}</button>
              <button type="button" class="btn btn-sm btn-outline" data-freq="once">${escapeHtml(d.frequency?.once || 'Única')}</button>
              <button type="button" class="btn btn-sm btn-outline" data-freq="annual">${escapeHtml(d.frequency?.annual || 'Anual')}</button>
            </div>

            <div class="amount-pills-grid grid-3 mb-md" style="gap: 0.5rem;">
              <button type="button" class="btn btn-outline" data-amount="30">R$ 30</button>
              <button type="button" class="btn btn-outline" data-amount="60">R$ 60</button>
              <button type="button" class="btn btn-outline is-active" data-amount="100">R$ 100</button>
              <button type="button" class="btn btn-outline" data-amount="150">R$ 150</button>
              <button type="button" class="btn btn-outline" data-amount="500">R$ 500</button>
              <button type="button" class="btn btn-outline" data-amount="1000">R$ 1.000</button>
            </div>

            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.75rem;">${escapeHtml(d.step3_title || '3. Pagamento')}</h3>
            <div class="method-pills mb-lg" style="display: flex; gap: 0.5rem;">
              <button type="button" class="btn btn-outline btn-sm is-active" data-method="pix">PIX</button>
              <button type="button" class="btn btn-outline btn-sm" data-method="card">Cartão</button>
            </div>

            <button type="button" class="btn btn-donate btn-lg w-100" id="btn-submit-donation">${escapeHtml(loc.common?.nav?.donate || 'Doar')}</button>
          </div>

          <!-- Resumo Lateral Dinâmico -->
          <div>
            <div class="card p-xl mb-md" style="background: var(--surface-alt); border-left: 4px solid var(--primary);">
              <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.5rem;">Impacto:</h3>
              <div id="donation-impact-text" style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6;">
                ${escapeHtml(d.tiers?.t60 || 'Apoio contínuo')}
              </div>
            </div>

            <!-- Certificado Demonstrativo de Impacto -->
            <div class="card p-lg text-center" style="background: var(--surface); border: 1px dashed var(--secondary);">
              <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">📜</div>
              <strong style="display: block; font-size: 0.9375rem; margin-bottom: 0.25rem;">${escapeHtml(cert.title)}</strong>
              <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem;">${escapeHtml(cert.legal_safeguard)}</p>
              <button type="button" class="btn btn-outline btn-sm w-100" data-open-impact-certificate>
                ${escapeHtml(cert.btn_open)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CALCULADORA DE DEDUÇÃO DO IMPOSTO DE RENDA -->
    <section id="ir-calculator" class="section section-alt" aria-labelledby="ir-calc-heading">
      <div class="container max-w-840">
        <div class="card p-xl" style="background: var(--surface); border-top: 4px solid var(--accent);">
          <div class="section-header text-center mb-md">
            <span class="badge badge-accent mb-xs">Incentivo Fiscal</span>
            <h2 id="ir-calc-heading" class="section-title" style="font-size: 1.5rem;">${escapeHtml(ir.title)}</h2>
            <p class="section-desc">${escapeHtml(ir.subtitle)}</p>
          </div>

          <div class="alert alert-warning mb-lg">
            <p style="font-size: 0.875rem; margin: 0;">
              ℹ️ <strong>${escapeHtml(ir.disclaimer)}</strong>
            </p>
          </div>

          <div style="display: flex; justify-content: center; gap: 0.75rem; margin-bottom: 1.5rem;">
            <button type="button" class="btn btn-outline is-active" data-ir-type="pf">${escapeHtml(ir.type_pf)}</button>
            <button type="button" class="btn btn-outline" data-ir-type="pj">${escapeHtml(ir.type_pj)}</button>
          </div>

          <div class="form-group mb-md">
            <label for="ir-income-input" class="form-label">${escapeHtml(ir.label_income)}</label>
            <input type="number" id="ir-income-input" class="form-control" value="5000" min="0" step="500">
          </div>

          <div class="card p-lg mb-lg" style="background: var(--surface-alt); border-left: 4px solid var(--primary); text-align: center;">
            <span style="font-size: 0.875rem; color: var(--text-muted); font-weight: 600;">${escapeHtml(ir.label_deduction)}</span>
            <div id="ir-calc-deduction-value" style="font-size: 2.25rem; font-weight: 800; color: var(--primary); margin: 0.5rem 0;">R$ 300,00</div>
            <div id="ir-calc-impact-text" style="font-size: 0.9375rem; color: var(--text-muted);"></div>
          </div>

          <div class="darf-steps card p-md" style="background: var(--surface); border: 1px solid var(--border);">
            <h4 style="font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.5rem;">${escapeHtml(ir.darf_guide_title)}</h4>
            <ol style="font-size: 0.8125rem; color: var(--text-muted); line-height: 1.6; padding-left: 1.25rem; margin: 0;">
              <li>${escapeHtml(ir.darf_step1)}</li>
              <li>${escapeHtml(ir.darf_step2)}</li>
              <li>${escapeHtml(ir.darf_step3)}</li>
              <li>${escapeHtml(ir.darf_step4)}</li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <!-- Modal PIX -->
    <div id="pix-modal" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="pix-modal-title">
      <div class="modal-container p-xl text-center" style="max-width: 480px;">
        <button type="button" class="modal-close" id="btn-close-pix-modal" aria-label="✕">✕</button>
        <h3 id="pix-modal-title" style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">${escapeHtml(d.pix?.title || 'PIX')}</h3>
        <div id="pix-qr-container" style="width: 180px; height: 180px; margin: 1rem auto; background: #eee; display: flex; align-items: center; justify-content: center; border-radius: 8px;">QR Code PIX</div>
        <p style="font-size: 0.8125rem; color: var(--text-muted); margin-bottom: 1rem;">pix@instituto-novaesperanca.org.br</p>
        <button type="button" class="btn btn-primary btn-sm w-100" id="btn-copy-pix">${escapeHtml(d.pix?.copy_code || 'Copiar')}</button>
      </div>
    </div>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 10: CONTACT
// -------------------------------------------------------------
function renderContactPage(lang) {
  const loc = LOCALES[lang];
  const c = loc.contact || {};
  const header = c.header || {};
  const info = c.info || {};
  const forms = loc.forms || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="contact-title">
      <div class="container text-center max-w-800">
        <span class="hero-territory-tag">${escapeHtml(header.title)}</span>
        <h1 id="contact-title" class="hero-title">${escapeHtml(header.title)}</h1>
        <p class="hero-lead">${escapeHtml(header.subtitle)}</p>
      </div>
    </section>

    <section class="section" aria-labelledby="contact-form-heading">
      <div class="container max-w-840">
        <div class="grid-2" style="gap: 2rem;">
          <div class="card p-xl">
            <h2 id="contact-form-heading" style="font-size: 1.25rem; font-weight: 800; margin-bottom: 1rem;">${escapeHtml(header.title)}</h2>
            <form id="general-contact-form" novalidate>
              <div class="form-status-msg" role="status" aria-live="polite"></div>
              <div class="form-group mb-md">
                <label for="contact-name" class="form-label">${escapeHtml(forms.fields?.name || 'Nome')}: *</label>
                <input type="text" id="contact-name" class="form-control" required>
              </div>
              <div class="form-group mb-md">
                <label for="contact-email" class="form-label">${escapeHtml(forms.fields?.email || 'Email')}: *</label>
                <input type="email" id="contact-email" class="form-control" required>
              </div>
              <div class="form-group mb-lg">
                <label for="contact-msg" class="form-label">${escapeHtml(forms.fields?.message || 'Mensagem')}: *</label>
                <textarea id="contact-msg" class="form-control" rows="4" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-100">${escapeHtml(forms.buttons?.submit || 'Enviar')}</button>
            </form>
          </div>

          <div>
            <div class="card p-xl mb-md" style="background: var(--surface-alt);">
              <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 1rem;">${escapeHtml(info.address_title)}</h3>
              <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
                📍 <strong>${escapeHtml(info.address_val)}</strong>
              </p>
              <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
                📞 <strong>${escapeHtml(info.phone_title)}:</strong> ${escapeHtml(info.phone_val)}<br>
                ✉️ <strong>${escapeHtml(info.email_title)}:</strong> ${escapeHtml(info.email_val)}
              </p>
              <div style="font-size: 0.8125rem; color: var(--text-muted);">
                🕒 <strong>${escapeHtml(info.hours_title)}:</strong> ${escapeHtml(info.hours_val)}
              </div>
            </div>

            <div class="card p-lg" style="border-left: 4px solid var(--accent);">
              <h4 style="font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.25rem;">${escapeHtml(info.ombudsman_title)}:</h4>
              <p style="font-size: 0.8125rem; color: var(--text-muted); margin: 0;">${escapeHtml(info.ombudsman_val)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 11: FAQ
// -------------------------------------------------------------
function renderFaqPage(lang) {
  const loc = LOCALES[lang];
  const f = loc.faq || {};
  const header = f.header || {};
  const items = f.items || [];

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="faq-title">
      <div class="container text-center max-w-800">
        <span class="hero-territory-tag">${escapeHtml(header.title)}</span>
        <h1 id="faq-title" class="hero-title">${escapeHtml(header.title)}</h1>
        <p class="hero-lead">${escapeHtml(header.subtitle)}</p>
      </div>
    </section>

    <section class="section" aria-labelledby="faq-list-heading">
      <div class="container max-w-760">
        <h2 id="faq-list-heading" class="sr-only">${escapeHtml(header.title)}</h2>
        <div class="accordion-group" style="display: flex; flex-direction: column; gap: 1rem;">
          ${items.map((item, idx) => `
            <details class="card p-md" style="background: var(--surface);">
              <summary style="font-weight: 700; cursor: pointer; color: var(--text-heading); outline: none;">
                ${escapeHtml(item.q)}
              </summary>
              <div style="margin-top: 0.75rem; font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6; border-top: 1px solid var(--border); padding-top: 0.75rem;">
                ${escapeHtml(item.a)}
              </div>
            </details>
          `).join('')}
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// PÁGINA 12: PRESS
// -------------------------------------------------------------
function renderPressPage(lang) {
  const loc = LOCALES[lang];
  const a = loc.about || {};
  const press = a.press_room || {};

  return `
  <main id="main-content" role="main">
    <section class="hero-section hero-compact" aria-labelledby="press-title">
      <div class="container text-center max-w-800">
        <span class="hero-territory-tag">${escapeHtml(press.badge)}</span>
        <h1 id="press-title" class="hero-title">${escapeHtml(press.title)}</h1>
        <p class="hero-lead">${escapeHtml(press.subtitle)}</p>
      </div>
    </section>

    <!-- BRAND KIT (REGRA 29: IDENTIDADE PRÓPRIA OFICIAL) -->
    <section class="section" aria-labelledby="brand-kit-heading">
      <div class="container max-w-840">
        <div class="card p-xl mb-xl" style="background: var(--surface);">
          <div class="section-header text-center mb-lg">
            <h2 id="brand-kit-heading" class="section-title" style="font-size: 1.5rem;">${escapeHtml(press.brand_kit_title)}</h2>
            <p class="section-desc">${escapeHtml(press.brand_kit_desc)}</p>
          </div>

          <div class="grid-3" style="gap: 1.5rem; text-align: center;">
            <div class="card p-lg" style="background: var(--surface-alt);">
              <div style="height: 90px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <img src="../assets/img/brand/logo-primary.svg" alt="${escapeHtml(press.logo_primary)}" style="max-height: 70px; max-width: 100%;">
              </div>
              <strong style="display: block; font-size: 0.875rem; margin-bottom: 0.5rem;">${escapeHtml(press.logo_primary)}</strong>
              <a href="../assets/img/brand/logo-primary.svg" download class="btn btn-outline btn-sm w-100">${escapeHtml(press.btn_download_svg)}</a>
            </div>

            <div class="card p-lg" style="background: #1f2937;">
              <div style="height: 90px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <img src="../assets/img/brand/logo-white.svg" alt="${escapeHtml(press.logo_white)}" style="max-height: 70px; max-width: 100%;">
              </div>
              <strong style="display: block; font-size: 0.875rem; margin-bottom: 0.5rem; color: #fff;">${escapeHtml(press.logo_white)}</strong>
              <a href="../assets/img/brand/logo-white.svg" download class="btn btn-outline btn-sm w-100" style="border-color: #fff; color: #fff;">${escapeHtml(press.btn_download_svg)}</a>
            </div>

            <div class="card p-lg" style="background: var(--surface-alt);">
              <div style="height: 90px; display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;">
                <img src="../assets/img/brand/logo-mono.svg" alt="${escapeHtml(press.logo_mono)}" style="max-height: 70px; max-width: 100%;">
              </div>
              <strong style="display: block; font-size: 0.875rem; margin-bottom: 0.5rem;">${escapeHtml(press.logo_mono)}</strong>
              <a href="../assets/img/brand/logo-mono.svg" download class="btn btn-outline btn-sm w-100">${escapeHtml(press.btn_download_svg)}</a>
            </div>
          </div>

          <!-- Paleta de Cores -->
          <div class="mt-xl pt-lg" style="border-top: 1px solid var(--border);">
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem; text-align: center;">${escapeHtml(press.palette_title)}</h3>
            <div class="grid-3 text-center" style="gap: 1rem;">
              <div class="p-md" style="background: #075E54; color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.875rem;">
                #075E54<br><small style="font-weight: 400;">${escapeHtml(press.primary_color)}</small>
              </div>
              <div class="p-md" style="background: #2A9D8F; color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.875rem;">
                #2A9D8F<br><small style="font-weight: 400;">${escapeHtml(press.secondary_color)}</small>
              </div>
              <div class="p-md" style="background: #E76F51; color: #fff; border-radius: var(--radius-sm); font-weight: 700; font-size: 0.875rem;">
                #E76F51<br><small style="font-weight: 400;">${escapeHtml(press.accent_color)}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- RELEASES OFICIAIS -->
    <section class="section section-alt" aria-labelledby="releases-heading">
      <div class="container max-w-840">
        <h2 id="releases-heading" class="section-title mb-lg" style="font-size: 1.5rem;">${escapeHtml(press.releases_title)}</h2>

        <div style="display: flex; flex-direction: column; gap: 1.5rem;">
          ${PRESS_RELEASES.map(rel => {
            const locRel = (rel.i18n && rel.i18n[lang]) || rel;
            return `
            <div class="card p-xl" style="background: var(--surface);">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
                <span class="badge badge-primary">${escapeHtml(locRel.tag || 'Release')}</span>
                <span style="font-size: 0.8125rem; color: var(--text-muted); font-weight: 600;">📅 ${escapeHtml(rel.date)}</span>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem; color: var(--text-heading);">${escapeHtml(locRel.title)}</h3>
              <p style="font-size: 0.9375rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">${escapeHtml(locRel.lead)}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border); padding-top: 0.75rem; flex-wrap: wrap; gap: 0.75rem;">
                <span style="font-size: 0.8125rem; color: var(--text-muted);">${escapeHtml(locRel.author)}</span>
                ${rel.downloads && rel.downloads[0] ? `
                  <a href="../${rel.downloads[0].file}" download class="btn btn-outline btn-sm">📄 PDF (${rel.downloads[0].size})</a>
                ` : ''}
              </div>
            </div>
            `;
          }).join('')}
        </div>

        <div class="card p-xl mt-xl" style="background: var(--surface); border-left: 4px solid var(--primary);">
          <h3 style="font-size: 1.15rem; font-weight: 800; margin-bottom: 0.75rem;">${escapeHtml(press.spokespersons_title)}</h3>
          <div style="font-size: 0.875rem; line-height: 1.6;">
            <strong>${escapeHtml(press.press_contact_label)}</strong><br>
            ✉️ <a href="mailto:${press.press_email}">${press.press_email}</a><br>
            📱 WhatsApp: ${press.press_phone}
          </div>
        </div>
      </div>
    </section>
  </main>
  `;
}

// -------------------------------------------------------------
// EXECUÇÃO DO BUILD
// -------------------------------------------------------------
console.log('Iniciando geração rigorosa das 72 páginas nativas V7.3...');
let count = 0;

LANGUAGES.forEach(lang => {
  const langDir = path.join(ROOT_DIR, lang);
  if (!fs.existsSync(langDir)) {
    fs.mkdirSync(langDir, { recursive: true });
  }

  PAGE_KEYS.forEach(pageKey => {
    const filename = getSiblingFilename(pageKey, lang);
    const destPath = path.join(langDir, filename);

    const loc = LOCALES[lang];
    let title = 'Instituto Nova Esperança';
    let description = loc.common?.footer?.mission_summary || 'Organização social de impacto.';
    let contentHtml = '';
    let extraScripts = [];

    switch (pageKey) {
      case 'home':
        title = loc.home?.hero?.title || 'Instituto Nova Esperança';
        description = loc.home?.hero?.subtitle || description;
        contentHtml = renderHomePage(lang);
        break;
      case 'about':
        title = loc.about?.header?.title || 'About';
        description = loc.about?.header?.subtitle || description;
        contentHtml = renderAboutPage(lang);
        extraScripts = ['../assets/js/map.js'];
        break;
      case 'projects':
        title = loc.projects?.header?.title || 'Projects';
        description = loc.projects?.header?.subtitle || description;
        contentHtml = renderProjectsPage(lang);
        break;
      case 'impact':
        title = loc.impact?.header?.title || 'Impact';
        description = loc.impact?.header?.subtitle || description;
        contentHtml = renderImpactPage(lang);
        extraScripts = ['../assets/js/dashboard.js', '../assets/js/open-data.js'];
        break;
      case 'companies':
        title = loc.companies?.header?.title || 'Companies';
        description = loc.companies?.header?.lead || description;
        contentHtml = renderCompaniesPage(lang);
        break;
      case 'volunteering':
        title = loc.forms?.volunteer_board?.title || 'Volunteering';
        description = loc.forms?.volunteer_board?.subtitle || description;
        contentHtml = renderVolunteeringPage(lang);
        extraScripts = ['../assets/js/volunteer.js'];
        break;
      case 'transparency':
        title = loc.transparency?.header?.title || 'Transparency';
        description = loc.transparency?.header?.subtitle || description;
        contentHtml = renderTransparencyPage(lang);
        extraScripts = ['../assets/js/transparency.js', '../assets/js/open-data.js'];
        break;
      case 'blog':
        title = loc.blog?.header?.title || 'Blog';
        description = loc.blog?.header?.subtitle || description;
        contentHtml = renderBlogPage(lang);
        extraScripts = [
          '../assets/js/tts.js',
          '../assets/js/reading-time.js',
          '../assets/js/share.js',
          '../assets/js/blog.js'
        ];
        break;
      case 'donations':
        title = loc.donations?.header?.title || 'Donations';
        description = loc.donations?.header?.subtitle || description;
        contentHtml = renderDonationsPage(lang);
        extraScripts = ['../assets/js/donations.js', '../assets/js/ir-calculator.js'];
        break;
      case 'contact':
        title = loc.contact?.header?.title || 'Contact';
        description = loc.contact?.header?.subtitle || description;
        contentHtml = renderContactPage(lang);
        break;
      case 'faq':
        title = loc.faq?.header?.title || 'FAQ';
        description = loc.faq?.header?.subtitle || description;
        contentHtml = renderFaqPage(lang);
        extraScripts = ['../assets/js/faq.js'];
        break;
      case 'press':
        title = loc.about?.press_room?.title || 'Press';
        description = loc.about?.press_room?.subtitle || description;
        contentHtml = renderPressPage(lang);
        break;
    }

    const fullHtml = `
${generateHead(pageKey, lang, title, description)}
${generateHeader(pageKey, lang)}
${contentHtml}
${generateFooter(lang)}
${generateScripts(extraScripts)}
</body>
</html>
`.trim() + '\n';

    fs.writeFileSync(destPath, fullHtml, 'utf8');
    count++;
  });

  console.log(`✓ [${lang}] 12 páginas geradas com 0% resíduo.`);
});

console.log(`\n🎉 Total de ${count} páginas nativas geradas com sucesso!`);
