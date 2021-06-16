import { UserSelect } from "../../model/user";
import { connection } from "../connection";


export const selectUserById = async (id: string) : Promise<UserSelect> => {

    const result = await connection.raw(`SELECT * FROM to_do_list_users WHERE id = "${id}"`)

    const user = result[0][0]

    return {
        name: user.name,
        nickname: user.nickame,
        email: user.nickame,
        role: user.role
    }
}