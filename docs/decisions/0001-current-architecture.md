# ADR-0001 — Manter o site multipágina estático e organizado por localidade

- **Status:** Registrado (arquitetura atual, documentada retrospectivamente)
- **Data do registro:** 2026-11-15

## Contexto

O repositório contém páginas HTML por localidade, recursos CSS e JavaScript, conteúdo JSON, scripts Node.js e recursos PWA.

## Decisão atual

Mantenho a apresentação como site multipágina estático, organizo as páginas por localidade e utilizo scripts Node.js para QA, verificação de idioma e geração de recursos.

## Consequências

- Posso publicar conteúdo sem manter um backend de negócio.
- Preciso manter consistentes os conteúdos e links em cada localidade.
- Alterações no build podem regenerar recursos e páginas.
- A validação automatizada ajuda a detectar regressões, mas não comprova sozinha a conformidade de acessibilidade em todos os contextos.

## Nota histórica

Este ADR registra a arquitetura observada atualmente. Não o apresento como documento original da concepção do projeto.
