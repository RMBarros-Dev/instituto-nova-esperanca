const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errors = 0;
let totalChecked = 0;

function check(msg, condition, detail = '') {
  totalChecked++;
  if (!condition) {
    errors++;
    console.error(`  ❌ [SEO ERROR] ${msg} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('\n========================================');
console.log('         QA: VALIDAÇÃO DE SEO');
console.log('========================================');

const langs = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];

langs.forEach(lang => {
  const langDir = path.join(ROOT_DIR, lang);
  if (!fs.existsSync(langDir)) return;

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const filePath = path.join(langDir, f);
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Title Tag
    const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
    check(`Title tag válida em [${lang}/${f}]`, titleMatch && titleMatch[1].length > 10, titleMatch ? titleMatch[1] : 'Ausente');

    // 2. Meta Description
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content="([^"]+)"/i) || content.match(/<meta\s+name=["']description["']\s+content='([^']+)'/i);
    check(`Meta description presente em [${lang}/${f}]`, descMatch && (descMatch[1] || descMatch[2]).length > 20, descMatch ? (descMatch[1] || descMatch[2]) : 'Ausente');

    // 3. Canonical Tag
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
    check(`Canonical tag válida em [${lang}/${f}]`, canonicalMatch && canonicalMatch[1].startsWith('https://instituto-novaesperanca.org.br'));

    // 4. Hreflang Tags (6 idiomas + x-default)
    langs.forEach(l => {
      check(`Hreflang para ${l} em [${lang}/${f}]`, content.includes(`hreflang="${l}"`));
    });
    check(`Hreflang x-default em [${lang}/${f}]`, content.includes('hreflang="x-default"'));

    // 5. CSP Meta Hardening
    check(`CSP Security Meta presente em [${lang}/${f}]`, content.includes('http-equiv="Content-Security-Policy"'));

    // 6. Open Graph & Social Cards
    check(`Open Graph Title em [${lang}/${f}]`, content.includes('property="og:title"'));
    check(`Open Graph Description em [${lang}/${f}]`, content.includes('property="og:description"'));
    check(`Open Graph Image em [${lang}/${f}]`, content.includes('property="og:image"'));
    check(`Twitter Card em [${lang}/${f}]`, content.includes('name="twitter:card"'));

    // 7. Lang Tag correspondente
    check(`Atributo lang="${lang}" em [${lang}/${f}]`, content.includes(`lang="${lang}"`));
  });
});

console.log(`\nTotal de checagens SEO e Metadados: ${totalChecked}`);
console.log(`Erros de SEO encontrados: ${errors}`);

if (errors === 0) {
  console.log('✓ 100% DAS PÁGINAS CUMPREM AS BOAS PRÁTICAS DE SEO & METADADOS (PASS)\n');
  process.exit(0);
} else {
  console.error('❌ FALHA: Erros de SEO detectados.\n');
  process.exit(1);
}
