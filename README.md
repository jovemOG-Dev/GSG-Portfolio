# Portfólio · Gabriel Silva Gomes

Portfólio profissional estático (HTML, CSS e JavaScript puros, sem dependências no site).
Navegação por rotas com hash (`#/blog`, `#/projetos`, `#/tecnologias`, `#/trajetoria`, `#/conexoes`, `#/simulados`).

O código-fonte do HTML fica dividido em **parciais** (`src/`) e é montado no `index.html` por um script
sem dependências (`scripts/build.py`, só Python 3). O `index.html` gerado **é versionado**, então o
GitHub Pages continua servindo a raiz sem etapa de build e o site abre direto por `file://`.

## Estrutura

```
.
├── index.html                  GERADO por scripts/build.py. Não edite à mão
├── src/
│   ├── index.template.html     Esqueleto: <head>, ordem dos CSS/JS e posição de cada parcial
│   └── partials/               Marcação de cada bloco do site (uma responsabilidade por arquivo)
│       ├── layout/
│       │   ├── sidebar.html      barra lateral (desktop) com terminal e menu
│       │   ├── topbar.html       barra superior e menu mobile
│       │   └── contato.html      rodapé de contato
│       ├── home/                 view #home
│       │   ├── hero.html
│       │   ├── sobre-mim.html    inclui os cards de música, conexões e livro
│       │   └── changelog.html
│       ├── pages/                view #pages (seções com data-title)
│       │   ├── blog.html         lista de posts
│       │   ├── projetos.html
│       │   ├── tecnologias.html
│       │   └── trajetoria.html
│       ├── posts/                view #post-view: um arquivo por post (id="post-...")
│       │   ├── senacos-town-git-city.html
│       │   └── convencao-para-simulados.html
│       └── subpaginas/           view #post-view: páginas com rota própria (id="page-...")
│           ├── conexoes.html
│           └── simulados.html
├── scripts/
│   └── build.py                Monta o index.html (use --check para validar)
├── assets/
│   ├── css/                    Ordem de carregamento definida em src/index.template.html (importa)
│   │   ├── core/
│   │   │   ├── base.css          variáveis de cor, tipografia, reset, botões
│   │   │   ├── responsivo.css    ajustes responsivos globais
│   │   │   ├── tema.css          tema escuro e botão de tema
│   │   │   └── movimento.css     transições, reduced-motion e impressão
│   │   ├── layout/
│   │   │   ├── layout.css        sidebar (desktop) e barra superior (mobile)
│   │   │   └── contato.css       rodapé de contato
│   │   └── pages/
│   │       ├── hero.css          hero, retrato e atalhos em bento
│   │       ├── home.css          Sobre mim, cards, disco, livro, bolinhas, changelog
│   │       ├── conexoes.css      página de Conexões
│   │       ├── paginas.css       blog, posts, projetos, tecnologias, cards
│   │       └── trajetoria.css    linha do tempo
│   ├── js/                     Scripts clássicos (sem módulos ES, para funcionar em file://)
│   │   ├── core/
│   │   │   └── theme-init.js     roda no <head>: classe .js e tema salvo (evita piscar)
│   │   ├── components/           um comportamento por arquivo, cada um em sua própria IIFE
│   │   │   ├── menu-mobile.js    drawer do menu mobile
│   │   │   ├── collapsible.js    listas retráteis (projetos extras, changelog)
│   │   │   ├── terminal.js       animação de entrada do terminal da sidebar
│   │   │   ├── vinyl.js          disco do card "Ouvindo agora"
│   │   │   ├── reveal.js         revelação ao rolar
│   │   │   ├── trajetoria.js     linha do tempo preenchida pela rolagem
│   │   │   └── tema.js           botão claro/escuro
│   │   ├── pages/
│   │   │   └── conexoes.js       busca, filtros e ordenação das conexões
│   │   └── router.js           roteador por hash, transições e scroll-spy (SEMPRE o último)
│   └── img/
│       ├── gabriel.jpg           retrato do hero
│       ├── gabriel-avatar.jpg    avatar do card de Conexões
│       ├── favicon.svg
│       └── conexoes/             fotos das pessoas (nome-sobrenome.jpg)
├── docs/
│   └── CONTEXTO.md             diretrizes do projeto
├── .nojekyll                   Faz o GitHub Pages servir os arquivos como estão
└── .gitignore
```

## Fluxo de trabalho

1. Edite os parciais em `src/partials/` (nunca o `index.html`).
2. Rode `python3 scripts/build.py` para regenerar o `index.html`.
3. Faça commit dos dois: o `src/` e o `index.html` gerado.

`python3 scripts/build.py --check` retorna erro se o `index.html` estiver desatualizado em relação a `src/`
(útil como verificação antes do commit ou em CI).

As diretivas de inclusão têm a forma `<!-- @include pasta/arquivo -->` (aponta para `src/partials/pasta/arquivo.html`),
preservam a indentação da linha e podem ser aninhadas.

## Como editar

- **Novo post do blog:** crie `src/partials/posts/<slug>.html` com um `<article class="post" id="post-<slug>" data-title="..." hidden>`,
  adicione `<!-- @include posts/<slug> -->` em `src/index.template.html` (dentro de `#post-view`) e um item no `<ol class="feed">`
  de `src/partials/pages/blog.html` apontando para `#/blog/<slug>`.
- **Nova conexão:** duplique um `<article class="card conn-card">` em `src/partials/subpaginas/conexoes.html` (veja o comentário no arquivo)
  e salve a foto em `assets/img/conexoes/`.
- **Novo simulado:** duplique um card em `src/partials/subpaginas/simulados.html`.
- **Novo projeto / tecnologia / item da trajetória:** edite o parcial correspondente em `src/partials/pages/`.
- **Nova página (rota):** crie o parcial, inclua-o no `src/index.template.html` na view adequada (`#pages` ou `#post-view`)
  e registre a rota em `assets/js/router.js` e o link no menu (`sidebar.html` e `topbar.html`).
- **Cores e tipografia:** variáveis no topo de `assets/css/core/base.css`; o tema escuro fica em `assets/css/core/tema.css`.
- **Novo CSS:** crie o arquivo na pasta adequada e adicione o `<link>` em `src/index.template.html` respeitando a ordem
  (`tema.css` e `movimento.css` ficam por último).
- **Novo JS:** crie em `assets/js/components/` (comportamento reutilizável) ou `assets/js/pages/` (específico de uma página),
  encapsule em IIFE e adicione o `<script>` no template **antes** do `router.js`.

## Rodar localmente

Abra o `index.html` no navegador, ou sirva a pasta: `python3 -m http.server 8000`.

## Publicar no GitHub Pages

1. Crie o repositório (para o endereço `https://jovemog-dev.github.io`, o nome precisa ser `jovemOG-Dev.github.io`).
2. Rode `python3 scripts/build.py` e envie o conteúdo desta pasta para a branch `main` (com o `index.html` gerado).
3. Em **Settings → Pages**, escolha *Deploy from a branch*, branch `main`, pasta `/ (root)`.
