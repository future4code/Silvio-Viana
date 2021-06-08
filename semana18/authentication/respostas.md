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
            email VARCHAR(64) NOT NULL,
            password VARCHAR(64) NOT NULL
        );
    ----------------------------------------------------------------------------------
    c) 
        export const createUser = async (id: string, email: string, password: string) : Promise<void> => {

            await connection.raw(`INSERT INTO to_do_list_users VALUES ("${id}", "${email}", "${password}")`)
        }

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

            await createUser(id, email, password)

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

### Exercício 6

    export const login = async (req: Request, res: Response) : Promise<void> => {

        try {

            const { email, password } = req.body

            if (!email || !password) { throw new Error("Você deve fornecer: email e password") }
            if (!String(email).includes('@')) { throw new Error("O email deve conter: @") }

            const user = await getUserByEmail(email)

            if (!user) { throw new Error("Usuário não encontrado") }
            if (user.password != password) { throw new Error("Senha incorreta") }

            res.status(200).send(generateToken(user.id))

        }
        catch (err) {

            res.status(400).send({message: err.message})
        }
    }

### Exercício 7

    a) Diz ao programa que o payload pode ser de qualquer tipo, porque o programa assume que vai receber uma string quando queremos que ele receba um objeto
    ----------------------------------------------------------------------------------
    b)
        export function getData (token: string) : string {

            const payload = jwt.verify(token, "testkey") as any

            return payload.id as string
        }

### Exercício 8

    a)
        export const getUserById = async (id: string) : Promise<any> => {

            const result = await connection.raw(`SELECT * FROM to_do_list_users WHERE id = "${id}"`)

            return result[0][0]
        }
    ----------------------------------------------------------------------------------
    b)
        export const profile = async (req: Request, res: Response) : Promise<void> => {

            try {

                const token = req.headers.authorization as string

                const user = await getUserById(getData(token))

                if (!user) { throw new Error("Token Inválido") }

                res.status(200).send({id: user.id, email: user.email})
            }
            catch(err) {

                res.status(400).send({ message: err.message })
            }
        }