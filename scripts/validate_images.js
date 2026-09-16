const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errors = 0;
let totalChecked = 0;

function check(msg, condition, detail = '') {
  totalChecked++;
  if (condition) {
    // ok
  } else {
    errors++;
    console.error(`  ❌ [FALHA] ${msg} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('\n========================================');
console.log('   QA: VALIDAÇÃO RIGOROSA DE IMAGENS');
console.log('========================================');

// 1. Verificar arquivos essenciais do brand kit e favicons
const brandFiles = [
  'assets/img/brand/logo.svg',
  'assets/img/brand/logo-horizontal.svg',
  'assets/img/brand/logo-symbol.svg',
  'assets/img/brand/logo-light.svg',
  'assets/img/brand/logo-dark.svg',
  'assets/img/brand/logo-monochrome.svg',
  'assets/img/brand/logo-concept.jpg',
  'assets/img/brand/logo-primary.svg',
  'assets/img/brand/logo-white.svg',
  'assets/img/brand/logo-mono.svg',
  'assets/img/icon-192.svg',
  'assets/img/icon-512.svg',
  'assets/img/institutions/placeholder.svg',
  'favicon.ico',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon-48x48.png',
  'apple-touch-icon.png',
  'icon-192.png',
  'icon-512.png',
  'maskable-192.png',
  'maskable-512.png'
];

brandFiles.forEach(f => {
  const full = path.join(ROOT_DIR, f);
  check(`Brand/Favicon asset existe: ${f}`, fs.existsSync(full));
});

// 1.1 Verificar as 11 categorias do sistema oficial de ícones SVG
const iconCategories = [
  'navigation',
  'social',
  'actions',
  'accessibility',
  'projects',
  'impact',
  'finance',
  'documents',
  'contact',
  'language',
  'status'
];

iconCategories.forEach(cat => {
  const catDir = path.join(ROOT_DIR, 'assets', 'icons', cat);
  const exists = fs.existsSync(catDir) && fs.readdirSync(catDir).length > 0;
  check(`Categoria de ícones existe e possui SVGs: assets/icons/${cat}`, exists);
});

// 2. Verificar imagens de projetos e responsivas
const projects = ['educacao', 'alimentacao', 'renda', 'comunidade'];
projects.forEach(p => {
  check(`Projeto base: ${p}.svg`, fs.existsSync(path.join(ROOT_DIR, `assets/img/projects/${p}.svg`)));
  [480, 768, 1200].forEach(w => {
    check(`Projeto responsivo: ${p}-${w}.svg`, fs.existsSync(path.join(ROOT_DIR, `assets/img/projects/${p}-${w}.svg`)));
  });
});

// 3. Verificar imagens do blog e responsivas
for (let i = 1; i <= 12; i++) {
  check(`Artigo base: artigo-${i}.svg`, fs.existsSync(path.join(ROOT_DIR, `assets/img/blog/artigo-${i}.svg`)));
  [480, 768, 1200].forEach(w => {
    check(`Artigo responsivo: artigo-${i}-${w}.svg`, fs.existsSync(path.join(ROOT_DIR, `assets/img/blog/artigo-${i}-${w}.svg`)));
  });
}

// 4. Varrer todos os arquivos HTML em busca de tags <img> e relativas quebradas
const langs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];
langs.forEach(lang => {
  const langDir = path.join(ROOT_DIR, lang);
  if (!fs.existsSync(langDir)) return;

  const htmlFiles = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));
  htmlFiles.forEach(hf => {
    const filePath = path.join(langDir, hf);
    const content = fs.readFileSync(filePath, 'utf8');

    // img src
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      const src = match[1];
      if (src.startsWith('http') || src.startsWith('data:') || src.startsWith('//')) continue;
      const resolved = path.resolve(langDir, src);
      check(`Imagem HTML [${lang}/${hf}]: ${src}`, fs.existsSync(resolved), `Não encontrado em ${resolved}`);
    }

    // srcset
    const srcsetRegex = /srcset=["']([^"']+)["']/gi;
    let sMatch;
    while ((sMatch = srcsetRegex.exec(content)) !== null) {
      const entries = sMatch[1].split(',');
      entries.forEach(e => {
        const url = e.trim().split(' ')[0];
        if (url.startsWith('http') || url.startsWith('data:')) return;
        const resolved = path.resolve(langDir, url);
        check(`Srcset [${lang}/${hf}]: ${url}`, fs.existsSync(resolved), `Não encontrado em ${resolved}`);
      });
    }
  });
});

console.log(`\nTotal de checagens de imagem: ${totalChecked}`);
console.log(`Imagens quebradas encontradas: ${errors}`);

if (errors === 0) {
  console.log('✓ TODAS AS IMAGENS ESTÃO ÍNTEGRAS E À PROVA DE QUEBRA (PASS)\n');
  process.exit(0);
} else {
  console.error('❌ FALHA: Imagens quebradas detectadas.\n');
  process.exit(1);
}
