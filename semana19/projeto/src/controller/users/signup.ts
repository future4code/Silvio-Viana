import { Request, Response } from 'express'
import { signupBusiness } from '../../business/users/signupBusiness'
import { userCreateInputDTO } from '../../model/user'

export const signup = async (req: Request, res: Response) : Promise<void> => {

    try {

        const { name, email, password } = req.body

        const input: userCreateInputDTO = {
            name,
            email,
            password
        }

        const token = await signupBusiness(input)

        res.status(200).send({ token })
    }
    catch(error) {

        res.status(400).send({ error: error.message })
    }
}