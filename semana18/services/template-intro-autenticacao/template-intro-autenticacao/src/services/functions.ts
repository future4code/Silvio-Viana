import { v4 } from 'uuid'
import * as jwt from 'jsonwebtoken'
import connection from '../connection'
import * as bcrypt from 'bcryptjs'
import axios from 'axios'

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

export const createUser = async (id: string, email: string, password: string, role: string, adress: any) : Promise<void> => {

    console.log(id)
    await connection.raw(`INSERT INTO to_do_list_users VALUES ("${id}", "${email}", "${password}", "${role}")`)
    await connection.raw(`INSERT INTO Adress (cep , logradouro, numero, complemento, bairro, cidade, estado, user_id)
    VALUES ("${adress.cep}", "${adress.logradouro}", "${adress.numero}", "${adress.complemento}", "${adress.bairro}",
     "${adress.localidade}", "${adress.uf}", "${id}")`)

}

export const deleteUser = async (id: string) : Promise<void> => {

    await connection.raw(`DELETE FROM to_do_list_users WHERE id = "${id}"`)
}

export const generateHash = async (password: string) : Promise<string> => {

    const salt = await bcrypt.genSalt(12)
    return await bcrypt.hash(password , salt)
}

export const checkPassword = async (password: string, hash: string) : Promise<boolean> => {

    return await bcrypt.compare(password, hash)
}

export const getAdress = async (cep: string) : Promise<any> => {

    const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`) as any

    return result.data
}