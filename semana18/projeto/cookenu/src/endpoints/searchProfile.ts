import { Request, Response } from 'express'
import { searchUserById } from '../services/handleDB'
import { getDataFromToken } from '../services/handleToken'

export const searchProfile = async (req: Request, res: Response) : Promise<void> => {

    try {

        const id: string = req.params.id
        const token = req.headers.authorization as string

        getDataFromToken(token)

        const user = await searchUserById(id)

        if (!user) { throw new Error("Usuário não encontrado") }

        res.status(200).send({ id: user.id, name: user.name, email: user.email })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}