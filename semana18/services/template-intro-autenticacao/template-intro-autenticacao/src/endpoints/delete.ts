import { Request, Response } from 'express'
import { getData, getUserById, deleteUser } from '../services/functions'

export const remove = async (req: Request, res: Response) : Promise<void> => {

    try {

        const id = req.params.id as string
        const token = req.headers.authorization as string

        const role = getData(token).role

        if (role !== "ADMIN") { throw new Error("Unauthorized") }
        if (!await getUserById(id)) { throw new Error("Usuário não encontrado") }

        await deleteUser(id)

        res.status(200).send({ message: "Usuário apagado com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}