import { Request, Response } from 'express'
import { searchRecipeById } from '../services/handleDB'
import { getDataFromToken } from '../services/handleToken'

export const searchRecipe = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        getDataFromToken(token)

        const recipeId = req.params.id
        const recipe = await searchRecipeById(recipeId)

        if (!recipe) { throw new Error("Receita não encontrada") }

        res.status(200).send(recipe)
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}