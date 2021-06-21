import { Request, Response } from 'express'
import { searchUserById, tokenOwnerExist } from '../services/handleDB'
import { isVarchar64 } from '../services/handleErrors'
import { getDataFromToken } from '../services/handleToken'

export const profileSelect = async (req: Request, res: Response) : Promise<void> => {

    try {

        const userSearchedId: string = req.params.id
        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id

        if (!await tokenOwnerExist(userId)) { throw new Error("Token inválido") }

        if (!isVarchar64([userSearchedId]))
        { throw new Error("userSearchedId deve possuir no máximo 64 caracteres") }

        const user = await searchUserById(userSearchedId)
        if (!user) { throw new Error("Usuário não encontrado") }

        res.status(200).send({ id: user.id, name: user.name, email: user.email, recipes: user.recipes })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}