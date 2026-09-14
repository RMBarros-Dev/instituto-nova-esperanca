# INSTITUTO NOVA ESPERANÇA

## Plataforma Digital Institucional Premium — V7.2+ (Stability, Content, Dashboards & Analytics)

---

### 🌐 Visão Geral do Produto

O **Instituto Nova Esperança** é uma organização da sociedade civil dedicada ao desenvolvimento humano integral, segurança alimentar, educação de qualidade e inclusão produtiva, com atuação prioritária em **Valparaíso de Goiás — GO** e na região do **Entorno do Distrito Federal**.

Esta plataforma foi desenvolvida como um produto digital de alto impacto, arquitetada em camadas modulares para atender e engajar:

* Doadores individuais (pequenos e médios aportes via PIX, cartão e recorrência);
* Grandes doadores, fundações filantrópicas e *family offices*;
* Empresas com metas ESG, patrocínios e *matching gift*;
* Voluntários especialistas e comunitários;
* Pesquisadores, imprensa e órgãos de controle social.

---

### 🏛️ Diretrizes de Posicionamento e Conformidade Ética

1. **Compromisso de Veracidade (Regra 29):** Nenhuma parceria, logotipo ou contrato corporativo foi fabricado. O ecossistema de cooperação é tratado com rigor ético e categorizado de forma transparente.
2. **Homologação do MVP (Regras 35, 39 e 82):** Todos os dados financeiros, métricas operacionais e biografias da equipe contêm avisos explícitos de caráter demonstrativo para homologação do MVP antes da publicação definitiva dos relatórios de auditoria externa.
3. **Território Real (Regra 37 e 84):** Localização contextualizada em Valparaíso de Goiás e região do Entorno do DF com dados demográficos e territoriais verificáveis.
4. **Fonte Única da Verdade:** Dados de beneficiários e investimentos sociais coincidem com precisão matemática entre `dashboard.json` e `transparency.json`.

---

### 📊 Inovações da Versão V7.2+

A versão **V7.2+ — Stability, Content, Dashboards & Analytics** consolida a maturidade tecnológica da plataforma através de 15 pilares estruturantes:

* **Dashboard de Impacto Social Multi-anual (2023–2026):**
  * Alternância interativa entre exercícios com 9 indicadores auditáveis;
  * Gráfico de linhas vetorial SVG responsivo com cálculo automático de crescimento anual (% de evolução);
  * Tabela semântica espelhada WCAG AAA para acessibilidade total a leitores de tela.

* **Dashboard de Transparência Financeira:**
  * Balanço discriminado de Receitas e Despesas conforme metodologia contábil CFC / ITG 2002;
  * Demonstração de eficiência social superior a 91% aplicada diretamente na atividade-fim;
  * Relatórios trimestrais e anuais com link para download e auditoria independente.

* **Sistema de Mídia Resiliente (`media.js`):**
  * Interceptação global de falhas de carregamento de imagem com fallback SVG imediato;
  * Zero *Cumulative Layout Shift* (CLS = 0) com dimensões explícitas e aspect-ratio preservado;
  * Suporte a carregamento preguiçoso (`loading="lazy"`) e decodificação assíncrona (`decoding="async"`).

* **Blog Editorial Completo (12 Artigos Originais):**
  * 12 artigos cadastrados com temas de nutrição, empreendedorismo feminino, ESG e ODS da ONU;
  * Barra de progresso de leitura em tempo real no topo da visualização do artigo;
  * Síntese de voz nativa (*Text-to-Speech* - TTS) acessível para audição dos textos;
  * Compartilhamento social (WhatsApp, LinkedIn, Twitter/X e cópia de link com toast de confirmação);
  * Sugestões dinâmicas de artigos relacionados e navegação com histórico de rolagem preservado.

* **Busca Global Integrada (`Ctrl + K` ou `/`):**
  * Modal indexado de alta performance com navegação por teclado (`ArrowUp`, `ArrowDown`, `Enter`, `Esc`);
  * Pesquisa unificada em Projetos, Artigos do Blog, Transparência, Formas de Apoio e FAQ.

* **Simulador de Cotas de Doação:**
  * Patamares de impacto visual (R$ 30, R$ 60, R$ 150, R$ 500, R$ 1.000+) com retorno de métricas estimadas em tempo real;
  * Gerador de código PIX dinâmico (*BR Code* / padrão EMVCo) com chave aleatória e cópia em 1 clique.

* **Área Corporativa e Grandes Doadores (`empresas.html`):**
  * Modelos de parceria ESG (Voluntariado Corporativo, Co-financiamento, Incentivo Fiscal);
  * Faixas de grandes cotas (R$ 1.000+ a R$ 100.000+ / Fundo Patrimonial);
  * Formulário dedicado para requisição de deck e apresentação institucional.

