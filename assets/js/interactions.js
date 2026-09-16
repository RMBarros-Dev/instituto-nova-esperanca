/**
 * INSTITUTO NOVA ESPERANÇA — INTERACTIONS MODULE V7.4
 * Microinterações, Count-up Numérico Suave, Abas Acessíveis, Acordeons & Toasts
 */

(function () {
  'use strict';

  /**
   * 🔢 1. Contador Numérico Suave (Count-up)
   */
  function initCountUp() {
    const counters = document.querySelectorAll('[data-counter], .stat-number, .metric-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        obs.unobserve(el);

        const rawText = el.getAttribute('data-target') || el.textContent.trim();
        const targetNumber = parseFloat(rawText.replace(/[^0-9.,]/g, '').replace(',', '.'));
        if (isNaN(targetNumber)) return;

        const isPrefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (isPrefersReduced) {
          return; // Mantém o número final estático
        }

        const duration = 1200; // ms
        const startTime = performance.now();
        const startVal = 0;

        const hasPlus = rawText.includes('+');
        const hasPercent = rawText.includes('%');
        const isFloat = rawText.includes(',') || rawText.includes('.');

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Easing: easeOutCubic
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const currentVal = startVal + (targetNumber - startVal) * easeOut;

          let formatted = isFloat ? currentVal.toFixed(1).replace('.', ',') : Math.round(currentVal).toLocaleString('pt-BR');
          if (hasPlus) formatted += '+';
          if (hasPercent) formatted += '%';

          el.textContent = formatted;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = rawText; // Restaura formato canônico exato
          }
        }

        requestAnimationFrame(update);
      });
    }, { threshold: 0.2 });

    counters.forEach(c => observer.observe(c));
  }

  /**
   * 🗂️ 2. Sistema de Abas Acessíveis (WAI-ARIA Tabs)
   */
  function initTabs() {
    const tabLists = document.querySelectorAll('[role="tablist"]');
    tabLists.forEach(tabList => {
      const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          activateTab(tab, tabs);
        });

        tab.addEventListener('keydown', (e) => {
          let index = tabs.indexOf(tab);
          if (e.key === 'ArrowRight') {
            e.preventDefault();
            const nextTab = tabs[(index + 1) % tabs.length];
            nextTab.focus();
            activateTab(nextTab, tabs);
          } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            const prevTab = tabs[(index - 1 + tabs.length) % tabs.length];
            prevTab.focus();
            activateTab(prevTab, tabs);
          }
        });
      });
    });

    function activateTab(activeTab, allTabs) {
      allTabs.forEach(t => {
        const selected = t === activeTab;
        t.setAttribute('aria-selected', selected ? 'true' : 'false');
        t.classList.toggle('is-active', selected);

        const panelId = t.getAttribute('aria-controls');
        if (panelId) {
          const panel = document.getElementById(panelId);
          if (panel) {
            panel.hidden = !selected;
            panel.classList.toggle('is-active', selected);
          }
        }
      });
    }
  }

  /**
   * ❓ 3. Acordeons Acessíveis (FAQ & Expansíveis)
   */
  function initAccordions() {
    document.querySelectorAll('.accordion-header, [data-accordion-trigger]').forEach(header => {
      header.addEventListener('click', () => {
        const isExpanded = header.getAttribute('aria-expanded') === 'true';
        const targetId = header.getAttribute('aria-controls');
        const content = targetId ? document.getElementById(targetId) : header.nextElementSibling;

        header.setAttribute('aria-expanded', !isExpanded);
        header.classList.toggle('is-open', !isExpanded);

        if (content) {
          if (!isExpanded) {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.removeAttribute('hidden');
          } else {
            content.style.maxHeight = '0px';
            setTimeout(() => content.setAttribute('hidden', ''), 250);
          }
        }
      });
    });
  }

  /**
   * 📋 4. Feedback de Cópia (Pix, Chaves, E-mails)
   */
  function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const textToCopy = btn.getAttribute('data-copy') || btn.textContent;
        try {
          await navigator.clipboard.writeText(textToCopy);
          showToast('Copiado para a área de transferência com sucesso!');

          const originalText = btn.innerHTML;
          btn.innerHTML = '✓ Copiado!';
          btn.classList.add('is-copied');
          setTimeout(() => {
            btn.innerHTML = originalText;
            btn.classList.remove('is-copied');
          }, 2000);
        } catch (err) {
          showToast('Não foi possível copiar automaticamente.', 'error');
        }
      });
    });
  }

  /**
   * 🍞 5. Toast Notifications Unificados
   */
  function showToast(message, type = 'success') {
    let container = document.getElementById('ine-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'ine-toast-container';
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('role', 'status');
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
      <span class="toast-message">${escapeHtml(message)}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('is-visible');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]);
  }

  window.ineToast = showToast;

  // Inicialização
  document.addEventListener('DOMContentLoaded', () => {
    if (window.safeRun) {
      window.safeRun('CountUp', initCountUp);
      window.safeRun('Tabs', initTabs);
      window.safeRun('Accordions', initAccordions);
      window.safeRun('CopyButtons', initCopyButtons);
    } else {
      initCountUp();
      initTabs();
      initAccordions();
      initCopyButtons();
    }
  });

})();
