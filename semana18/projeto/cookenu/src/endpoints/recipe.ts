import { Request, Response } from 'express'
import { createRecipe } from '../services/handleDB'
import { generateId } from '../services/handleId'
import { getDataFromToken } from '../services/handleToken'
import { recipeCreator } from '../types'

export const recipe = async (req: Request, res: Response) : Promise<void> => {

    try {

        const token = req.headers.authorization as string
        const creatorId = getDataFromToken(token).id

        const {title, description, instruction } = req.body

        if (!title || !description || !instruction) 
        { throw new Error("Você deve fornecer: title, description e instruction") }

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