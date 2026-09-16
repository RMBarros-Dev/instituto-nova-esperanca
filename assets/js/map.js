/**
 * INSTITUTO NOVA ESPERANÇA — MAPA TERRITORIAL INTERATIVO V7.3
 * Mapeamento Vetorial dos Polos de Atendimento com Salvaguarda Ética
 * Regra 35 & 84: Identificação estrita de "Localização Demonstrativa — MVP".
 */

(function () {
  let polosData = [];
  let activePoloId = null;

  async function loadPolos() {
    try {
      const resolve = (p) => window.MediaManager ? window.MediaManager.resolvePath(p) : p;
      const res = await fetch(resolve('assets/data/polos.json'));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      polosData = await res.json();
      renderMapAndTable();
    } catch (e) {
      console.error('[TerritorialMap] Erro ao carregar polos.json:', e);
    }
  }

  function renderMapAndTable() {
    const listContainer = document.getElementById('territorial-polos-list');
    const tableBody = document.querySelector('#territorial-data-table tbody');
    const activeDetails = document.getElementById('polo-active-details');

    if (!listContainer || polosData.length === 0) return;

    // 1. Renderiza lista interativa de polos
    listContainer.innerHTML = polosData.map((polo, idx) => {
      const isActive = polo.id === (activePoloId || polosData[0].id);
      return `
        <button type="button" class="polo-card-item ${isActive ? 'is-active' : ''}" 
                data-polo-id="${polo.id}" 
                role="tab" 
                aria-selected="${isActive ? 'true' : 'false'}"
                tabindex="0">
          <div class="polo-card-header">
            <span class="polo-icon" aria-hidden="true">📍</span>
            <div class="polo-title-group">
              <strong class="polo-title">${polo.name}</strong>
              <span class="polo-tagline">${polo.territory} • ${polo.bairro}</span>
            </div>
          </div>
          <div class="polo-badge-demo">Localização Demonstrativa — MVP</div>
        </button>
      `;
    }).join('');

    // 2. Renderiza detalhes do polo selecionado
    const selected = polosData.find(p => p.id === (activePoloId || polosData[0].id)) || polosData[0];
    if (activeDetails && selected) {
      activeDetails.innerHTML = `
        <div class="polo-detail-card card p-xl" style="background: var(--surface);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
            <div>
              <span class="badge badge-accent mb-xs">Homologação Técnica MVP</span>
              <h3 style="font-size: 1.35rem; font-weight: 800; color: var(--primary); margin-top: 0.25rem;">
                ${selected.name}
              </h3>
              <p style="font-size: 0.95rem; color: var(--text-muted); margin: 0;">${selected.address}</p>
            </div>
            <a href="https://maps.google.com/?q=${selected.coordinates[0]},${selected.coordinates[1]}" 
               target="_blank" rel="noopener noreferrer" 
               class="btn btn-outline btn-sm">
              🗺️ Ver Rota Demonstrativa
            </a>
          </div>

          <div class="grid-2 mt-md mb-md" style="gap: 1rem; font-size: 0.9rem;">
            <div>
              <span style="color: var(--text-muted); display: block; font-weight: 600;">Programas Atendidos:</span>
              <strong>${selected.programs.join(', ')}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block; font-weight: 600;">Capacidade Projetada:</span>
              <strong>${selected.capacity}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block; font-weight: 600;">Horário Previsto:</span>
              <strong>${selected.schedule}</strong>
            </div>
            <div>
              <span style="color: var(--text-muted); display: block; font-weight: 600;">Status Operacional:</span>
              <span class="badge badge-primary">${selected.status}</span>
            </div>
          </div>

          <div class="state-desc mt-sm" style="font-size: 0.8rem; border-left: 3px solid var(--accent); padding-left: 0.75rem;">
            ⚠️ <strong>Aviso de Rigor Ético (Regra 35):</strong> As coordenadas e instalações acima têm caráter exclusivamente demonstrativo para fins de planejamento do MVP. Não realizamos atendimentos públicos presenciais sem aviso formal prévio do Conselho Tutelar e órgãos municipais de Valparaíso de Goiás.
          </div>
        </div>
      `;
    }

    // 3. Renderiza tabela acessível WCAG AAA
    if (tableBody) {
      tableBody.innerHTML = polosData.map(p => `
        <tr>
          <td><strong>${p.name}</strong></td>
          <td>${p.bairro} (${p.territory})</td>
          <td>${p.capacity}</td>
          <td><span class="badge badge-primary">${p.status}</span></td>
        </tr>
      `).join('');
    }

    // 4. Bind event listeners
    listContainer.querySelectorAll('[data-polo-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        activePoloId = btn.getAttribute('data-polo-id');
        renderMapAndTable();
      });
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activePoloId = btn.getAttribute('data-polo-id');
          renderMapAndTable();
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.safeRun) {
      window.safeRun('TerritorialMap', loadPolos);
    } else {
      loadPolos();
    }
  });

  window.TerritorialMap = {
    loadPolos,
    renderMapAndTable
  };
})();
