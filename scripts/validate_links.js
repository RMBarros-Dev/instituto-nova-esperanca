const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errors = 0;
let totalChecked = 0;

function check(msg, condition, detail = '') {
  totalChecked++;
  if (!condition) {
    errors++;
    console.error(`  ❌ [LINK QUEBRADO] ${msg} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('\n========================================');
console.log('    QA: VALIDAÇÃO DE LINKS INTERNOS');
console.log('========================================');

const langs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];

langs.forEach(lang => {
  const langDir = path.join(ROOT_DIR, lang);
  if (!fs.existsSync(langDir)) return;

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const filePath = path.join(langDir, f);
    const content = fs.readFileSync(filePath, 'utf8');

    const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
    let match;
    while ((match = linkRegex.exec(content)) !== null) {
      const href = match[1];

      // Ignora links externos, mailto, tel, javascript, âncoras puras
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('//') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('#') ||
        href === ''
      ) {
        continue;
      }

      const cleanHref = href.split('?')[0].split('#')[0];
      if (!cleanHref) continue;

      const resolved = path.resolve(langDir, cleanHref);
      check(`Link [${lang}/${f}] -> ${href}`, fs.existsSync(resolved), `Arquivo inexiste: ${resolved}`);
    }
  });
});

console.log(`\nTotal de links internos verificados: ${totalChecked}`);
console.log(`Links quebrados encontrados: ${errors}`);

if (errors === 0) {
  console.log('✓ 100% DOS LINKS INTERNOS ESTÃO VÁLIDOS (PASS)\n');
  process.exit(0);
} else {
  console.error('❌ FALHA: Links internos quebrados detectados.\n');
  process.exit(1);
}
