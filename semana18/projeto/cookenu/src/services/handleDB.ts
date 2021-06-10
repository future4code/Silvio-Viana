import connection from '../connection'
import { recipeCreator, userCreator } from '../types'

export const createUser = async (user: userCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO Cookenu_Users 
    VALUES ("${user.id}", "${user.name}", "${user.email}", "${user.password}")`)
}

export const searchUserByEmail = async (email: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM Cookenu_Users WHERE email = "${email}"`)

    return result[0][0]
}

export const searchUserById = async (id: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM Cookenu_Users WHERE id = "${id}"`)

    return result[0][0]
}

export const createRecipe = async (recipe: recipeCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO Cookenu_Recipes
    VALUES ("${recipe.id}", "${recipe.title}", "${recipe.description}", 
    "${recipe.instruction}", CURDATE(), "${recipe.creatorId}")`)
}

export const searchRecipeById = async (id: string) : Promise<any> => {

    const result = await connection.raw(`SELECT id, title, description, instruction,
    DATE_FORMAT(createdAt,'%d/%m/%Y') AS createdAt, creator_id
    FROM Cookenu_Recipes WHERE id = "${id}"`)

    return result[0][0]
}