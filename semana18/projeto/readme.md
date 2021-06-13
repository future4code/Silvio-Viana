# Documentação da API de Compartilhar Receitas

## Usando essa API um usuário pode criar uma conta, postar suas receitas, seguir outras pessoas para que as receitas delas aparecam no seu feed, entre outras funcionalidades.

---
## Funcionalidades
- Cadastro
- Login
- Ver próprio perfil
- Ver feed
- Ver perfil
- Procurar perfil
- Dar follow em um usuário
- Dar unfollow em um usuário
- Deletar perfil
- Ver receita
- Procurar receita
- Criar receita
- Editar receita
- Deletar receita
---

## - Cadastro
### POST "/signup"

* Atenção
		
	    Para criar uma conta ADMIN é preciso ter um token de um usuário ADMIN no Authorization

* Body

        name = VARCHAR(64)
        email = VARCHAR(64)
        role = ENUM ("NORMAL", "ADMIN")
        password = VARCHAR(64)

        {
            "name": "maria",
            "email": "maria@email.com",
            "role": "NORMAL",
            "password": "123456"
        }

* Resposta

        {
	        token: "eyJhbGciOi..."
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Login
### POST "/login"

* Body

        email = VARCHAR(64)
        password = VARCHAR(64)

        {
            "email": "maria@email.com",
            "password": "123456"
        }

* Resposta

        {
	        token: "eyJhbGciOi..."
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Ver próprio perfil
### GET "/user/profile"
* Headers

        Authorization = token

* Resposta

        {
            "id": "f6a0fc8e-b4f8-4aec-835b-819539599cbd",
            "name": "maria",
            "email": "maria@email.com",
            "recipes": []
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Ver feed
### GET "/user/feed"
* Headers

        Authorization = token

* Resposta

        {
            "recipes": []
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Ver perfil
### GET "/user/select/:id"
* Params

        id (Id do usuário) = VARCHAR(64)

* Headers

        Authorization = token

* Resposta

        {
            "id": "f6a0fc8e-b4f8-4aec-835b-819539599cbd",
            "name": "maria",
            "email": "maria@email.com",
            "recipes": []
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Procurar perfil
### GET "/user/search/:name"
* Params

        name (Nome do usuário) = VARCHAR(64)

* Headers

        Authorization = token


* Resposta

        {
            "users": []
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Dar follow em um usuário
### POST "/user/follow"

* Headers

        Authorization = token

* Body

        followedId (Id da pessoa que o usuário quer seguir) = VARCHAR(64)

        {
            "followedId": "552e6945..."
        }

* Resposta

        {
	        message: "Usuário seguido com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Dar unfollow em um usuário
### POST "/user/unfollow"

* Headers

        Authorization = token

* Body

        followedId (Id da pessoa que o usuário quer deixar de seguir) = VARCHAR(64)

        {
            "followedId": "552e6945..."
        }

* Resposta

        {
	        message: "Usuário deixado de ser seguido com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Deletar perfil
### DELETE "/user/:id"

* Atenção
		
	    Um usuário normal só pode deletar sua própria conta
        Um usuário admin pode deletar qualquer conta
        Ao apagar um usuário, suas receitas também serão apagadas

* Params

        id (Id do usuário a ser deletado) = VARCHAR(64)

* Headers

        Authorization = token


* Resposta

        {
	        message: "Conta deletada com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Ver receita
### GET "/recipe/select/:id"
* Params

        id (Id da receita) = VARCHAR(64)

* Headers

        Authorization = token

* Resposta

        {
            "id": "...",
            "title": "...",
            "description": "...",
            "instruction": "...",
            "createdAt": "...",
            "creatorId": "...",
            "creatorName": "..."
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Procurar receita
### GET "/recipe/search/:title"
* Params

        title (Título da receita) = VARCHAR(64)

* Headers

        Authorization = token

* Resposta

        {
            "recipes": []
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Criar receita
### POST "/recipe"

* Headers

        Authorization = token

* Body

        title = VARCHAR(64)
        description = VARCHAR(64)
        instruction = TEXT

        {
            "title": "Água com açúcar",
            "description": "Aprenda a fazer essa iguaria com apenas dois ingredientes",
            "instruction": "Pegue a água, pegue o açúcar, misture"
        }

* Resposta

        {
	        message: "Receita criada com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Editar receita
### PUT "/recipe/edit"

* Headers

        Authorization = token

* Body

        recipeId = VARCHAR(64)
        title = VARCHAR(64)
        description = VARCHAR(64)
        instruction = TEXT

        {
            "recipeId": "...",
            "title": "Água com açúcar",
            "description": "Aprenda a fazer essa iguaria com apenas dois ingredientes",
            "instruction": "Pegue a água, pegue o açúcar, misture"
        }

* Resposta

        {
	        message: "Receita editada com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Deletar receita
### DELETE "/recipe/:id"

* Atenção
		
	    Um usuário normal só pode deletar sua própria receita
        Um usuário admin pode deletar qualquer receita

* Params

        id (Id da receita) = VARCHAR(64)

* Headers

        Authorization = token

* Resposta

        {
	        message: "Receita deletada com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---
