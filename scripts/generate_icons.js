/**
 * INSTITUTO NOVA ESPERANÇA — GERADOR OFICIAL DE ÍCONES E LOGOS V7.4
 * Gera os ícones padronizados em 11 categorias sob assets/icons/
 * e a suíte completa de logotipos institucionais sob assets/img/brand/
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const ICONS_DIR = path.join(ROOT_DIR, 'assets', 'icons');
const BRAND_DIR = path.join(ROOT_DIR, 'assets', 'img', 'brand');

[ICONS_DIR, BRAND_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function wrapSVG(innerPaths, title = '') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="img" aria-hidden="true">${title ? `<title>${title}</title>` : ''}${innerPaths}</svg>`;
}

const ICONS = {
  navigation: {
    'menu.svg': wrapSVG('<line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/>', 'Menu'),
    'close.svg': wrapSVG('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>', 'Fechar'),
    'arrow-left.svg': wrapSVG('<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>', 'Voltar'),
    'arrow-right.svg': wrapSVG('<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>', 'Avançar'),
    'arrow-up.svg': wrapSVG('<line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>', 'Subir'),
    'arrow-down.svg': wrapSVG('<line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>', 'Descer'),
    'chevron-right.svg': wrapSVG('<polyline points="9 18 15 12 9 6"/>', 'Próximo'),
    'chevron-down.svg': wrapSVG('<polyline points="6 9 12 15 18 9"/>', 'Expandir'),
    'home.svg': wrapSVG('<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', 'Início')
  },
  social: {
    'instagram.svg': wrapSVG('<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>', 'Instagram'),
    'facebook.svg': wrapSVG('<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>', 'Facebook'),
    'youtube.svg': wrapSVG('<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>', 'YouTube'),
    'linkedin.svg': wrapSVG('<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>', 'LinkedIn'),
    'whatsapp.svg': wrapSVG('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>', 'WhatsApp'),
    'twitter.svg': wrapSVG('<path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>', 'Twitter')
  },
  actions: {
    'search.svg': wrapSVG('<circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>', 'Pesquisar'),
    'share.svg': wrapSVG('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>', 'Compartilhar'),
    'copy.svg': wrapSVG('<rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>', 'Copiar'),
    'download.svg': wrapSVG('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>', 'Baixar'),
    'external-link.svg': wrapSVG('<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>', 'Abrir link'),
    'filter.svg': wrapSVG('<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>', 'Filtrar'),
    'refresh.svg': wrapSVG('<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>', 'Atualizar'),
    'print.svg': wrapSVG('<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>', 'Imprimir')
  },
  accessibility: {
    'a11y.svg': wrapSVG('<circle cx="12" cy="4" r="2"/><path d="M4 8h16M12 8v8M8 20l4-4 4 4"/>', 'Acessibilidade'),
    'font-size.svg': wrapSVG('<path d="M4 19V7l5 12M7 14h4"/><path d="M15 19V11l4 8M17 16h3"/>', 'Tamanho da fonte'),
    'contrast.svg': wrapSVG('<circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor"/>', 'Alto contraste'),
    'dark-mode.svg': wrapSVG('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>', 'Modo escuro'),
    'dyslexia.svg': wrapSVG('<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>', 'Fonte para dislexia'),
    'underline.svg': wrapSVG('<path d="M6 3v7a6 6 0 0 0 12 0V3"/><line x1="4" y1="21" x2="20" y2="21"/>', 'Sublinhar links'),
    'volume.svg': wrapSVG('<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>', 'Áudio'),
    'speech.svg': wrapSVG('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="13" y2="13"/>', 'Ouvir conteúdo')
  },
  projects: {
    'education.svg': wrapSVG('<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>', 'Educação'),
    'food.svg': wrapSVG('<path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>', 'Alimentação'),
    'income.svg': wrapSVG('<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>', 'Renda e Emprego'),
    'community.svg': wrapSVG('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', 'Comunidade'),
    'health.svg': wrapSVG('<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', 'Saúde'),
    'environment.svg': wrapSVG('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>', 'Sustentabilidade')
  },
  impact: {
    'heart.svg': wrapSVG('<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>', 'Impacto Social'),
    'people.svg': wrapSVG('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>', 'Pessoas Atendidas'),
    'family.svg': wrapSVG('<circle cx="12" cy="7" r="3"/><circle cx="5" cy="9" r="2"/><circle cx="19" cy="9" r="2"/><path d="M12 14c-4 0-6 2-6 5v2h12v-2c0-3-2-5-6-5z"/><path d="M5 14c-2 0-3 1-3 3v2h3"/><path d="M19 14c2 0 3 1 3 3v2h-3"/>', 'Famílias'),
    'target.svg': wrapSVG('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', 'Metas'),
    'award.svg': wrapSVG('<circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>', 'Reconhecimento'),
    'chart-bar.svg': wrapSVG('<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>', 'Gráfico de impacto')
  },
  finance: {
    'money.svg': wrapSVG('<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>', 'Recursos e Doações'),
    'receipt.svg': wrapSVG('<path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1-2-1z"/><line x1="8" y1="8" x2="16" y2="8"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="8" y1="16" x2="12" y2="16"/>', 'Prestação de contas'),
    'shield-check.svg': wrapSVG('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>', 'Auditoria Certificada'),
    'pie-chart.svg': wrapSVG('<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>', 'Distribuição de despesas'),
    'trend-up.svg': wrapSVG('<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>', 'Evolução'),
    'scale.svg': wrapSVG('<path d="M12 3v18M3 7l4.5 9h-9L3 7zm18 0l4.5 9h-9L21 7z"/><circle cx="12" cy="3" r="1"/>', 'Conformidade Legal')
  },
  documents: {
    'document.svg': wrapSVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>', 'Documento'),
    'pdf.svg': wrapSVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13v4M9 13h2a1 1 0 0 1 1 1v0a1 1 0 0 1-1 1H9"/>', 'PDF'),
    'csv.svg': wrapSVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="16" y2="17"/>', 'CSV'),
    'json.svg': wrapSVG('<polyline points="4 7 1 12 4 17"/><polyline points="20 7 23 12 20 17"/><line x1="14" y1="4" x2="10" y2="20"/>', 'JSON'),
    'file-text.svg': wrapSVG('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>', 'Texto')
  },
  contact: {
    'location.svg': wrapSVG('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', 'Localização'),
    'phone.svg': wrapSVG('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>', 'Telefone'),
    'email.svg': wrapSVG('<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>', 'E-mail'),
    'calendar.svg': wrapSVG('<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>', 'Calendário'),
    'clock.svg': wrapSVG('<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>', 'Horário'),
    'message.svg': wrapSVG('<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>', 'Mensagem')
  },
  language: {
    'globe.svg': wrapSVG('<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>', 'Idioma'),
    'translate.svg': wrapSVG('<path d="M5 8l6 6M4 14l6-6 2-3M2 5h12M7 2h1M22 22l-5-10-5 10M14 18h6"/>', 'Traduzir')
  },
  status: {
    'check-circle.svg': wrapSVG('<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>', 'Concluído'),
    'alert-circle.svg': wrapSVG('<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>', 'Alerta'),
    'info-circle.svg': wrapSVG('<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>', 'Informação'),
    'help-circle.svg': wrapSVG('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/>', 'Ajuda'),
    'lock.svg': wrapSVG('<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>', 'Seguro')
  }
};

let totalIconsGenerated = 0;
for (const [category, iconFiles] of Object.entries(ICONS)) {
  const catDir = path.join(ICONS_DIR, category);
  if (!fs.existsSync(catDir)) fs.mkdirSync(catDir, { recursive: true });

  for (const [fileName, svgContent] of Object.entries(iconFiles)) {
    fs.writeFileSync(path.join(catDir, fileName), svgContent, 'utf8');
    totalIconsGenerated++;
  }
}
console.log(`✓ Gerados ${totalIconsGenerated} ícones SVG em 11 categorias.`);

// --------------------------------------------------------------------------
// GERAR SUÍTE OFICIAL DE LOGOTIPOS EM assets/img/brand/
// Emblema Institucional V7.4 (Broto Três Folhas #075E54 + Arco Ascendente #0F2439 + Ponta Dourada #D4AF37 + Monograma NE)
// --------------------------------------------------------------------------
const EMBLEM_SVG = `
  <g id="emblem-group">
    <!-- Folha Central -->
    <path d="M 33 22 C 30 13 32 4 34 2 C 36 4 38 13 35 22 C 34 25 33 25 33 22 Z" fill="#075E54"/>
    <!-- Folha Esquerda -->
    <path d="M 32 20 C 23 18 17 21 16 24 C 19 28 27 27 32 20 Z" fill="#075E54"/>
    <!-- Folha Direita -->
    <path d="M 34 20 C 43 18 49 21 50 24 C 47 28 39 27 34 20 Z" fill="#075E54"/>
    <!-- Tronco Base -->
    <path d="M 33 22 L 33 39 C 33 42 30 44 26 44 L 24 44" fill="none" stroke="#075E54" stroke-width="3" stroke-linecap="round"/>
    <!-- Arco Dinâmico Ascendente -->
    <path d="M 24 44 C 36 45 50 39 55 25 C 57 20 58 15 59 10" fill="none" stroke="#0F2439" stroke-width="3.5" stroke-linecap="round"/>
    <!-- Ponta Dourada da Esperança -->
    <path d="M 59 10 L 61 4 L 56 7 Z" fill="#D4AF37"/>
    <!-- Monograma NE Centralizado -->
    <text x="36" y="36" font-family="'Manrope', sans-serif" font-size="11" font-weight="900" fill="#0F2439" letter-spacing="-0.5">NE</text>
  </g>
`;

const EMBLEM_LIGHT_SVG = `
  <g id="emblem-group-light">
    <path d="M 33 22 C 30 13 32 4 34 2 C 36 4 38 13 35 22 C 34 25 33 25 33 22 Z" fill="#5EEAD4"/>
    <path d="M 32 20 C 23 18 17 21 16 24 C 19 28 27 27 32 20 Z" fill="#5EEAD4"/>
    <path d="M 34 20 C 43 18 49 21 50 24 C 47 28 39 27 34 20 Z" fill="#5EEAD4"/>
    <path d="M 33 22 L 33 39 C 33 42 30 44 26 44 L 24 44" fill="none" stroke="#5EEAD4" stroke-width="3" stroke-linecap="round"/>
    <path d="M 24 44 C 36 45 50 39 55 25 C 57 20 58 15 59 10" fill="none" stroke="#FFFFFF" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M 59 10 L 61 4 L 56 7 Z" fill="#FBBF24"/>
    <text x="36" y="36" font-family="'Manrope', sans-serif" font-size="11" font-weight="900" fill="#FFFFFF" letter-spacing="-0.5">NE</text>
  </g>
`;

const LOGOS = {
  'logo.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 90" width="340" height="90" role="img" aria-label="Logo Oficial Instituto Nova Esperança">
  <g transform="translate(10, 16) scale(1.15)">
    ${EMBLEM_SVG}
  </g>
  <text x="96" y="42" font-family="'Manrope', 'Inter', sans-serif" font-size="20" font-weight="800" fill="#0F2439" letter-spacing="-0.5">Instituto Nova Esperança</text>
  <text x="96" y="62" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#075E54" letter-spacing="0.5">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`,

  'logo-horizontal.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 64" width="360" height="64" role="img" aria-label="Logo Horizontal Instituto Nova Esperança">
  <g transform="translate(4, 6) scale(1.05)">
    ${EMBLEM_SVG}
  </g>
  <text x="76" y="34" font-family="'Manrope', 'Inter', sans-serif" font-size="18" font-weight="800" fill="#0F2439" letter-spacing="-0.5">Instituto Nova Esperança</text>
  <text x="76" y="49" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#075E54" letter-spacing="0.5">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`,

  'logo-monochrome.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 90" width="340" height="90" role="img" aria-label="Logo Monocromático Instituto Nova Esperança">
  <g transform="translate(10, 16) scale(1.15)">
    <g fill="#1E293B" stroke="#1E293B">
      <path d="M 33 22 C 30 13 32 4 34 2 C 36 4 38 13 35 22 C 34 25 33 25 33 22 Z" stroke="none"/>
      <path d="M 32 20 C 23 18 17 21 16 24 C 19 28 27 27 32 20 Z" stroke="none"/>
      <path d="M 34 20 C 43 18 49 21 50 24 C 47 28 39 27 34 20 Z" stroke="none"/>
      <path d="M 33 22 L 33 39 C 33 42 30 44 26 44 L 24 44" fill="none" stroke-width="3" stroke-linecap="round"/>
      <path d="M 24 44 C 36 45 50 39 55 25 C 57 20 58 15 59 10" fill="none" stroke-width="3.5" stroke-linecap="round"/>
      <path d="M 59 10 L 61 4 L 56 7 Z" stroke="none"/>
      <text x="36" y="36" font-family="'Manrope', sans-serif" font-size="11" font-weight="900" fill="#1E293B" stroke="none" letter-spacing="-0.5">NE</text>
    </g>
  </g>
  <text x="96" y="42" font-family="'Manrope', sans-serif" font-size="20" font-weight="800" fill="#1E293B" letter-spacing="-0.5">Instituto Nova Esperança</text>
  <text x="96" y="62" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#475569" letter-spacing="0.5">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`,

  'logo-light.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 90" width="340" height="90" role="img" aria-label="Logo Claro Instituto Nova Esperança">
  <g transform="translate(10, 16) scale(1.15)">
    ${EMBLEM_LIGHT_SVG}
  </g>
  <text x="96" y="42" font-family="'Manrope', sans-serif" font-size="20" font-weight="800" fill="#FFFFFF" letter-spacing="-0.5">Instituto Nova Esperança</text>
  <text x="96" y="62" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#5EEAD4" letter-spacing="0.5">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`,

  'logo-dark.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 90" width="340" height="90" role="img" aria-label="Logo Escuro Instituto Nova Esperança">
  <g transform="translate(10, 16) scale(1.15)">
    ${EMBLEM_SVG}
  </g>
  <text x="96" y="42" font-family="'Manrope', sans-serif" font-size="20" font-weight="800" fill="#0F2439" letter-spacing="-0.5">Instituto Nova Esperança</text>
  <text x="96" y="62" font-family="'Inter', sans-serif" font-size="12" font-weight="600" fill="#075E54" letter-spacing="0.5">IMPACTO SOCIAL &amp; CIDADANIA</text>
</svg>`,

  'logo-symbol.svg': `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 64" width="72" height="64" role="img" aria-label="Símbolo Oficial Instituto Nova Esperança">
  <g transform="translate(4, 6) scale(1.05)">
    ${EMBLEM_SVG}
  </g>
</svg>`
};

for (const [logoName, logoContent] of Object.entries(LOGOS)) {
  fs.writeFileSync(path.join(BRAND_DIR, logoName), logoContent, 'utf8');
}
console.log('✓ Suíte oficial de 6 logos gerada em assets/img/brand/.');

