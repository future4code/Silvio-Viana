### Exercício 1

    export const getAdress = async (cep: string) : Promise<any> => {

        const result = await axios.get(`https://viacep.com.br/ws/${cep}/json/`) as any
        const {logradouro, bairro, localidade, uf} = result.data

        return {logradouro, bairro, localidade, uf}
    }

### Exercício 2

    CREATE TABLE Adress (
    id INT PRIMARY KEY AUTO_INCREMENT,
    cep VARCHAR(64) NOT NULL,
    logradouro VARCHAR(64) NOT NULL,
    numero VARCHAR(64) NOT NULL,
    complemento VARCHAR(64),
    bairro VARCHAR(64) NOT NULL,
    cidade VARCHAR(64) NOT NULL,
    estado VARCHAR(64) NOT NULL,
    user_id VARCHAR(64),
    FOREIGN KEY (user_id) REFERENCES to_do_list_users(id)
    );

### Exercício 3

    export const createUser = async (id: string, email: string, password: string, role: string, adress: any) : Promise<void> => {

        console.log(id)
        await connection.raw(`INSERT INTO to_do_list_users VALUES ("${id}", "${email}", "${password}", "${role}")`)
        await connection.raw(`INSERT INTO Adress (cep , logradouro, numero, complemento, bairro, cidade, estado, user_id)
        VALUES ("${adress.cep}", "${adress.logradouro}", "${adress.numero}", "${adress.complemento}", "${adress.bairro}",
        "${adress.localidade}", "${adress.uf}", "${id}")`)

    }

    export default async function signup (req: Request, res: Response) : Promise<void>  {

        try {

            const { email, password, role, cep, numero } = req.body
            const complemento = req.body.complemento || ""

            if (!email || !password || !role || !cep || !numero ) 
            { throw new Error("Você deve fornecer: email, password, role, cep, numero") }
            if (!String(email).includes('@')) { throw new Error("O email deve conter: @") }
            if (String(password).length < 6) { throw new Error("A senha deve ter no mínimo 6 caracteres") }
            if (!["NORMAL", "ADMIN"].includes(role)) { throw new Error("role deve ser: 'NORMAL' our 'ADMIN' ")}

            const id = generateId()
            const adress = await getAdress(cep)
            adress.numero = numero
            adress.complemento = complemento

            await createUser(id, email, await generateHash(password), role, adress)

            const token = generateToken(id, role)

            res.status(200).send(token)

        }
        catch(err) {

            res.status(400).send({message: err.message})
        }
    }