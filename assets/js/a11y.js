/**
 * INSTITUTO NOVA ESPERANÇA — ALIAS DE COMPATIBILIDADE A11Y V7.4
 * Redireciona e assegura compatibilidade com assets/js/accessibility.js
 */
if (typeof window !== 'undefined' && !window.ineA11y) {
  // Carrega módulo oficial accessibility.js caso não esteja presente
  const script = document.createElement('script');
  script.src = (document.querySelector('script[src*="a11y.js"]')?.getAttribute('src') || '').replace('a11y.js', 'accessibility.js');
  script.defer = true;
  document.head.appendChild(script);
}
