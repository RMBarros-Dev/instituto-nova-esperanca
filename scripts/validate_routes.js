const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errors = 0;
let totalChecked = 0;

function check(msg, condition, detail = '') {
  totalChecked++;
  if (!condition) {
    errors++;
    console.error(`  ❌ [ROTA AUSENTE] ${msg} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('\n========================================');
console.log('       QA: VALIDAÇÃO DE ROTAS E PÁGINAS');
console.log('========================================');

const routesPath = path.join(ROOT_DIR, 'assets/data/routes.json');
const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
const langs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];

Object.entries(routes).forEach(([pageKey, langMap]) => {
  langs.forEach(lang => {
    const routeUrl = langMap[lang];
    check(`Rota definida para [${pageKey}][${lang}]`, !!routeUrl);
    if (routeUrl) {
      const relPath = routeUrl.replace(/^\//, '');
      const fullPath = path.join(ROOT_DIR, relPath);
      check(`Arquivo físico existe: ${relPath}`, fs.existsSync(fullPath));
    }
  });
});

console.log(`\nTotal de checagens de rota: ${totalChecked}`);
console.log(`Rotas ausentes ou falhas: ${errors}`);

if (errors === 0) {
  console.log('✓ 100% DAS ROTAS ESTÃO MAPEADAS E ÍNTEGRAS (PASS)\n');
  process.exit(0);
} else {
  console.error('❌ FALHA: Rotas ausentes detectadas.\n');
  process.exit(1);
}
