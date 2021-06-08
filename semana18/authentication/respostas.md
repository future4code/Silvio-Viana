### Exercício 1

    a) Acredito que seja mais seguro por ter mais combinações possíveis, sim
    ----------------------------------------------------------------------------------
    b) import { v4 } from 'uuid'

    export function generateId () : string {

        return v4()
    }

### Exercício 2

    a) A primeira função liga o banco de dados ao código, a segunda insere um novo usuário no banco de dados
    ----------------------------------------------------------------------------------
    b)
        CREATE TABLE IF NOT EXISTS to_do_list_users (
        id VARCHAR(64) PRIMARY KEY,
        name VARCHAR(64) NOT NULL,
        nickname VARCHAR(64) NOT NULL,
        email VARCHAR(64) NOT NULL);
    ----------------------------------------------------------------------------------
    c) Já existe, estou usando o template

### Exercício 3

    a) Diz para o programa que a variável é vai ser uma string, para o programa não apontar erro.
    ----------------------------------------------------------------------------------
    b)
        export function generateToken (id: string) : string {

        const token = jwt.sign({id}, "testkey", {expiresIn: "1y"})

        return token
        }

### Exercício 4

    import { Request, Response } from 'express'
    import { generateId, generateToken } from '../services/functions'

    export default async function signup (req: Request, res: Response) : Promise<void>  {

        try {

            const { email, password } = req.body

            if (!email || !password) { throw new Error("Você deve fornecer: email e password") }
            if (!String(email).includes('@')) { throw new Error("O email deve conter: @") }
            if (String(password).length < 6) { throw new Error("A senha deve ter no mínimo 6 caracteres") }

            const id = generateId()
            const token = generateToken(id)

            res.status(200).send(token)

        }
        catch(err) {

            res.status(400).send({message: err.message})
        }
    }

### Exercício 5

    export const getUserByEmail = async (email: string) : Promise<any> => {

        const result = await connection.raw(`SELECT * FROM to_do_list_users WHERE email = "${email}"`)

        return result[0][0]
    }