import { Request, Response } from 'express'
import { postCreateInputDTO } from '../../model/post'
import { postCreateBusiness } from '../../business/posts/postCreateBusiness'

export const postCreate = async (req: Request, res: Response) : Promise<void> => {

    try {

        const { photo, description, type } = req.body

        const token: string = req.headers.authorization as string

        const input: postCreateInputDTO = {
            token,
            photo,
            description,
            type
        }

        await postCreateBusiness(input)

        res.status(200).send({ message: "Sucess" })
    }
    catch(error) {

        res.status(400).send({ error: error.message })
    }
}