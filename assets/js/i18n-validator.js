/**
 * INSTITUTO NOVA ESPERANÇA — VALIDADOR AUTOMÁTICO DE I18N V7.2+
 * Compara recursivamente a integridade de todas as chaves, artigos,
 * projetos e mensagens entre o idioma base (pt-BR) e os 5 idiomas estrangeiros:
 * en-US, es-ES, fr-FR, de-DE, ja-JP.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(require('fs'), require('path'));
  } else {
    root.I18nValidator = factory();
  }
}(typeof self !== 'undefined' ? self : this, function (fs, path) {

  class I18nValidator {
    constructor(options = {}) {
      this.baseLang = options.baseLang || 'pt-BR';
      this.targetLangs = options.targetLangs || ['en-US', 'es-ES', 'fr-FR', 'de-DE', 'ja-JP'];
      this.modules = options.modules || [
        'common', 'home', 'about', 'projects', 'impact', 'donations',
        'blog', 'transparency', 'contact', 'faq', 'accessibility', 'forms', 'companies'
      ];
      this.langDir = options.langDir || (path ? path.resolve(__dirname, '../../lang') : '/lang');
    }

    // Achata recursivamente objetos e arrays mantendo o caminho da chave canônica
    flattenKeys(obj, prefix = '') {
      let keys = {};
      for (const k in obj) {
        if (!Object.prototype.hasOwnProperty.call(obj, k)) continue;
        const val = obj[k];
        const fullKey = prefix ? `${prefix}.${k}` : k;

        if (val !== null && typeof val === 'object') {
          if (Array.isArray(val)) {
            // Se for array de objetos (ex: articles, programs, indicators, items)
            val.forEach((item, index) => {
              if (typeof item === 'object' && item !== null) {
                Object.assign(keys, this.flattenKeys(item, `${fullKey}[${index}]`));
              } else {
                keys[`${fullKey}[${index}]`] = item;
              }
            });
          } else {
            Object.assign(keys, this.flattenKeys(val, fullKey));
          }
        } else {
          keys[fullKey] = val;
        }
      }
      return keys;
    }

    loadModule(lang, moduleName) {
      if (fs && path) {
        const filePath = path.join(this.langDir, lang, `${moduleName}.json`);
        if (!fs.existsSync(filePath)) {
          throw new Error(`Arquivo não encontrado: ${filePath}`);
        }
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
      }
      throw new Error('Ambiente de arquivo local não disponível');
    }

    validate() {
      const results = {
        baseLang: this.baseLang,
        scores: {},
        missingKeysByLang: {},
        extraKeysByLang: {},
        invalidValuesByLang: {},
        totalBaseKeys: 0,
        totalMissing: 0,
        totalExtra: 0,
        totalInvalid: 0,
        success: true
      };

      // 1. Carrega e achata todas as chaves do idioma base (pt-BR)
      const baseKeys = {};
      this.modules.forEach(mod => {
        const data = this.loadModule(this.baseLang, mod);
        const flattened = this.flattenKeys(data, mod);
        Object.assign(baseKeys, flattened);
      });

      const baseKeyList = Object.keys(baseKeys);
      results.totalBaseKeys = baseKeyList.length;
      results.scores[this.baseLang] = 100;

      // 2. Compara com cada idioma alvo
      this.targetLangs.forEach(lang => {
        const langKeys = {};
        this.modules.forEach(mod => {
          try {
            const data = this.loadModule(lang, mod);
            const flattened = this.flattenKeys(data, mod);
            Object.assign(langKeys, flattened);
          } catch (e) {
            // Módulo ausente
          }
        });

        const missing = [];
        const invalid = [];
        const extra = [];

        // Verifica chaves que deveriam existir
        baseKeyList.forEach(k => {
          if (!(k in langKeys)) {
            missing.push(k);
          } else {
            const v = langKeys[k];
            if (v === '' || v === null || v === undefined) {
              invalid.push(k);
            }
          }
        });

        // Verifica chaves excedentes não existentes na base
        Object.keys(langKeys).forEach(k => {
          if (!(k in baseKeys)) {
            extra.push(k);
          }
        });

        results.missingKeysByLang[lang] = missing;
        results.extraKeysByLang[lang] = extra;
        results.invalidValuesByLang[lang] = invalid;

        results.totalMissing += missing.length;
        results.totalExtra += extra.length;
        results.totalInvalid += invalid.length;

        const validCount = baseKeyList.length - missing.length - invalid.length;
        const score = Math.max(0, Math.round((validCount / baseKeyList.length) * 100));
        results.scores[lang] = score;

        if (missing.length > 0 || invalid.length > 0) {
          results.success = false;
        }
      });

      return results;
    }

    formatReport(results) {
      let lines = [];
      lines.push('i18n validation\n');

      lines.push(`${results.baseLang}  ✓ ${results.scores[results.baseLang]}%`);
      this.targetLangs.forEach(l => {
        const check = results.scores[l] === 100 ? '✓' : '✗';
        lines.push(`${l}  ${check} ${results.scores[l]}%`);
      });

      lines.push('');
      lines.push(`Missing keys: ${results.totalMissing}`);
      lines.push(`Extra keys: ${results.totalExtra}`);
      lines.push(`Invalid values: ${results.totalInvalid}`);

      if (!results.success) {
        lines.push('');
        this.targetLangs.forEach(l => {
          const miss = results.missingKeysByLang[l];
          const inv = results.invalidValuesByLang[l];
          if (miss && miss.length > 0) {
            lines.push(`\n${l}\nMissing:`);
            miss.slice(0, 10).forEach(m => lines.push(`  - ${m}`));
            if (miss.length > 10) lines.push(`  ... e mais ${miss.length - 10} chaves.`);
          }
          if (inv && inv.length > 0) {
            lines.push(`\n${l}\nInvalid/Empty:`);
            inv.slice(0, 5).forEach(m => lines.push(`  - ${m}`));
          }
        });
        lines.push('\n❌ INTERNATIONALIZATION FAILED');
      } else {
        lines.push('\n🎉 100% DAS CHAVES E CONTEÚDOS TRADUZIDOS COM SUCESSO!');
      }

      return lines.join('\n');
    }
  }

  return I18nValidator;
}));
