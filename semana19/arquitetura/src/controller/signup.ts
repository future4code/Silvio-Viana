import {Request, Response} from 'express'
import * as userBusiness from "../business/userBusiness"
import { userCreator } from '../types'

export const signup = async (req: Request, res: Response) : Promise<void> => {

    try {

        const input: userCreator = {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            role: req.body.role
        }

        const token = await userBusiness.createUser(input)

        res.status(200).send({ token: token })
    }
    catch(err) {

        res.status(400).send({error: err.message})
    }
}