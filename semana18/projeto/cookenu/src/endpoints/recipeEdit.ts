import { Request, Response } from 'express'
import { modifyRecipe, searchRecipeById } from '../services/handleDB'
import { getDataFromToken } from '../services/handleToken'
import { recipeCreator } from '../types'

export const recipeEdit = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id
        const userRole = getDataFromToken(token).role

        const {recipeId, title, description, instruction} = req.body

        if (!recipeId || !title || !description || !instruction) 
        { throw new Error("Você deve fornecer: recipeId, title, description e instruction") }

        const recipe = await searchRecipeById(recipeId)

        if (!recipe) { throw new Error("Receita não encontrada") }

        if (userRole === "NORMAL" && userId !== recipe.creator_id) 
        { throw new Error("Você não pode editar uma receita que não é sua") }

        const newRecipe: recipeCreator = {
            id: recipeId,
            title,
            description,
            instruction,
            creatorId: userId
        }

        await modifyRecipe(newRecipe)

        res.status(200).send({ message: "Receita editada com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}