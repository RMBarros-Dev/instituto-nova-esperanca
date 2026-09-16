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

// Itens identificados e regras de classificação rigorosa
const AUDIT_RULES = [
  // 1. Arquivos HTML legados da raiz (substituídos pelas 72 páginas nativas)
  {
    path: 'acessibilidade.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído pela barra a11y acessível e páginas nativas multilíngues'
  },
  {
    path: 'blog.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/blog.html, /en-US/blog.html, etc.'
  },
  {
    path: 'contato.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/contato.html, /en-US/contact.html, etc.'
  },
  {
    path: 'cookies.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Políticas integradas ao modal de privacidade e páginas nativas'
  },
  {
    path: 'doacoes.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/doacoes.html, /en-US/donations.html, etc.'
  },
  {
    path: 'empresas.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/empresas.html, /en-US/companies.html, etc.'
  },
  {
    path: 'faq.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/faq.html, /en-US/faq.html, etc.'
  },
  {
    path: 'impacto.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/impacto.html, /en-US/impact.html, etc.'
  },
  {
    path: 'imprensa.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/imprensa.html, /en-US/press.html, etc.'
  },
  {
    path: 'privacidade.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por modal de conformidade LGPD e páginas nativas'
  },
  {
    path: 'projetos.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/projetos.html, /en-US/projects.html, etc.'
  },
  {
    path: 'sobre.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/sobre.html, /en-US/about.html, etc.'
  },
  {
    path: 'transparencia.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/transparencia.html, /en-US/transparency.html, etc.'
  },
  {
    path: 'voluntariado.html',
    category: 'HTML Legado da Raiz',
    action: 'REMOVER',
    reason: 'Substituído por /pt-BR/voluntariado.html, /en-US/volunteering.html, etc.'
  },

  // 2. CSS legados / concorrentes
  {
    path: 'assets/css/inline-utils.css',
    category: 'CSS Legado / Utilitários Inúteis',
    action: 'REMOVER',
    reason: 'Classes .u-style-... legadas não utilizadas nas páginas nativas'
  },

  // 3. JS legados / concorrentes / duplicados
  {
    path: 'assets/js/a11y.js',
    category: 'JS Stub / Redundante',
    action: 'REMOVER',
    reason: 'Substituído pelo carregamento direto de assets/js/accessibility.js'
  },
  {
    path: 'assets/js/app.js',
    category: 'JS Duplicado',
    action: 'REMOVER',
    reason: 'Funcionalidade consolidada no orquestrador canônico assets/js/main.js'
  },
  {
    path: 'assets/js/metrics.js',
    category: 'JS Órfão Legado',
    action: 'REMOVER',
    reason: 'Count-up atendido com superioridade por assets/js/interactions.js'
  },
  {
    path: 'assets/js/services.js',
    category: 'JS Mock Legado',
    action: 'REMOVER',
    reason: 'Esqueleto mock sem consumo nas páginas ativas'
  }
];

// Organização dos Documentos Oficiais
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

console.log('--- ORGANIZAÇÃO DA ESTRUTURA DE DOCUMENTOS (documents/) ---');
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

let scannedCount = 0;
let removeCount = 0;
let alreadyGoneCount = 0;

console.log('\n--- RELATÓRIO ANALÍTICO DE ARQUIVOS AUDITADOS ---\n');
console.log(String('ARQUIVO').padEnd(35) + String('CATEGORIA').padEnd(32) + String('AÇÃO').padEnd(10));
console.log('-'.repeat(80));

AUDIT_RULES.forEach(rule => {
  scannedCount++;
  const fullPath = path.join(ROOT_DIR, rule.path);
  const exists = fs.existsSync(fullPath);

  if (!exists) {
    alreadyGoneCount++;
    console.log(String(rule.path).padEnd(35) + String('[JÁ INEXISTENTE]').padEnd(32) + String('OK').padEnd(10));
    return;
  }

  if (rule.action === 'REMOVER') removeCount++;
  console.log(String(rule.path).padEnd(35) + String(rule.category).padEnd(32) + String(rule.action).padEnd(10));
});

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

  // Limpeza da pasta assets/docs se todos os arquivos já foram migrados para documents/
  const assetsDocsDir = path.join(ROOT_DIR, 'assets', 'docs');
  if (fs.existsSync(assetsDocsDir)) {
    const files = fs.readdirSync(assetsDocsDir);
    files.forEach(f => {
      fs.unlinkSync(path.join(assetsDocsDir, f));
    });
    fs.rmdirSync(assetsDocsDir);
    console.log('🗑️ Removido diretório duplicado: assets/docs/');
  }

  // Limpeza de pastas vazias adicionais
  ['css'].forEach(d => {
    const dirPath = path.join(ROOT_DIR, d);
    if (fs.existsSync(dirPath) && fs.readdirSync(dirPath).length === 0) {
      fs.rmdirSync(dirPath);
      console.log(`🗑️ Removido diretório vazio: ${d}/`);
    }
  });
}

console.log('\n================================================================');
console.log('RESUMO DA AUDITORIA ARQUITETURAL:');
console.log(`Itens auditados:         ${scannedCount}`);
console.log(`Itens a remover:         ${removeCount}`);
console.log(`Itens já inexistentes:   ${alreadyGoneCount}`);
console.log('================================================================\n');
