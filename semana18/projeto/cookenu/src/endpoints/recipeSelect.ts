import { Request, Response } from 'express'
import { searchRecipeById, tokenOwnerExist } from '../services/handleDB'
import { isVarchar64 } from '../services/handleErrors'
import { getDataFromToken } from '../services/handleToken'

export const recipeSelect = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id

        if (!await tokenOwnerExist(userId)) { throw new Error("Token inválido") }

        const recipeId = req.params.id

        if (!isVarchar64([recipeId]))
        { throw new Error("recipeId deve ser texto e possuir no máximo 64 caracteres") }

        const recipe = await searchRecipeById(recipeId)

        if (!recipe) { throw new Error("Receita não encontrada") }

        res.status(200).send(recipe)
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}