* **Arquitetura Resiliente & Error Boundary (`safeRun`):**
  * Cada módulo JavaScript inicializa em contexto isolado, evitando que falhas pontuais interrompam o portal;
  * Eliminação de 100% dos estilos inline no HTML através de classes utilitárias semânticas.

---

### ♿ Acessibilidade Universal (WCAG 2.2 AA / AAA)

A plataforma cumpre rigorosamente as diretrizes da W3C / WCAG 2.2:

* **Barra Assistiva Global:**
  * Redimensionamento de fonte com persistência (`A-`, `A`, `A+`);
  * Modo de Alto Contraste (contraste superior a 7:1 e 21:1 em conformidade AAA);
  * Modo Escuro nativo com redução de fadiga visual;
  * Tipografia adaptada para pessoas com dislexia (*OpenDyslexic* / fontes assistivas);
  * Ativação de sublinhado forçado em todos os hiperlinks;
  * Botão de redefinição rápida dos padrões visuais.
* **Navegação por Teclado:** Suporte completo a `Tab`, `Shift + Tab`, `Enter`, `Espaço` e fechamento de modais/drawers com a tecla `Esc`.
* **Focus Trap & :focus-visible:** Foco visual com anel de destaque contrastante em todos os componentes interativos.
* **Skip Links:** Links de salto para pular diretamente para o conteúdo principal ou navegação.
* **Aria-Live & Notificações:** Sistema de *toasts* acessível para leitores de tela com atributos `role="status"` e `aria-live="polite"`.

---

### 🌍 Internacionalização (6 Idiomas Nativos)

O sistema opera sem duplicação de páginas, empregando motor i18n modular em `assets/locales/`:

* 🇧🇷 **Português (pt-BR)**
* 🇺🇸 **Inglês (en-US)**
* 🇪🇸 **Espanhol (es-ES)**
* 🇫🇷 **Francês (fr-FR)**
* 🇩🇪 **Alemão (de-DE)**
* 🇯🇵 **Japonês (ja-JP)**

Recursos de i18n incluem:

* Tradução dinâmica de navegação, botões, formulários, alertas, dashboards e metadados;
* Atualização automática do atributo `<html lang="">`;
* Formatadores nativos de moeda (`formatCurrency`) e data (`formatDate`) via API `Intl`;
* Persistência de preferência via `localStorage` e suporte a parâmetro de URL `?lang=code`.

---

### 📦 Estrutura Modular de Arquivos

