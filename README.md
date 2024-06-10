# Rick and Morty App
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/diesantana/rick-morty-angular/blob/main/LICENSE)

## Visão Geral

Este projeto é uma aplicação web desenvolvida em Angular que exibe informações sobre personagens e episódios do seriado "Rick and Morty". Ele utiliza uma arquitetura modular para organizar as diferentes funcionalidades e um servidor fake API com json-server para simular operações de backend. O projeto inclui funcionalidades como listagem de personagens com scroll infinito, detalhes de personagens, listagem de episódios com paginação, autenticação de usuário com login e perfil.

## Tecnologias Utilizadas
- **Angular**: 17.3.0 (versão não-standalone)
- **TypeScript**: 5.4.2
- **RxJS**: 7.8.0
- **Bootstrap**: 5.3.3
- **ngx-infinite-scroll**: 17.0.0

### Ferramentas de Desenvolvimento

- **Angular CLI**: 17.3.8 (instalado localmente no projeto)
- **json-server**: 0.17.4

## Escolha da Versão Não-Standalone do Angular

### Motivos para Utilizar a Versão Não-Standalone

Optei por utilizar a versão não-standalone do Angular (também conhecida como versão baseada em NgModules) por alguns motivos principais:

1. **Familiaridade e Estabilidade**: A abordagem baseada em NgModules é amplamente utilizada e bem compreendida pela comunidade de desenvolvedores Angular. Isso facilita a manutenção e a colaboração no projeto.

2. **Modularidade**: A organização modular permite uma separação clara de funcionalidades, o que torna o código mais limpo e mais fácil de gerenciar. Cada módulo pode ser carregado de forma independente, melhorando a eficiência do aplicativo.

3. **Compatibilidade**: Algumas bibliotecas e ferramentas da comunidade ainda não foram totalmente adaptadas para a nova abordagem standalone. Usando NgModules, garantimos a compatibilidade com um ecossistema mais amplo de bibliotecas.

4. **Facilidade de Atualização**: A estrutura baseada em NgModules proporciona uma transição mais suave para futuras versões do Angular, uma vez que muitas práticas e padrões já estão bem estabelecidos.

## Pré-requisitos

- Node.js e npm

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/diesantana/rick-morty-angular.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

## Como Executar o Projeto

### Servidor de Desenvolvimento Angular

Para executar o projeto em um servidor de desenvolvimento, use:
```bash
ng serve
```

Abra o navegador e navegue até `http://localhost:4200/`.

### Servidor JSON

Para rodar o json-server (fake API), use:
```bash
npm run server
```

O json-server estará disponível em `http://localhost:3000/`.

## Estrutura Modular

### Core Module

O Core Module contém serviços e modelos que são utilizados em toda a aplicação. Ele deve ser importado apenas uma vez no `AppModule`.

### Shared Module

O Shared Module contém componentes que são reutilizados em diferentes partes da aplicação, como `HeaderComponent` e `FooterComponent`. Ele deve ser importado em todos os módulos que utilizam esses componentes.

### Feature Modules

Os Feature Modules agrupam componentes, serviços e outros artefatos relacionados a uma funcionalidade específica. Exemplos:
- `AuthModule` para autenticação (login e profile).
- `CharacterModule` para gerenciamento de personagens.
- `EpisodeModule` para gerenciamento de episódios.

## Serviços

Os serviços são utilizados para comunicação com a API e gerenciamento de dados.

## Como Filtrar as Pesquisas

A pagina inicial da aplicação é a listagem de personagens. Com ela, você pode filtrar personagens por nome ou selecionar uma filtragem mais específica, como o estado do personagem (vivo, morto, etc.).

- A lista de personagens possui um scroll infinito, quando o usuário rolar a página, novos dados são carregados.
- Ao clicar em um personagem, será carregada uma página de detalhes com um botão para voltar para a listagem.
- A tela de episódios é renderizada em formato de tabela, onde você pode filtrar pelo id do episódio, com uma paginação logo abaixo.
- A tela de login pode ser acessada através do botão na navbar. O formulário de login possui validação de campos. Estamos utilizando o json-server para simular a validação de login. Você pode fazer o login com os seguintes dados:
  - Email: maria@gmail.com ou bob@gmail.com
  - Senha: 1234
  - Obs: Para realizar o login, o json-server deve estar rodando, com o comando: `npm run server`.

Ao realizar o login, você será direcionado para o perfil do usuário, onde os dados do usuário serão carregados. Há também um botão de logout.

- Após o login, o nome do usuário aparece na navbar, com um link para a página de perfil e um botão de logout. Os dados do usuário são salvos no localStorage até que ele clique em sair.

## Deploy

Você pode conferir a execução do projeto em produção através deste link: https://rick-morty-angular-eight.vercel.app

- Não se esqueça que, para simular o login, mesmo através deste link, o json-server deve estar rodando.

## Autor
Diego Santana
- [LinkedIn](https://www.linkedin.com/in/die-santana/)
- WhatsApp: +55 11 949 890 078
