/**
 * Módulo de Tempo de Leitura (Reading Time)
 * Calcula dinamicamente o tempo estimado de leitura do conteúdo principal
 */

document.addEventListener('DOMContentLoaded', () => {
  // Procura por elementos que querem exibir o tempo de leitura
  const readingTimeDisplays = document.querySelectorAll('.reading-time-display');
  
  if (readingTimeDisplays.length === 0) return;

  // Procura pelo container de conteúdo principal
  const contentElement = document.querySelector('.article-content') || document.querySelector('main');
  
  if (!contentElement) return;

  const calculateReadingTime = () => {
    // Obtém texto sem marcações HTML
    const text = contentElement.textContent || contentElement.innerText;
    
    // Conta as palavras (removendo pontuações isoladas e espaços extras)
    const words = text.trim().split(/\s+/).length;
    
    // Média de leitura: 200 palavras por minuto
    const wordsPerMinute = 200;
    const minutes = Math.ceil(words / wordsPerMinute);
    
    return minutes;
  };

  const minutes = calculateReadingTime();
  
  // Atualiza todos os displays encontrados
  readingTimeDisplays.forEach(display => {
    display.innerHTML = `⏱️ ${minutes} min de leitura`;
    display.setAttribute('aria-label', `Tempo estimado de leitura: ${minutes} minutos`);
  });
});
