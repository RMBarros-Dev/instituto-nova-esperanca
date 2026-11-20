<p align="right"><strong>Idioma:</strong> <a href="README.pt-BR.md">Português (Brasil)</a> · <a href="README.md">English</a></p>

<div align="center">
  <img src="assets/brand/banner.svg" alt="Instituto Nova Esperança — plataforma institucional multilíngue" width="100%" />
  <br/><img src="assets/brand/logo.svg" alt="Símbolo do Instituto Nova Esperança" width="78" />
  <h1>Instituto Nova Esperança</h1>
  <p><strong>Informação que aproxima. Ações que transformam.</strong></p>
  <p>Plataforma institucional multilíngue · Web · PWA</p>
  <p>
    <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white" alt="Node.js" />
    <img src="https://img.shields.io/badge/PWA-5A0FC8?logo=pwa&logoColor=white" alt="PWA" />
    <img src="https://img.shields.io/badge/Vers%C3%A3o-7.4.0-075E54" alt="Versão 7.4.0" />
  </p>
  <p>
    <a href="https://github.com/RMBarros-Dev/instituto-nova-esperanca/actions/workflows/ci.yml"><img src="https://github.com/RMBarros-Dev/instituto-nova-esperanca/actions/workflows/ci.yml/badge.svg?branch=main" alt="Status da CI" /></a>
    <a href="https://github.com/RMBarros-Dev/instituto-nova-esperanca/actions/workflows/codeql.yml"><img src="https://github.com/RMBarros-Dev/instituto-nova-esperanca/actions/workflows/codeql.yml/badge.svg?branch=main" alt="Status do CodeQL" /></a>
  </p>
</div>

## Índice

