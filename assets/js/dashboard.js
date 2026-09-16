/**
 * INSTITUTO NOVA ESPERANÇA — IMPACT DASHBOARD CONTROLLER V7.2+
 * Painel Multi-anual de Métricas de Impacto Social (2023–2026)
 * Conformidade com a Diretriz "🌐 INTERNATIONALIZATION — ZERO TOLERANCE"
 */

(function () {
  let impactData = null;
  let currentYear = '2026';

  const INDICATOR_CONFIG = [
    { key: 'beneficiaries', format: 'number', icon: '👥', defaultLabel: 'Pessoas Atendidas Diretamente' },
    { key: 'meals_served', format: 'number', icon: '🍲', defaultLabel: 'Refeições Balanceadas Distribuídas' },
    { key: 'pedagogical_kits', format: 'number', icon: '🎒', defaultLabel: 'Kits Pedagógicos Entregues' },
    { key: 'trained_women', format: 'number', icon: '👩‍💼', defaultLabel: 'Mulheres Capacitadas Profissionalmente' },
    { key: 'workshops_completed', format: 'number', icon: '🛠️', defaultLabel: 'Oficinas Socioeducativas Realizadas' },
    { key: 'active_volunteers', format: 'number', icon: '🤝', defaultLabel: 'Famílias Acompanhadas Continuamente' },
    { key: 'school_attendance_rate', format: 'percent', icon: '📈', defaultLabel: 'Frequência Escolar dos Alunos' },
    { key: 'retention_approval_rate', format: 'percent', icon: '🎓', defaultLabel: 'Índice de Retenção e Aprovação' },
    { key: 'funds_destined_projects', format: 'currency', icon: '💰', defaultLabel: 'Recursos Aplicados na Atividade-fim' }
  ];

  function formatVal(value, type) {
    if (value === undefined || value === null) return '—';
    if (type === 'percent') return `${value}%`;
    const lang = window.currentLangFormat || 'pt-BR';
    if (type === 'currency') {
      return window.formatCurrency ? window.formatCurrency(value, 'BRL') : `R$ ${new Intl.NumberFormat(lang).format(value)}`;
    }
    return new Intl.NumberFormat(lang).format(value);
  }

  function getLabel(config, mod) {
    if (mod && mod.indicators && mod.indicators[config.key]) {
      return mod.indicators[config.key];
    }
    if (window.i18n && window.i18n.get) {
      const translated = window.i18n.get(`impact.indicators.${config.key}`);
      if (translated) return translated;
    }
    return config.defaultLabel;
  }

  async function loadData() {
    const container = document.getElementById('impact-dashboard-mount');
    if (!container) return;

    renderState(container, 'loading');

    try {
      const resolve = (p) => window.MediaManager ? window.MediaManager.resolvePath(p) : p;
      const res = await fetch(resolve('assets/data/dashboard.json'));
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
    const i18n = window.i18n || { get: (k) => '' };

    if (state === 'loading') {
      container.innerHTML = `
        <div class="state-container state-loading" role="status" aria-live="polite">
          <div class="state-spinner" aria-hidden="true"></div>
          <p class="state-title">${i18n.get('common.states.loading') || 'Carregando indicadores de impacto...'}</p>
        </div>
      `;
    } else if (state === 'error') {
      container.innerHTML = `
        <div class="state-container state-error" role="alert">
          <span class="state-error-icon">⚠️</span>
          <h3 class="state-title">${i18n.get('common.states.error_title') || 'Não foi possível carregar os dados'}</h3>
          <p class="state-desc">${i18n.get('common.states.error_desc') || 'Ocorreu um erro ao obter os indicadores. Por favor, tente novamente.'}</p>
          <button type="button" class="btn btn-primary btn-sm" id="btn-retry-impact">${i18n.get('common.states.btn_retry') || 'Tentar novamente'}</button>
        </div>
      `;
      const retryBtn = document.getElementById('btn-retry-impact');
      if (retryBtn && options.onRetry) retryBtn.addEventListener('click', options.onRetry);
    } else if (state === 'offline') {
      container.innerHTML = `
        <div class="state-container state-offline" role="alert">
          <span class="state-error-icon">📡</span>
          <h3 class="state-title">${i18n.get('common.states.offline_title') || 'Você está desconectado'}</h3>
          <p class="state-desc">${i18n.get('common.states.offline_desc') || 'Verifique sua conexão com a internet para visualizar os dados atualizados.'}</p>
          <button type="button" class="btn btn-primary btn-sm" id="btn-retry-impact">${i18n.get('common.states.btn_retry') || 'Tentar novamente'}</button>
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
    const mod = window.i18n ? window.i18n.getModule('impact') : null;

    const yearPrefix = (mod && mod.fiscal_year_prefix) || 'Exercício Fiscal e Social';
    const statusTarget = (mod && mod.status_target) || 'Meta Anual';
    const statusAudited = (mod && mod.status_audited) || 'Auditado';
    const chartTitle = (mod && mod.chart && mod.chart.title) || 'Evolução do Alcance Social (2023–2026)';
    const chartSubtitle = (mod && mod.chart && mod.chart.subtitle) || 'Crescimento contínuo do número total de pessoas atendidas e investimento aplicado.';
    const chartAria = (mod && mod.chart && mod.chart.aria_label) || 'Gráfico de evolução anual de pessoas atendidas de 2023 a 2026';
    const timelineAria = (mod && mod.timeline_aria) || 'Selecione o ano para análise';

    const tableCaption = (mod && mod.table && mod.table.caption) || 'Demonstrativo Histórico de Indicadores Sociais e Financeiros (2023–2026)';

    const currentStatusText = currentYear === '2026' ? statusTarget : statusAudited;

    let html = `
      <!-- Seletor de Anos e Status -->
      <div class="dashboard-header-bar">
        <div>
          <span class="badge badge-primary">${currentStatusText}</span>
          <h3 class="mt-xs">${yearPrefix} ${currentYear}</h3>
        </div>
        <div class="year-timeline-selector" role="radiogroup" aria-label="${timelineAria}">
          ${['2026', '2025', '2024', '2023'].map(y => `
            <button type="button" class="year-pill-btn ${y === currentYear ? 'is-active' : ''}" 
                    data-year-select="${y}" role="radio" aria-checked="${y === currentYear}">
              ${y}${y === '2026' ? ` (${statusTarget})` : ''}
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
              <div class="metric-card-label">${getLabel(cfg, mod)}</div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Gráfico de Evolução Anual (2023–2026) -->
      <div class="chart-card">
        <div class="chart-header">
          <div>
            <h3 class="chart-title">${chartTitle}</h3>
            <p class="chart-subtitle">${chartSubtitle}</p>
          </div>
        </div>

        <div class="chart-svg-container" role="img" aria-label="${chartAria}">
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
            <text x="660" y="232" fill="#17211F" font-weight="800" font-size="13" text-anchor="middle">2026 (${statusTarget})</text>
          </svg>
        </div>

        <!-- Tabela Semântica Acessível (WCAG 2.2 AAA) -->
        <div class="table-responsive">
          <table class="table" aria-label="${chartAria}">
            <caption>${tableCaption}</caption>
            <thead>
              <tr>
                <th scope="col">${(mod && mod.table && mod.table.col_2023) ? 'Ano / Year' : 'Ano'}</th>
                <th scope="col">${getLabel(INDICATOR_CONFIG[0], mod)}</th>
                <th scope="col">${getLabel(INDICATOR_CONFIG[1], mod)}</th>
                <th scope="col">${getLabel(INDICATOR_CONFIG[2], mod)}</th>
                <th scope="col">${getLabel(INDICATOR_CONFIG[5], mod)}</th>
                <th scope="col">${getLabel(INDICATOR_CONFIG[8], mod)}</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              ${['2026', '2025', '2024', '2023'].map(yr => {
                const item = impactData[yr];
                const isSelected = yr === currentYear;
                const rowStatus = yr === '2026' ? statusTarget : statusAudited;
                return `
                  <tr style="${isSelected ? 'background-color: var(--primary-light); font-weight: 700;' : ''}">
                    <th scope="row">${yr}</th>
                    <td>${formatVal(item.metrics.beneficiaries, 'number')}</td>
                    <td>${formatVal(item.metrics.meals_served, 'number')}</td>
                    <td>${formatVal(item.metrics.pedagogical_kits, 'number')}</td>
                    <td>${formatVal(item.metrics.active_volunteers, 'number')}</td>
                    <td>${formatVal(item.metrics.funds_destined_projects, 'currency')}</td>
                    <td>${rowStatus}</td>
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
