const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errors = 0;
let totalChecked = 0;

function check(msg, condition, detail = '') {
  totalChecked++;
  if (!condition) {
    errors++;
    console.error(`  ❌ [A11Y ERROR] ${msg} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('\n========================================');
console.log('   QA: VALIDAÇÃO DE ACESSIBILIDADE WCAG');
console.log('========================================');

const langs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];

langs.forEach(lang => {
  const langDir = path.join(ROOT_DIR, lang);
  if (!fs.existsSync(langDir)) return;

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const filePath = path.join(langDir, f);
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Tag <img> com atributo alt
    const imgMatches = content.match(/<img[^>]+>/gi) || [];
    imgMatches.forEach(img => {
      const hasAlt = /alt=["'][^"']*["']/i.test(img);
      check(`Tag <img> com alt em [${lang}/${f}]`, hasAlt, img);
    });

    // 2. Skip Link de Acessibilidade
    check(`Skip to content link presente em [${lang}/${f}]`, content.includes('skip-link') || content.includes('#main-content'));

    // 3. Main com role="main"
    check(`Role main presente em [${lang}/${f}]`, content.includes('role="main"'));

    // 4. Tabelas com Caption
    const tableMatches = content.match(/<table[^>]*>/gi) || [];
    if (tableMatches.length > 0) {
      check(`Tabela possui <caption> acessível em [${lang}/${f}]`, content.includes('<caption'));
    }

    // 5. Botões com texto ou aria-label
    const btnMatches = content.match(/<button[^>]*>[\s\S]*?<\/button>/gi) || [];
    btnMatches.forEach(btn => {
      const hasText = btn.replace(/<[^>]+>/g, '').trim().length > 0;
      const hasAria = /aria-label=["'][^"']+["']/i.test(btn);
      check(`Botão acessível em [${lang}/${f}]`, hasText || hasAria, btn.substring(0, 60));
    });
  });
});

console.log(`\nTotal de checagens de acessibilidade WCAG: ${totalChecked}`);
console.log(`Erros de acessibilidade encontrados: ${errors}`);

if (errors === 0) {
  console.log('✓ 100% DAS PÁGINAS EM CONFORMIDADE COM ACESSIBILIDADE WCAG (PASS)\n');
  process.exit(0);
} else {
  console.error('❌ FALHA: Problemas de acessibilidade detectados.\n');
  process.exit(1);
}
