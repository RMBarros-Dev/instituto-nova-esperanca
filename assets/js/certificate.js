/**
 * INSTITUTO NOVA ESPERANÇA — CERTIFICADO DEMONSTRATIVO DE IMPACTO V7.3
 * Emissor Client-Side de Comprovante de Adesão / Impacto Cidadão
 * Nomenclatura Protegida: "Certificado Demonstrativo de Impacto" com Salvaguarda Jurídica.
 */

(function () {
  function getTodayFormatted() {
    return new Intl.DateTimeFormat(window.currentLangFormat || 'pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date());
  }

  function generateRandomAuthCode() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'INE-DEMO-';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  function openCertificateModal(options = {}) {
    const name = options.name || 'Cidadão Apoiador Solidário';
    const type = options.type || 'donation'; // 'donation' ou 'volunteer'
    const impactText = options.impact || 'Contribuição solidária demonstrativa em prol do letramento infantil e segurança alimentar.';
    const authCode = options.code || generateRandomAuthCode();
    const dateText = getTodayFormatted();

    const titleText = type === 'volunteer' 
      ? 'Comprovante Demonstrativo de Adesão Voluntária (MVP)'
      : 'Certificado Demonstrativo de Impacto Social';

    const subtitleText = type === 'volunteer'
      ? 'Registro cívico de intenção de voluntariado cidadão conforme Lei Federal nº 9.608/1998.'
      : 'Registro de apoio e engajamento demonstrativo nas causas socioeducativas do Instituto Nova Esperança.';

    let modal = document.getElementById('ine-certificate-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'ine-certificate-modal';
      modal.className = 'modal-backdrop';
      modal.setAttribute('role', 'dialog');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('aria-labelledby', 'cert-modal-title');
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-container cert-modal-container" style="max-width: 780px; padding: 0; overflow: hidden;">
        <div class="cert-modal-header p-md" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border); background: var(--surface-alt);">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span class="badge badge-accent">Homologação MVP</span>
            <strong id="cert-modal-title" style="font-size: 0.95rem;">${titleText}</strong>
          </div>
          <button type="button" class="modal-close" id="btn-close-cert-modal" aria-label="Fechar modal">✕</button>
        </div>

        <div id="cert-printable-area" class="cert-paper p-2xl" style="background: #FFFDF9; border: 12px double #075E54; margin: 1.5rem; text-align: center; color: #1F2937; position: relative;">
          <div style="margin-bottom: 1.5rem;">
            <img src="${window.MediaManager ? window.MediaManager.resolvePath('assets/img/brand/logo-primary.svg') : 'assets/img/brand/logo-primary.svg'}" alt="Instituto Nova Esperança" width="260" height="58" style="max-width: 100%; height: auto;">
          </div>

          <span style="text-transform: uppercase; font-size: 0.75rem; letter-spacing: 2px; font-weight: 800; color: #075E54; display: block; margin-bottom: 0.5rem;">
            ${titleText}
          </span>

          <h2 style="font-size: 1.8rem; font-weight: 800; color: #075E54; margin-bottom: 1rem; font-family: 'Plus Jakarta Sans', sans-serif;">
            ${name}
          </h2>

          <p style="font-size: 1.05rem; line-height: 1.7; max-width: 620px; margin: 0 auto 1.5rem; color: #374151;">
            Certificamos, para fins de registro de participação cívica e engajamento transformador, que o portador acima apoia ativamente o propósito socioeducativo do Instituto no Entorno do Distrito Federal:
          </p>

          <div style="background: rgba(7, 94, 84, 0.06); border-radius: 8px; padding: 1rem; max-width: 580px; margin: 0 auto 1.5rem; font-size: 0.95rem; font-weight: 600; color: #075E54;">
            🌱 ${impactText}
          </div>

          <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 2rem; padding-top: 1rem; border-top: 1px dashed #D1D5DB; font-size: 0.8rem; color: #6B7280; text-align: left;">
            <div>
              <span>Emitido em: <strong>${dateText}</strong></span><br>
              <span>Autenticidade: <code style="color: #075E54; font-weight: 700;">${authCode}</code></span>
            </div>
            <div style="text-align: right;">
              <span style="font-weight: 700; color: #111827; display: block;">Valparaíso de Goiás — GO</span>
              <span>Instituto Nova Esperança</span>
            </div>
          </div>

          <div style="margin-top: 1.25rem; font-size: 0.7rem; color: #9CA3AF; text-align: center; border-top: 1px solid #E5E7EB; padding-top: 0.5rem;">
            ⚠️ <strong>Aviso de Salvaguarda Jurídica (Regra 35):</strong> Documento exclusivamente demonstrativo emitido em ambiente de testes da versão MVP. Não possui validade como recibo fiscal ou dedução legal perante a Receita Federal do Brasil.
          </div>
        </div>

        <div class="cert-modal-actions p-md" style="display: flex; justify-content: flex-end; gap: 0.75rem; border-top: 1px solid var(--border); background: var(--surface-alt); flex-wrap: wrap;">
          <button type="button" class="btn btn-outline btn-sm" id="btn-print-cert">🖨️ Imprimir / Salvar PDF</button>
          <button type="button" class="btn btn-primary btn-sm" id="btn-share-cert-linkedin">Compartilhar no LinkedIn ↗</button>
        </div>
      </div>
    `;

    modal.classList.add('is-open');

    // Bind event listeners
    document.getElementById('btn-close-cert-modal')?.addEventListener('click', () => {
      modal.classList.remove('is-open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('is-open');
    });

    document.getElementById('btn-print-cert')?.addEventListener('click', () => {
      window.print();
    });

    document.getElementById('btn-share-cert-linkedin')?.addEventListener('click', () => {
      const shareUrl = encodeURIComponent('https://instituto-novaesperanca.org.br');
      const shareText = encodeURIComponent(`Orgulho em apoiar demonstrativamente o trabalho do Instituto Nova Esperança no Entorno do DF! Conheça as ações de impacto social e educação cidadã.`);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${shareText}`, '_blank');
    });
  }

  window.CertificateManager = {
    openCertificateModal
  };
})();
