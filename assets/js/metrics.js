/**
 * Módulo de Métricas de Impacto (Count-Up)
 * Anima os números de impacto quando entram na tela, respeitando prefers-reduced-motion.
 */

document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // Verifica preferência do usuário por movimento reduzido
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Opção manual salva no localStorage (criaremos depois no a11y.js)
  const manualReducedMotion = localStorage.getItem('a11y-reduced-motion') === 'true';

  const shouldAnimate = !prefersReducedMotion && !manualReducedMotion;

  // Formata o número respeitando a localização atual ou BRL/PT-BR por padrão
  const formatNumber = (num) => {
    return new Intl.NumberFormat(document.documentElement.lang || 'pt-BR').format(Math.floor(num));
  };

  const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Função de ease-out
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.floor(easeOutQuart * (end - start) + start);
      
      obj.innerHTML = formatNumber(currentVal) + (obj.dataset.suffix || '');
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        obj.innerHTML = formatNumber(end) + (obj.dataset.suffix || '');
      }
    };
    window.requestAnimationFrame(step);
  };

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        
        // Obtém o valor original, extrai os números e salva para animação
        if (!el.dataset.target) {
           // Se o HTML tem 12.480+, pega 12480.
           const rawText = el.textContent.replace(/\./g, '').replace(/,/g, '');
           const numericVal = parseInt(rawText.replace(/\D/g, ''), 10);
           const suffix = rawText.replace(/[0-9]/g, '');
           
           if (!isNaN(numericVal)) {
              el.dataset.target = numericVal;
              if (suffix) el.dataset.suffix = suffix;
           }
        }
        
        const endValue = parseInt(el.dataset.target, 10);
        
        if (!isNaN(endValue)) {
          if (shouldAnimate) {
            animateValue(el, 0, endValue, 2000);
          } else {
            // Se o usuário preferir menos animação, vai direto pro final
            el.innerHTML = formatNumber(endValue) + (el.dataset.suffix || '');
          }
        }
        
        // Para de observar depois de animar uma vez
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
});
