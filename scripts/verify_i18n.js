/**
 * INSTITUTO NOVA ESPERANÇA — SCRIPT DE QA DE INTERNACIONALIZAÇÃO
 * Executa o validador I18nValidator e reporta conformidade com a regra Zero Tolerance.
 */

const path = require('path');
const I18nValidator = require('../assets/js/i18n-validator.js');

const validator = new I18nValidator({
  baseLang: 'pt-BR',
  targetLangs: ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'],
  langDir: path.resolve(__dirname, '../lang')
});

const results = validator.validate();
const report = validator.formatReport(results);

console.log('========================================');
console.log(report);
console.log('========================================');

if (!results.success) {
  process.exit(1);
} else {
  process.exit(0);
}