- [01 · Identificação e resumo](#01--identificação-e-resumo)
- [02 · Contexto e objetivos](#02--contexto-e-objetivos)
- [03 · Áreas funcionais](#03--áreas-funcionais)
- [04 · Funcionalidades e conteúdo](#04--funcionalidades-e-conteúdo)
- [05 · Linguagens e tecnologias](#05--linguagens-e-tecnologias)
- [06 · Arquitetura](#06--arquitetura)
- [07 · Internacionalização e localização](#07--internacionalização-e-localização)
- [08 · Acessibilidade](#08--acessibilidade)
- [09 · Progressive Web App](#09--progressive-web-app)
- [10 · Requisitos](#10--requisitos)
- [11 · Instalação e execução](#11--instalação-e-execução)
- [12 · Metodologia de desenvolvimento](#12--metodologia-de-desenvolvimento)
- [13 · Build e validação de qualidade](#13--build-e-validação-de-qualidade)
- [14 · Estrutura de arquivos](#14--estrutura-de-arquivos)
- [15 · Limitações e validação institucional](#15--limitações-e-validação-institucional)
- [16 · Documentação e princípios](#16--documentação-e-princípios)
- [17 · Manutenção e contribuição](#17--manutenção-e-contribuição)
- [18 · Licença e atribuição](#18--licença-e-atribuição)

## 01 · Identificação e resumo

Este repositório contém uma plataforma Web institucional com páginas organizadas por idioma, conteúdo em JSON, recursos de Progressive Web App (PWA) e scripts próprios para desenvolvimento, compilação e validação. A versão declarada no pacote é 7.4.0.

A aplicação utiliza arquitetura de site estático multipágina. O conteúdo e os recursos de interface são distribuídos em arquivos do projeto; a estrutura documentada não indica uma aplicação backend de negócio ou banco de dados relacional associado.

## 02 · Contexto e objetivos

O projeto está direcionado à apresentação e organização de conteúdo institucional em ambiente Web. Seus objetivos técnicos incluem organizar páginas por localidade, separar conteúdo estruturado, oferecer recursos PWA, manter identidade visual consistente e automatizar verificações.

A existência de páginas e módulos não comprova, por si só, a veracidade de afirmações institucionais, parcerias, indicadores ou resultados de impacto.

## 03 · Áreas funcionais

A estrutura do repositório contempla áreas relacionadas a:
- apresentação institucional;
- projetos e impacto;
- transparência;
- comunicação, blog e imprensa;
- doações e voluntariado;
- acessibilidade;
- localização e navegação por idioma;
- instalação e funcionamento PWA.

## 04 · Funcionalidades e conteúdo

| Área | Evidência na estrutura |
|---|---|
| Páginas institucionais | `index.html`, `sobre.html` e equivalentes localizados. |
| Projetos e impacto | Páginas localizadas, dados JSON e recursos visuais. |
| Transparência | Páginas específicas, dados JSON e scripts relacionados a dados abertos. |
| Comunicação | Páginas de blog e imprensa, dados e imagens. |
| Doações e voluntariado | Páginas e scripts dedicados. |
| Acessibilidade | Estilos, ícones e script de acessibilidade. |
| Localização | Páginas e dados organizados por idioma. |
| PWA | Manifesto, ícones e Service Worker. |

A presença de diretórios e módulos comprova a organização desses recursos no código; não representa validação independente de conteúdo institucional.

## 05 · Linguagens e tecnologias

| Camada | Tecnologias identificadas |
|---|---|
| Marcação | HTML5 |
| Estilos | CSS3 modular |
| Comportamento | JavaScript |
| Conteúdo estruturado | JSON |
| Ferramentas de desenvolvimento | Node.js |
| Aplicação Web | PWA, Web App Manifest e Service Worker |
| Internacionalização | Arquivos JSON por localidade e páginas localizadas |
| Qualidade | Scripts próprios para rotas, imagens, links, HTML, conteúdo, SEO, acessibilidade e i18n |

Dependências e comandos estão definidos em `package.json` e `package-lock.json`.

## 06 · Arquitetura

A aplicação é um site estático multipágina com conteúdo localizado e recursos compartilhados.

```mermaid
flowchart TD
  Browser[Navegador] --> Page[HTML da localidade]
  Page --> CSS[CSS modular]
  Page --> JS[Módulos JavaScript]
  Page --> Data[JSON de conteúdo e idioma]
  Page --> Assets[Imagens, ícones e fontes]
  Browser --> SW[Service Worker / PWA]
  Scripts[Scripts Node.js] --> Build[Build e compilação]
  Scripts --> QA[Validações automatizadas]
  Build --> Page
  Build --> Assets
```

A estrutura revisada não indica backend de negócio ou banco de dados conectado. Integrações externas apresentadas nas páginas devem ser verificadas individualmente.

## 07 · Internacionalização e localização

O repositório inclui páginas e recursos por localidade. Os diretórios identificados incluem português do Brasil, inglês dos Estados Unidos, espanhol, francês, alemão e japonês. Consulte os arquivos efetivos antes de considerar uma tradução completa.

## 08 · Acessibilidade

O projeto inclui estilos e scripts dedicados a preferências de interface, como contraste, tamanho de fonte e suporte à leitura. Verificações automatizadas são indicadores úteis, mas não constituem certificação WCAG nem substituem testes com tecnologias assistivas e revisão manual.

## 09 · Progressive Web App

O repositório contém Web App Manifest, ícones de instalação e Service Worker. Esses recursos formam a base da experiência PWA; instalação, cache e atualização devem ser verificados nos navegadores e dispositivos suportados.

## 10 · Requisitos

- Node.js instalado.
- npm disponível no PATH.
- Git para clonar e versionar o repositório.
- Navegador moderno para validação local.

A versão exata do Node.js não está declarada em `package.json`; consulte as dependências e scripts se ocorrer incompatibilidade.

## 11 · Instalação e execução

```bash
git clone https://github.com/RMBarros-Dev/instituto-nova-esperanca.git
cd instituto-nova-esperanca
npm ci
npm run dev
```

O servidor local é iniciado por `scripts/dev_server.js`. Consulte a saída do terminal para identificar o endereço local.

## 12 · Metodologia de desenvolvimento

O fluxo é organizado em torno de conteúdo localizado e scripts próprios:

1. Estruturar páginas e conteúdo por localidade.
2. Separar dados, estilos, scripts e recursos visuais.
3. Gerar ou compilar páginas e ativos necessários.
4. Executar validações automatizadas.
5. Revisar visualmente as páginas e corrigir problemas.
6. Inspecionar alterações geradas com Git antes de criar commits.

O build pode modificar arquivos no repositório. Revise sempre o resultado antes de versioná-lo.

## 13 · Build e validação de qualidade

Comandos definidos em `package.json`:

| Comando | Finalidade |
|---|---|
| `npm run qa` | Executa o orquestrador de validações. |
| `npm test` | Executa o mesmo orquestrador de QA. |
| `npm run test:i18n` | Verifica recursos de internacionalização. |
| `npm run audit:project` | Audita a organização do projeto. |
| `npm run build` | Gera ativos, compila localidades e constrói páginas. |
| `npm run build:pages` | Constrói páginas localizadas. |

Execute localmente:

```bash
npm run qa
npm run test:i18n
npm run audit:project
```

Os resultados atuais dependem da execução real dos comandos. A documentação não declara aprovação de QA sem execução e análise do resultado.

## 14 · Estrutura de arquivos

```text
assets/
  brand/       # identidade visual do repositório
  css/         # tokens, base, layout e componentes
  data/        # conteúdo JSON estruturado
  icons/       # ícones por categoria
  img/         # imagens, banners e ilustrações
  js/          # módulos de interação e validação
  locales/     # recursos localizados
docs/          # design system, marca e orientações
scripts/       # build, geração e validação
lang/          # conteúdo JSON por idioma
pt-BR/ en-US/ es-ES/ fr-FR/ de-DE/ ja-JP/
documents/
index.html
manifest.webmanifest
service-worker.js
package.json
README.md
```

A estrutura é uma visão geral; o repositório contém outros arquivos e recursos especializados.

## 15 · Limitações e validação institucional

A existência de scripts de validação não equivale a certificação WCAG, e a presença de arquivos de idioma não comprova revisão linguística integral. Conteúdo institucional, relatórios, documentos, indicadores e referências de terceiros exigem verificação de origem, autorização e atualização antes de serem tratados como informação oficial.

## 16 · Documentação e princípios

- [Design System](docs/design-system.md) — tokens, princípios, tipografia e organização visual.
- [Identidade visual](docs/brand/README.md) — logotipo, banner e paleta.
- [Estrutura do projeto](docs/project-structure.md) — responsabilidades dos diretórios.
- [Capturas de tela](docs/screenshots/) — referências visuais disponíveis.
- [Prompts de produção visual](docs/nano-banana-prompts.md).
- [Manifesto PWA](manifest.webmanifest).
- [Scripts](scripts/) — build, geração de ativos e validação.

O projeto prioriza organização modular, separação de conteúdo e apresentação, acessibilidade, responsividade, códigos de localidade consistentes e verificações reproduzíveis.

## 17 · Manutenção e contribuição

Revise arquivos gerados antes de criar commits. Mantenha conteúdo localizado alinhado, teste navegação nos navegadores suportados e valide acessibilidade manualmente além das verificações automatizadas. Não publique afirmações institucionais não verificadas ou materiais de terceiros sem autorização.

## 18 · Licença e atribuição

Não foi identificado um arquivo de licença na árvore atual do repositório. Portanto, não presuma que o código ou os materiais estejam sob MIT ou outra licença aberta; a reutilização depende de autorização do titular dos direitos. Marcas, nomes, documentos, fotografias e materiais de terceiros permanecem sujeitos aos respectivos direitos e autorizações.


## Métricas de Engenharia

<div align="center">
  <img src="https://img.shields.io/github/stars/RMBarros-Dev/instituto-nova-esperanca?style=flat-square&label=stars" alt="Estrelas no GitHub" />
  <img src="https://img.shields.io/github/forks/RMBarros-Dev/instituto-nova-esperanca?style=flat-square&label=forks" alt="Forks no GitHub" />
  <img src="https://img.shields.io/github/issues/RMBarros-Dev/instituto-nova-esperanca?style=flat-square&label=issues%20abertas" alt="Issues abertas" />
  <img src="https://img.shields.io/badge/Plataforma-PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white" alt="Progressive Web App" />
</div>

<!-- REPOSITORY_METRICS_START -->
### Distribuição de linguagens (GitHub Linguist)

![Distribuição de linguagens do repositório](assets/metrics/repository-languages.svg)

| Linguagem | Bytes de código | Participação |
|---|---:|---:|
| HTML | 1,517,129 | 68.39% |
| JavaScript | 592,742 | 26.72% |
| CSS | 98,244 | 4.43% |
| PowerShell | 10,111 | 0.46% |

_Total de bytes de código contabilizados: 2,218,226. Atualizado em: 2026-11-20 13:00 UTC._

<!-- REPOSITORY_METRICS_END -->

### Verificação técnica

| Dimensão | Evidência implementada | Limite da medição |
|---|---|---|
| Frontend | HTML5, CSS3 modular, JavaScript e conteúdo JSON | Website multipágina estático com diretórios de páginas localizadas. |
| Ferramentas | Scripts Node.js, pacote npm e lockfile | Node.js é utilizado nas ferramentas de desenvolvimento/build; não se declara backend de aplicação. |
| PWA | Web App Manifest, ícones e Service Worker | Instalação, cache e atualização em runtime exigem testes em navegadores. |
| Localização | Páginas e recursos JSON específicos por locale | Presença de locales não comprova cobertura completa das traduções. |
| Verificações de qualidade | Checagens próprias de rotas, imagens, links, HTML, conteúdo, SEO, acessibilidade e i18n | Heurísticas automatizadas não certificam conformidade WCAG. |
| CI | [Workflow de CI](.github/workflows/ci.yml) | Resultado atual indicado pelo badge acima. |
| Análise estática de segurança | [Workflow CodeQL](.github/workflows/codeql.yml) | Execução do workflow não equivale a certificação de segurança. |
| Camada de dados | A arquitetura analisada não indica banco relacional ou backend de negócio | Integrações externas precisam ser verificadas individualmente. |
