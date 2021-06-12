import { Request, Response } from 'express'
import { createUser, generateHash, generateId, generateToken } from '../services/functions'

export default async function signup (req: Request, res: Response) : Promise<void>  {

    try {

        const { email, password, role } = req.body

        if (!email || !password || !role ) { throw new Error("Você deve fornecer: email, password e role") }
        if (!String(email).includes('@')) { throw new Error("O email deve conter: @") }
        if (String(password).length < 6) { throw new Error("A senha deve ter no mínimo 6 caracteres") }
        if (!["NORMAL", "ADMIN"].includes(role)) { throw new Error("role deve ser: 'NORMAL' our 'ADMIN' ")}

        const id = generateId()

        await createUser(id, email, await generateHash(password), role)

        const token = generateToken(id, role)

        res.status(200).send(token)

    }
    catch(err) {

        res.status(400).send({message: err.message})
    }
}