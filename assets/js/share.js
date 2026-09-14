/**
 * Módulo de Compartilhamento (Web Share API)
 * Permite compartilhamento nativo de artigos e projetos, com fallback para links diretos
 */

document.addEventListener('DOMContentLoaded', () => {
  const shareButtons = document.querySelectorAll('.btn-share');
  
  if (shareButtons.length === 0) return;

  shareButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      
      // Dados para compartilhar (pegos de data-attributes ou do documento)
      const shareData = {
        title: btn.dataset.shareTitle || document.title,
        text: btn.dataset.shareText || document.querySelector('meta[name="description"]')?.content || 'Confira este conteúdo do Instituto Nova Esperança.',
        url: btn.dataset.shareUrl || window.location.href
      };

      // Tenta usar a Web Share API nativa
      if (navigator.share) {
        try {
          await navigator.share(shareData);
          if (window.showToast) window.showToast('Conteúdo compartilhado com sucesso!');
        } catch (err) {
          // Usuário cancelou ou ocorreu erro, não precisa mostrar erro invasivo
          if (err.name !== 'AbortError') {
            console.warn('Erro ao compartilhar', err);
            fallbackShare(shareData);
          }
        }
      } else {
        // Fallback se não tiver Web Share API
        fallbackShare(shareData);
      }
    });
  });

  function fallbackShare(data) {
    // Copia para a área de transferência
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${data.title} - ${data.url}`).then(() => {
        if (window.showToast) window.showToast('Link copiado para a área de transferência!');
      }).catch(err => {
        console.error('Erro ao copiar link', err);
      });
    }
  }
});
