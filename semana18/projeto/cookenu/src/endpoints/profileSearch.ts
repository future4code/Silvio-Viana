import { Request, Response } from 'express'
import { searchUsersByName, tokenOwnerExist } from '../services/handleDB'
import { isVarchar64 } from '../services/handleErrors'
import { getDataFromToken } from '../services/handleToken'


export const profileSearch = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id
        const nameSearched = req.params.name

        if (!await tokenOwnerExist(userId)) { throw new Error("Token inválido") }

        if (!isVarchar64([nameSearched])) { throw new Error("nameSearched deve ter no máximo 64 caracteres") }

        res.status(200).send({ users : await searchUsersByName(nameSearched) })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}