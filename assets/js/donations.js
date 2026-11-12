/**
 * INSTITUTO NOVA ESPERANÇA — PLATAFORMA DE DOAÇÕES E SIMULADOR DE IMPACTO V7.2+
 * Patamares visuais: R$ 30, R$ 60, R$ 150, R$ 500, R$ 1.000+
 * Estimativa demonstrativa. Nenhum meio de pagamento é processado pelo site.
 */

(function () {
  let currentFrequency = 'monthly';
  let currentAmount = 100;
  let currentMethod = 'pix';
  let currentProject = 'Fundo Geral (Recomendado)';

  const FREQ_LABELS = {
    monthly: 'Mensal',
    once: 'Única',
    annual: 'Anual'
  };

  function getDonationsModule() {
    if (window.i18n && typeof window.i18n.getModule === 'function') {
      return window.i18n.getModule('donations') || {};
    }
    return {};
  }

  function getImpactEstimation(amount) {
    const mod = getDonationsModule();
    const tiers = mod.tiers || {};

    if (amount <= 45 && tiers.t30) return tiers.t30;
    if (amount <= 100 && tiers.t60) return tiers.t60;
    if (amount <= 300 && tiers.t150) return tiers.t150;
    if (amount <= 800 && tiers.t500) return tiers.t500;
    if (amount > 800 && tiers.t1000) return tiers.t1000;

    if (amount < 45) {
      return 'Garante 1 Kit Pedagógico individual com caderno, lápis e materiais de acolhimento.';
    } else if (amount < 100) {
      return 'Garante alimentação nutritiva e hortaliças agroecológicas para uma família vulnerável.';
    } else if (amount < 300) {
      return 'Garante apoio pedagógico diário, lanche nutritivo e inclusão digital para 2 jovens.';
    } else if (amount < 800) {
      return 'Financia um ciclo completo de qualificação profissional comunitária em corte ou panificação.';
    } else {
      return 'Impacto Ampliado: sustenta infraestrutura de laboratórios de robótica comunitária e tecnologia social.';
    }
  }

  function formatCurrency(val) {
    if (window.formatCurrency) return window.formatCurrency(val, 'BRL');
    return val.toLocaleString(window.currentLangFormat || 'pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function updateSidebarAndImpact() {
    const mod = getDonationsModule();
    const freqLabels = mod.frequency || FREQ_LABELS;
    const disclaimerText = mod.disclaimer || '*Estimativa demonstrativa de homologação do MVP.';

    // 1. Atualizar texto do simulador
    const impactText = document.getElementById('donation-impact-text');
    if (impactText) {
      const desc = getImpactEstimation(currentAmount);
      const freqSuffix = currentFrequency === 'monthly' ? (freqLabels.monthly || 'Mensal') : (currentFrequency === 'annual' ? (freqLabels.annual || 'Anual') : (freqLabels.once || 'Única'));
      impactText.innerHTML = `
        <strong>Impacto Estimado (${freqSuffix}):</strong> ${desc}
        <small style="display: block; margin-top: 4px; font-size: 0.75rem; opacity: 0.85;">
          ${disclaimerText}
        </small>
      `;
    }

    // 2. Atualizar sidebar resumo
    const summaryAmount = document.getElementById('summary-amount');
    const summaryFreq = document.getElementById('summary-freq');
    const summaryProject = document.getElementById('summary-project');

    if (summaryAmount) summaryAmount.textContent = formatCurrency(currentAmount);
    if (summaryFreq) summaryFreq.textContent = freqLabels[currentFrequency] || FREQ_LABELS[currentFrequency] || 'Mensal';
    if (summaryProject) summaryProject.textContent = currentProject.split(' (')[0];

    // 3. Atualizar alerta de grande doador
    const highValueBanner = document.getElementById('high-value-donor-banner');
    if (highValueBanner) {
      highValueBanner.style.display = currentAmount >= 5000 ? 'block' : 'none';
    }

    // 4. Sincronizar botões de patamar visual
    document.querySelectorAll('[data-amount]').forEach(btn => {
      const amt = parseFloat(btn.getAttribute('data-amount'));
      btn.classList.toggle('is-active', amt === currentAmount);
    });
  }

  const PAYMENT_UNAVAILABLE = {
    'pt-BR': 'As doações online ainda não estão disponíveis. Nenhum pagamento foi iniciado e nenhum dado foi enviado.',
    'en-US': 'Online donations are not available yet. No payment was started and no data was sent.',
    'es-ES': 'Las donaciones en línea aún no están disponibles. No se inició ningún pago ni se envió ningún dato.',
    'fr-FR': 'Les dons en ligne ne sont pas encore disponibles. Aucun paiement n’a été initié et aucune donnée n’a été envoyée.',
    'de-DE': 'Online-Spenden sind noch nicht verfügbar. Es wurde keine Zahlung gestartet und keine Daten wurden gesendet.',
    'ja-JP': 'オンライン寄付はまだ利用できません。決済は開始されておらず、データも送信されていません。'
  };

  function paymentUnavailableMessage() {
    return PAYMENT_UNAVAILABLE[document.documentElement.lang] || PAYMENT_UNAVAILABLE['pt-BR'];
  }

  function initDonations() {
    // Frequência
    document.querySelectorAll('[data-freq]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-freq]').forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-checked', 'true');
        currentFrequency = btn.getAttribute('data-freq');
        updateSidebarAndImpact();
      });
    });

    // Patamares pré-definidos
    document.querySelectorAll('[data-amount]').forEach(btn => {
      btn.addEventListener('click', () => {
        const val = parseFloat(btn.getAttribute('data-amount'));
        currentAmount = val;
        const customInput = document.getElementById('custom-donation-input');
        if (customInput) customInput.value = '';
        updateSidebarAndImpact();
      });
    });

    // Input customizado
    const customInput = document.getElementById('custom-donation-input');
    if (customInput) {
      customInput.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        if (val && val > 0) {
          currentAmount = val;
          document.querySelectorAll('[data-amount]').forEach(b => b.classList.remove('is-active'));
          updateSidebarAndImpact();
        }
      });
    }

    // Destinação do Projeto
    const projectSelect = document.getElementById('project-selection');
    if (projectSelect) {
      projectSelect.addEventListener('change', (e) => {
        currentProject = e.target.value;
        updateSidebarAndImpact();
      });
    }

    // Métodos de Pagamento
    document.querySelectorAll('[data-method]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-method]').forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-checked', 'true');
        currentMethod = btn.getAttribute('data-method');

        const cardBox = document.getElementById('card-checkout-box');
        const boletoBox = document.getElementById('boleto-checkout-box');
        if (cardBox) cardBox.style.display = currentMethod === 'card' ? 'block' : 'none';
        if (boletoBox) boletoBox.style.display = currentMethod === 'boleto' ? 'block' : 'none';
      });
    });

    // Botão Principal de Doar
    const submitBtn = document.getElementById('btn-submit-donation');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const message = paymentUnavailableMessage();
        if (window.showToast) {
          window.showToast(message, 'warning');
        } else {
          window.alert(message);
        }
      });
    }

    // PIX remains unavailable until a verified payment integration is configured.
    const copyPixBtn = document.getElementById('btn-copy-pix');
    if (copyPixBtn) {
      copyPixBtn.addEventListener('click', () => {
        if (window.showToast) window.showToast(paymentUnavailableMessage(), 'warning');
      });
    }

    // Fechar Modal PIX
    const closePixBtn = document.getElementById('btn-close-pix-modal');
    if (closePixBtn) {
      closePixBtn.addEventListener('click', () => {
        const pixModal = document.getElementById('pix-modal');
        if (pixModal) pixModal.classList.remove('is-open');
      });
    }

    // Botão de Certificado Demonstrativo de Impacto
    document.querySelectorAll('[data-open-impact-certificate]').forEach(btn => {
      btn.addEventListener('click', () => {
        if (window.CertificateManager) {
          window.CertificateManager.openCertificateModal({
            type: 'donation',
            impact: getImpactEstimation(currentAmount)
          });
        }
      });
    });

    window.addEventListener('languageChanged', () => {
      updateSidebarAndImpact();
    });

    updateSidebarAndImpact();
  }

  document.addEventListener('DOMContentLoaded', initDonations);
})();
