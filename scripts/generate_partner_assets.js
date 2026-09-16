/**
 * INSTITUTO NOVA ESPERANÇA — GERADOR DE ATIVOS DE PARCEIROS V7.4
 * Gera os emblemas e marcas institucionais de investimento social, ODS e parcerias ESG
 * sob assets/img/partners/ com paleta oficial e padrão vetorial institucional.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const PARTNERS_DIR = path.join(ROOT_DIR, 'assets', 'img', 'partners');

if (!fs.existsSync(PARTNERS_DIR)) {
  fs.mkdirSync(PARTNERS_DIR, { recursive: true });
}

function createPartnerSVG(name, tag, icon, color1 = '#0F2439', color2 = '#075E54') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140" width="320" height="140" fill="none" role="img" aria-label="Parceiro Institucional: ${name} — ${tag}">
  <defs>
    <linearGradient id="pgrad_${tag.replace(/[^a-zA-Z0-9]/g, '')}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <filter id="pshadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-opacity="0.08" flood-color="#0F2439" />
    </filter>
  </defs>
  
  <rect width="320" height="140" rx="16" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="1.5" filter="url(#pshadow)" />
  
  <!-- Ícone e Identificador -->
  <g transform="translate(36, 42)">
    <rect width="56" height="56" rx="12" fill="url(#pgrad_${tag.replace(/[^a-zA-Z0-9]/g, '')})" />
    <text x="28" y="38" font-size="28" text-anchor="middle" font-family="-apple-system, sans-serif">${icon}</text>
  </g>
  
  <!-- Textos do Parceiro -->
  <g transform="translate(108, 56)">
    <text x="0" y="0" font-family="'Manrope', sans-serif" font-size="16" font-weight="800" fill="#0F2439" letter-spacing="-0.3">${name}</text>
    <text x="0" y="20" font-family="'Inter', sans-serif" font-size="11" font-weight="600" fill="#2A9D8F" letter-spacing="0.5">${tag.toUpperCase()}</text>
    <text x="0" y="38" font-family="'Inter', sans-serif" font-size="10" font-weight="500" fill="#64748B">Parceria Homologada • ESG</text>
  </g>
</svg>`;
}

const partners = [
  { file: 'empresa-cidada.svg', name: 'Aliança Cidadã', tag: 'Investimento Social', icon: '🏢', c1: '#0F2439', c2: '#075E54' },
  { file: 'ods-onu.svg', name: 'Pacto Global ODS', tag: 'Metas 1, 2, 4, 8 & 10', icon: '🌐', c1: '#0072BC', c2: '#0F2439' },
  { file: 'fundacao-futuro.svg', name: 'Fundação Futuro', tag: 'Apoio Institucional', icon: '🌱', c1: '#075E54', c2: '#2A9D8F' },
  { file: 'esg-corporativo.svg', name: 'Rede ESG Brasil', tag: 'Governança & Impacto', icon: '⚡', c1: '#0F2439', c2: '#1E293B' },
  { file: 'banco-alimentos.svg', name: 'Mesa Solidária', tag: 'Segurança Alimentar', icon: '🍲', c1: '#D97706', c2: '#B45309' },
  { file: 'instituto-tecnologia.svg', name: 'Inova Social Tech', tag: 'Letramento Digital', icon: '💻', c1: '#2563EB', c2: '#1D4ED8' }
];

partners.forEach(p => {
  const filePath = path.join(PARTNERS_DIR, p.file);
  fs.writeFileSync(filePath, createPartnerSVG(p.name, p.tag, p.icon, p.c1, p.c2), 'utf8');
});

console.log(`✓ Gerados ${partners.length} emblemas de parceiros institucionais em assets/img/partners/`);
