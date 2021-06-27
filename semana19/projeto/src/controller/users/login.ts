import { Request, Response } from 'express'
import { loginBusiness } from '../../business/users/loginBusiness'
import { userLoginInputDTO } from '../../model/user'

export const login = async (req: Request, res: Response) : Promise<void> => {

    try {

        const { email, password } = req.body

        const input: userLoginInputDTO = {
            email,
            password
        }

        const token = await loginBusiness(input)

        res.status(200).send({ token })
    }
    catch(error) {

        res.status(400).send({ error: error.message })
    }
}