import { Request, Response } from 'express'
import { deleteUser, searchUserById, tokenOwnerExist } from '../services/handleDB'
import { getDataFromToken } from '../services/handleToken'

export const profileDelete = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id
        const userRole = getDataFromToken(token).role
        
        if (!await tokenOwnerExist(userId)) { throw new Error("Token inválido") }

        const profileId = req.params.id

        const profile = await searchUserById(profileId)

        if (!profile) { throw new Error("Usuário não encontrado") }

        if (userRole === "NORMAL" && userId !== profile.id) 
        { throw new Error("Você não pode apagar uma conta que não é sua") }

        await deleteUser(profileId)

        res.status(200).send({ message: "Conta deletada com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}