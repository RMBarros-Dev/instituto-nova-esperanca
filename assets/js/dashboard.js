/**
 * INSTITUTO NOVA ESPERANÇA — SOCIAL IMPACT DASHBOARD V7.2+
 * Painel Multi-Anual (2023–2026), Indicadores, Gráficos SVG e Tabela Acessível
 * Fonte Única da Verdade: assets/data/dashboard.json
 */

(function () {
  let impactData = null;
  let currentYear = '2026';
  let currentView = 'annual'; // 'annual' | 'monthly'

  const INDICATOR_CONFIG = [
    { key: 'beneficiaries', labelKey: 'dash_beneficiaries', defaultLabel: 'Pessoas Atendidas', icon: '👥', format: 'number' },
    { key: 'families', labelKey: 'dash_families', defaultLabel: 'Famílias Beneficiadas', icon: '🏠', format: 'number' },
    { key: 'meals_served', labelKey: 'dash_meals', defaultLabel: 'Refeições Distribuídas', icon: '🍲', format: 'number' },
    { key: 'pedagogical_kits', labelKey: 'dash_kits', defaultLabel: 'Kits Pedagógicos', icon: '🎒', format: 'number' },
    { key: 'active_volunteers', labelKey: 'dash_volunteers', defaultLabel: 'Voluntários Ativos', icon: '🤝', format: 'number' },
    { key: 'active_projects', labelKey: 'dash_projects', defaultLabel: 'Projetos Estruturantes', icon: '🌱', format: 'number' },
    { key: 'municipalities_reached', labelKey: 'dash_municipalities', defaultLabel: 'Municípios Alcançados', icon: '📍', format: 'number' },
    { key: 'volunteer_hours', labelKey: 'dash_hours', defaultLabel: 'Horas de Voluntariado', icon: '⏱️', format: 'number' },
    { key: 'funds_destined_projects', labelKey: 'dash_funds', defaultLabel: 'Recursos em Projetos', icon: '💰', format: 'currency' }
  ];

  function formatVal(value, type) {
    const lang = window.currentLangFormat || 'pt-BR';
    if (type === 'currency') {
      return window.formatCurrency ? window.formatCurrency(value, 'BRL') : `R$ ${new Intl.NumberFormat(lang).format(value)}`;
    }
    return new Intl.NumberFormat(lang).format(value);
  }

  function getLabel(config) {
    if (window.i18n && window.i18n.get) {
      const translated = window.i18n.get(config.labelKey);
      if (translated) return translated;
    }
    return config.defaultLabel;
  }

  async function loadData() {
    const container = document.getElementById('impact-dashboard-mount');
    if (!container) return;

    renderState(container, 'loading');

    try {
      const res = await fetch('assets/data/dashboard.json');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      impactData = await res.json();
      renderDashboard();
    } catch (err) {
      console.error('[ImpactDashboard] Erro ao carregar dados:', err);
      const isOffline = !navigator.onLine;
      renderState(container, isOffline ? 'offline' : 'error', {
        onRetry: () => loadData()
      });
    }
  }

  function renderState(container, state, options = {}) {
    if (!container) return;
    if (state === 'loading') {
      container.innerHTML = `
        <div class="state-container state-loading" role="status" aria-live="polite">
          <div class="state-spinner" aria-hidden="true"></div>
          <p class="state-title" data-i18n="state_loading">Carregando indicadores de impacto...</p>
        </div>
      `;
    } else if (state === 'error') {
      container.innerHTML = `
        <div class="state-container state-error" role="alert">
          <span class="state-error-icon">⚠️</span>
          <h3 class="state-title" data-i18n="state_error_title">Não foi possível carregar os dados</h3>
          <p class="state-desc" data-i18n="state_error_desc">Ocorreu um erro ao obter os indicadores. Por favor, tente novamente.</p>
          <button type="button" class="btn btn-primary btn-sm" id="btn-retry-impact" data-i18n="btn_retry">Tentar novamente</button>
        </div>
      `;
      const retryBtn = document.getElementById('btn-retry-impact');
      if (retryBtn && options.onRetry) retryBtn.addEventListener('click', options.onRetry);
    } else if (state === 'offline') {
      container.innerHTML = `
        <div class="state-container state-offline" role="alert">
          <span class="state-error-icon">📡</span>
          <h3 class="state-title" data-i18n="state_offline_title">Você está desconectado</h3>
          <p class="state-desc" data-i18n="state_offline_desc">Verifique sua conexão com a internet para visualizar os dados atualizados.</p>
          <button type="button" class="btn btn-primary btn-sm" id="btn-retry-impact" data-i18n="btn_retry">Tentar novamente</button>
        </div>
      `;
      const retryBtn = document.getElementById('btn-retry-impact');
      if (retryBtn && options.onRetry) retryBtn.addEventListener('click', options.onRetry);
    }
  }

  function renderDashboard() {
    const container = document.getElementById('impact-dashboard-mount');
    if (!container || !impactData || !impactData[currentYear]) return;

    const data = impactData[currentYear];
    const metrics = data.metrics;
    const growth = data.growth_vs_previous_year || {};

    let html = `
      <!-- Seletor de Anos e Status -->
      <div class="dashboard-header-bar">
        <div>
          <span class="badge badge-primary">${data.status}</span>
          <h3 class="mt-xs">Exercício Fiscal e Social ${currentYear}</h3>
        </div>
        <div class="year-timeline-selector" role="radiogroup" aria-label="Selecione o ano para análise">
          ${['2026', '2025', '2024', '2023'].map(y => `
            <button type="button" class="year-pill-btn ${y === currentYear ? 'is-active' : ''}" 
                    data-year-select="${y}" role="radio" aria-checked="${y === currentYear}">
              ${y}${y === '2026' ? ' (Meta)' : ''}
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Grid dos 9 Indicadores -->
      <div class="impact-metrics-grid">
        ${INDICATOR_CONFIG.map(cfg => {
          const val = metrics[cfg.key];
          const hasGrowth = cfg.key === 'beneficiaries' && growth.beneficiaries;
          return `
            <div class="metric-card-enhanced">
              <div class="metric-card-header">
                <span class="metric-icon-badge" aria-hidden="true">${cfg.icon}</span>
                ${hasGrowth ? `<span class="growth-badge positive">+${growth.beneficiaries}%</span>` : ''}
              </div>
              <div class="metric-card-value">${formatVal(val, cfg.format)}</div>
              <div class="metric-card-label">${getLabel(cfg)}</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Gráfico de Evolução Anual (2023–2026) -->
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3 class="chart-title">Evolução do Alcance Social (2023–2026)</h3>
            <p class="chart-subtitle">Crescimento contínuo do número total de pessoas atendidas e investimento aplicado.</p>
          </div>
        </div>

        <div class="chart-svg-container" role="img" aria-label="Gráfico de evolução anual de pessoas atendidas de 2023 a 2026">
          <svg viewBox="0 0 760 260" width="100%" height="100%" style="overflow: visible;">
            <!-- Linhas de Apoio -->
            <line x1="60" y1="40" x2="720" y2="40" stroke="#E5E8E7" stroke-dasharray="4"/>
            <line x1="60" y1="90" x2="720" y2="90" stroke="#E5E8E7" stroke-dasharray="4"/>
            <line x1="60" y1="140" x2="720" y2="140" stroke="#E5E8E7" stroke-dasharray="4"/>
            <line x1="60" y1="190" x2="720" y2="190" stroke="#E5E8E7" stroke-dasharray="4"/>
            <line x1="60" y1="210" x2="720" y2="210" stroke="#17211F" stroke-width="2"/>

            <!-- Traçado da Linha -->
            <polyline fill="none" stroke="#075E54" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"
                      points="120,195 300,165 480,120 660,50" />

            <!-- Pontos e Labels -->
            <!-- 2023 -->
            <circle cx="120" cy="195" r="7" fill="#075E54" />
            <text x="120" y="180" fill="#075E54" font-weight="800" font-size="13" text-anchor="middle">3.100</text>
            <text x="120" y="232" fill="#5E6B67" font-weight="700" font-size="13" text-anchor="middle">2023</text>

            <!-- 2024 -->
            <circle cx="300" cy="165" r="7" fill="#075E54" />
            <text x="300" y="150" fill="#075E54" font-weight="800" font-size="13" text-anchor="middle">6.540</text>
            <text x="300" y="232" fill="#5E6B67" font-weight="700" font-size="13" text-anchor="middle">2024</text>

            <!-- 2025 -->
            <circle cx="480" cy="120" r="7" fill="#075E54" />
            <text x="480" y="105" fill="#075E54" font-weight="800" font-size="13" text-anchor="middle">9.230</text>
            <text x="480" y="232" fill="#5E6B67" font-weight="700" font-size="13" text-anchor="middle">2025</text>

            <!-- 2026 -->
            <circle cx="660" cy="50" r="9" fill="#E76F51" />
            <text x="660" y="32" fill="#E76F51" font-weight="800" font-size="14" text-anchor="middle">12.480</text>
            <text x="660" y="232" fill="#17211F" font-weight="800" font-size="13" text-anchor="middle">2026 (Meta)</text>
          </svg>
        </div>

        <!-- Tabela Semântica Acessível (WCAG 2.2 AAA) -->
        <div class="table-responsive">
          <table class="table" aria-label="Tabela consolidada de evolução de impacto social 2023 a 2026">
            <caption>Demonstrativo Histórico de Indicadores Sociais e Financeiros (2023–2026)</caption>
            <thead>
              <tr>
                <th scope="col">Ano</th>
                <th scope="col">Pessoas Atendidas</th>
                <th scope="col">Refeições Distribuídas</th>
                <th scope="col">Kits Pedagógicos</th>
                <th scope="col">Voluntários</th>
                <th scope="col">Recursos em Projetos (R$)</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              ${['2026', '2025', '2024', '2023'].map(yr => {
                const item = impactData[yr];
                const isSelected = yr === currentYear;
                return `
                  <tr style="${isSelected ? 'background-color: var(--primary-light); font-weight: 700;' : ''}">
                    <th scope="row">${yr}</th>
                    <td>${formatVal(item.metrics.beneficiaries, 'number')}</td>
                    <td>${formatVal(item.metrics.meals_served, 'number')}</td>
                    <td>${formatVal(item.metrics.pedagogical_kits, 'number')}</td>
                    <td>${formatVal(item.metrics.active_volunteers, 'number')}</td>
                    <td>${formatVal(item.metrics.funds_destined_projects, 'currency')}</td>
                    <td>${item.status}</td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Conectar eventos dos botões de ano
    container.querySelectorAll('[data-year-select]').forEach(btn => {
      btn.addEventListener('click', () => {
        currentYear = btn.getAttribute('data-year-select');
        renderDashboard();
      });
    });
  }

  function initImpactDashboard() {
    if (document.getElementById('impact-dashboard-mount')) {
      loadData();

      window.addEventListener('languageChanged', () => {
        if (impactData) renderDashboard();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initImpactDashboard);
})();
