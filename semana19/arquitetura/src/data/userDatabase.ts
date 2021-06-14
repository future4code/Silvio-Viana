import { connection } from ".."


export const createUser = async (id: string, email: string, name: string, password: string, role: string) : Promise<any> => {

    await connection.raw(`INSERT INTO User_Arq 
    VALUES("${id}", "${name}", "${email}", "${password}", "${role}")`)
}

export const getUserByEmail = async (email: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM User_Arq WHERE email = "${email}"`)

    return result[0][0]
}

export const getAllUsers = async () : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM User_Arq`)

    return result[0]
}