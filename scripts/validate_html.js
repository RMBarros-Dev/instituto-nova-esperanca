const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errors = 0;
let totalChecked = 0;

function check(msg, condition, detail = '') {
  totalChecked++;
  if (!condition) {
    errors++;
    console.error(`  ❌ [HTML ERROR] ${msg} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('\n========================================');
console.log('       QA: VALIDAÇÃO SEMÂNTICA HTML');
console.log('========================================');

const langs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];

langs.forEach(lang => {
  const langDir = path.join(ROOT_DIR, lang);
  if (!fs.existsSync(langDir)) return;

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const filePath = path.join(langDir, f);
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. DOCTYPE
    check(`DOCTYPE presente em [${lang}/${f}]`, content.startsWith('<!DOCTYPE html>'));

    // 2. HTML lang
    const langMatch = content.match(/<html\s+lang=["']([^"']+)["']/i);
    check(`Tag <html lang> corresponde em [${lang}/${f}]`, langMatch && langMatch[1] === lang);

    // 3. Header e Main semânticos
    check(`Tag <main> presente em [${lang}/${f}]`, content.includes('<main') && content.includes('</main>'));
    check(`Tag <header> presente em [${lang}/${f}]`, content.includes('<header') && content.includes('</header>'));
    check(`Tag <footer> presente em [${lang}/${f}]`, content.includes('<footer') && content.includes('</footer>'));

    // 4. Checagem de H1 único
    const h1Count = (content.match(/<h1[^>]*>/gi) || []).length;
    check(`Exatamente um <h1> em [${lang}/${f}] (Encontrados: ${h1Count})`, h1Count === 1);

    // 5. Checagem de IDs duplicados
    const idMatches = content.match(/id=["']([^"']+)["']/gi) || [];
    const ids = [];
    const duplicateIds = new Set();
    idMatches.forEach(raw => {
      const id = raw.replace(/id=["']/i, '').replace(/["']/, '');
      if (ids.includes(id)) {
        duplicateIds.add(id);
      } else {
        ids.push(id);
      }
    });

    check(
      `Sem IDs duplicados em [${lang}/${f}]`,
      duplicateIds.size === 0,
      `IDs duplicados: ${Array.from(duplicateIds).join(', ')}`
    );
  });
});

console.log(`\nTotal de checagens semânticas HTML: ${totalChecked}`);
console.log(`Erros semânticos HTML encontrados: ${errors}`);

if (errors === 0) {
  console.log('✓ 100% DAS PÁGINAS CUMPREM AS NORMAS SEMÂNTICAS HTML5 (PASS)\n');
  process.exit(0);
} else {
  console.error('❌ FALHA: Erros de semântica HTML detectados.\n');
  process.exit(1);
}
