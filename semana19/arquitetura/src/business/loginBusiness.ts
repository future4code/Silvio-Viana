import { userLogin } from "../types"
import { checkPassword } from '../services/hashManager'
import * as data from '../data/userDatabase'
import { generateToken } from "../services/authenticator"


export const loginBusiness = async (input: userLogin) : Promise<string> => {

    try {

        if (!input.email || !input.password) { throw new Error ("Preencha todos os campos") }

        const user = await data.getUserByEmail(input.email)
        
        if(!user) { throw new Error ("Usuário não encontrado") }

        if (!await checkPassword(input.password, user.password))
        { throw new Error ("Senha incorreta") }


        const token = generateToken(user.id, user.role)

        return token
    }
    catch(err) {

        throw new Error(err.message)
    }
}