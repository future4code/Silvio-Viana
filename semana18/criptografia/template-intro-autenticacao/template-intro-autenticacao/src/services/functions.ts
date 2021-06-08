import { v4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import connection from '../connection'
import * as bcrypt from 'bcryptjs'

export function generateId () : string {

    return v4()
}

export function generateToken (id: string, role: string) : string {

    const token = jwt.sign({id, role}, "testkey", {expiresIn: "1y"})

    return token
}

export function getData (token: string) : any {

    const payload = jwt.verify(token, "testkey") as any

    return payload
}

export const getUserByEmail = async (email: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM to_do_list_users WHERE email = "${email}"`)

    return result[0][0]
}

export const getUserById = async (id: string) : Promise<any> => {

    const result = await connection.raw(`SELECT * FROM to_do_list_users WHERE id = "${id}"`)

    return result[0][0]
}

export const createUser = async (id: string, email: string, password: string, role: string) : Promise<void> => {

    await connection.raw(`INSERT INTO to_do_list_users VALUES ("${id}", "${email}", "${password}", "${role}")`)
}

export const generateHash = async (password: string) : Promise<string> => {

    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password , salt)
}

export const checkPassword = async (password: string, hash: string) : Promise<boolean> => {

    return await bcrypt.compare(password, hash)
}