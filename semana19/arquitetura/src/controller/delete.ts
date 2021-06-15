import { Request, Response } from 'express'
import { deleteType } from '../types'
import * as business from '../business/deleteBusiness'

export const deleteUser = async (req: Request, res: Response) : Promise<any> => {

    try {

        const input: deleteType = {
            token: req.headers.authorization as string,
            id: req.params.id
        }


        await business.deleteUser(input)

        res.status(200).send({ message : "Usuário apagado com sucesso" })
    }
    catch(err) {

        res.status(400).send({ error: err.message })
    }
}