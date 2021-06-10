import { Request, Response } from 'express'
import { searchUserById } from '../services/handleDB'
import { getDataFromToken } from '../services/handleToken'

export const userProfile = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const id = getDataFromToken(token).id

        const user = await searchUserById(id)

        res.status(200).send({ id: user.id, name: user.name, email: user.email })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}