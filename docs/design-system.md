# Design System — Instituto Nova Esperança V7.4

Guia e especificação oficial do Design System do **Instituto Nova Esperança**.

---

## 1. Princípios de Design
- **Credibilidade & Rigor Institucional:** Cores nobres e contrastadas que inspiram confiança e seriedade de governança pública.
- **Humanidade & Impacto Social:** Foco nas famílias, na infância, nos jovens e no território comunitário.
- **Acessibilidade Universal (WCAG 2.2 AAA):** Tipografia escalável, contraste estrito, navegação completa por teclado, respeito ao `@media (prefers-reduced-motion)` e foco sempre visível.
- **Performance & PWA:** Arquitetura limpa em Vanilla CSS e JS modular com zero dependências externas pesadas.

---

## 2. Paleta de Cores e Tokens CSS

| Token | Valor | Papel / Significado |
|---|---|---|
| `--color-primary` | `#075E54` | Verde Institucional — Confiança, sustentabilidade e impacto |
| `--color-secondary` | `#0F2439` | Azul Noturno — Rigor de auditoria e governança |
| `--color-accent` | `#2A9D8F` | Verde Água / Teal — Acento comunitário e território |
| `--color-gold` | `#D4AF37` | Dourado Discreto — Elementos premium e badges de certificação |
| `--color-gold-dark` | `#B8860B` | Dourado Escuro — Hover e bordas sutis |
| `--color-surface` | `#FFFFFF` | Branco Puro — Superfícies de cards e leitura |
| `--color-surface-alt` | `#F1F5F9` | Cinza Neutro Claro — Áreas alternadas |
| `--color-background` | `#F8FAFC` | Fundo principal da aplicação |
| `--color-text` | `#1E293B` | Grafite Profundo — Texto de leitura com contraste AAA |
| `--color-muted` | `#64748B` | Cinza Médio — Metadados e legendas |

---

## 3. Tipografia Institucional

- **Títulos (`--font-display`):** `Manrope`, sans-serif (pesos 600, 700, 800)
- **Corpo (`--font-body`):** `Inter`, sans-serif (pesos 400, 500, 600, 700)
- **Métricas e Tabelas (`--font-metrics`):** `IBM Plex Sans`, monospace / tabular (pesos 500, 600, 700)
- **Suporte Japonês:** `Noto Sans JP`, sans-serif (para `/ja-JP/`)

---

## 4. Escala de Movimento & Transições

- **Microinterações (hover, active):** `150ms cubic-bezier(0.4, 0, 0.2, 1)`
- **Componentes (cards, acordeons):** `250ms cubic-bezier(0.4, 0, 0.2, 1)`
- **Layouts e Modais:** `350ms cubic-bezier(0.4, 0, 0.2, 1)`
- **WCAG Reduced Motion:** Todas as animações são neutralizadas quando o usuário define `prefers-reduced-motion: reduce`.

---

## 5. Estrutura de Arquivos CSS

```text
assets/css/
├── tokens.css       → Variáveis e design tokens centrais
├── base.css         → Reset moderno e base tipográfica
├── layout.css       → Contêineres e grids responsivos
├── components.css   → Componentes reutilizáveis
├── utilities.css    → Classes atômicas e helpers de acessibilidade
└── responsive.css   → Breakpoints estritos (320px a 2560px) sem overflow
```
