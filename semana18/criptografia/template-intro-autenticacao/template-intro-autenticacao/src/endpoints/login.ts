import { compare } from 'bcryptjs'
import { Request, Response } from 'express'
import { checkPassword, generateToken, getUserByEmail } from '../services/functions'

export const login = async (req: Request, res: Response) : Promise<void> => {

    try {

        const { email, password } = req.body

        if (!email || !password) { throw new Error("Você deve fornecer: email e password") }
        if (!String(email).includes('@')) { throw new Error("O email deve conter: @") }

        const user = await getUserByEmail(email)

        if (!user) { throw new Error("Usuário não encontrado") }
        if (!await checkPassword(password, user.password)) { throw new Error("Senha incorreta") }

        res.status(200).send(generateToken(user.id, user.role))

    }
    catch (err) {

        res.status(400).send({message: err.message})
    }
}