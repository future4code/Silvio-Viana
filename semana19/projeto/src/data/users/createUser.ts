import { userCreateInputDTO } from "../../model/user"
import { connection } from "../connection"


export const createUser = async (userData: userCreateInputDTO) : Promise<void> => {

    await connection.raw(`INSERT INTO labook_users VALUES 
    ("${userData.id}", "${userData.name}", "${userData.email}", "${userData.password}")`)
}