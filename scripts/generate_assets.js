const fs = require('fs');
const path = require('path');

const dirs = [
  'assets/img/projects',
  'assets/img/blog',
  'assets/img/team',
  'assets/img/partners',
  'assets/img/institutions'
];

dirs.forEach(d => {
  const full = path.resolve('c:/Users/monte/Projeto de Jardy-ONG', d);
  if (!fs.existsSync(full)) {
    fs.mkdirSync(full, { recursive: true });
  }
});

function createSVG(title, subtitle, tag, color1, color2, icon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#E76F51" />
      <stop offset="100%" stop-color="#F4A261" />
    </linearGradient>
    <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-opacity="0.25" flood-color="#000" />
    </filter>
  </defs>
  
  <rect width="800" height="450" fill="url(#bgGrad)" />
  
  <!-- Subtle organic decorative elements -->
  <circle cx="700" cy="80" r="180" fill="rgba(255,255,255,0.06)" />
  <circle cx="750" cy="380" r="140" fill="rgba(255,255,255,0.04)" />
  <path d="M-50 400 Q 200 320, 450 380 T 850 350 L 850 450 L -50 450 Z" fill="rgba(0,0,0,0.15)" />

  <!-- Central Visual Symbol / Badge -->
  <g transform="translate(400, 160)" text-anchor="middle">
    <circle cx="0" cy="0" r="55" fill="rgba(255,255,255,0.15)" filter="url(#softShadow)" />
    <circle cx="0" cy="0" r="45" fill="rgba(255,255,255,0.9)" />
    <text x="0" y="16" font-size="44" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif">${icon}</text>
  </g>

  <!-- Territory / Tag -->
  <g transform="translate(400, 255)">
    <rect x="-90" y="-14" width="180" height="28" rx="14" fill="url(#accentGrad)" />
    <text x="0" y="5" fill="#FFFFFF" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="700" letter-spacing="1" text-anchor="middle">${tag.toUpperCase()}</text>
  </g>

  <!-- Typography -->
  <text x="400" y="315" fill="#FFFFFF" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="24" font-weight="800" text-anchor="middle" filter="url(#softShadow)">${title}</text>
  <text x="400" y="348" fill="rgba(255,255,255,0.85)" font-family="'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" text-anchor="middle">${subtitle}</text>

  <!-- Watermark -->
  <text x="400" y="425" fill="rgba(255,255,255,0.4)" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" text-anchor="middle" letter-spacing="2">INSTITUTO NOVA ESPERANÇA • V7.2+</text>
</svg>`;
}

const projects = [
  { file: 'assets/img/projects/educacao.svg', title: 'Novos Caminhos', subtitle: 'Reforço Escolar, Letramento & Robótica Comunitária', tag: 'Educação', c1: '#075E54', c2: '#043F39', icon: '📚' },
  { file: 'assets/img/projects/alimentacao.svg', title: 'Prato que Transforma', subtitle: 'Segurança Alimentar, Nutrição & Hortas Urbanas', tag: 'Nutrição', c1: '#2A9D8F', c2: '#1D7066', icon: '🌱' },
  { file: 'assets/img/projects/renda.svg', title: 'Renda e Futuro', subtitle: 'Inclusão Produtiva, Costura & Panificação Industrial', tag: 'Trabalho', c1: '#E76F51', c2: '#B84B32', icon: '💼' },
  { file: 'assets/img/projects/comunidade.svg', title: 'Comunidade Viva', subtitle: 'Infraestrutura Territorial, Praças & Esporte', tag: 'Território', c1: '#1F3A44', c2: '#13242A', icon: '🤝' }
];

projects.forEach(p => {
  fs.writeFileSync(path.resolve('c:/Users/monte/Projeto de Jardy-ONG', p.file), createSVG(p.title, p.subtitle, p.tag, p.c1, p.c2, p.icon));
});

const articles = [
  { id: 1, title: 'Educação como Transformação Social', subtitle: 'Rompendo ciclos de vulnerabilidade no Entorno do DF', tag: 'Educação', c1: '#075E54', c2: '#043F39', icon: '🎓' },
  { id: 2, title: 'Segurança Alimentar e Nutrição', subtitle: 'Muito além de combater a fome imediata', tag: 'Alimentação', c1: '#2A9D8F', c2: '#1B6A60', icon: '🥗' },
  { id: 3, title: 'Juventude e Horizontes de Futuro', subtitle: 'Mentoria e caminhos de carreira para jovens', tag: 'Juventude', c1: '#264653', c2: '#182C35', icon: '🚀' },
  { id: 4, title: 'Trabalho, Renda e Autonomia', subtitle: 'Da formação técnica ao microempreendedorismo', tag: 'Renda', c1: '#E76F51', c2: '#A83B20', icon: '✂️' },
  { id: 5, title: 'Voluntariado com Propósito', subtitle: 'Metodologia e acolhimento contínuo de equipes', tag: 'Voluntariado', c1: '#457B9D', c2: '#1D3557', icon: '❤️' },
  { id: 6, title: 'Empresas e Impacto Social', subtitle: 'ESG autêntico e atuação territorial de base', tag: 'Parcerias', c1: '#2A9D8F', c2: '#14453D', icon: '🏢' },
  { id: 7, title: 'Investimento Social Privado', subtitle: 'Métricas e governança para family offices', tag: 'Transparência', c1: '#075E54', c2: '#032B27', icon: '🏛️' },
  { id: 8, title: 'Transparência Ativa & Ética', subtitle: 'O alicerce irrenunciável da confiança pública', tag: 'Transparência', c1: '#1D3557', c2: '#0D1B2A', icon: '📊' },
  { id: 9, title: 'Desenvolvimento Comunitário', subtitle: 'O protagonismo dos moradores no território', tag: 'Comunidade', c1: '#E76F51', c2: '#9B2226', icon: '🏘️' },
  { id: 10, title: 'Tecnologia para Impacto', subtitle: 'Dados e inclusão digital a serviço das famílias', tag: 'Inovação', c1: '#2B2D42', c2: '#1A1B28', icon: '💻' },
  { id: 11, title: 'Mulheres e Maternidade', subtitle: 'Independência financeira e redes de acolhimento', tag: 'Cidadania', c1: '#6D597A', c2: '#35223E', icon: '👩‍👧' },
  { id: 12, title: 'O Futuro das Organizações', subtitle: 'Sustentabilidade, blended finance e inovação', tag: 'Gestão', c1: '#075E54', c2: '#1D7066', icon: '🌐' }
];

articles.forEach(a => {
  const file = `assets/img/blog/artigo-${a.id}.svg`;
  fs.writeFileSync(path.resolve('c:/Users/monte/Projeto de Jardy-ONG', file), createSVG(a.title, a.subtitle, a.tag, a.c1, a.c2, a.icon));
});

// Resilient fallback placeholder
const placeholderSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="100%" height="100%">
  <rect width="800" height="450" fill="#E8F5F2" />
  <rect x="20" y="20" width="760" height="410" rx="12" fill="none" stroke="#075E54" stroke-width="2" stroke-dasharray="6 6" opacity="0.4" />
  <g transform="translate(400, 200)" text-anchor="middle">
    <circle cx="0" cy="0" r="45" fill="#075E54" opacity="0.1" />
    <text x="0" y="14" font-size="40" text-anchor="middle">🖼️</text>
    <text x="0" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-size="18" font-weight="700" fill="#075E54">Instituto Nova Esperança</text>
    <text x="0" y="90" font-family="'Source Sans 3', sans-serif" font-size="13" fill="#5E6B67">Imagem Institucional em Carregamento / Alternativa</text>
  </g>
</svg>`;
fs.writeFileSync(path.resolve('c:/Users/monte/Projeto de Jardy-ONG', 'assets/img/institutions/placeholder.svg'), placeholderSVG);

console.log('Todos os assets SVG gerados com sucesso!');
