/**
 * INSTITUTO NOVA ESPERANÇA — SISTEMA GLOBAL DE NOTIFICAÇÕES (TOAST)
 * Totalmente acessível: role="status" / aria-live="polite" e suporte a teclado
 */

(function () {
  let container = null;

  function ensureContainer() {
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'true');
      container.setAttribute('role', 'region');
      container.setAttribute('aria-label', 'Notificações do Sistema');
      document.body.appendChild(container);
    }
    return container;
  }

  window.showToast = function (message, type = 'info', duration = 4500) {
    const parent = ensureContainer();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', type === 'danger' ? 'alert' : 'status');

    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'warning') icon = '⚠️';
    if (type === 'danger') icon = '✕';

    toast.innerHTML = `
      <span aria-hidden="true" class="font-bold">${icon}</span>
      <span class="toast-message">${message}</span>
      <button type="button" class="toast-close" aria-label="Fechar notificação">×</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    const removeToast = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 250);
    };

    closeBtn.addEventListener('click', removeToast);

    if (duration > 0) {
      setTimeout(removeToast, duration);
    }

    parent.appendChild(toast);
  };
})();
