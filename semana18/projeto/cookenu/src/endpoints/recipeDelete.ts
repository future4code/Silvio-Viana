import { Request, Response } from 'express'
import { deleteRecipe, searchRecipeById, tokenOwnerExist } from '../services/handleDB'
import { isVarchar64 } from '../services/handleErrors'
import { getDataFromToken } from '../services/handleToken'

export const recipeDelete = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id
        const userRole = getDataFromToken(token).role

        if (!await tokenOwnerExist(userId)) { throw new Error("Token inválido") }

        const recipeId = req.params.id

        if (!isVarchar64([recipeId]))
        { throw new Error("recipeId deve ser texto e possuir no máximo 64 caracteres") }

        const recipe = await searchRecipeById(recipeId)

        if (!recipe) { throw new Error("Receita não encontrada") }

        console.log(userId, recipe.creator_id)

        if (userRole === "NORMAL" && userId !== recipe.creatorId) 
        { throw new Error("Você não pode apagar uma receita que não é sua") }

        await deleteRecipe(recipeId)

        res.status(200).send({ message: "Receita deletada com sucesso" })
    }
    catch(err) {

        res.status(400).send({ message: err.message })
    }
}