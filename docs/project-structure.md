# Organização do repositório — Instituto Nova Esperança

A plataforma é organizada como um site estático multipágina, com páginas por localidade e recursos compartilhados.

| Caminho | Responsabilidade |
| --- | --- |
| `pt-BR/`, `en-US/`, `es-ES/`, `fr-FR/`, `de-DE/`, `ja-JP/` | Páginas HTML localizadas. |
| `assets/css/` | Tokens, estilos base, layout, componentes e responsividade. |
| `assets/js/` | Módulos de interação e recursos do site. |
| `assets/data/` | Conteúdo estruturado em JSON. |
| `assets/locales/` e `lang/` | Recursos localizados e conteúdo por idioma. |
| `assets/icons/` e `assets/img/` | Ícones, imagens, ilustrações e mídia. |
| `assets/brand/` | Ativos de identidade visual do repositório. |
| `scripts/` | Servidor local, build, geração de ativos e validadores. |
| `docs/` | Design system, identidade, prompts e capturas. |
| `documents/` | Documentos disponibilizados pela plataforma. |
| `manifest.webmanifest`, `service-worker.js` | Recursos PWA. |

## Convenções

- Manter o conteúdo localizado no diretório de idioma apropriado.
- Manter dados estruturados separados de HTML, CSS e JavaScript.
- Antes de reorganizar ativos gerados, revisar os caminhos referenciados por páginas, scripts, manifesto e Service Worker.
- Executar as validações relevantes depois de alterar rotas, idiomas, imagens ou recursos PWA.
- Não tratar a execução de validadores como certificação automática de acessibilidade ou revisão linguística.
