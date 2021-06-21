import { Request, Response } from 'express'
import { getDataFromToken } from '../services/handleToken'
import { searchUserById,followRelationExists, createFollowRelation, tokenOwnerExist } from '../services/handleDB'
import { isVarchar64 } from '../services/handleErrors'


export const follow = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const followerId = getDataFromToken(token).id
        const followedId = req.body.followedId

        if (!await tokenOwnerExist(followerId)) { throw new Error("Token inválido") }

        if (!followedId) { throw new Error("Você deve fornecer: followedId") }
        if (followerId === followedId) { throw new Error("Você não pode seguir você mesmo") }

        if (!isVarchar64([followedId]))
        { throw new Error("followedId deve ser texto e possuir no máximo 64 caracteres") }

        const followed = await searchUserById(followedId)

        if (!followed) { throw new Error("O Usuário que você quer seguir não foi encontrado") }

        if (await followRelationExists(followerId, followedId)) 
        { throw new Error("Você já está seguindo esse usuário") }

        await createFollowRelation(followerId, followedId)

        res.status(200).send({ message: "Usuário seguido com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}