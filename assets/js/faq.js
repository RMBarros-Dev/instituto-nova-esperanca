/**
 * Módulo de FAQ (Busca Instantânea)
 * Permite pesquisa em tempo real pelas perguntas da Central de Ajuda.
 */

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('faq-search-input');
  const detailsElements = document.querySelectorAll('details.faq-item, details'); // Fallback pra details genéricos
  
  if (!searchInput || detailsElements.length === 0) return;

  // Add 'faq-item' class to all details if not present for easier tracking
  detailsElements.forEach(d => {
    if (!d.classList.contains('faq-item')) d.classList.add('faq-item');
  });

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    
    detailsElements.forEach(detail => {
      const summary = detail.querySelector('summary')?.textContent.toLowerCase() || '';
      const answer = detail.querySelector('.faq-answer')?.textContent.toLowerCase() || '';
      
      if (!query || summary.includes(query) || answer.includes(query)) {
        detail.style.display = 'block';
        // Se estiver buscando, expande os resultados automaticamente
        if (query) detail.setAttribute('open', '');
      } else {
        detail.style.display = 'none';
        detail.removeAttribute('open');
      }
    });
  });
});