```text
/
├── index.html               # Home com busca global, projetos e destaques
├── sobre.html               # História, Missão/Visão, Teoria da Mudança e Governança
├── projetos.html            # Os 4 grandes programas com indicadores e mídia resiliente
├── impacto.html             # Dashboard de Impacto Social (2023-2026), gráfico SVG e tabela WCAG
├── transparencia.html       # Dashboard de Transparência (Receitas x Despesas x Eficiência)
├── empresas.html            # Alianças ESG, Seção Grandes Impactos (R$ 1k-100k) e formulário
├── blog.html                # Blog Premium: 12 artigos, progresso de leitura, áudio TTS, busca
├── doacoes.html             # Doações: Simulador de patamares (R$ 30 a R$ 1.000+), PIX e Cartão
├── voluntariado.html        # Assistente de cadastro voluntário em 7 etapas
├── contato.html             # Canais dedicados, endereço territorial e mapa com fallback
├── faq.html                 # Central de ajuda com accordion acessível
├── acessibilidade.html      # Declaração WCAG 2.2 AAA, atalhos e canal assistivo
├── privacidade.html         # Política de Privacidade em conformidade com a LGPD
├── cookies.html             # Política de Cookies e gestão de preferências
├── 404.html                 # Página de erro 404 institucional com busca
│
├── assets/
│   ├── css/
│   │   ├── tokens.css       # Tokens do Design System, variáveis de cor, tipografia fluida
│   │   ├── accessibility.css# Regras WCAG AAA, alto contraste, modo escuro, foco e dislexia
│   │   ├── components.css   # Componentes universais (busca global, cards, modais, toasts, estados)
│   │   ├── dashboard.css    # Estilos dedicados a gráficos SVG, métricas e tabelas analíticas
│   │   ├── style.css        # Reset moderno, tipografia global e importação central dos módulos
│   │   └── pages.css        # Estilos dedicados a páginas específicas
│   │
│   ├── js/
│   │   ├── main.js          # Error Boundary (safeRun), Busca Global (Ctrl+K), PWA e rede
│   │   ├── i18n.js          # Motor multilíngue para os 6 idiomas com suporte a dashboards
│   │   ├── a11y.js          # Gerenciador da barra assistiva, alto contraste e atalhos
│   │   ├── media.js         # Sistema de mídia à prova de quebra (CLS = 0 e fallback SVG)
│   │   ├── forms.js         # Gerenciador de formulários, máscaras e validação acessível
│   │   ├── donations.js     # Simulador de patamares de impacto e checkout PIX dinâmico
│   │   ├── dashboard.js     # Painel de Impacto Social 2023-2026 e tabela sincronizada
│   │   ├── transparency.js  # Dashboard de Transparência (Receitas x Despesas)
│   │   └── blog.js          # Blog Premium com áudio TTS, progresso e busca em tempo real
│   │
│   ├── data/
│   │   ├── dashboard.json   # Fonte Única: Indicadores sociais e evolução 2023-2026
│   │   ├── transparency.json# Fonte Única: Receitas, despesas e auditoria 2023-2026
│   │   ├── projects.json    # Dados dos 4 programas para busca global e cards
│   │   └── blog.json        # Base completa com os 12 artigos institucionais
│   │
│   ├── locales/
│   │   ├── pt-BR.json       # Dicionário Português com suporte completo a dashboards
│   │   ├── en-US.json       # Dicionário Inglês
│   │   ├── es-ES.json       # Dicionário Espanhol
│   │   ├── fr-FR.json       # Dicionário Francês
│   │   ├── de-DE.json       # Dicionário Alemão
│   │   └── ja-JP.json       # Dicionário Japonês
│   │
│   └── img/
│       ├── projects/        # Imagens vetoriais SVG dos programas estruturantes
│       ├── blog/            # Capas vetoriais SVG temáticas dos 12 artigos
│       ├── team/            # Fotografias e avatares institucionais
│       ├── partners/        # Selos e ecossistema de cooperação
│       └── institutions/    # Placeholder resiliente e ícones PWA
│
├── scripts/
│   ├── verify_v7_2_plus.js  # Script de teste automatizado de integridade e consistência
│   └── dev_server.js        # Servidor estático local para desenvolvimento e testes
│
├── manifest.webmanifest     # Manifesto PWA com tema #075E54
├── service-worker.js        # Service Worker V7.2+ com stale-while-revalidate e offline
├── robots.txt               # Diretrizes para indexadores e buscadores
├── sitemap.xml              # Mapa do site com hreflang multilíngue
└── .env.example             # Documentação de variáveis de ambiente
```

---

### 🧪 Testes Automatizados de Qualidade (QA)

A plataforma inclui um script de verificação automatizada para garantir integridade contínua:

```bash
node scripts/verify_v7_2_plus.js
```

O script valida sistematicamente:

1. **Integridade de JSONs:** Sintaxe e estrutura de todos os 4 bancos de dados e 6 dicionários de idiomas;
2. **Consistência Matemática:** Verificação cruzada entre `dashboard.json` e `transparency.json` para garantir 100% de equivalência em beneficiários e recursos alocados para todos os anos (2023–2026);
3. **Sintaxe JavaScript:** Análise estática de código de todos os arquivos em `assets/js/` e do `service-worker.js`;
4. **Presença de Assets:** Verificação de existência em disco de todas as imagens vetoriais dos projetos e capas dos 12 artigos do blog.

---

### 🚀 Como Executar o Projeto

#### Opção 1: Servidor de Desenvolvimento Local

Você pode iniciar o servidor Node.js incluído no projeto:

```bash
# Iniciar servidor leve em http://localhost:8080:
node scripts/dev_server.js

# Ou com qualquer utilitário estático:
npx serve .
python -m http.server 8000
```

Em seguida, acesse no navegador: `http://localhost:8080` (ou a porta correspondente).

#### Opção 2: Abertura Direta no Navegador

Abra o arquivo `index.html` diretamente em qualquer navegador moderno (Chrome, Edge, Firefox, Safari). O motor de internacionalização e acessibilidade foi desenhado com dicionários embutidos de fallback para operar perfeitamente mesmo sob o protocolo local `file://`.

---

### 🔐 Segurança e Boas Práticas (Regra 42 e 43)

* **Sem credenciais expostas:** O arquivo `.env.example` documenta as chaves sem vazar credenciais secretas no código-fonte;
* **Criptografia e Tokenização:** Dados de pagamento e cartões de crédito não são armazenados em servidor próprio;
* **Proteção contra XSS:** Injeção dinâmica de dados sanitizada e filtrada via DOM API seguro;
* **Conformidade LGPD:** Coleta mínima com consentimento explícito, canal direto de DPO e controle granular de cookies sem bloqueio coercitivo da página.

---

© 2026 Instituto Nova Esperança. Todos os direitos reservados.
