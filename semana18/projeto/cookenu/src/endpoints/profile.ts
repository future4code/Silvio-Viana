import { Request, Response } from 'express'
import { searchUserById, tokenOwnerExist } from '../services/handleDB'
import { getDataFromToken } from '../services/handleToken'

export const profile = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const userId = getDataFromToken(token).id

        if (!await tokenOwnerExist(userId)) { throw new Error("Token inválido") }

        const user = await searchUserById(userId)

        res.status(200).send({ id: user.id, name: user.name, email: user.email, recipes: user.recipes })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}