import { Request, Response } from 'express'
import { createUser, generateHash, generateId, generateToken, getAdress } from '../services/functions'

export default async function signup (req: Request, res: Response) : Promise<void>  {

    try {

        const { email, password, role, cep, numero } = req.body
        const complemento = req.body.complemento || ""

        if (!email || !password || !role || !cep || !numero ) 
        { throw new Error("Você deve fornecer: email, password, role, cep, numero") }
        if (!String(email).includes('@')) { throw new Error("O email deve conter: @") }
        if (String(password).length < 6) { throw new Error("A senha deve ter no mínimo 6 caracteres") }
        if (!["NORMAL", "ADMIN"].includes(role)) { throw new Error("role deve ser: 'NORMAL' our 'ADMIN' ")}

        const id = generateId()
        const adress = await getAdress(cep)
        adress.numero = numero
        adress.complemento = complemento

        await createUser(id, email, await generateHash(password), role, adress)

        const token = generateToken(id, role)

        res.status(200).send(token)

    }
    catch(err) {

        res.status(400).send({message: err.message})
    }
}