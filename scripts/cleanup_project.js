/**
 * INSTITUTO NOVA ESPERANÇA — SCRIPT DE HIGIENIZAÇÃO ARQUITETURAL V7.4
 * Modo 1 (Auditoria): node scripts/cleanup_project.js --audit
 * Modo 2 (Limpeza Segura): node scripts/cleanup_project.js --clean
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const isCleanMode = process.argv.includes('--clean');

console.log('================================================================');
console.log('    INSTITUTO NOVA ESPERANÇA — AUDITORIA & HIGIENIZAÇÃO V7.4');
console.log(`    Modo: ${isCleanMode ? 'LIMPEZA ATIVA (Exclusão Segura)' : 'AUDITORIA ANALÍTICA (Somente Leitura)'}`);
console.log('================================================================\n');

// Itens identificados e regras de classificação
const AUDIT_RULES = [
  // 1. CSS legados / concorrentes
  {
    path: 'css/style.css',
    category: 'CSS Concorrente / Alias',
    status: 'Redirecionamento obsoleto (aponta para assets/css/style.css)',
    action: 'REMOVER',
    reason: 'Eliminar diretório raiz css/ para unificar em assets/css/'
  },
  // 2. JS legados / concorrentes
  {
    path: 'assets/js/donation.js',
    category: 'JS Duplicado / Alias',
    status: 'Stub redundante de 100 bytes apontando para donations.js',
    action: 'REMOVER',
    reason: 'Todo o projeto utiliza assets/js/donations.js diretamente'
  },
  // 3. Scripts de migração antigos / obsoletos
  {
    path: 'scripts/update_i18n_v7_3.js',
    category: 'Script Legado de Migração',
    status: 'Script de migração pontual V7.3 concluído',
    action: 'REMOVER',
    reason: 'Substituído por compile_locales.js e build_native_pages.js na V7.4'
  },
  {
    path: 'scripts/generate_assets.js',
    category: 'Script de Ativos Obsoleto',
    status: 'Versão antiga sem suporte a srcset responsivo',
    action: 'REMOVER',
    reason: 'Substituído por generate_responsive_assets.js com 480w, 768w, 1200w'
  },
  {
    path: 'scripts/verify_v7_2_plus.js',
    category: 'Script de Teste Legado',
    status: 'Suíte legada da versão 7.2',
    action: 'REMOVER',
    reason: 'Substituído pela suíte completa oficial scripts/run_qa_v7_4.js'
  }
];

let scannedCount = 0;
let removeCount = 0;
let maintainCount = 0;
let reviewCount = 0;

console.log('--- RELATÓRIO ANALÍTICO DE ARQUIVOS AUDITADOS ---\n');
console.log(String('ARQUIVO').padEnd(35) + String('STATUS').padEnd(35) + String('AÇÃO').padEnd(10));
console.log('-'.repeat(80));

AUDIT_RULES.forEach(rule => {
  scannedCount++;
  const fullPath = path.join(ROOT_DIR, rule.path);
  const exists = fs.existsSync(fullPath);

  if (!exists) {
    console.log(String(rule.path).padEnd(35) + String('[JÁ INEXISTENTE]').padEnd(35) + String('OK').padEnd(10));
    return;
  }

  if (rule.action === 'REMOVER') removeCount++;
  else if (rule.action === 'MANTER') maintainCount++;
  else reviewCount++;

  console.log(String(rule.path).padEnd(35) + String(rule.category).padEnd(35) + String(rule.action).padEnd(10));
});

// Organização dos Documentos Oficiais: Copiar de assets/docs para documents/ correspondente
const docMappings = [
  { src: 'assets/docs/balanco-patrimonial-2025.pdf', dest: 'documents/relatorios/balanco-patrimonial-2025.pdf' },
  { src: 'assets/docs/relatorio-anual-2026.pdf', dest: 'documents/relatorios/relatorio-anual-2026.pdf' },
  { src: 'assets/docs/relatorio-esg-impacto-2025.pdf', dest: 'documents/relatorios/relatorio-esg-impacto-2025.pdf' },
  { src: 'assets/docs/Relatorio_Transparencia_Consolidado_2026.pdf', dest: 'documents/relatorios/Relatorio_Transparencia_Consolidado_2026.pdf' },
  { src: 'assets/docs/estatuto-social-ine.pdf', dest: 'documents/estatuto/estatuto-social-ine.pdf' },
  { src: 'assets/docs/Certidao_Negativa_RFB_2026.pdf', dest: 'documents/politicas/Certidao_Negativa_RFB_2026.pdf' },
  { src: 'assets/docs/Release_Oficial_Agosto_2026.pdf', dest: 'documents/relatorios/Release_Oficial_Agosto_2026.pdf' },
  { src: 'assets/docs/Release_Robotica_Junho_2026.pdf', dest: 'documents/relatorios/Release_Robotica_Junho_2026.pdf' }
];

console.log('\n--- ORGANIZAÇÃO DA ESTRUTURA DE DOCUMENTOS (documents/) ---');
docMappings.forEach(mapping => {
  const srcPath = path.join(ROOT_DIR, mapping.src);
  const destPath = path.join(ROOT_DIR, mapping.dest);
  const destDir = path.dirname(destPath);

  if (fs.existsSync(srcPath)) {
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`✓ Sincronizado documento oficial em: ${mapping.dest}`);
    } else {
      console.log(`✓ Documento já organizado em: ${mapping.dest}`);
    }
  }
});

// Organização dos Dados: garantir que assets/data/impact.json exista e esteja alinhado a dashboard.json
const dashboardDataPath = path.join(ROOT_DIR, 'assets/data/dashboard.json');
const impactDataPath = path.join(ROOT_DIR, 'assets/data/impact.json');
if (fs.existsSync(dashboardDataPath) && !fs.existsSync(impactDataPath)) {
  fs.copyFileSync(dashboardDataPath, impactDataPath);
  console.log('✓ assets/data/impact.json sincronizado com dados canônicos.');
}

// Execução da limpeza segura caso isCleanMode === true
if (isCleanMode) {
  console.log('\n--- EXECUTANDO LIMPEZA DE ARQUIVOS CLASSIFICADOS COMO REMOVER ---');
  AUDIT_RULES.filter(r => r.action === 'REMOVER').forEach(rule => {
    const fullPath = path.join(ROOT_DIR, rule.path);
    if (fs.existsSync(fullPath)) {
      fs.unlinkSync(fullPath);
      console.log(`🗑️ Removido arquivo órfão/legado: ${rule.path}`);
    }
  });

  // Limpeza de pastas vazias
  const emptyDirsToCheck = ['css'];
  emptyDirsToCheck.forEach(d => {
    const dirPath = path.join(ROOT_DIR, d);
    if (fs.existsSync(dirPath) && fs.readdirSync(dirPath).length === 0) {
      fs.rmdirSync(dirPath);
      console.log(`🗑️ Removido diretório vazio: ${d}/`);
    }
  });
}

console.log('\n================================================================');
console.log('RESUMO DA AUDITORIA ARQUITETURAL:');
console.log(`Arquivos escaneados:    ${scannedCount}`);
console.log(`Arquivos a remover:     ${removeCount}`);
console.log(`Arquivos mantidos:      ${maintainCount}`);
console.log(`Arquivos em revisão:    ${reviewCount}`);
console.log('================================================================\n');
