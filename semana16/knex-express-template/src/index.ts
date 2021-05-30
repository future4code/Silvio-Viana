import { Request, Response } from 'express'
import connection from './connection'
import app from './app'
import { emailExiste, formatarDataToString, formatarStringToData, formatoValidoData, nickNameExiste, numeroGigante, TaskIdExiste, userIdExiste, varchar255 } from './funcoes'


//0.
app.get("/see/all", async (req: Request, res: Response) => {

    let result = {users: [], tasks: [], relations: []}

    result.users = await connection("Users")
    result.tasks = await connection("Tasks") 
    result.relations = await connection("UserTaskRelation")

    res.status(200).send(result)
})

//8.
app.get("/user", async (req: Request, res: Response) => {

    try {

        const query  = req.query.query

        if (!query) 
        { throw new Error("Você deve fornecer uma query com o nickname ou email do usuário que você procura") }

        const result = await connection.raw(`SELECT id, nickname FROM Users 
        WHERE nickname LIKE "%${query}%" OR email LIKE "%${query}%"`)

        res.status(200).send({ users: result[0] })
    }
    catch (err) {

        res.status(400).send({ message: err.message })
    }
})

//1.
app.put("/user", async (req: Request, res: Response) => {

    try {

        const name: string = req.body.name
        const nickname: string = req.body.nickname
        const email: string = req.body.email

        if (!name || !nickname || !email) { throw new Error("Você deve informar: name, nickname e email") }
        if (!varchar255(name)) { throw new Error("O campo 'name' tem mais que 255 caracteres") }
        if (!varchar255(nickname)) { throw new Error("O campo 'nickname' tem mais que 255 caracteres") }
        if (!varchar255(email)) { throw new Error("O campo 'email' tem mais que 255 caracteres") }
        if (await nickNameExiste(nickname)) { throw new Error("O nickname fornecido já está em uso") }
        if (await emailExiste(email)) { throw new Error("O email fornecido já está em uso") }

        await connection.raw(`INSERT INTO Users (name, nickname, email) 
        VALUES ( "${name}", "${nickname}", "${email}")`)
        
        res.status(200).send({ message: "Usuário Criado" })
    }
    catch (err) {

        res.status(400).send({ message: err.message })
    }
})

//6.
app.get("/user/all", async (req: Request, res: Response) => {

    try {

        const result = await connection.raw("SELECT id, name FROM Users")
        
        res.status(200).send({ users: result[0] })
    }
    catch (err) {

        res.status(400).send({ message: err.message })
    }
})

