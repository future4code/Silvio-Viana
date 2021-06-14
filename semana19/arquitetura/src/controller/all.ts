import { Request, Response } from 'express'
import * as allBusiness from '../business/allBusiness'


export const all = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string

        const users = await allBusiness.getAllUsers(token)

        res.status(200).send({ users })
    }
    catch(err) {

        res.status(400).send({error: err.message })
    }
}