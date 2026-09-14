/**
 * INSTITUTO NOVA ESPERANÇA — GERENCIADOR DO FORMULÁRIO DE VOLUNTARIADO
 * Fluxo em 7 Etapas (WCAG 2.2 AA):
 * 1. Perfil | 2. Interesses | 3. Disponibilidade | 4. Experiência | 5. Localização | 6. Consentimento | 7. Confirmação
 */

(function () {
  let currentStep = 1;
  const totalSteps = 7;

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

  function updateWizardUI() {
    // Atualiza steps panels
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

    // Se estiver na etapa 7, compilar resumo
    if (currentStep === 7) {
      compileSummary();
    }

    // Scroll suave até o topo do wizard
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
    } else if (step === 2) {
      const checkedInterests = Array.from(document.querySelectorAll('input[name="vol-interesse"]:checked')).map(el => el.value);
      if (checkedInterests.length === 0) {
        if (window.showToast) window.showToast('Por favor, selecione ao menos uma área de interesse.', 'warning');
        return false;
      }
      formData.interesses = checkedInterests;
    } else if (step === 6) {
      const consent = document.getElementById('vol-lgpd-consent')?.checked;
      if (!consent) {
        if (window.showToast) window.showToast('É necessário aceitar os termos da Lei de Voluntariado e LGPD.', 'warning');
        return false;
      }
      formData.lgpdConsent = true;
    }
    return true;
  }

  function compileSummary() {
    const summaryBox = document.getElementById('vol-summary-content');
    if (!summaryBox) return;

    summaryBox.innerHTML = `
      <div class="volunteer-feedback-box">
        <p><strong>Nome Completo:</strong> ${formData.nome || 'Não informado'}</p>
        <p><strong>E-mail:</strong> ${formData.email || 'Não informado'}</p>
        <p><strong>Telefone:</strong> ${formData.telefone || 'Não informado'}</p>
        <p><strong>Áreas de Interesse:</strong> ${formData.interesses.join(', ') || 'Geral'}</p>
        <p><strong>Local de Atuação:</strong> Valparaíso de Goiás e Entorno do DF</p>
        <p><strong>Termo de Consentimento:</strong> Aceito conforme Lei 9.608/1998 e LGPD</p>
      </div>
    `;
  }

  function initVolunteerWizard() {
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
        }
      });
    }

    updateWizardUI();
  }

  document.addEventListener('DOMContentLoaded', initVolunteerWizard);
})();
