/**
 * INSTITUTO NOVA ESPERANÇA — GERENCIADOR DO FORMULÁRIO E MURAL DE VAGAS DE VOLUNTARIADO V7.3
 * Mural Interativo de Vagas + Assistente de Inscrição em 7 Etapas (WCAG 2.2 AA)
 * Comprovante Demonstrativo de Adesão Voluntária (MVP) conforme Lei nº 9.608/98.
 */

(function () {
  let currentStep = 1;
  const totalSteps = 7;
  let volunteerJobs = [];
  let activeJobFilter = 'all';

  const formData = {
    nome: '',
    email: '',
    telefone: '',
    interesses: [],
    dias: [],
    periodo: '',
    habilidades: '',
    bairro: '',
    modalidade: 'presencial',
    lgpdConsent: false
  };

  async function loadVolunteerJobs() {
    const grid = document.getElementById('volunteer-jobs-grid');
    if (!grid) return;

    try {
      const res = await fetch('assets/data/volunteer-jobs.json');
      if (res.ok) {
        volunteerJobs = await res.json();
        renderVolunteerJobs();
      }
    } catch (e) {
      console.warn('[Volunteer] Falha ao carregar volunteer-jobs.json:', e);
    }
  }

  function renderVolunteerJobs() {
    const grid = document.getElementById('volunteer-jobs-grid');
    if (!grid || !volunteerJobs.length) return;

    const filtered = volunteerJobs.filter(job => {
      if (activeJobFilter === 'all') return true;
      return job.area_key === activeJobFilter;
    });

    if (filtered.length === 0) {
      grid.innerHTML = `
        <div class="state-container state-empty" style="grid-column: 1 / -1; padding: 2rem; text-align: center;">
          <p>Nenhuma vaga aberta nesta categoria no momento.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = filtered.map(job => `
      <div class="card job-card p-lg" style="display: flex; flex-direction: column; justify-content: space-between; border-left: 4px solid var(--primary); background: var(--surface);">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
            <span class="badge badge-primary">${job.badge}</span>
            <span style="font-size: 0.8125rem; color: var(--text-muted); font-weight: 600;">🕒 ${job.hours}</span>
          </div>
          <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.5rem; color: var(--text-heading);">${job.title}</h3>
          <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1rem; line-height: 1.5;">${job.desc}</p>
          <div style="font-size: 0.8125rem; background: var(--surface-alt); padding: 0.75rem; border-radius: var(--radius-sm); margin-bottom: 1.25rem;">
            <strong style="color: var(--primary);">Requisitos:</strong> ${job.requirements}
            <div style="margin-top: 0.35rem; color: var(--text-muted);">
              <strong>Unidade:</strong> ${job.polo_name} (${job.modality})
            </div>
          </div>
        </div>
        <div>
          <button type="button" class="btn btn-outline btn-sm w-100" data-apply-job="${job.id}" data-job-area="${job.area_key}">
            Candidatar-se a esta Vaga →
          </button>
        </div>
      </div>
    `).join('');

    // Bind botões de candidatura direta
    grid.querySelectorAll('[data-apply-job]').forEach(btn => {
      btn.addEventListener('click', () => {
        const area = btn.getAttribute('data-job-area');
        const wizard = document.getElementById('wizard-heading');
        if (wizard) {
          wizard.scrollIntoView({ behavior: 'smooth' });
        }
        // Pré-seleciona checkbox de interesse correspondente se houver
        const chk = document.querySelector(`input[name="interesses"][value="${area}"]`);
        if (chk) chk.checked = true;

        if (window.showToast) {
          window.showToast('Vaga selecionada! Continue o preenchimento do formulário abaixo.', 'info');
        }
      });
    });
  }

  function updateWizardUI() {
    for (let i = 1; i <= totalSteps; i++) {
      const panel = document.getElementById(`step-panel-${i}`);
      const node = document.getElementById(`step-node-${i}`);
      if (panel) {
        panel.style.display = (i === currentStep) ? 'block' : 'none';
      }
      if (node) {
        node.classList.toggle('is-active', i === currentStep);
        node.classList.toggle('is-completed', i < currentStep);
        node.setAttribute('aria-current', i === currentStep ? 'step' : 'false');
      }
    }

    if (currentStep === 7) {
      compileSummary();
    }

    const wizardEl = document.querySelector('.wizard-progress');
    if (wizardEl && currentStep > 1) {
      wizardEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function validateStep(step) {
    if (step === 1) {
      const nome = document.getElementById('vol-nome')?.value.trim();
      const email = document.getElementById('vol-email')?.value.trim();
      const tel = document.getElementById('vol-tel')?.value.trim();
      if (!nome || !email || !tel) {
        if (window.showToast) window.showToast('Por favor, preencha nome, e-mail e telefone para continuar.', 'warning');
        return false;
      }
      formData.nome = nome;
      formData.email = email;
      formData.telefone = tel;
      return true;
    }

    if (step === 2) {
      const checked = Array.from(document.querySelectorAll('input[name="interesses"]:checked')).map(el => el.value);
      if (checked.length === 0) {
        if (window.showToast) window.showToast('Selecione pelo menos uma área de interesse.', 'warning');
        return false;
      }
      formData.interesses = checked;
      return true;
    }

    if (step === 3) {
      const dias = Array.from(document.querySelectorAll('input[name="dias"]:checked')).map(el => el.value);
      const periodo = document.getElementById('vol-periodo')?.value;
      if (dias.length === 0 || !periodo) {
        if (window.showToast) window.showToast('Indique seus dias e o período de disponibilidade.', 'warning');
        return false;
      }
      formData.dias = dias;
      formData.periodo = periodo;
      return true;
    }

    if (step === 4) {
      formData.habilidades = document.getElementById('vol-habilidades')?.value.trim() || '';
      return true;
    }

    if (step === 5) {
      formData.bairro = document.getElementById('vol-bairro')?.value.trim() || '';
      formData.modalidade = document.querySelector('input[name="modalidade"]:checked')?.value || 'presencial';
      return true;
    }

    if (step === 6) {
      const consent = document.getElementById('vol-lgpd')?.checked;
      if (!consent) {
        if (window.showToast) window.showToast('É necessário aceitar os termos da LGPD e da Lei do Voluntariado para prosseguir.', 'warning');
        return false;
      }
      formData.lgpdConsent = true;
      return true;
    }

    return true;
  }

  function compileSummary() {
    const box = document.getElementById('volunteer-summary-box');
    if (!box) return;

    box.innerHTML = `
      <div class="summary-list" style="font-size: 0.9375rem; line-height: 1.6;">
        <p><strong>Nome:</strong> ${formData.nome}</p>
        <p><strong>Contato:</strong> ${formData.email} | ${formData.telefone}</p>
        <p><strong>Áreas de Interesse:</strong> ${formData.interesses.join(', ')}</p>
        <p><strong>Disponibilidade:</strong> ${formData.dias.join(', ')} (${formData.periodo})</p>
        <p><strong>Bairro / Modalidade:</strong> ${formData.bairro || 'Não informado'} (${formData.modalidade})</p>
        <p><strong>Termos LGPD:</strong> Aceitos e registrados conforme Lei 9.608/98.</p>
      </div>
    `;
  }

  function initVolunteerWizard() {
    // Carrega vagas
    loadVolunteerJobs();

    // Filtros de vagas
    document.querySelectorAll('[data-job-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-job-filter]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        activeJobFilter = btn.getAttribute('data-job-filter');
        renderVolunteerJobs();
      });
    });

    // Botões Próximo
    document.querySelectorAll('[data-wizard-next]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          if (currentStep < totalSteps) {
            currentStep++;
            updateWizardUI();
          }
        }
      });
    });

    // Botões Voltar
    document.querySelectorAll('[data-wizard-prev]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateWizardUI();
        }
      });
    });

    // Submissão Final
    const finalForm = document.getElementById('volunteer-full-form');
    if (finalForm) {
      finalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.showToast) {
          window.showToast('Inscrição voluntária enviada com sucesso! Nossa equipe entrará em contato em até 48 horas.', 'success');
        }
        const successBox = document.getElementById('volunteer-success-msg');
        if (successBox) {
          successBox.style.display = 'block';
          finalForm.style.display = 'none';

          // Adiciona botão para emissão do comprovante demonstrativo se não existir
          if (!document.getElementById('btn-emit-volunteer-proof')) {
            const btnProof = document.createElement('button');
            btnProof.id = 'btn-emit-volunteer-proof';
            btnProof.type = 'button';
            btnProof.className = 'btn btn-primary mt-md';
            btnProof.innerHTML = '📄 Baixar Comprovante Demonstrativo de Adesão (MVP)';
            btnProof.addEventListener('click', () => {
              if (window.CertificateManager) {
                window.CertificateManager.openCertificateModal({
                  type: 'volunteer',
                  name: formData.nome || 'Voluntário(a) Cadastrado(a)'
                });
              }
            });
            successBox.appendChild(btnProof);
          }
        }
      });
    }

    updateWizardUI();
  }

  document.addEventListener('DOMContentLoaded', initVolunteerWizard);
})();
