/**
 * INSTITUTO NOVA ESPERANÇA — GERADOR DE ATIVOS RESPONSIVOS V7.4
 * Gera imagens institucionais documentais e conceituais nos diretórios oficiais:
 * hero/, projects/, team/, blog/, impact/, volunteers/, press/, partners/, backgrounds/, institutions/
 * Formatos vetoriais SVG escaláveis com variantes responsivas (480w, 768w, 1200w)
 * e marcação interna data-image-type="imagem-ilustrativa".
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');

const DIRS = [
  'assets/img/hero',
  'assets/img/projects',
  'assets/img/team',
  'assets/img/blog',
  'assets/img/impact',
  'assets/img/volunteers',
  'assets/img/press',
  'assets/img/partners',
  'assets/img/backgrounds',
  'assets/img/institutions',
  'assets/img/brand'
];

DIRS.forEach(d => {
  const full = path.join(ROOT_DIR, d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
});

function createInstitutionalSVG(title, subtitle, tag, color1, color2, icon, width = 800, height = 450) {
  const cleanTag = String(tag).replace(/[^a-zA-Z0-9]/g, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="${width}" height="${height}" preserveAspectRatio="xMidYMid slice" data-image-type="imagem-ilustrativa" role="img" aria-label="${title} — ${subtitle}">
  <defs>
    <linearGradient id="bg_${cleanTag}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="gold_${cleanTag}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#B8860B" />
    </linearGradient>
    <filter id="shadow_${cleanTag}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-opacity="0.25" flood-color="#0F2439" />
    </filter>
  </defs>
  
  <rect width="800" height="450" fill="url(#bg_${cleanTag})" />
  
  <!-- Formas geométricas dinâmicas & orgânicas -->
  <circle cx="720" cy="80" r="160" fill="rgba(255,255,255,0.06)" />
  <circle cx="760" cy="380" r="120" fill="rgba(255,255,255,0.04)" />
  <path d="M-40 390 Q 200 330, 450 370 T 840 340 L 840 450 L -40 450 Z" fill="rgba(0,0,0,0.18)" />

  <!-- Badge / Emblema Central -->
  <g transform="translate(400, 155)" text-anchor="middle">
    <circle cx="0" cy="0" r="50" fill="rgba(255,255,255,0.15)" filter="url(#shadow_${cleanTag})" />
    <circle cx="0" cy="0" r="40" fill="rgba(255,255,255,0.96)" />
    <text x="0" y="14" font-size="40" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">${icon}</text>
  </g>

  <!-- Tag Pill -->
  <g transform="translate(400, 245)">
    <rect x="-85" y="-13" width="170" height="26" rx="13" fill="url(#gold_${cleanTag})" />
    <text x="0" y="5" fill="#FFFFFF" font-family="'Manrope', -apple-system, sans-serif" font-size="11" font-weight="800" letter-spacing="1.5" text-anchor="middle">${tag.toUpperCase()}</text>
  </g>

  <!-- Título e Subtítulo -->
  <text x="400" y="305" fill="#FFFFFF" font-family="'Manrope', -apple-system, BlinkMacSystemFont, sans-serif" font-size="24" font-weight="800" text-anchor="middle" filter="url(#shadow_${cleanTag})">${title}</text>
  <text x="400" y="338" fill="rgba(255,255,255,0.88)" font-family="'Inter', -apple-system, BlinkMacSystemFont, sans-serif" font-size="14" font-weight="500" text-anchor="middle">${subtitle}</text>

  <!-- Assinatura Oficial -->
  <text x="400" y="418" fill="rgba(255,255,255,0.45)" font-family="'Manrope', -apple-system, sans-serif" font-size="10" font-weight="700" text-anchor="middle" letter-spacing="2">INSTITUTO NOVA ESPERANÇA • V7.4</text>
</svg>`;
}

// 1. PROJETOS
const projects = [
  { key: 'educacao', title: 'Novos Caminhos', subtitle: 'Reforço Escolar, Letramento & Robótica Comunitária', tag: 'Educação', c1: '#075E54', c2: '#0F2439', icon: '📚' },
  { key: 'alimentacao', title: 'Prato que Transforma', subtitle: 'Segurança Alimentar, Nutrição & Hortas Urbanas', tag: 'Nutrição', c1: '#2A9D8F', c2: '#1D7066', icon: '🌱' },
  { key: 'renda', title: 'Renda e Futuro', subtitle: 'Inclusão Produtiva, Costura & Panificação Industrial', tag: 'Trabalho', c1: '#0F2439', c2: '#1E293B', icon: '💼' },
  { key: 'comunidade', title: 'Comunidade Viva', subtitle: 'Infraestrutura Territorial, Praças & Esporte', tag: 'Território', c1: '#1F3A44', c2: '#13242A', icon: '🤝' }
];

console.log('Gerando ativos de projetos (base + responsivos 480w, 768w, 1200w)...');
projects.forEach(p => {
  const base = path.join(ROOT_DIR, `assets/img/projects/${p.key}.svg`);
  fs.writeFileSync(base, createInstitutionalSVG(p.title, p.subtitle, p.tag, p.c1, p.c2, p.icon, 800, 450));
  
  [480, 768, 1200].forEach(w => {
    const h = Math.round(w * 9 / 16);
    const resp = path.join(ROOT_DIR, `assets/img/projects/${p.key}-${w}.svg`);
    fs.writeFileSync(resp, createInstitutionalSVG(p.title, p.subtitle, p.tag, p.c1, p.c2, p.icon, w, h));
  });
});

// 2. BLOG
const articles = [
  { id: 1, title: 'Educação como Transformação Social', subtitle: 'Rompendo ciclos de vulnerabilidade no Entorno do DF', tag: 'Educação', c1: '#075E54', c2: '#0F2439', icon: '🎓' },
  { id: 2, title: 'Segurança Alimentar e Nutrição', subtitle: 'Muito além de combater a fome imediata', tag: 'Alimentação', c1: '#2A9D8F', c2: '#1B6A60', icon: '🥗' },
  { id: 3, title: 'Juventude e Horizontes de Futuro', subtitle: 'Mentoria e caminhos de carreira para jovens', tag: 'Juventude', c1: '#0F2439', c2: '#1E293B', icon: '🚀' },
  { id: 4, title: 'Trabalho, Renda e Autonomia', subtitle: 'Da formação técnica ao microempreendedorismo', tag: 'Renda', c1: '#1E293B', c2: '#334155', icon: '✂️' },
  { id: 5, title: 'Voluntariado com Propósito', subtitle: 'Metodologia e acolhimento contínuo de equipes', tag: 'Voluntariado', c1: '#457B9D', c2: '#1D3557', icon: '❤️' },
  { id: 6, title: 'Empresas e Impacto Social', subtitle: 'ESG autêntico e atuação territorial de base', tag: 'Parcerias', c1: '#2A9D8F', c2: '#0F2439', icon: '🏢' },
  { id: 7, title: 'Investimento Social Privado', subtitle: 'Métricas e governança para family offices', tag: 'Transparência', c1: '#075E54', c2: '#0F2439', icon: '🏛️' },
  { id: 8, title: 'Transparência Ativa & Ética', subtitle: 'O alicerce irrenunciável da confiança pública', tag: 'Transparência', c1: '#0F2439', c2: '#0D1B2A', icon: '📊' },
  { id: 9, title: 'Desenvolvimento Comunitário', subtitle: 'O protagonismo dos moradores no território', tag: 'Comunidade', c1: '#2A9D8F', c2: '#1F3A44', icon: '🏘️' },
  { id: 10, title: 'Tecnologia para Impacto', subtitle: 'Dados e inclusão digital a serviço das famílias', tag: 'Inovação', c1: '#0F2439', c2: '#1A1B28', icon: '💻' },
  { id: 11, title: 'Mulheres e Maternidade', subtitle: 'Independência financeira e redes de acolhimento', tag: 'Cidadania', c1: '#457B9D', c2: '#075E54', icon: '👩‍👧' },
  { id: 12, title: 'O Futuro das Organizações', subtitle: 'Sustentabilidade, blended finance e inovação', tag: 'Gestão', c1: '#075E54', c2: '#2A9D8F', icon: '🌐' }
];

console.log('Gerando ativos de blog (base + responsivos 480w, 768w, 1200w)...');
articles.forEach(a => {
  const base = path.join(ROOT_DIR, `assets/img/blog/artigo-${a.id}.svg`);
  fs.writeFileSync(base, createInstitutionalSVG(a.title, a.subtitle, a.tag, a.c1, a.c2, a.icon, 800, 450));
  
  [480, 768, 1200].forEach(w => {
    const h = Math.round(w * 9 / 16);
    const resp = path.join(ROOT_DIR, `assets/img/blog/artigo-${a.id}-${w}.svg`);
    fs.writeFileSync(resp, createInstitutionalSVG(a.title, a.subtitle, a.tag, a.c1, a.c2, a.icon, w, h));
  });
});

// 3. HERO & PÁGINAS PRINCIPAIS
const heroImages = [
  { key: 'hero-home', title: 'Transformação & Cidadania', subtitle: 'Valparaíso de Goiás e Entorno do DF', tag: 'Impacto', c1: '#075E54', c2: '#0F2439', icon: '✨' },
  { key: 'hero-sobre', title: 'Nossa História & Valores', subtitle: 'Dedicação comunitária desde 2014', tag: 'Institucional', c1: '#0F2439', c2: '#1E293B', icon: '🏛️' },
  { key: 'hero-projetos', title: 'Iniciativas de Base Territorial', subtitle: 'Educação, Alimentação, Renda & Comunidade', tag: 'Ação Social', c1: '#2A9D8F', c2: '#075E54', icon: '🌱' },
  { key: 'hero-impacto', title: 'Resultados Comprovados', subtitle: 'Dados auditados e monitoramento contínuo', tag: 'Transparência', c1: '#075E54', c2: '#0F2439', icon: '📈' },
  { key: 'hero-doacoes', title: 'Invista no Futuro Comunitário', subtitle: 'Sua contribuição transforma vidas reais', tag: 'Doação', c1: '#075E54', c2: '#1D7066', icon: '💚' },
  { key: 'hero-transparencia', title: 'Prestação Pública de Contas', subtitle: 'Auditoria independente e dados abertos (LAI)', tag: 'Auditoria', c1: '#0F2439', c2: '#0A192F', icon: '⚖️' }
];

console.log('Gerando ativos de hero...');
heroImages.forEach(h => {
  const base = path.join(ROOT_DIR, `assets/img/hero/${h.key}.svg`);
  fs.writeFileSync(base, createInstitutionalSVG(h.title, h.subtitle, h.tag, h.c1, h.c2, h.icon, 800, 450));
  
  [480, 768, 1200].forEach(w => {
    const height = Math.round(w * 9 / 16);
    const resp = path.join(ROOT_DIR, `assets/img/hero/${h.key}-${w}.svg`);
    fs.writeFileSync(resp, createInstitutionalSVG(h.title, h.subtitle, h.tag, h.c1, h.c2, h.icon, w, height));
  });
});

// 4. IMPACTO & VOLUNTARIADO
const impactImages = [
  { key: 'impact-overview', title: 'Relatório Consolidado', subtitle: 'Mais de 12.400 vidas impactadas', tag: 'Impacto', c1: '#075E54', c2: '#0F2439', icon: '👥' },
  { key: 'impact-families', title: 'Fortalecimento Familiar', subtitle: 'Acolhimento, autonomia e assistência integral', tag: 'Comunidade', c1: '#2A9D8F', c2: '#1D7066', icon: '🏡' }
];
impactImages.forEach(i => {
  fs.writeFileSync(path.join(ROOT_DIR, `assets/img/impact/${i.key}.svg`), createInstitutionalSVG(i.title, i.subtitle, i.tag, i.c1, i.c2, i.icon, 800, 450));
});

const volunteerImages = [
  { key: 'volunteers-team', title: 'Equipe de Voluntários', subtitle: 'Capacitação contínua e presença ativa no território', tag: 'Voluntariado', c1: '#457B9D', c2: '#1D3557', icon: '🤝' },
  { key: 'volunteers-action', title: 'Ação em Campo', subtitle: 'Distribuição de refeições e oficinas pedagógicas', tag: 'Campo', c1: '#075E54', c2: '#2A9D8F', icon: '📦' }
];
volunteerImages.forEach(v => {
  fs.writeFileSync(path.join(ROOT_DIR, `assets/img/volunteers/${v.key}.svg`), createInstitutionalSVG(v.title, v.subtitle, v.tag, v.c1, v.c2, v.icon, 800, 450));
});

// 5. EQUIPE & GOVERNANÇA
const teamImages = [
  { key: 'diretoria-executiva', title: 'Diretoria Executiva', subtitle: 'Gestão transparente e governança ética', tag: 'Governança', c1: '#0F2439', c2: '#1E293B', icon: '👔' },
  { key: 'coordenacao-pedagogica', title: 'Coordenação Pedagógica', subtitle: 'Metodologias ativas e acolhimento humanizado', tag: 'Educação', c1: '#075E54', c2: '#0F2439', icon: '👩‍🏫' },
  { key: 'conselho-fiscal', title: 'Conselho Fiscal', subtitle: 'Supervisão contábil e conformidade regulatória', tag: 'Fiscal', c1: '#0F2439', c2: '#0A192F', icon: '📋' }
];
teamImages.forEach(t => {
  fs.writeFileSync(path.join(ROOT_DIR, `assets/img/team/${t.key}.svg`), createInstitutionalSVG(t.title, t.subtitle, t.tag, t.c1, t.c2, t.icon, 800, 450));
});

// 6. IMPRENSA
const pressImages = [
  { key: 'press-kit', title: 'Kit Oficial de Imprensa', subtitle: 'Releases, logos vetorizados e dados institucionais', tag: 'Comunicação', c1: '#075E54', c2: '#0F2439', icon: '📰' }
];
pressImages.forEach(pr => {
  fs.writeFileSync(path.join(ROOT_DIR, `assets/img/press/${pr.key}.svg`), createInstitutionalSVG(pr.title, pr.subtitle, pr.tag, pr.c1, pr.c2, pr.icon, 800, 450));
});

// 7. BACKGROUNDS
const bgDark = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="100%" height="100%">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="0%" r="90%">
      <stop offset="0%" stop-color="#0F2439" />
      <stop offset="100%" stop-color="#07131F" />
    </radialGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#bgGrad)" />
</svg>`;
fs.writeFileSync(path.join(ROOT_DIR, 'assets/img/backgrounds/gradient-dark.svg'), bgDark);

// 8. PLACEHOLDER OFICIAL RESILIENTE
const placeholderSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%" data-image-type="imagem-ilustrativa">
  <rect width="800" height="450" fill="#F8FAFC" />
  <rect x="20" y="20" width="760" height="410" rx="16" fill="none" stroke="#075E54" stroke-width="2" stroke-dasharray="8 8" opacity="0.4" />
  <g transform="translate(400, 200)" text-anchor="middle">
    <circle cx="0" cy="0" r="48" fill="#075E54" opacity="0.1" />
    <circle cx="0" cy="0" r="38" fill="#075E54" />
    <path d="M-14 -6 L0 -20 L14 -6 L8 -6 L8 14 L-8 14 L-8 -6 Z" fill="#D4AF37" />
    <text x="0" y="65" fill="#0F2439" font-family="'Manrope', -apple-system, sans-serif" font-size="18" font-weight="800">INSTITUTO NOVA ESPERANÇA</text>
    <text x="0" y="90" fill="#64748B" font-family="'Inter', -apple-system, sans-serif" font-size="13" font-weight="500">Imagem Institucional Oficial</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(ROOT_DIR, 'assets/img/institutions/placeholder.svg'), placeholderSVG);

console.log('✓ Biblioteca completa de ativos visuais responsivos gerada com sucesso!');
