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