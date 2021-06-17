import { generateToken } from '../services/authenticator'
import { hash } from '../services/hashManager'
import { generateId } from '../services/idGenerator'
import { userCreator, USER_ROLES } from '../types'
import * as data from '../data/userDatabase'

export const createUser = async (user: userCreator) : Promise<string> => {

    try {
        
        if (!user.email || !user.name || !user.password || !user.role) 
        { throw new Error ("Preencha todos os campos") }
    
        if(!user.email.includes("@")) {
            throw new Error("Email inválido") }
    
        if(user.password.length < 6) {
            throw new Error("Password deve ter no mínimo 6 caracteres") }

        if (!(user.role in USER_ROLES)) {
            throw new Error("role deve ser NORMAL ou ADMIN") }
        
        const id = generateId()
        const hashPassword = await hash(user.password)

        await data.createUser(id, user.email, user.name, hashPassword, user.role)

        const token = generateToken(id, user.role)
        
        return token
    }
    catch(err) {

        throw new Error(err.message)
    }


}