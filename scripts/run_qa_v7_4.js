/**
 * INSTITUTO NOVA ESPERANÇA — QA GATE
 * Executa validadores reais e informa somente resultados observados nesta execução.
 * Os checks heurísticos não substituem uma auditoria completa de conformidade WCAG.
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const steps = [
  { name: 'Rotas & Páginas', script: 'scripts/validate_routes.js' },
  { name: 'Imagens & Mídias Resilientes', script: 'scripts/validate_images.js' },
  { name: 'Links Internos', script: 'scripts/validate_links.js' },
  { name: 'Semântica HTML & IDs', script: 'scripts/validate_html.js' },
  { name: 'Internacionalização & Conteúdo', script: 'scripts/validate_content.js' },
  { name: 'Metadados & SEO', script: 'scripts/validate_seo.js' },
  { name: 'Verificações heurísticas de acessibilidade', script: 'scripts/validate_accessibility.js' }
];

function collectJavaScriptFiles(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) collectJavaScriptFiles(fullPath, files);
    else if (entry.isFile() && entry.name.endsWith('.js')) files.push(fullPath);
  }
  return files;
}

console.log('==============================================================');
console.log('INSTITUTO NOVA ESPERANÇA — QA GATE');
console.log('==============================================================');

let passedSuites = 0;
let failedSuites = 0;

for (const step of steps) {
  process.stdout.write(`[QA] ${step.name}: `);
  try {
    const output = execFileSync(process.execPath, [step.script], {
      cwd: ROOT_DIR,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    });
    passedSuites++;
    console.log('PASS');
    if (output.trim()) console.log(output.trim());
  } catch (error) {
    failedSuites++;
    console.error('FAIL');
    if (error.stdout) console.error(error.stdout.toString());
    if (error.stderr) console.error(error.stderr.toString());
  }
}

const jsFiles = collectJavaScriptFiles(ROOT_DIR);
let syntaxErrors = 0;
for (const file of jsFiles) {
  try {
    execFileSync(process.execPath, ['--check', file], { cwd: ROOT_DIR, stdio: 'pipe' });
  } catch (error) {
    syntaxErrors++;
    console.error(`[JS SYNTAX] ${path.relative(ROOT_DIR, file)}`);
    if (error.stderr) console.error(error.stderr.toString());
  }
}

console.log('');
console.log('-------------------- EXECUTION SUMMARY --------------------');
console.log(`Validator suites passed: ${passedSuites}/${steps.length}`);
console.log(`Validator suites failed: ${failedSuites}`);
console.log(`JavaScript files checked: ${jsFiles.length}`);
console.log(`JavaScript syntax errors: ${syntaxErrors}`);
console.log('Accessibility checks are heuristic and do not certify WCAG conformance.');

const success = failedSuites === 0 && syntaxErrors === 0 && jsFiles.length > 0;
console.log(`BUILD STATUS: ${success ? 'PASS' : 'FAIL'}`);
process.exit(success ? 0 : 1);
