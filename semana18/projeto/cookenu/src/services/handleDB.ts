import connection from '../connection'
import { userCreator } from '../types'

export const createUser = async (user: userCreator) : Promise<void> => {

    await connection.raw(`INSERT INTO Cookenu_Users 
    VALUES ("${user.id}", "${user.name}", "${user.email}", "${user.password}")`)
}

export const searchUserByEmail = async (email: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM Cookenu_Users WHERE email = "${email}"`)

    return result[0][0]
}