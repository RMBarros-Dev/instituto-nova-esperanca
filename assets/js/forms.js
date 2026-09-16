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
  }

  function handleSmartSubmit(form, successMsg, customHandler) {
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Validação nativa HTML5
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : '';
      let statusContainer = form.querySelector('.form-status-msg');

      if (!statusContainer) {
        statusContainer = document.createElement('div');
        statusContainer.className = 'form-status-msg';
        statusContainer.setAttribute('role', 'status');
        statusContainer.setAttribute('aria-live', 'polite');
        form.insertBefore(statusContainer, form.firstChild);
      }

      // Estado 1: Loading
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="spinner" style="display:inline-block; width:14px; height:14px; border:2px solid currentColor; border-right-color:transparent; border-radius:50%; animation:spin 0.6s linear infinite; margin-right:8px;" aria-hidden="true"></span>
          <span>Enviando...</span>
        `;
      }

      statusContainer.style.display = 'block';
      statusContainer.className = 'alert alert-info form-status-msg mb-md';
      statusContainer.textContent = 'Processando e registrando informações de forma segura...';

      // Simulação assíncrona de requisição segura
      await new Promise(resolve => setTimeout(resolve, 700));

      if (typeof customHandler === 'function') {
        try {
          await customHandler();
        } catch (err) {
          statusContainer.className = 'alert alert-danger form-status-msg mb-md';
          statusContainer.textContent = 'Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.';
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
          }
          return;
        }
      }

      // Estado 2: Sucesso Acessível
      statusContainer.className = 'alert alert-success form-status-msg mb-md';
      statusContainer.innerHTML = `<strong>✓ Sucesso!</strong> ${successMsg || 'Formulário enviado com sucesso.'}`;

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Enviado com sucesso ✓';
        submitBtn.classList.add('btn-success');
        setTimeout(() => {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.classList.remove('btn-success');
        }, 3000);
      }

      if (window.showToast) {
        window.showToast(successMsg || 'Formulário enviado com sucesso!', 'success');
      }

      form.reset();
    });
  }

  function initForms() {
    applyMasks();

    // 1. Formulário de Parcerias Corporativas / Empresas
    const corpForm = document.getElementById('corporate-partnership-form') || document.getElementById('form-corporate-partnership');
    if (corpForm) {
      handleSmartSubmit(corpForm, 'Solicitação institucional recebida! Nossa Diretoria de Parcerias entrará em contato em até 24 horas úteis.');
    }

    // 2. Formulário Geral de Contato
    const contactForm = document.getElementById('general-contact-form') || document.getElementById('contact-main-form');
    if (contactForm) {
      handleSmartSubmit(contactForm, 'Sua mensagem foi enviada com sucesso ao Instituto Nova Esperança. Responderemos em breve!');
    }

    // 3. Formulário de Voluntariado
    const volForm = document.getElementById('volunteer-full-form') || document.getElementById('form-volunteer-wizard');
    if (volForm) {
      handleSmartSubmit(volForm, 'Cadastro de voluntariado finalizado com sucesso! Seja muito bem-vindo(a) à nossa rede de transformação.');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initForms);
  } else {
    initForms();
  }
})();
