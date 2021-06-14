import * as userDatabase from '../data/userDatabase'
import { getTokenData } from '../services/authenticator'

export const getAllUsers = async (token: string) : Promise<any> => {

    try {
   
        getTokenData(token)

        const users = await userDatabase.getAllUsers()

        return users
    }
    catch(err) {

        throw new Error(err.message)
    }
}