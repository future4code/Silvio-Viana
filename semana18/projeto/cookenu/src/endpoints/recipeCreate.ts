import { Request, Response } from 'express'
import { createRecipe, tokenOwnerExist } from '../services/handleDB'
import { isText, isVarchar64 } from '../services/handleErrors'
import { generateId } from '../services/handleId'
import { getDataFromToken } from '../services/handleToken'
import { recipeCreator } from '../types'

export const recipeCreate = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const creatorId = getDataFromToken(token).id

        if (!await tokenOwnerExist(creatorId)) { throw new Error("Token inválido") }

        const { title, description, instruction } = req.body

        if (!title || !description || !instruction) 
        { throw new Error("Você deve fornecer: title, description e instruction") }

        if (!isVarchar64([title, description]))
        { throw new Error("Esses itens devem ser texto e possuir no máximo 64 caracteres: title e description") }

        if (!isText([instruction])) { throw new Error("instruction deve ser um texto") }

        const recipe: recipeCreator = {
            id: generateId(),
            title,
            description,
            instruction,
            creatorId
        }

        await createRecipe(recipe)

        res.status(200).send({ message: "Receita criada com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}