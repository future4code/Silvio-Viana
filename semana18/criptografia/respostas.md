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
