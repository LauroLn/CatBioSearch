# 🧬 CatBioSearch - Back-end

CatBioSearch é um sistema voltado para clínicas veterinárias que realizam sequenciamento genético em gatos da raça Persa. O objetivo geral do projeto é auxiliar na geração de relatórios que facilitam a identificação de doenças genéticas, como a **policistose renal (PKD)**.

Este repositório contém **a API do back-end**, que oferece funcionalidades essenciais como:

- 🔐 Sistema de autenticação (login e cadastro de usuários)
- 👥 Gerenciamento de usuários e clínicas
- 📊 Geração de métricas e gráficos baseados na quantidade de relatórios gerados
- 🗂️ Visualização da utilização do sistema por clínicas

---

## 📌 Visão Geral do Projeto

Este back-end foi desenvolvido como a base de comunicação e controle de dados do projeto CatBioSearch. Ele atua como intermediário entre o front-end e o banco de dados, fornecendo:

- Autenticação de usuários e controle de sessões
- Cadastro e gerenciamento de usuários e clínicas
- Coleta e exposição de dados estatísticos (ex: total de relatórios gerados, número de clínicas usando o sistema)
- Rotas seguras e organizadas para integração com o front-end

---

## ⚙️ Requisitos do Sistema

Antes de executar o projeto, certifique-se de ter os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/) (recomendado: versão 18.x ou superior)
- [NPM](https://www.npmjs.com/) (gerenciador de pacotes)
- Banco de dados relacional SQL (como PostgreSQL, MySQL ou MariaDB)
- **Sequelize** (ORM já incluído nas dependências do projeto)

> ⚠️ **Docker e Docker Compose são opcionais**, usados apenas para rodar o projeto completo. Para executar apenas o back-end localmente, o uso de Docker não é necessário.

---

## 🚀 Instruções de Instalação e Execução

### 🔁 1. Clone o Repositório

```bash
git clone https://github.com/LauroLn/CatBioSearch.git
```
### 📂 2. Acesse a pasta do projeto

```bash
cd CatBioSearch
```
### 📦 3. Instale as dependências
```bash
npm install
```
### ▶️ 4. Inicie o servidor
```bash
npm start
```


## 🛠️ Tecnologias Utilizadas

- **Node.js** — Ambiente de execução JavaScript
- **Express.js** — Framework web para APIs REST
- **Sequelize** — ORM para SQL
- **SQL** — Banco de dados relacional (compatível com PostgreSQL, MySQL, etc.)


# Documentação das Rotas - Usuários e Administração

---

## Rota de Login de Administrador

**POST** `localhost:4000/users`

### Requisição:
```json
{
  "Login": "admin",
  "Password": "admin"
}
```
### Resposta:
```json
{
  "Message": "Admin logado com sucesso",
  "Redirect": "/acesso"
}
```
## Tela de Controle de Usuários

**GET** `/users/admin-dashboard`

### Resposta:
```json
{
  "message": "Bem-vindo ao painel de administrador, Administrador",
  "usuarios": [
    {
      "id": 1,
      "Nome": "Administrador",
      "Login": "admin",
      "Ativo": true,
      "Nascimento": "1990-01-01"
    }
  ]
}

```
## Cadastro de Novo Usuário

**POST** `/users/admin-cadastro`

### Requisição:
```json
{
  "Nome": "pedro",
  "Login": "yuumi",
  "Password": "123",
  "CPF": "123.723.267.22",
  "Nascimento": "22/02/2005",
  "CRBM": "12312312323",
  "Admin": true
}

```

### Resposta:
```json
{
  "message": "Usuário cadastrado com sucesso"
}


```

## Alteração de Usuário

**PUT** `/users/admin-usuario/2`

### Requisição:
```json
{
  "Nome": "tico",
  "Login": "teco",
  "Password": "pedro123",
  "CPF": "123.723.267.22",
  "Nascimento": "22/02/2005",
  "CRBM": "12312312323"
}


```
### Resposta:
```json
{
  "message": "Usuário atualizado com sucesso.",
  "usuario": {
    "id": 2,
    "Nome": "tico",
    "Login": "teco",
    "Password": "pedro123",
    "CPF": "123.723.267.22",
    "Nascimento": "22/02/2005",
    "CRBM": "12312312323",
    "Admin": true,
    "Ativo": true,
    "Funcao": "Biomédico",
    "createdAt": "2025-08-13T01:21:26.000Z",
    "updatedAt": "2025-08-13T01:25:52.537Z"
  }
}
```
## Deleção de Usuário

**DEL** `/users/admin-usuario/2`

### Resposta:
```json
{
  "message": "Usuário excluído com sucesso."
}


```
## Buscar Usuário por ID

**GET** `/users/admin-usuario/1`

### Resposta:
```json
{
  "id": 1,
  "Nome": "Administrador",
  "Login": "admin",
  "CPF": "000.000.000-00",
  "Nascimento": "1990-01-01",
  "CRBM": "123456",
  "Admin": true,
  "Ativo": true
}



```
