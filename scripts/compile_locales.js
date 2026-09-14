/**
 * INSTITUTO NOVA ESPERANÇA — COMPILADOR DE LOCALES V7.2+
 * Compila e consolida a estrutura modular de /lang/<idioma>/*.json
 * para os pacotes de alto desempenho em assets/locales/<idioma>.json.
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const LANG_DIR = path.join(ROOT_DIR, 'lang');
const LOCALES_DIR = path.join(ROOT_DIR, 'assets', 'locales');

const LANGUAGES = ['pt-BR', 'en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];
const MODULES = [
  'common',
  'home',
  'about',
  'projects',
  'impact',
  'donations',
  'blog',
  'transparency',
  'contact',
  'faq',
  'accessibility',
  'forms'
];

if (!fs.existsSync(LOCALES_DIR)) {
  fs.mkdirSync(LOCALES_DIR, { recursive: true });
}

console.log('Compilando dicionários modulares de /lang/ para assets/locales/ ...');

LANGUAGES.forEach(lang => {
  const bundle = {};
  
  MODULES.forEach(mod => {
    const filePath = path.join(LANG_DIR, lang, `${mod}.json`);
    if (fs.existsSync(filePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        bundle[mod] = data;
      } catch (err) {
        console.error(`Erro ao processar ${filePath}:`, err);
      }
    } else {
      console.warn(`Aviso: Arquivo ausente ${filePath}`);
    }
  });

  const destPath = path.join(LOCALES_DIR, `${lang}.json`);
  fs.writeFileSync(destPath, JSON.stringify(bundle, null, 2), 'utf8');
  console.log(`✓ Compilado com sucesso: assets/locales/${lang}.json (${Object.keys(bundle).length} módulos)`);
});

console.log('Compilação concluída com 100% de sucesso!');
