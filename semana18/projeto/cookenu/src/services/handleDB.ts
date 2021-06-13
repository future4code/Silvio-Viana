import connection from '../connection'
import { recipeCreator, userCreator } from '../types'

export const createUser = async (user: userCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO Cookenu_Users 
    VALUES ("${user.id}", "${user.name}", "${user.email}", "${user.role}", "${user.password}")`)
}

export const emailInUse = async (email: string) : Promise<boolean> => {

    const result = await connection.raw(`SELECT * FROM Cookenu_Users WHERE email = "${email}"`)
    const user = result[0][0]

    if (user) { return true }
    else { return false }
}

export const searchUserByEmail = async (email: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM Cookenu_Users WHERE email = "${email}"`)

    return result[0][0]
}

export const searchUserById = async (id: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM Cookenu_Users WHERE id = "${id}"`)

    const recipes = await connection.raw(`SELECT id, title, description, instruction, DATE_FORMAT(createdAt,'%d/%m/%Y') AS createdAt
    FROM Cookenu_Recipes WHERE creator_id = "${id}" ORDER BY createdAt`)

    result[0][0].recipes = recipes[0]

    return result[0][0]
}

export const searchUsersByName = async (name: string) : Promise<any> => {

    const result = await connection.raw(`SELECT id, name, email FROM Cookenu_Users WHERE name LIKE "%${name}%"`)

    return result[0]
}

export const tokenOwnerExist = async (id: string) : Promise<boolean> => {

    const result = await connection.raw(`SELECT * FROM Cookenu_Users WHERE id = "${id}"`)
    const user = result[0][0]

    if (user) { return true }
    else { return false }
}

export const getFeed = async (userId: string) : Promise<any> => {

    const result = await connection.raw(`SELECT r.id, r.title, r.description, r.instruction,
    DATE_FORMAT(r.createdAt,'%d/%m/%Y') AS createdAt, u.id AS creatorId, u.name AS creatorName
    FROM Cookenu_Recipes r JOIN Cookenu_Users u ON r.creator_id = u.id
    WHERE creator_id IN (SELECT followed_id FROM Cookenu_Follows WHERE follower_id = "${userId}")
    ORDER BY r.createdAt`)

    return result[0]
}

export const deleteUser = async (userId: string) : Promise<void> => {

    await connection.raw(`DELETE FROM Cookenu_Follows 
    WHERE follower_id = "${userId}" OR followed_id = "${userId}"`)

    await connection.raw(`DELETE FROM Cookenu_Recipes
    WHERE creator_id = "${userId}"`)

    await connection.raw(`DELETE FROM Cookenu_Users 
    WHERE id = "${userId}"`)
}

export const createRecipe = async (recipe: recipeCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO Cookenu_Recipes
    VALUES ("${recipe.id}", "${recipe.title}", "${recipe.description}", 
    "${recipe.instruction}", CURDATE(), "${recipe.creatorId}")`)
}

export const searchRecipeById = async (id: string) : Promise<any> => {

    const result = await connection.raw(`SELECT r.id, title, r.description, r.instruction,
    DATE_FORMAT(r.createdAt,'%d/%m/%Y') AS createdAt, u.id AS creatorId, u.name AS creatorName
    FROM Cookenu_Recipes r JOIN Cookenu_Users u ON r.creator_id = u.id WHERE r.id = "${id}"`)

    return result[0][0]
}

export const searchRecipesByTitle = async (title: string) : Promise<any> => {

    const result = await connection.raw(`SELECT r.id, title, r.description, r.instruction,
    DATE_FORMAT(r.createdAt,'%d/%m/%Y') AS createdAt, u.id AS creatorId, u.name AS creatorName
    FROM Cookenu_Recipes r JOIN Cookenu_Users u ON r.creator_id = u.id
    WHERE title LIKE "%${title}%" ORDER BY createdAt`)

    return result[0]
}

export const modifyRecipe = async (recipe: recipeCreator) : Promise<void> => {

    await connection.raw(`UPDATE Cookenu_Recipes 
    SET title = "${recipe.title}", description = "${recipe.description}", instruction = "${recipe.instruction}"
    WHERE id = "${recipe.id}"`)
}

export const deleteRecipe = async (recipeId: string) : Promise<void> => {

    await connection.raw(`DELETE FROM Cookenu_Recipes WHERE id = "${recipeId}"`)
}

export const createFollowRelation = async (followerId: string, followedId: string) : Promise<void> => {

    await connection.raw(`INSERT INTO Cookenu_Follows VALUES ("${followerId}", "${followedId}")`)
}

export const followRelationExists = async (followerId: string, followedId: string) : Promise<boolean> => {

    const result = await connection.raw(`SELECT * FROM Cookenu_Follows 
    WHERE follower_id = "${followerId}" AND followed_id = "${followedId}"`)

    if (result[0][0]) { return true }
    else { return false }
}

export const removeFollowRelation = async (followerId: string, followedId: string) : Promise<void> => {

    await connection.raw(`DELETE FROM Cookenu_Follows 
    WHERE follower_id = "${followerId}" AND followed_id = "${followedId}"`)
}
