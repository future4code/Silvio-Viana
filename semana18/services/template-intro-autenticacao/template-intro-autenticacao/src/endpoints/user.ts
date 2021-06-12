import { Request, Response } from 'express'
import { getData, getUserById } from '../services/functions'

export const user = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const user = await getUserById(getData(token).id)

        if (!user) { throw new Error("Token Inválido") }

        res.status(200).send({id: user.id, email: user.email, role: user.role})
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}