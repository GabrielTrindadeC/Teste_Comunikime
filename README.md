# Teste prático Comunikime

## Repositorio aonde contem tanto o back como o front do teste prático

### Caminho Facil para rodar os serviços

na pasta raiz do projeto tem um arquivo docker-compose, caso você tenha o docker instalado na sua maquina basta rodar o comando

```jsx
docker-compose up
```

na porta 3000 o projeto front end estara rodando e na 8000 o backend

## Caminho mais longo para rodar os serviços

na pasta do backend, em src/app.module.ts altere as credenciais para as da sua instancia do mysql

![code.png](Teste%20pra%CC%81tico%20Comunikime%20f3df710cef9a4871a0995cb1564cea2b/code.png)

rodando os comando a baixo vai iniciar o download dos pacotes necessarios e o segundo comando vai iniciar o servidor

```jsx
npm install
npm run start:dev
```

O servidor sera iniciado na porta 3001.

na pasta do frontend, em src/api/axios.ts troque a porta de “8000” para 3001

![code.png](Teste%20pra%CC%81tico%20Comunikime%20f3df710cef9a4871a0995cb1564cea2b/code%201.png)

execute os comandos 

```jsx
npm install
npm run start
```

o frontend ira estar na porta 3000.

## Como usar o sistema

ao Entrar no sistema pela primeira vez, devera cadastrar os produtos. 

- - Crie um usuario do tipo admin
- - Va para a aba admin
- - Cadastre uma categoria e logo após um produto
- - Volte para a home e teremos os produtos para fazer o fluxo de compra