//2.
app.get("/user/:id", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)

        if (isNaN(id)) { throw new Error ("O id deve ser um número") }
        if (numeroGigante(id)) { throw new Error ("O id fornecido é um número muito grande") }
        if (!await userIdExiste(id)) { throw new Error("Usuário não encontrado") }

        const result = await connection.raw(`SELECT id, nickname FROM Users WHERE id = ${id}`)

        res.status(200).send(result[0][0])
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//3.
app.post("/user/edit/:id", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)
        const name: string = req.body.name
        const nickname: string = req.body.nickname

        if (isNaN(id)) { throw new Error ("O id deve ser um número") }
        if (numeroGigante(id)) { throw new Error ("O id fornecido é um número muito grande") }
        if (!name || !nickname) { throw new Error("Você deve informar: name e nickname") }
        if (!varchar255(name)) { throw new Error("O campo 'name' tem mais que 255 caracteres") }
        if (!varchar255(nickname)) { throw new Error("O campo 'nickname' tem mais que 255 caracteres") }
        if (!await userIdExiste(id)) { throw new Error("Usuário não encontrado") }
        if (await nickNameExiste(nickname)) { throw new Error("O nickname fornecido já está em uso") }

        await connection.raw(`UPDATE Users SET name = "${name}", nickname = "${nickname}" WHERE id = ${id}`)

        res.status(200).send({ message: "Atualização feita com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//20.
app.delete("/user/:id", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)

        if (isNaN(id)) { throw new Error ("Você deve passar um id e ele deve ser um número") }
        if (numeroGigante(id)) { throw new Error ("O id fornecido é um número muito grande") }
        if (!await userIdExiste(id)) { throw new Error("Usuário não encontrado") }

        const tasks = await connection.raw(`SELECT id FROM Tasks WHERE creatorUserId = ${id}`)

        for (let task of tasks[0]) {

            await connection.raw(`DELETE FROM UserTaskRelation WHERE task_id = ${task.id}`)
            await connection.raw(`DELETE FROM Tasks WHERE id = ${task.id}`)
        }

        await connection.raw(`DELETE FROM UserTaskRelation WHERE user_id = ${id}`)
        await connection.raw(`DELETE FROM Users WHERE id = ${id}`)

        res.status(200).send({ message: "Usuário apagado com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//7. , 13. e 17.
app.get("/task", async (req: Request, res: Response) => {

    try {

        const creatorUserId: number = Number(req.query.creatorUserId)
        const status = req.query.status
        const termo = req.query.termo
        let result = []

        if (creatorUserId) {

            if (isNaN(creatorUserId)) { throw new Error("O creatorUserId deve ser um número") }
            if (numeroGigante(creatorUserId)) { throw new Error ("O id fornecido é um número muito grande") }

            result = await connection.raw(`SELECT t.id as taskId, t.title, t.description,
            t.limitDate, t.status,u.id as creatorUserId, u.nickname as creatorUserNickname
            FROM Tasks t JOIN Users u ON u.id = t.creatorUserId
            WHERE u.id = ${creatorUserId}`)
        }
        else if (status) {

            if (!varchar255(String(status))) { throw new Error("O campo 'status' tem mais que 255 caracteres") }
            result = await connection.raw(`SELECT t.id as taskId, t.title, t.description, t.limitDate,
            t.status, u.id as creatorUserId, u.nickname as creatorUserNickname
            FROM Tasks t JOIN Users u ON u.id = t.creatorUserId
            WHERE t.status LIKE "%${status}%"`)
        }
        else if (termo) {

            if (!varchar255(String(termo))) { throw new Error("O campo 'termo' tem mais que 255 caracteres") }
            result = await connection.raw(`SELECT t.id as taskId, t.title, t.description, t.limitDate,
            t.status, u.id as creatorUserId, u.nickname as creatorUserNickname
            FROM Tasks t JOIN Users u ON u.id = t.creatorUserId
            WHERE t.title LIKE "%${termo}%" OR t.description LIKE "%${termo}%"`)
        }
        else { throw new Error("Você deve fornecer: creatorUserId, status ou termo pela chave query na url") }
        
        for (let i = 0; i < result[0].length; i++) {

            result[0][i].limitDate = formatarDataToString(result[0][i].limitDate)
        }

        res.status(200).send({ tasks: result[0] })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//14.
app.get("/task/delayed", async (req: Request, res: Response) => {

    try {

        const result = await connection.raw(`SELECT t.id as taskId, t.title, t.description, 
        t.limitDate, u.id as creatorUserId, u.nickname as creatorUserNickname FROM Tasks t JOIN Users u
        ON t.creatorUserId = u.id WHERE t.limitDate < CURDATE() AND t.status != "Feita"`)

        for (let i = 0; i < result[0].length; i++) {

            result[0][i].limitDate = formatarDataToString(result[0][i].limitDate)
        }

        res.status(200).send({ tasks: result[0] })
    }
    catch (err) {

        res.status(400).send({ message: err.message })
    }
})

//5. e 11.
app.get("/task/:id", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)

        if (isNaN(id)) { throw new Error ("O id deve ser um número")}
        if (numeroGigante(id)) { throw new Error ("O id fornecido é um número muito grande") }
        if (!await TaskIdExiste(id)) { throw new Error ("Tarefa não encontrada") }

        let result = await connection.raw(`SELECT t.id as taskId, t.title, t.description, t.limitDate, t.status,
        u.id as creatorUserId, u.nickname as creatorUserNickname
        FROM Tasks t JOIN Users u ON u.id = t.creatorUserId
        WHERE t.id = ${id}`)

        result = result[0][0]

        const responsaveis = await connection.raw(`SELECT u.id, u.nickname FROM Users u JOIN UserTaskRelation ut
        ON u.id = ut.user_id WHERE ut.task_id = ${id}`)

        result.responsibleUsers = responsaveis[0]
        result.limitDate = formatarDataToString(result.limitDate)

        res.status(200).send(result)
    }
    catch (err) {

        res.status(400).send({ message: err.message })
    }
})

//10.
app.get("/task/:id/responsible", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)

        if (isNaN(id)) { throw new Error("Você deve fornecer um id e ele deve ser um número") }
        if (numeroGigante(id)) { throw new Error ("O id fornecido é um número muito grande") }
        if (!await TaskIdExiste(id)) { throw new Error ("Tarefa não encontrada") }

        const result = await connection.raw(`SELECT u.id, u.nickname FROM Users u JOIN UserTaskRelation ut
        ON u.id = ut.user_id WHERE ut.task_id = ${id}`)
        
        res.status(200).send({ users: result[0] })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//9. e 16.
app.post("/task/responsible", async (req: Request, res: Response) => {

    try {

        const task_id: number = Number(req.body.task_id)
        const ids: number[] = req.body.responsible_user_ids

        if (!task_id || !ids)
        { throw new Error("Você deve fornecer: task_id (número) e responsible_user_ids (array de números)") }
        if (isNaN(task_id)) { throw new Error("Você deve fornecer um task_id e ele deve ser um número") }
        if (numeroGigante(task_id)) { throw new Error ("O id fornecido da tarefa é um número muito grande") }
        if (!(typeof ids !== "string" && ids.length > 0 && !ids.some(isNaN))) 
        { throw new Error("responsible_user_ids deve ser um array de números") }
        if (!await TaskIdExiste(task_id)) { throw new Error ("Tarefa não encontrada") }

        for (let i = 0; i < ids.length; i++) {

            if (!await userIdExiste(Number(ids[i]))) 
            { throw new Error(`O id de usuário no índice ${i} não foi encontrado`) }
        }

        for (let id of ids) {

            await connection.raw(`INSERT INTO UserTaskRelation VAlUES (${id}, ${task_id})`)
        }

        res.status(200).send({ message: "Responsáveis atribuidos a tarefa com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//4.
app.put("/task", async (req: Request, res: Response) => {

    try {

        const title: string = req.body.title
        const description: string = req.body.description
        const limitDate: string = req.body.limitDate
        const creatorUserId: number = Number(req.body.creatorUserId)

        if (!title || !description || !limitDate || !creatorUserId) 
        { throw new Error("Você deve informar: title, description, limitDate e creatorUserId") }
        if (isNaN(creatorUserId)) { throw new Error ("O creatorUserId deve ser um número")}
        if (numeroGigante(creatorUserId)) 
        { throw new Error ("O creatorUserId fornecido é um número muito grande") }
        if (!await userIdExiste(creatorUserId)) { throw new Error("Usuário não encontrado") }
        if (!formatoValidoData(limitDate)) { throw new Error("Formato inválido de data")}
        if (!varchar255(title)) { throw new Error("O campo 'title' tem mais que 255 caracteres") }
        if (!varchar255(description)) { throw new Error("O campo 'description' tem mais que 255 caracteres") }

        await connection.raw(`INSERT INTO Tasks (title, description, limitDate, creatorUserId)
        VALUES ("${title}", "${description}", "${formatarStringToData(limitDate)}", ${creatorUserId})`)

        res.status(200).send({ message: "Tarefa criada com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//12. e 18.
app.post("/task/status/edit/", async (req: Request, res: Response) => {

    try {

        const status: string = req.body.status
        const ids: number[] = req.body.task_ids

        if (!status || !ids) { throw new Error("Você deve fornecer: status e taskId") }
        if (!varchar255(status)) { throw new Error("O campo 'status' tem mais que 255 caracteres") }
        if (!(typeof ids !== "string" && ids.length > 0 && !ids.some(isNaN))) 
        { throw new Error("task_ids deve ser um array de números") }

        for (let i = 0; i < ids.length; i++) {

            if (!await TaskIdExiste(Number(ids[i]))) 
            { throw new Error(`O id de tarefa no índice ${i} não foi encontrado`) }
        }

        for (let id of ids) {

            await connection.raw(` UPDATE Tasks SET status = "${status}" WHERE id = ${id}`)
        }

        res.status(200).send({ message: "Atualização feita com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//19.
app.delete("/task/:id", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)

        if (isNaN(id)) { throw new Error("Você deve fornecer o id da tarefa e ela deve ser um número") }
        if (numeroGigante(id)) { throw new Error ("O id fornecido é um número muito grande") }
        if (!await TaskIdExiste(id)) { throw new Error ("Tarefa não encontrada") }

        await connection.raw(`DELETE FROM UserTaskRelation WHERE task_id = ${id}`)
        await connection.raw(`DELETE FROM Tasks WHERE id = ${id}`)

        res.status(200).send({ message: "Tarefa apagada com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//15.
app.delete("/task/:taskId/responsible/:responsibleUserId", async (req: Request, res: Response) => {

    try {

        const taskId: number = Number(req.params.taskId)
        const responsibleUserId: number = Number(req.params.responsibleUserId)

        if (isNaN(taskId) || isNaN(responsibleUserId)) 
        { throw new Error("Você deve fornecer taskId e responsibleUserId e ambos devem ser números") }
        if (numeroGigante(taskId)) { throw new Error ("O taskId fornecido é um número muito grande") }
        if (numeroGigante(responsibleUserId)) 
        { throw new Error ("O responsibleUserId fornecido é um número muito grande") }
        if (!await TaskIdExiste(taskId)) { throw new Error ("Tarefa não encontrada") }
        if (!await userIdExiste(responsibleUserId)) { throw new Error("Usuário não encontrado") }

        const result = await connection.raw(`DELETE FROM UserTaskRelation 
        WHERE task_id = ${taskId} AND user_id = ${responsibleUserId}`)

        if (result[0].affectedRows === 0) { throw new Error("O Usuário não tem relação com essa tarefa") }

        res.status(200).send({ message: "Relação apagada com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})
