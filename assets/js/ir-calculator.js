/**
 * INSTITUTO NOVA ESPERANÇA — CALCULADORA DE DEDUÇÃO FISCAL (IRPF & IRPJ) V7.3
 * Simulador de Destinação Solidária a Custo Zero via Fundo da Criança (FIA) e Leis de Incentivo
 * Conforme Regra 35: Caráter exclusivamente demonstrativo para homologação MVP.
 */

(function () {
  let currentType = 'pf'; // 'pf' ou 'pj'
  let currentIncome = 5000; // Imposto devido padrão para simulação inicial

  function getDonationsModule() {
    if (window.i18n && typeof window.i18n.getModule === 'function') {
      return window.i18n.getModule('donations') || {};
    }
    return {};
  }

  function formatBRL(amount) {
    if (window.formatCurrency) return window.formatCurrency(amount, 'BRL');
    return new Intl.NumberFormat(window.currentLangFormat || 'pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  }

  function calculateDeduction(amount, type) {
    const rate = type === 'pf' ? 0.06 : 0.02; // 6% para PF, até 2% para PJ Lucro Real
    return amount * rate;
  }

  function calculateImpactEquivalence(deduction) {
    const lang = (window.currentLangFormat || 'pt-BR').substring(0, 2);
    if (deduction < 100) {
      const equivalences = {
        pt: "Garante 2 kits pedagógicos individuais com material didático completo.",
        en: "Guarantees 2 individual educational supply kits for students.",
        es: "Garantiza 2 kits pedagógicos individuales con material didáctico completo.",
        fr: "Garantit 2 kits pédagogiques individuels avec matériel scolaire complet.",
        de: "Sichert 2 individuelle Schulmaterial-Sets für Schüler.",
        ja: "児童2名分の教材および学用品セットを提供します。"
      };
      return equivalences[lang] || equivalences.pt;
    } else if (deduction < 500) {
      const meals = Math.floor(deduction / 5);
      const equivalences = {
        pt: `Financia aproximadamente ${meals} refeições nutritivas balanceadas na cozinha solidária.`,
        en: `Funds approximately ${meals} nutritious balanced meals in our community kitchen.`,
        es: `Financia aproximadamente ${meals} comidas nutritivas balanceadas en el comedor solidario.`,
        fr: `Finance environ ${meals} repas nutritifs équilibrés dans notre cuisine solidaire.`,
        de: `Finanziert ca. ${meals} ausgewogene Mahlzeiten in der Gemeinschaftsküche.`,
        ja: `コミュニティ食堂で約${meals}食の栄養バランスの取れた給食を提供します。`
      };
      return equivalences[lang] || equivalences.pt;
    } else if (deduction < 2000) {
      const students = Math.max(1, Math.floor(deduction / 250));
      const equivalences = {
        pt: `Financia acompanhamento pedagógico e letramento digital para ${students} jovens por um semestre.`,
        en: `Funds tutoring and digital literacy mentoring for ${students} youths for an entire semester.`,
        es: `Financia apoyo pedagógico y alfabetización digital para ${students} jóvenes durante un semestre.`,
        fr: `Finance le tutorat scolaire et le numérique pour ${students} jeunes pendant un semestre complet.`,
        de: `Finanziert Nachhilfe und digitale Bildung für ${students} Jugendliche für ein ganzes Halbjahr.`,
        ja: `${students}名の青少年に1学期間の学習指導とデジタル教育を提供します。`
      };
      return equivalences[lang] || equivalences.pt;
    } else {
      const equivalences = {
        pt: `Aporte estruturante capaz de manter um ciclo completo de oficina de robótica ou panificação comunitária.`,
        en: `Strategic contribution funding a complete cycle of community robotics or vocational bakery workshop.`,
        es: `Aporte estructurante para financiar un ciclo completo de robótica comunitaria o panadería laboral.`,
        fr: `Soutien stratégique permettant de financer un cycle complet d'atelier robotique ou boulangerie solidaire.`,
        de: `Strategischer Beitrag zur Finanzierung eines kompletten Zyklus von Robotik- oder Bäckerei-Workshops.`,
        ja: `ロボット工学または製パン職業訓練ワークショップの1サイクル全体を支える戦略的支援となります。`
      };
      return equivalences[lang] || equivalences.pt;
    }
  }

  function renderCalculator() {
    const mod = getDonationsModule();
    const ir = mod.ir_calculator || {};

    const maxDeduction = calculateDeduction(currentIncome, currentType);
    const impactText = calculateImpactEquivalence(maxDeduction);

    const deductionEl = document.getElementById('ir-calc-deduction-value');
    const impactEl = document.getElementById('ir-calc-impact-text');
    const incomeDisplay = document.getElementById('ir-income-display');

    if (deductionEl) deductionEl.textContent = formatBRL(maxDeduction);
    if (impactEl) impactEl.textContent = impactText;
    if (incomeDisplay) incomeDisplay.textContent = formatBRL(currentIncome);
  }

  function initIRCalculator() {
    const input = document.getElementById('ir-income-input');
    if (input) {
      input.value = currentIncome;
      input.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        currentIncome = isNaN(val) || val < 0 ? 0 : val;
        renderCalculator();
      });
    }

    // Alternância PF / PJ
    document.querySelectorAll('[data-ir-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-ir-type]').forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        currentType = btn.getAttribute('data-ir-type');
        renderCalculator();
      });
    });

    // Atualização com eventos de idioma
    window.addEventListener('languageChanged', () => {
      renderCalculator();
    });

    renderCalculator();
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (window.safeRun) {
      window.safeRun('IRCalculator', initIRCalculator);
    } else {
      initIRCalculator();
    }
  });

  window.IRCalculator = {
    calculateDeduction,
    renderCalculator
  };
})();
