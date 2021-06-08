### Exercício 1

    a) Round é o tempo de resposta e salt uma string aleatória que se mistura no hash. 12. 12. Nunca usei o round antes, então estou utilizando o valor padrão para teste.
    ------------------------------------------------------------------------------------
    b)
        export const generateHash = async (password: string) : Promise<string> => {

            const salt = await bcrypt.genSalt(12)
            return await bcrypt.hash(password , salt)
        }
    ------------------------------------------------------------------------------------
    c)
        export const checkPassword = async (password: string, hash: string) : Promise<boolean> => {

            return await bcrypt.compare(password, hash)
        }

### Exercício 2

    a) O cadastro, não dá para verificar pelo login se não tem os hashs no banco de dados

    b) 
        await createUser(id, email, await generateHash(password))
    ------------------------------------------------------------------------------------
    c)
        if (!await checkPassword(password, user.password)) { throw new Error("Senha incorreta") }
    ------------------------------------------------------------------------------------
    d) Não, esse endpoint utiliza somente o id

### Exercício 3

    a)
        ALTER TABLE to_do_list_users
        ADD role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL";
    ------------------------------------------------------------------------------------
    c) 
        await createUser(id, email, await generateHash(password), role)
    ------------------------------------------------------------------------------------
    d)
        res.status(200).send(generateToken(user.id, user.role))

### Exercício 4

    if (user.role !== "NORMAL") { throw new Error("Unauthorized") }

### Exercício 5

    export const deleteUser = async (id: string) : Promise<void> => {

        await connection.raw(`DELETE FROM to_do_list_users WHERE id = "${id}"`)
    }

    export const remove = async (req: Request, res: Response) : Promise<void> => {

        try {

            const id = req.params.id as string
            const token = req.headers.authorization as string

            const role = getData(token).role

            if (role !== "ADMIN") { throw new Error("Unauthorized") }
            if (!await getUserById(id)) { throw new Error("Usuário não encontrado") }

            await deleteUser(id)

            res.status(200).send({ message: "Usuário apagado com sucesso" })
        }
        catch(err) {

            res.status(400).send({ message: err.message })
        }
    }

### Exercício 6

    import { Request, Response } from 'express'
    import { getData, getUserById } from '../services/functions'

    export const user = async (req: Request, res: Response) : Promise<void> => {

        try {

            const token = req.headers.authorization as string

            const user = await getUserById(getData(token).id)

            if (!user) { throw new Error("Token Inválido") }

            res.status(200).send({id: user.id, email: user.email, role: user.role})
        }
        catch(err) {

            res.status(400).send({ message: err.message })
        }
    }