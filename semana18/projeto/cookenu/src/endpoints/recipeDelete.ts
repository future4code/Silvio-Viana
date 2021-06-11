import { Request, Response } from 'express'
import { deleteRecipe, modifyRecipe, searchRecipeById } from '../services/handleDB'
import { getDataFromToken } from '../services/handleToken'

export const recipeDelete = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id
        const userRole = getDataFromToken(token).role

        const recipeId = req.params.id

        const recipe = await searchRecipeById(recipeId)

        if (!recipe) { throw new Error("Receita não encontrada") }

        if (userRole === "NORMAL" && userId !== recipe.creator_id) 
        { throw new Error("Você não pode apagar uma receita que não é sua") }

        await deleteRecipe(recipeId)

        res.status(200).send({ message: "Receita deletada com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}