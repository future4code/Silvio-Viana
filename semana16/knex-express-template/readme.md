# Documentação da API de Organizar Tarefas

## - Criar Usuário
### GET "/user"
* Body

        name = VARCHAR(255)
        nickname = VARCHAR(255)
        email = VARCHAR(255)
        
        {
            "name": "Astro Dev",
            "nickname": "astrodev",
            "email": "astro@dev.com"
        }

* Resposta

        { 
            message: "Usuário Criado"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Pegar usuário pelo id
### GET "/user/:id"
* Params

        id (Id do usuário) = INT

* Resposta

        {
	        "id": 1,
	        "nickname": "astrodev"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Pegar todos os usuários
### GET "/user/all"

* Resposta

        {
            "users": [{
                "id": 1,
                "nickname": "astrodev",
            }]
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Pesquisar usuário 
### GET "/user?query=astro"
* Params

        query (apelido ou email do usuário) = VARCHAR(255)

* Resposta

        {
            "users": [{
                "id": 1,
                "nickname": "astrodev",
            }]
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Editar usuário
### POST "/user/edit/:id"
* Params

        id (Id do usuário) = INT

* Body

        name = VARCHAR(255)
        nickname = VARCHAR(255)

        {
            "name": "Astro Dev",
            "nickname": "astrodev"
        }

* Resposta

        {
	        message: "Atualização feita com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Deletar usuário
### DELETE "/user/:id"
* Atenção
* 	Ao apagar o usuário, todas as tarefas criadas por ele também serão apagadas
* Params

        id (Id do usuário) = INT

* Resposta

        {
	        message: "Usuário apagado com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Criar tarefa
### PUT "/task"

* Body

        title = VARCHAR(255)
        description = VARCHAR(255)
        limitDate = dd/mm/aaaa
        creatorUserId = INT
        
        {
            "title": "Criar banco dos alunos",
            "description": "Devemos criar o banco dos alunos para o módulo do backend",
            "limitDate": "04/05/2020",
            "creatorUserId": 1
        }

* Resposta

        {
	        message: "Tarefa criada com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Pegar tarefa pelo id
### GET "/task/:id"
* Params

        id (Id da Tarefa) = INT

* Resposta

        {
            "taskId": 1,
            "title": "Criar banco dos alunos",
            "description": "Devemos criar o banco dos alunos para o módulo do backend",
            "limitDate": "04/05/2020",
            "creatorUserId": "1,
            "creatorUserNickname": "astrodev",
            "responsibleUsers": [
                {
                    "id": 1,
                    "nickname": "astrodev"
                }
            ]
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Atualizar o status da tarefa
### POST "/task/status/edit"

* Body

        task_ids = INT ARRAY
        status = VARCHAR(255)

        {
            "task_ids": [1],
            "status": "Feita"
        }

* Resposta

        {
	        message: "Atualização feita com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Pegar todas as tarefas por status 
### GET "/task?status=valor_do_status"
* Query

        status = VARCHAR(255)

* Resposta

        {
            "tasks": [{
                "taskId": 1,
                "title": "Criar banco dos alunos",
                "description": "Devemos criar o banco dos alunos para o módulo do backend",
                "limitDate": "04/05/2020",
                "status": "A Fazer",
                "creatorUserId": 1,
                "creatorUserNickname": "astrodev"
            }]
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Pegar todas as tarefas atrasadas
### GET "/task/delayed"

* Resposta

        {
            "tasks": [{
                "taskId": 1",
                "title": "Criar banco dos alunos",
                "description": "Devemos criar o banco dos alunos para o módulo do backend",
                "limitDate": "04/05/2020",
                "creatorUserId": 1,
                "creatorUserNickname": "astrodev"
            }]
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Procurar tarefas por termo 
### GET "/task?termo=tarefa"
* Query

       termo (incluido no title ou description) = VARCHAR(255)

* Resposta

        {
            "tasks": [{
                "taskId": "001",
                "title": "Criar banco dos alunos",
                "description": "Devemos criar o banco dos alunos para o módulo do backend",
                "limitDate": "04/05/2020",
                "status", "A Fazer",
                "creatorUserId": "001",
                "creatorUserNickname": "astrodev",
            }]
        }

        OU

        { 
            message: Mensagem de erro
        }


---

## - Deletar tarefa
### DELETE "/task/:id"
* Params

        id (Id da tarefa) = INT

* Resposta

        {
	        message: "Tarefa apagada com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }


---

## - Pegar tarefas criadas por um usuário
### GET "/task?creatorUserId=id"
* Query

        creatorUserId = INT

* Resposta

        {
            "tasks": [{
                "taskId": 1,
                "title": "Criar banco dos alunos",
                "description": "Devemos criar o banco dos alunos para o módulo do backend",
                "limitDate": "04/05/2020",
                "creatorUserId": 1,
                "status": "A Fazer",
                "creatorUserNickname": "astrodev"
            }]
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Atribuir responsáveis a uma tarefa
### POST /task/responsible"

* Body

        task_id = INT
        responsible_user_ids = INT ARRAY

        {
            "task_id": 1,
            "responsible_user_ids": [1]
        }

* Resposta

        {
	        message: "Responsáveis atribuidos a tarefa com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Pegar usuários responsáveis por uma tarefa
### GET "/task/:id/responsible"
* Params

        id (Id da tarefa) = INT

* Resposta

        {
            "users": [{
                "id": "001",
                "nickname": "astrodev"
            }]
        }

        OU

        { 
            message: Mensagem de erro
        }

---

## - Retirar um usuário responsável de uma tarefa
### DELETE "/task/:taskId/responsible/:responsibleUserId"
* Params

        taskId (Id da tarefa) = INT
        responsibleUserId (Id do usuário) = INT

* Resposta

        {
	        message: "Relação apagada com sucesso"
        }

        OU

        { 
            message: Mensagem de erro
        }

---
