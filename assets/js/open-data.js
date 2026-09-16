/**
 * INSTITUTO NOVA ESPERANÇA — OPEN DATA EXPORTER V7.3
 * Exportador Client-Side de Dados Abertos (CSV com UTF-8 BOM & JSON)
 * Cumpre normas da Lei de Acesso à Informação (LAI) e critérios CFC/ITG 2002.
 */

(function () {
  function downloadBlob(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 150);
  }

  const resolve = (p) => window.MediaManager ? window.MediaManager.resolvePath(p) : p;

  async function exportTransparencyCSV() {
    try {
      const res = await fetch(resolve('assets/data/transparency.json'));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      let csv = '\uFEFFAno;Status;Receita_Total_BRL;Recursos_Aplicados_BRL;Beneficiarios;Taxa_Eficiencia_Projetos;Taxa_Administrativa;Taxa_Captacao\n';
      Object.keys(data).sort().reverse().forEach(year => {
        const item = data[year];
        csv += `${item.year};"${item.status}";${item.revenue};${item.applied};${item.beneficiaries};${item.efficiency_rate}%;${item.admin_rate}%;${item.fundraising_rate}%\n`;
      });

      downloadBlob(csv, `INE_Demonstrativo_Contabil_${new Date().getFullYear()}.csv`, 'text/csv;charset=utf-8;');
      if (window.showToast) window.showToast('Exportação CSV de Transparência concluída com sucesso!', 'success');
    } catch (e) {
      console.error('[OpenData] Erro ao exportar CSV de transparência:', e);
      if (window.showToast) window.showToast('Erro ao exportar dados abertos.', 'error');
    }
  }

  async function exportTransparencyJSON() {
    try {
      const res = await fetch(resolve('assets/data/transparency.json'));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      downloadBlob(text, `INE_Transparencia_OpenData_${new Date().getFullYear()}.json`, 'application/json;charset=utf-8;');
      if (window.showToast) window.showToast('Download do dataset JSON concluído!', 'success');
    } catch (e) {
      console.error('[OpenData] Erro ao exportar JSON:', e);
    }
  }

  async function exportImpactCSV() {
    try {
      const res = await fetch(resolve('assets/data/dashboard.json'));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      let csv = '\uFEFFExercicio;Beneficiarios_Diretos;Refeicoes_Distribuidas;Kits_Pedagogicos;Mulheres_Capacitadas;Oficinas_Realizadas;Familias_Acompanhadas;Frequencia_Escolar_Pct;Aprovacao_Projetos_Pct;Recursos_Aplicados_BRL\n';
      Object.keys(data).sort().reverse().forEach(year => {
        const m = data[year].metrics;
        csv += `${year};${m.beneficiaries};${m.meals_distributed || m.meals_served || ''};${m.school_kits || m.pedagogical_kits || ''};${m.women_trained || ''};${m.workshops_held || ''};${m.families_supported || m.families || ''};${m.school_attendance_rate || ''}%;${m.project_approval_rate || ''}%;${m.funds_destined_projects}\n`;
      });

      downloadBlob(csv, `INE_Serie_Historica_Impacto_${new Date().getFullYear()}.csv`, 'text/csv;charset=utf-8;');
      if (window.showToast) window.showToast('Exportação CSV de Impacto concluída!', 'success');
    } catch (e) {
      console.error('[OpenData] Erro ao exportar CSV de impacto:', e);
    }
  }

  async function exportImpactJSON() {
    try {
      const res = await fetch(resolve('assets/data/dashboard.json'));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const text = await res.text();
      downloadBlob(text, `INE_Impacto_OpenData_${new Date().getFullYear()}.json`, 'application/json;charset=utf-8;');
      if (window.showToast) window.showToast('Download do dataset JSON concluído!', 'success');
    } catch (e) {
      console.error('[OpenData] Erro ao exportar JSON:', e);
    }
  }

  function bindOpenDataTriggers() {
    document.querySelectorAll('[data-export-transp-csv]').forEach(btn => {
      btn.addEventListener('click', exportTransparencyCSV);
    });
    document.querySelectorAll('[data-export-transp-json]').forEach(btn => {
      btn.addEventListener('click', exportTransparencyJSON);
    });
    document.querySelectorAll('[data-export-impact-csv]').forEach(btn => {
      btn.addEventListener('click', exportImpactCSV);
    });
    document.querySelectorAll('[data-export-impact-json]').forEach(btn => {
      btn.addEventListener('click', exportImpactJSON);
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.safeRun) {
      window.safeRun('OpenData', bindOpenDataTriggers);
    } else {
      bindOpenDataTriggers();
    }
  });

  window.OpenData = {
    exportTransparencyCSV,
    exportTransparencyJSON,
    exportImpactCSV,
    exportImpactJSON
  };
})();
