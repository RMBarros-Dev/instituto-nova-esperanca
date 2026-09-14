const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve('c:/Users/monte/Projeto de Jardy-ONG');

console.log('=== TESTE 1: Integridade dos Arquivos JSON ===');
const jsonFiles = [
  'assets/data/transparency.json',
  'assets/data/dashboard.json',
  'assets/data/projects.json',
  'assets/data/blog.json',
  'assets/locales/pt-BR.json',
  'assets/locales/en-US.json',
  'assets/locales/es-ES.json',
  'assets/locales/fr-FR.json',
  'assets/locales/de-DE.json',
  'assets/locales/ja-JP.json'
];

let hasError = false;
jsonFiles.forEach(file => {
  const fullPath = path.join(root, file);
  try {
    const content = fs.readFileSync(fullPath, 'utf8');
    JSON.parse(content);
    console.log(`✓ [OK] ${file}`);
  } catch (err) {
    console.error(`✗ [ERRO] ${file}:`, err.message);
    hasError = true;
  }
});

console.log('\n=== TESTE 2: Consistência entre Dashboard e Transparência ===');
const transpData = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/transparency.json'), 'utf8'));
const dashData = JSON.parse(fs.readFileSync(path.join(root, 'assets/data/dashboard.json'), 'utf8'));

['2023', '2024', '2025', '2026'].forEach(year => {
  const tBen = transpData[year].beneficiaries;
  const dBen = dashData[year].metrics.beneficiaries;
  const tFunds = transpData[year].expenses.projects;
  const dFunds = dashData[year].metrics.funds_destined_projects;

  if (tBen === dBen) {
    console.log(`✓ [OK] Ano ${year} Beneficiários: ${tBen} (Transparência) === ${dBen} (Dashboard)`);
  } else {
    console.error(`✗ [ERRO] Ano ${year} Beneficiários divergem: ${tBen} !== ${dBen}`);
    hasError = true;
  }

  if (tFunds === dFunds) {
    console.log(`✓ [OK] Ano ${year} Recursos em Projetos: R$ ${tFunds} (Transparência) === R$ ${dFunds} (Dashboard)`);
  } else {
    console.error(`✗ [ERRO] Ano ${year} Recursos divergem: R$ ${tFunds} !== R$ ${dFunds}`);
    hasError = true;
  }
});

console.log('\n=== TESTE 3: Verificação de Sintaxe JavaScript ===');
const jsFiles = [
  'assets/js/main.js',
  'assets/js/i18n.js',
  'assets/js/a11y.js',
  'assets/js/media.js',
  'assets/js/forms.js',
  'assets/js/donations.js',
  'assets/js/dashboard.js',
  'assets/js/transparency.js',
  'assets/js/blog.js',
  'service-worker.js'
];

jsFiles.forEach(file => {
  const fullPath = path.join(root, file);
  try {
    execSync(`node --check "${fullPath}"`);
    console.log(`✓ [OK] Sintaxe JS válida: ${file}`);
  } catch (err) {
    console.error(`✗ [ERRO] Falha de sintaxe em ${file}:`, err.message);
    hasError = true;
  }
});

console.log('\n=== TESTE 4: Verificação dos Assets de Imagem ===');
const expectedImages = [
  'assets/img/projects/educacao.svg',
  'assets/img/projects/alimentacao.svg',
  'assets/img/projects/renda.svg',
  'assets/img/projects/comunidade.svg',
  'assets/img/institutions/placeholder.svg'
];
for (let i = 1; i <= 12; i++) {
  expectedImages.push(`assets/img/blog/artigo-${i}.svg`);
}

expectedImages.forEach(img => {
  const fullPath = path.join(root, img);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ [OK] Imagem presente: ${img}`);
  } else {
    console.error(`✗ [ERRO] Imagem ausente: ${img}`);
    hasError = true;
  }
});

if (hasError) {
  console.error('\n❌ Houve erros durante a validação!');
  process.exit(1);
} else {
  console.log('\n🎉 TODOS OS TESTES PASSARAM COM 100% DE SUCESSO!');
}
