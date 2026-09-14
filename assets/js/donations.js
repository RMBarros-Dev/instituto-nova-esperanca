/**
 * INSTITUTO NOVA ESPERANÇA — PLATAFORMA DE DOAÇÕES E SIMULADOR DE IMPACTO V7.2+
 * Patamares visuais: R$ 30, R$ 60, R$ 150, R$ 500, R$ 1.000+
 * Estimativa demonstrativa, simulador dinâmico, PIX BR Code e recibos
 */

(function () {
  const PIX_KEY = 'pix@instituto-novaesperanca.org.br';
  const PIX_NAME = 'INSTITUTO NOVA ESPERANCA';
  const PIX_CITY = 'VALPARAISO DE GOIAS';

  let currentFrequency = 'monthly';
  let currentAmount = 100;
  let currentMethod = 'pix';
  let currentProject = 'Fundo Geral (Recomendado)';

  const FREQ_LABELS = {
    monthly: 'Mensal',
    once: 'Única',
    annual: 'Anual'
  };

  const TIERS_CONFIG = [
    { amount: 30, label: 'Kit Pedagógico', desc: 'Garante material didático e caderno de apoio para 1 criança em reforço escolar.' },
    { amount: 60, label: 'Alimentação Familiar', desc: 'Fornece refeições nutritivas balanceadas e complementação alimentar por 15 dias.' },
    { amount: 150, label: 'Apoio Educacional', desc: 'Financia acompanhamento pedagógico, reforço e oficinas de robótica para 2 jovens.' },
    { amount: 500, label: 'Ação Comunitária', desc: 'Mantém uma oficina técnica ou mutirão de horta comunitária gerando alimentos orgânicos.' },
    { amount: 1000, label: 'Impacto Ampliado', desc: 'Investimento estruturante em polos de tecnologia, conectividade e inclusão produtiva.' }
  ];

  function getImpactEstimation(amount) {
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
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function updateSidebarAndImpact() {
    // 1. Atualizar texto do simulador
    const impactText = document.getElementById('donation-impact-text');
    if (impactText) {
      const desc = getImpactEstimation(currentAmount);
      const freqSuffix = currentFrequency === 'monthly' ? 'mensal' : (currentFrequency === 'annual' ? 'anual' : 'nesta contribuição');
      impactText.innerHTML = `
        <strong>Impacto Estimado (${freqSuffix}):</strong> ${desc}
        <small style="display: block; margin-top: 4px; font-size: 0.75rem; opacity: 0.85;">
          *Estimativa demonstrativa de homologação do MVP.
        </small>
      `;
    }

    // 2. Atualizar sidebar resumo
    const summaryAmount = document.getElementById('summary-amount');
    const summaryFreq = document.getElementById('summary-freq');
    const summaryProject = document.getElementById('summary-project');

    if (summaryAmount) summaryAmount.textContent = formatCurrency(currentAmount);
    if (summaryFreq) summaryFreq.textContent = FREQ_LABELS[currentFrequency] || 'Mensal';
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

  function generatePixPayload(amount) {
    const formattedAmount = amount.toFixed(2);
    return `00020126580014BR.GOV.BCB.PIX0136${PIX_KEY}52040000530398654${String(formattedAmount.length).padStart(2,'0')}${formattedAmount}5802BR59${String(PIX_NAME.length).padStart(2,'0')}${PIX_NAME}60${String(PIX_CITY.length).padStart(2,'0')}${PIX_CITY}62070503***6304DEMO`;
  }

  function renderPixQR(code) {
    const container = document.getElementById('pix-qr-container');
    const codeBox = document.getElementById('pix-code-text');
    if (!container) return;

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(code)}&margin=10`;
    container.innerHTML = `
      <img src="${qrUrl}" alt="QR Code PIX Gerado Dinamicamente" class="qr-code-img" width="200" height="200">
    `;
    if (codeBox) codeBox.textContent = code;
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
        if (currentMethod === 'pix') {
          const pixModal = document.getElementById('pix-modal');
          const payload = generatePixPayload(currentAmount);
          renderPixQR(payload);
          if (pixModal) pixModal.classList.add('is-open');
        } else {
          if (window.showToast) {
            window.showToast(`Doação de ${formatCurrency(currentAmount)} simulada com sucesso! Muito obrigado pelo apoio.`, 'success');
          }
        }
      });
    }

    // Copiar PIX
    const copyPixBtn = document.getElementById('btn-copy-pix');
    if (copyPixBtn) {
      copyPixBtn.addEventListener('click', () => {
        const codeText = document.getElementById('pix-code-text');
        if (codeText) {
          navigator.clipboard.writeText(codeText.textContent).then(() => {
            if (window.showToast) window.showToast('Código PIX copiado com sucesso!', 'success');
          });
        }
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

    updateSidebarAndImpact();
  }

  document.addEventListener('DOMContentLoaded', initDonations);
})();
