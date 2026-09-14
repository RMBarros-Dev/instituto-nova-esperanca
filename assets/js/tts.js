/**
 * Módulo de Text-to-Speech (TTS)
 * Utiliza a Web Speech API nativa para ler conteúdos em voz alta.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Verifica se o navegador suporta Web Speech API
  if (!('speechSynthesis' in window)) {
    console.warn("Web Speech API não suportada neste navegador.");
    return;
  }

  const synth = window.speechSynthesis;
  let ttsUtterance = null;
  
  // Opções e estado
  let currentRate = 1.0;
  let isPlaying = false;
  let isPaused = false;
  
  // Elementos do DOM (que serão injetados dinamicamente nos artigos se existirem)
  const articleContent = document.querySelector('.article-content') || document.querySelector('main');
  
  // Procura por botões TTS no HTML ou cria se for uma página de leitura (ex: blog)
  const ttsContainer = document.getElementById('tts-controls');
  
  if (ttsContainer && articleContent) {
    setupTTSControls(ttsContainer, articleContent);
  }
  
  // Também procuramos botões genéricos de TTS
  const ttsButtons = document.querySelectorAll('[data-tts-target]');
  ttsButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetId = btn.getAttribute('data-tts-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        toggleReading(targetEl.textContent, btn);
      }
    });
  });

  function setupTTSControls(container, contentElement) {
    // Injeta os controles se o container estiver vazio
    if (container.innerHTML.trim() === '') {
      container.innerHTML = `
        <div class="tts-widget" role="region" aria-label="Controles de leitura em voz alta">
          <span class="tts-label" aria-live="polite">Ouvir este artigo:</span>
          <button type="button" id="tts-play-btn" class="btn btn-outline btn-sm" aria-label="Ouvir texto" aria-pressed="false">▶ Ouvir</button>
          <button type="button" id="tts-stop-btn" class="btn btn-ghost btn-sm" aria-label="Parar leitura" disabled>■ Parar</button>
          <select id="tts-rate-select" aria-label="Velocidade da leitura" class="tts-select">
            <option value="0.75">0.75x</option>
            <option value="1" selected>1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      `;
    }
    
    const playBtn = container.querySelector('#tts-play-btn');
    const stopBtn = container.querySelector('#tts-stop-btn');
    const rateSelect = container.querySelector('#tts-rate-select');
    const statusLabel = container.querySelector('.tts-label');

    // Configurar Voz
    let voices = [];
    const populateVoiceList = () => {
      voices = synth.getVoices();
    };
    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    const startReading = () => {
      // Pega o texto puro, removendo excesso de espaços
      const textToRead = contentElement.textContent.replace(/\s+/g, ' ').trim();
      
      if (!textToRead) return;
      
      ttsUtterance = new SpeechSynthesisUtterance(textToRead);
      ttsUtterance.rate = currentRate;
      
      // Tentar usar a voz compatível com o idioma da página
      const pageLang = document.documentElement.lang || 'pt-BR';
      ttsUtterance.lang = pageLang;
      
      const matchedVoice = voices.find(voice => voice.lang.includes(pageLang));
      if (matchedVoice) {
        ttsUtterance.voice = matchedVoice;
      }
      
      ttsUtterance.onend = () => {
        resetUI();
      };
      
      ttsUtterance.onerror = (e) => {
        console.error("Erro no TTS:", e);
        resetUI();
      };
      
      synth.speak(ttsUtterance);
      isPlaying = true;
      isPaused = false;
      
      updateUI();
    };

    const togglePlayPause = () => {
      if (isPlaying) {
        if (isPaused) {
          synth.resume();
          isPaused = false;
        } else {
          synth.pause();
          isPaused = true;
        }
      } else {
        startReading();
      }
      updateUI();
    };

    const stopReading = () => {
      if (isPlaying) {
        synth.cancel();
        resetUI();
      }
    };

    const updateUI = () => {
      if (isPlaying) {
        if (isPaused) {
          playBtn.innerHTML = '▶ Continuar';
          playBtn.setAttribute('aria-label', 'Continuar leitura');
          statusLabel.textContent = 'Leitura pausada.';
        } else {
          playBtn.innerHTML = '⏸ Pausar';
          playBtn.setAttribute('aria-label', 'Pausar leitura');
          statusLabel.textContent = 'Lendo em voz alta...';
        }
        playBtn.setAttribute('aria-pressed', 'true');
        stopBtn.disabled = false;
      } else {
        resetUI();
      }
    };

    const resetUI = () => {
      isPlaying = false;
      isPaused = false;
      playBtn.innerHTML = '▶ Ouvir';
      playBtn.setAttribute('aria-label', 'Ouvir texto');
      playBtn.setAttribute('aria-pressed', 'false');
      stopBtn.disabled = true;
      statusLabel.textContent = 'Ouvir este artigo:';
    };

    playBtn.addEventListener('click', togglePlayPause);
    stopBtn.addEventListener('click', stopReading);
    
    rateSelect.addEventListener('change', (e) => {
      currentRate = parseFloat(e.target.value);
      if (isPlaying) {
        // Reiniciar com nova velocidade
        stopReading();
        setTimeout(startReading, 50);
      }
    });
    
    // Limpar leitura se o usuário sair da página
    window.addEventListener('beforeunload', () => {
      synth.cancel();
    });
  }
});
