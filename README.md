# 📽️ Compacine - API de Gerenciamento para Bilheteria de Cinema

## 🛠️ Tecnologias Utilizadas

<div>
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" /> 
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original-wordmark.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg" />
<img align="center" alt="Jv-csharp" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original-wordmark.svg" />
</div>

## 🚀 Como Executar o Projeto

### Pré-Requisitos

- Node.js
- Git
- Editor de Código (Recomendamos o VsCode)

### Passos para Execução

1. **Clone o Repositório**

```bash
https://github.com/claricealvs/2-DESAFIO-NODE.JS.git
cd 2-DESAFIO-NODE.JS
```

2. **Instale as Dependências**

```bash
npm install
```

3. **Execute as migrations**

```bash
npm rum migration:run
```

4. **Execute a Aplicação**

```bash
npm start
```

5. **Acesse a API**

    A aplicação estará disponível no endereço `http://localhost:3000`.

6. **Acesse a API no Swagger**

    A aplicação estará disponível no endereço:
    `http://localhost:3000/api/documentation/`

![swagger](/assets/swagger-compacine.png)

## 🛠️ Ferramenta para testes

- Postman

## 🌐 Endpoints da API

Aqui estão os endpoints disponíveis na API:

- **Movies**

  - `GET /api/movies`: Listar todos os filmes
  - `GET /api/movies/{id}`: Listar um filme específico
  - `POST /api/movies`: Cadastrar um novo filme
  - `PUT /api/movies/{id}`: Atualizar um filme
  - `DELETE /api/movies/{id}`: Deletar um filme

- **Sessions**

  - `POST api/movies/{movie_id}/sessions`: Cadastrar uma nova sessão
  - `PUT api/movies/{movie_id}/sessions/{id}`: Atualizar uma sessão
  - `DELETE api/movies/{movie_id}/sessions/{id}`: Deletar uma sessão

- **Tickets**

  - `POST api/movies/{movie_id}/sessions/{session_id}/tickets`: Cadastrar um novo ingresso
  - `PUT api/movies/{movie_id}/sessions/{session_id}/tickets/{id}`: Atualizar um ingresso
  - `DELETE api/movies/{movie_id}/sessions/{session_id}/tickets/{id}`: Deletar um ingresso

---

🔜🔜🔜🔜🔜🔜🔜🔜🔜

## 💻 Desenvolvedores

- [Clarice Alves](https://github.com/claricealvs)
- [Diogo Nogueira](https://github.com/DIOGO03-NS)
- [Eduardo Amorim](https://github.com/Amorim-Eduardo)
- [Julyana Mira](https://github.com/Julymira)
- [Rayan Junio](https://github.com/rayanjunio)
