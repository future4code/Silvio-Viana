import { Request, Response } from 'express'
import connection from './connection'
import app from './app'
import { formatarDataToString, formatarStringToData, formatoValidoData } from './funcoes'


//0.
app.get("/see/:path", async (req: Request, res: Response) => {

    let result: any = []

    if (req.params.path === "users") { result = await connection("Users") }
    if (req.params.path === "tasks") { result = await connection("Tasks") }

    res.send(result)
})

//8.
app.get("/user", async (req: Request, res: Response) => {

    try {

        const query  = req.query.query

        if (!query) { throw new Error("Você deve fornecer uma query com o nickname ou email do usuário que você procura") }

        const result = await connection.raw(`SELECT id, nickname FROM Users 
        WHERE nickname LIKE "%${query}%" OR email LIKE "%${query}%"`)

        res.status(200).send({ users: result[0]} )
    }
    catch (err) {

        res.status(400).send({message: err.message})
    }
})

//1.
app.put("/user", async (req: Request, res: Response) => {

    try {

        const name: string = req.body.name
        const nickname: string = req.body.nickname
        const email: string = req.body.email

        if (!name || !nickname || !email) { throw new Error("Você deve informar: name, nickname e email") }

        await connection.raw(`INSERT INTO Users (name, nickname, email) VALUES ( "${name}", "${nickname}", "${email}")`)
        res.status(200).send("Usuário Criado")
    }
    catch (err) {

        if (err.errno === 1062) {

            if (err.sqlMessage.includes("nickname")) { res.status(400).send("Já existe um usuário com esse nickname") }
            if (err.sqlMessage.includes("email")) { res.status(400).send("Já existe um usuário com esse email") }
        }
        res.status(400).send(err.message)
    }
})

//6.
app.get("/user/all", async (req: Request, res: Response) => {

    try {

        const result = await connection.raw("SELECT id, name FROM Users")
        res.status(400).send({users: result[0]})
    }
    catch (err) {

        res.status(400).send(err.message)
    }
})

//2.
app.get("/user/:id", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)

        if (isNaN(id)) { throw new Error ("O id deve ser um número")}

        const result = await connection.raw(`SELECT id, name FROM Users WHERE id = ${id}`)

        if (!result[0][0]) { throw new Error("Usuário não encontrado")}

        res.status(200).send(result[0][0])
    }
    catch(err) {

        res.status(400).send(err.message)
    }
})

//3.
app.post("/user/edit/:id", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)
        const name: string = req.body.name
        const nickname: string = req.body.nickname

        if (isNaN(id)) { throw new Error ("O id deve ser um número")}
        if (!name || !nickname) { throw new Error("Você deve informar: name e nickname") }

        const result = await connection.raw(`UPDATE Users SET name = "${name}", nickname = "${nickname}" WHERE id = ${id}`)

        if (result[0].affectedRows === 0) { throw new Error("Usuário não encontrado") }
        if (result[0].changedRows === 0) { throw new Error("O usuário já possui esse name e nickname") }

        res.status(200).send("Usuário alterado com sucesso")
    }
    catch(err) {

        res.status(400).send(err.message)
    }
})

//7.
app.get("/task", async (req: Request, res: Response) => {

    try {

        const creatorUserId: number = Number(req.query.creatorUserId)

        if (isNaN(creatorUserId)) { throw new Error("O creatorUserId deve ser um número") }
        if (!creatorUserId) { throw new Error("Você deve fornecer: creatorUserId") }

        const result = await connection.raw(`SELECT t.id as taskId, t.title, t.description, t.limitDate, t.status,
        u.id as creatorUserId, u.nickname as creatorUserNickname
        FROM Tasks t JOIN Users u ON u.id = t.creatorUserId
        WHERE u.id = ${creatorUserId}`)

        for (let i = 0; i < result[0].length; i++) {

            result[0][i].limitDate = formatarDataToString(result[0][i].limitDate)
        }

        res.status(200).send({tasks: result[0]})
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//5.
app.get("/task/:id", async (req: Request, res: Response) => {

    try {
        const id: number = Number(req.params.id)

        if (isNaN(id)) { throw new Error ("O id deve ser um número")}

        const result = await connection.raw(`SELECT t.id as taskId, t.title, t.description, t.limitDate, t.status,
        u.id as creatorUserId, u.nickname as creatorUserNickname
        FROM Tasks t JOIN Users u ON u.id = t.creatorUserId
        WHERE t.id = ${id}`)
        
        if (result[0][0] === undefined) { throw new Error("Tarefa não encontrada") }

        result[0][0].limitDate = formatarDataToString(result[0][0].limitDate)

        res.status(200).send(result[0][0])
    }
    catch (err) {

        res.status(200).send(err.message)
    }
})

//10.
app.get("/task/:id/responsible", async (req: Request, res: Response) => {

    try {

        const id: number = Number(req.params.id)
        if (!id || isNaN(id)) { throw new Error("Você deve fornecer um id e ele deve ser um número") }

        const result = await connection.raw(`SELECT u.id, u.nickname FROM Users u JOIN UserTaskRelation ut
        ON u.id = ut.user_id WHERE ut.task_id = ${id}`)
        
        if (result[0].length === 0) { throw new Error("Responsáveis não encontrados") }
        res.status(200).send({users: result[0]})
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
})

//9.
app.post("/task/responsible", async (req: Request, res: Response) => {

    try {

        const task_id: number = Number(req.body.task_id)
        const responsible_user_id: number = Number(req.body.responsible_user_id)

        if (!task_id || !responsible_user_id) { 
            throw new Error("Você deve fornecer: task_id e responsible_user_id e ambos devem ser número") }

        await connection.raw(`INSERT INTO UserTaskRelation VAlUES (${responsible_user_id}, ${task_id})`)

        res.status(200).send({message: "Tarefa atribuída com sucesso"})
    }
    catch(err) {

        if (err.errno === 1452) {

            if (err.sqlMessage.includes("user_id")) { res.status(400).send({message: "Id de usuário não encontrado"}) }
            if (err.sqlMessage.includes("task_id")) { res.status(400).send({message: "Id de tarefa não encontrado"}) }
        }

        res.status(400).send({ message: err })
    }
})

//4.
app.put("/task", async (req: Request, res: Response) => {

    try {

        const title: string = req.body.title
        const description: string = req.body.description
        const limitDate: string = req.body.limitDate
        const creatorUserId: number = Number(req.body.creatorUserId)

        if (isNaN(creatorUserId)) { throw new Error ("O creatorUserId deve ser um número")}
        if (!title || !description || !limitDate || !creatorUserId) 
        { throw new Error("Você deve informar: title, description, limitDate e creatorUserId") }
        if (!formatoValidoData(limitDate)) { throw new Error("Formato inválido de data")}

        const result = await connection.raw(`INSERT INTO Tasks (title, description, limitDate, creatorUserId)
        VALUES ("${title}", "${description}", "${formatarStringToData(limitDate)}", ${creatorUserId})`)

        res.status(200).send("Tarefa criada com sucesso")
    }
    catch(err) {

        if (err.sqlMessage.inclues("too long")) { res.status(400).send("Algum dos campos tem mais caracteres que 255")}
        res.status(400).send(err.sqlMessage)
    }
})

