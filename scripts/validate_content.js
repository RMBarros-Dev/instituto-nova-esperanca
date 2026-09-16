const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
let errors = 0;
let totalChecked = 0;

function check(msg, condition, detail = '') {
  totalChecked++;
  if (!condition) {
    errors++;
    console.error(`  ❌ [CONTEÚDO INVÁLIDO] ${msg} ${detail ? `(${detail})` : ''}`);
  }
}

console.log('\n========================================');
console.log('       QA: INTEGRIDADE DE CONTEÚDO');
console.log('========================================');

const foreignLangs = ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];
const portugueseWords = [
  'Quem Somos', 'Transparência', 'Impacto Social', 'Doações',
  'Voluntariado', 'Perguntas Frequentes', 'Fale Conosco', 'Baixar Dados'
];

foreignLangs.forEach(lang => {
  const langDir = path.join(ROOT_DIR, lang);
  if (!fs.existsSync(langDir)) return;

  const files = fs.readdirSync(langDir).filter(f => f.endsWith('.html'));
  files.forEach(f => {
    const filePath = path.join(langDir, f);
    const content = fs.readFileSync(filePath, 'utf8');

    // 1. Template placeholders quebrados
    check(
      `Sem template errors (undefined) em [${lang}/${f}]`,
      !content.includes('>undefined<') && !content.includes('"undefined"')
    );
    check(
      `Sem template errors (null) em [${lang}/${f}]`,
      !content.includes('>null<') && !content.includes('"null"')
    );
    check(
      `Sem template errors ([object Object]) em [${lang}/${f}]`,
      !content.includes('[object Object]')
    );

    // 2. Resíduo de português em títulos/menus principais (exceto cognatos legítimos em espanhol)
    const bodyContent = content.split('<main')[1]?.split('</main>')[0] || '';
    portugueseWords.forEach(word => {
      if (lang === 'es-ES' && word === 'Voluntariado') return; // Palavra legítima em espanhol
      const hasResidue = bodyContent.includes(`>${word}<`) || bodyContent.includes(`"${word}"`);
      check(
        `0% Resíduo de "${word}" em [${lang}/${f}]`,
        !hasResidue,
        `Encontrado termo em português: ${word}`
      );
    });
  });
});

console.log(`\nTotal de checagens de conteúdo: ${totalChecked}`);
console.log(`Resíduos ou falhas de conteúdo: ${errors}`);

if (errors === 0) {
  console.log('✓ CONTEÚDO 100% NATIVO SEM RESÍDUO OU ERROS DE TEMPLATE (PASS)\n');
  process.exit(0);
} else {
  console.error('❌ FALHA: Resíduo de conteúdo detectado.\n');
  process.exit(1);
}
