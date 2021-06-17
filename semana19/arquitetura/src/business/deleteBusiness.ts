import { getTokenData } from "../services/authenticator";
import { deleteType } from "../types";
import * as userDatabase from '../data/userDatabase'


export const deleteUser = async (input: deleteType) : Promise<void> => {

    try {

        const user = getTokenData(input.token)

        if (user.role !== "ADMIN") { throw new Error("Só administradores podem deletar conta") }

        if (!await userDatabase.userExist(input.id)) { throw new Error("Usuário não encontrado") }

        await userDatabase.deleteUserById(input.id)
    }
    catch(err) {

        throw new Error(err.message)
    }
}