import { Request, Response } from 'express'
import { userLogin } from '../types'
import * as business from '../business/loginBusiness'

export const login = async (req: Request, res: Response) : Promise<void> => {

    try {

        const input: userLogin = {
            email: req.body.email,
            password: req.body.password
        }

        const token = await business.loginBusiness(input)

        res.status(200).send({token: token})
    }
    catch(err) {

        res.status(400).send({ error: err.message })
    }
}