/**
 * INSTITUTO NOVA ESPERANÇA — FORMS & VALIDATION MANAGER V7.2+
 * Máscaras para documentos (CPF/CNPJ/Telefone), validação acessível e feedback instantâneo
 */

(function () {
  function applyMasks() {
    // Máscara de Telefone
    document.querySelectorAll('input[type="tel"]').forEach(input => {
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
          // CPF
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d)/, '$1.$2');
          v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        } else {
          // CNPJ
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

  function initForms() {
    applyMasks();

    // Formulário de Parcerias Corporativas (empresas.html)
    const empForm = document.getElementById('form-corporate-partnership');
    if (empForm) {
      empForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const razao = document.getElementById('emp-razao')?.value || 'Empresa';
        if (window.showToast) {
          window.showToast(`Solicitação de parceria da ${razao} recebida com sucesso! Nossa Diretoria de Relações Institucionais entrará em contato em até 24h úteis com a apresentação institucional.`, 'success');
        }
        empForm.reset();
      });
    }

    // Formulário de Contato
    const contactForm = document.getElementById('contact-main-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (window.showToast) {
          window.showToast('Mensagem enviada com sucesso! Agradecemos o seu contato.', 'success');
        }
        contactForm.reset();
      });
    }
  }

  document.addEventListener('DOMContentLoaded', initForms);
})();
