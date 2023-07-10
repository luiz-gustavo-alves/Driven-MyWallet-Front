# Driven-MyWallet-Front <img width="60" height="60" src="https://em-content.zobj.net/thumbs/120/google/350/money-with-wings_1f4b8.png"/>
Projeto _fullstack_ para construção de uma aplicação de transações monetárias.<br>
Repositório _front-end_ para desenvolvimento visual do site.

## Requisitos Obrigatórios ⚠️

### Geral:
- **Deploy do projeto front-end na nuvem**.

### Componentização e Rotas de Navegação de Páginas:
- Os elementos da página devem ser componentizados com React em arquivos separados.
- Utilização do React Router para navegação das páginas.
### Local Storage e Context API:
- Utilizar Local Storage para armazenar _token_ da sessão.
- Utilizar Context API para repassar as variáveis de estado da aplicação.

## Páginas 📄
### Login/Cadastro:
- Login: Deve ser enviado o email e senha para a API.
- Cadastro: Deve ser enviado nome, email, senha e confirmar-senha para a API.
### Home:
- Carregar todas as transações feitas pelo usuário e o saldo total das transações.
- Caso o usuário não tenha transações feitas, mostrar mensagem dizendo que não há registros de entrada e saída.
- Botões para criar/editar/deletar transações.
- Logout para sair da sessão.
### Nova/Editar Transação:
- Deve ser enviado o valor, descrição e o tipo (entrada ou saida) de transação para a API.

## Design Final 💡
https://github.com/luiz-gustavo-alves/Driven-MyWallet-Front/assets/114351018/9e984be6-7638-4db5-9a1d-fb6ffe4bc74b

## Deploy do Projeto 💻

| Plataforma | Deploy |
| --- | --- |
| <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" /></a> | https://my-wallet-pied-seven.vercel.app
