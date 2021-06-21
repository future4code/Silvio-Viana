import { Request, Response } from 'express'
import { modifyRecipe, searchRecipeById, tokenOwnerExist } from '../services/handleDB'
import { isText, isVarchar64 } from '../services/handleErrors'
import { getDataFromToken } from '../services/handleToken'
import { recipeCreator } from '../types'

export const recipeEdit = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const userId = getDataFromToken(token).id
        const userRole = getDataFromToken(token).role

        if (!await tokenOwnerExist(userId)) { throw new Error("Token inválido") }

        const { recipeId, title, description, instruction } = req.body

        if (!recipeId || !title || !description || !instruction) 
        { throw new Error("Você deve fornecer: recipeId, title, description e instruction") }

        if (!isVarchar64([recipeId, title, description]))
        { throw new Error("Esses itens devem ser texto e possuir no máximo 64 caracteres: recipeId, title e description") }

        if (!isText([instruction])) { throw new Error("instruction deve ser um texto") }

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