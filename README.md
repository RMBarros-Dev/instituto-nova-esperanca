<div align="center">

<p align="center">
  <img src="assets/brand/banner.svg" alt="Identidade visual do projeto" width="100%" />
</p>


<img src="docs/screenshots/emblema-oficial.jpg" alt="Emblema do Instituto Nova Esperança" width="120" />

<p align="center"><img src="assets/brand/logo.svg" alt="Instituto Nova Esperança logo" width="76" /></p>

# Instituto Nova Esperança

**Plataforma institucional multilíngue**

[![HTML](https://img.shields.io/badge/HTML-páginas-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-scripts-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![Versão](https://img.shields.io/badge/versão-7.4.0-0A5C46)](package.json)

</div>

<p align="center">
  <img src="docs/screenshots/hero-home.png" alt="Prévia da página inicial" width="100%" />
</p>

## Sobre o projeto

Este repositório contém um site institucional com páginas organizadas por idioma, dados em arquivos JSON e scripts para desenvolvimento, compilação e verificação do projeto.

Os diretórios de páginas incluem:

| Idioma | Diretório |
| --- | --- |
| Português (Brasil) | `pt-BR/` |
| Inglês (Estados Unidos) | `en-US/` |
| Espanhol | `es-ES/` |
| Francês | `fr-FR/` |
| Alemão | `de-DE/` |
| Japonês | `ja-JP/` |

O projeto também inclui arquivos de dados em `assets/data/`, recursos PWA, imagens e documentação de design.

## Executar localmente

Requer Node.js. Na raiz do repositório:

```bash
npm run dev
```

O servidor de desenvolvimento é iniciado pelo script `scripts/dev_server.js`. Consulte a saída do terminal para o endereço local.

## Scripts disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor local |
| `npm run build` | Gera recursos, compila localidades e constrói páginas |
| `npm run qa` | Executa verificações do projeto |
| `npm run test:i18n` | Verifica os arquivos de idioma |
| `npm run audit:project` | Analisa a organização dos arquivos |

O comando de compilação gera ou atualiza arquivos do projeto. Revise as alterações no Git antes de incluí-las em um commit.

## Estrutura

```text
/
├── assets/data/       # Dados em JSON
├── assets/js/         # Scripts do site
├── docs/              # Capturas e documentação de design
├── scripts/           # Desenvolvimento, build e verificações
├── pt-BR/             # Páginas em português
├── en-US/             # Páginas em inglês
├── es-ES/             # Páginas em espanhol
├── fr-FR/             # Páginas em francês
├── de-DE/             # Páginas em alemão
├── ja-JP/             # Páginas em japonês
├── index.html
├── manifest.webmanifest
└── service-worker.js
```

## Capturas

<p align="center">
  <img src="docs/screenshots/projetos-showcase.png" alt="Prévia das páginas de projetos" width="100%" />
</p>

<p align="center">
  <img src="docs/screenshots/impacto-dashboard.png" alt="Prévia do painel de impacto" width="100%" />
</p>

## Documentação

- [Sistema visual](docs/design-system.md)
- [Capturas da plataforma](docs/screenshots/)
- [Licença MIT](LICENSE.txt)
