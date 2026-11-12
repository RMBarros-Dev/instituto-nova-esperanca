/**
 * INSTITUTO NOVA ESPERANÇA — FORMS & VALIDATION MANAGER V7.4
 * Validação Acessível em Tempo Real, Estados Visuais (Loading, Sucesso, Erro),
 * Máscaras para Documentos (CPF/CNPJ/Telefone) e Submissão Sem Alertas Nativos.
 */

(function () {
  function applyMasks() {
    // Máscara de Telefone
    document.querySelectorAll('input[type="tel"], input[name*="tel"], input[id*="phone"]').forEach(input => {
      input.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.substring(0, 11);
        if (v.length > 10) {
          v = v.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
        } else if (v.length > 5) {
          v = v.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
        } else if (v.length > 2) {
          v = v.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        }
        e.target.value = v;
      });
    });

    // Máscara de CPF / CNPJ
    document.querySelectorAll('input[name="cpf"], input[name="cnpj"], input[id*="cpf"], input[id*="cnpj"]').forEach(input => {
      input.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length <= 11) {
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
          v = v.substring(0, 14);
          v = v.replace(/^(\d{2})(\d)/, '$1.$2');
          v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
          v = v.replace(/\.(\d{3})(\d)/, '.$1/$2');
          v = v.replace(/(\d{4})(\d)/, '$1-$2');
        }
        e.target.value = v;
      });
    });

    // Máscara de CEP (XXXXX-XXX)
    document.querySelectorAll('input[name="cep"], input[id*="cep"], input[data-mask="cep"]').forEach(input => {
      input.addEventListener('input', (e) => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 8) v = v.substring(0, 8);
        if (v.length > 5) {
          v = v.replace(/^(\d{5})(\d{1,3})/, '$1-$2');
        }
        e.target.value = v;
      });
    });
  }

  const MESSAGES = {
    'pt-BR': 'Este formulário ainda não está conectado a um canal de atendimento. Nenhuma informação foi enviada. Entre em contato pelos canais oficiais antes de compartilhar dados pessoais.',
    'en-US': 'This form is not connected to a contact channel yet. No information was sent. Please use an official contact channel before sharing personal data.',
    'es-ES': 'Este formulario aún no está conectado a un canal de atención. No se envió ninguna información. Use un canal oficial antes de compartir datos personales.',
    'fr-FR': 'Ce formulaire n’est pas encore relié à un canal de contact. Aucune information n’a été envoyée. Utilisez un canal officiel avant de partager des données personnelles.',
    'de-DE': 'Dieses Formular ist noch nicht mit einem Kontaktkanal verbunden. Es wurden keine Informationen gesendet. Nutzen Sie einen offiziellen Kontaktkanal, bevor Sie persönliche Daten teilen.',
    'ja-JP': 'このフォームはまだ連絡窓口に接続されていません。情報は送信されていません。個人情報を共有する前に、公式の連絡窓口をご利用ください。'
  };

  function getMessage() {
    return MESSAGES[document.documentElement.lang] || MESSAGES['pt-BR'];
  }

  function handleSmartSubmit(form) {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validação nativa HTML5 com foco acessível
      if (!form.checkValidity()) {
        const firstInvalid = form.querySelector(':invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        form.reportValidity();
        return;
      }

      let statusContainer = form.querySelector('.form-status-msg');

      if (!statusContainer) {
        statusContainer = document.createElement('div');
        statusContainer.className = 'form-status-msg';
        statusContainer.setAttribute('role', 'status');
        statusContainer.setAttribute('aria-live', 'polite');
        form.insertBefore(statusContainer, form.firstChild);
      }

      statusContainer.style.display = 'block';
      statusContainer.className = 'alert alert-warning form-status-msg mb-md';
      statusContainer.textContent = getMessage();
    });
  }

  function initForms() {
    applyMasks();

    // 1. Formulário de Parcerias Corporativas / Empresas
    const corpForm = document.getElementById('corporate-partnership-form') || document.getElementById('form-corporate-partnership');
    if (corpForm) {
      handleSmartSubmit(corpForm);
    }

    // 2. Formulário Geral de Contato
    const contactForm = document.getElementById('general-contact-form') || document.getElementById('contact-main-form');
    if (contactForm) {
      handleSmartSubmit(contactForm);
    }

    // 3. Formulário de Voluntariado
    const volForm = document.getElementById('volunteer-full-form') || document.getElementById('form-volunteer-wizard');
    if (volForm) {
      handleSmartSubmit(volForm);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
  } else {
    initForms();
  }
})();
