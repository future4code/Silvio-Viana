import { Request, Response } from 'express'
import { getFeed } from '../services/handleDB'
import { getDataFromToken } from '../services/handleToken'


export const feed = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id

        res.status(200).send({ recipes: await getFeed(userId) })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}