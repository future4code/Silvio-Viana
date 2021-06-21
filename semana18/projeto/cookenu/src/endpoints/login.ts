import { Request, Response } from 'express'
import { checkPassword, generateHash } from '../services/handleAuthentication'
import { searchUserByEmail } from '../services/handleDB'
import { isVarchar64 } from '../services/handleErrors'
import { generateToken } from '../services/handleToken'

export const login = async (req: Request, res: Response) : Promise<void> => {

    try {

        const { email, password } = req.body

        if (!email || !password) { throw new Error("Você deve fornecer: email e password") }

        if (!isVarchar64([email, password]))
        { throw new Error("Esses itens devem ser texto e possuir no máximo 64 caracteres: email e password") }

        const user = await searchUserByEmail(email)
        if (!user) { throw new Error("Usuário não encontrado") }

        if (!await checkPassword(password, user.password)) { throw new Error("Senha inválida") }

        res.status(200).send({ token: generateToken(user.id, user.role) })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}