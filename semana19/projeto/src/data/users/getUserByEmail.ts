import { connection } from "../connection"


export const getUserByEmail = async (email: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM labook_users WHERE email = "${email}"`)

    return result[0][0]
}