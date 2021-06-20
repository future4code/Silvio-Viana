import { Request, Response } from 'express'
import { postSelectBusiness } from '../../business/posts/postSelectBusiness'

export const postSelect = async (req: Request, res: Response) : Promise<void> => {

    try {

        const { id } = req.params


        const post = await postSelectBusiness(id)

        res.status(200).send(post)
    }
    catch(error) {

        res.status(400).send({ error: error.message })
    }
}