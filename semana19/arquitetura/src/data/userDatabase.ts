import { connection } from ".."


export const createUser = async (id: string, email: string, name: string, password: string, role: string) : Promise<any> => {

    await connection.raw(`INSERT INTO User_Arq 
    VALUES("${id}", "${email}", "${name}", "${password}", "${role}")`)
}