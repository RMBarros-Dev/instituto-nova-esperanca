/**
 * INSTITUTO NOVA ESPERANÇA — TRANSPARÊNCIA ATIVA V7.2+
 * Dashboard Financeiro Completo: Receitas, Despesas, Comparativos e Tabela Acessível
 * Fonte Única da Verdade: assets/data/transparency.json
 */

(function () {
  let currentYear = '2026';
  let transparencyData = null;

  const REVENUE_LABELS = {
    donations: { pt: 'Doações Individuais', en: 'Individual Donations', es: 'Donaciones Individuales', fr: 'Dons Individuels', de: 'Einzelspenden', ja: '個人寄付' },
    partnerships: { pt: 'Parcerias Institucionais', en: 'Institutional Partnerships', es: 'Alianzas Institucionales', fr: 'Partenariats Institutionnels', de: 'Institutionelle Partnerschaften', ja: '機関パートナーシップ' },
    grants: { pt: 'Editais e Fundações', en: 'Grants & Foundations', es: 'Convocatorias y Fundaciones', fr: 'Appels à Projets & Fondations', de: 'Ausschreibungen & Stiftungen', ja: '助成金・財団' },
    corporate: { pt: 'Investimento Social Corporativo (ESG)', en: 'Corporate Social Investment (ESG)', es: 'Inversión Social Corporativa (ESG)', fr: 'Investissement Social d\'Entreprise', de: 'Unternehmenssozialinvestitionen', ja: '企業社会的投資' },
    other: { pt: 'Rendimentos e Outras Receitas', en: 'Interest & Other Revenues', es: 'Rendimientos y Otros Ingresos', fr: 'Intérêts & Autres Revenus', de: 'Erträge & Sonstige Einnahmen', ja: 'その他収入' }
  };

  const EXPENSE_LABELS = {
    projects: { pt: 'Projetos Socioeducativos (Atividade-fim)', en: 'Social & Educational Projects (Direct Impact)', es: 'Proyectos Socioeducativos (Actividad Principal)', fr: 'Projets Socio-éducatifs (Impact Direct)', de: 'Sozial- & Bildungsprojekte (Direkte Wirkung)', ja: '社会教育プロジェクト（直接事業）' },
    administrative: { pt: 'Governança e Administração', en: 'Governance & Administration', es: 'Gobernanza y Administración', fr: 'Gouvernance & Administration', de: 'Governance & Verwaltung', ja: '管理・ガバナンス' },
    fundraising: { pt: 'Captação de Recursos (Fundraising)', en: 'Fundraising & Donor Relations', es: 'Captación de Fondos', fr: 'Collecte de Fonds', de: 'Mittelbeschaffung (Fundraising)', ja: '資金調達（ファンドレイジング）' },
    communication: { pt: 'Comunicação e Relatórios Públicos', en: 'Communication & Public Reports', es: 'Comunicación e Informes Públicos', fr: 'Communication & Rapports Publics', de: 'Kommunikation & Berichte', ja: '広報・年次報告' },
    operations: { pt: 'Operações e Manutenção Predial', en: 'Operations & Facilities', es: 'Operaciones e Instalaciones', fr: 'Opérations & Infrastructures', de: 'Betrieb & Instandhaltung', ja: '施設管理・運営' }
  };

  const REVENUE_KEYS_MAP = {
    donations: 'individual_donations',
    partnerships: 'institutional_partnerships',
    grants: 'public_grants',
    corporate: 'corporate_esg',
    other: 'investments_other'
  };

  function getRevenueLabel(key) {
    if (window.i18n && typeof window.i18n.getModule === 'function') {
      const mod = window.i18n.getModule('transparency');
      const mapped = REVENUE_KEYS_MAP[key] || key;
      if (mod && mod.revenue_section && mod.revenue_section.categories && mod.revenue_section.categories[mapped]) {
        return mod.revenue_section.categories[mapped];
      }
    }
    const lang = getLangPrefix();
    return (REVENUE_LABELS[key] && REVENUE_LABELS[key][lang]) || (REVENUE_LABELS[key] && REVENUE_LABELS[key]['pt']) || key;
  }

  function getExpenseLabel(key) {
    if (window.i18n && typeof window.i18n.getModule === 'function') {
      const mod = window.i18n.getModule('transparency');
      if (mod && mod.expense_section && mod.expense_section.categories && mod.expense_section.categories[key]) {
        return mod.expense_section.categories[key];
      }
    }
    const lang = getLangPrefix();
    return (EXPENSE_LABELS[key] && EXPENSE_LABELS[key][lang]) || (EXPENSE_LABELS[key] && EXPENSE_LABELS[key]['pt']) || key;
  }

  function getLangPrefix() {
    const code = window.currentLangFormat || 'pt-BR';
    return code.substring(0, 2);
  }

  function formatBRL(val) {
    if (window.formatCurrency) {
      return window.formatCurrency(val, 'BRL');
    }
    return `R$ ${new Intl.NumberFormat('pt-BR').format(val)}`;
  }

  function formatNumber(val) {
    return new Intl.NumberFormat(window.currentLangFormat || 'pt-BR').format(val);
  }

  async function loadData() {
    const mount = document.getElementById('transparency-dashboard-mount');
    if (mount) {
      mount.innerHTML = `
        <div class="state-container state-loading" role="status">
          <div class="state-spinner" aria-hidden="true"></div>
          <p class="state-title">Carregando demonstrativos de transparência...</p>
        </div>
      `;
    }

    try {
      const resolve = (p) => window.MediaManager ? window.MediaManager.resolvePath(p) : p;
      const res = await fetch(resolve('assets/data/transparency.json'));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      transparencyData = await res.json();
      renderTransparency();
    } catch (e) {
      console.error('[Transparência] Erro ao carregar JSON:', e);
      if (mount) {
        mount.innerHTML = `
          <div class="state-container state-error" role="alert">
            <span class="state-error-icon">⚠️</span>
            <h3 class="state-title">Erro ao carregar dados financeiros</h3>
            <p class="state-desc">Não foi possível obter o balanço auditado. Verifique sua conexão e tente novamente.</p>
            <button type="button" class="btn btn-primary btn-sm" id="btn-retry-transp">Tentar novamente</button>
          </div>
        `;
        const btn = document.getElementById('btn-retry-transp');
        if (btn) btn.addEventListener('click', loadData);
      }
    }
  }

  function renderTransparency() {
    if (!transparencyData || !transparencyData[currentYear]) return;
    const data = transparencyData[currentYear];

    // 1. Atualizar Stat Cards
    const revEl = document.getElementById('transp-total-revenue');
    const appEl = document.getElementById('transp-total-applied');
    const effEl = document.getElementById('transp-efficiency-rate');
    const benEl = document.getElementById('transp-total-beneficiaries');

    if (revEl) revEl.textContent = formatBRL(data.revenue);
    if (appEl) appEl.textContent = formatBRL(data.applied);
    if (effEl) effEl.textContent = data.efficiency_rate + '%';
    if (benEl) benEl.textContent = formatNumber(data.beneficiaries);

    // 2. Gráfico de Destinação / Despesas
    const chartContainer = document.getElementById('transparency-bar-chart');
    if (chartContainer && data.expenses) {
      const totalExp = Object.values(data.expenses).reduce((a, b) => a + b, 0);
      const expenseKeys = [
        { key: 'projects', color: '#075E54' },
        { key: 'administrative', color: '#2A9D8F' },
        { key: 'fundraising', color: '#B8860B' }
      ];

      let svgHtml = `<div class="chart-bars-list">`;
      expenseKeys.forEach(item => {
        const val = data.expenses[item.key] || 0;
        const pct = totalExp > 0 ? (val / totalExp) * 100 : 0;
        const label = getExpenseLabel(item.key);

        svgHtml += `
          <div class="chart-bar-item">
            <div class="chart-bar-header">
              <span class="chart-bar-label">${label}</span>
              <span class="chart-bar-value" style="color: ${item.color}; font-weight: 700;">${formatBRL(val)} (${pct.toFixed(1)}%)</span>
            </div>
            <div class="chart-bar-track" role="progressbar" aria-valuenow="${pct.toFixed(1)}" aria-valuemin="0" aria-valuemax="100" aria-label="${label}: ${pct.toFixed(1)}%">
              <div class="chart-bar-fill" style="width: ${pct}%; background-color: ${item.color};"></div>
            </div>
          </div>
        `;
      });
      svgHtml += `</div>`;
      chartContainer.innerHTML = svgHtml;
    }

    // 3. Atualizar Tabela Acessível (WCAG AAA)
    const tableBody = document.querySelector('#transparency-data-table tbody');
    const tableTotal = document.getElementById('table-total-value');
    const tableTotalPct = document.getElementById('table-total-percent');
    if (tableBody && data.expenses) {
      const totalExp = Object.values(data.expenses).reduce((a, b) => a + b, 0);
      const rows = Object.entries(data.expenses).map(([k, val]) => {
        const label = getExpenseLabel(k);
        const pct = totalExp > 0 ? (val / totalExp) * 100 : 0;
        return `
          <tr>
            <th scope="row" style="text-align: left; font-weight: 600;">${label}</th>
            <td style="text-align: right; font-variant-numeric: tabular-nums;">${formatBRL(val)}</td>
            <td style="text-align: right; font-variant-numeric: tabular-nums; font-weight: 700;">${pct.toFixed(1)}%</td>
          </tr>
        `;
      }).join('');
      tableBody.innerHTML = rows;
    }
    if (tableTotal) {
      tableTotal.textContent = formatBRL(data.applied);
    }
    if (tableTotalPct) {
      tableTotalPct.textContent = '100.0%';
    }

    // 4. Origem de Receitas (Breakdown)
    const revenueMount = document.getElementById('transparency-revenue-breakdown');
    if (revenueMount && data.revenue_breakdown) {
      const totalRev = data.revenue;
      let revHtml = `<div class="chart-bars-list">`;
      Object.entries(data.revenue_breakdown).forEach(([k, val]) => {
        const label = getRevenueLabel(k);
        const pct = (val / totalRev) * 100;
        revHtml += `
          <div class="chart-bar-item">
            <div class="chart-bar-header">
              <span class="chart-bar-label">${label}</span>
              <span class="chart-bar-value" style="color: var(--primary);">${formatBRL(val)} (${pct.toFixed(1)}%)</span>
            </div>
            <div class="chart-bar-track">
              <div class="chart-bar-fill" style="width: ${pct}%; background-color: var(--primary);"></div>
            </div>
          </div>
        `;
      });
      revHtml += `</div>`;
      revenueMount.innerHTML = revHtml;
    }
  }

  function initTransparency() {
    document.querySelectorAll('[data-transp-year]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-transp-year]').forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-checked', 'true');
        currentYear = btn.getAttribute('data-transp-year');
        renderTransparency();
      });
    });

    window.addEventListener('languageChanged', () => {
      renderTransparency();
    });

    loadData();
  }

  document.addEventListener('DOMContentLoaded', initTransparency);
})();
