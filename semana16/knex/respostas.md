### Exercício 1

#### a) No método SELECT, ele retorna um Array

#### b) 
    export const buscarAtor = async (nome: string) : Promise<any> => {

        return await connection.raw(`SELECT * FROM Actor WHERE name = "${nome}"`)
    }

#### c)
    export const countGender = async (gender: string) : Promise<any> => {

        return await connection.raw(`SELECT COUNT(*) as count FROM Actor WHERE gender = "${gender}"`)
    }

### Exercício 2

#### a)
    export const mudarSalario = async (salario: number, id: string): Promise<any> => {
        
        await connection("Actor").update({salary: salario}).where({id: id})
    }
    
#### b)
    export const deletarAtor = async (id: string) : Promise<any> => {
        
        await connection("Actor").delete().where({id: id})
    }

#### c)
    export const mediaSalario = async (gender: string) : Promise<any> => {

        return await connection("Actor").avg("salary as average").where({gender: gender})
    }

### Exercício 3

#### a)
    app.get("/actor/:id", async (req: Request, res: Response) => {

        try {

            const result = await connection("Actor").where({id: req.params.id})
            res.send(result[0])
        }
        catch (error) {

            res.send(error)
        }
    })

#### b)
    app.get("/actor", async (req: Request, res: Response) => {

        try {

            const result = await connection("Actor").count("* as quantity").where({gender: req.query.gender})
            res.send(result[0])
        }
        catch (error) {

            res.send(error)
        }
    })
    
### Exercício 4

#### a)
    app.post("/actor", async (req: Request, res: Response) => {

        try {
            if (!req.body.salary || !req.body.id) { throw new Error("Você deve fornecer 'salary' e 'id'")}

            await connection("Actor").update({salary: req.body.salary}).where({id: req.body.id})
            res.send("Sucess")
        }
        catch (error) {

            res.send(error)
        }
    })

#### b)
    app.delete("/actor/:id", async (req: Request, res: Response) => {

        try {

            await connection("Actor").delete().where({id: req.params.id})
            res.send("Sucess")
        }
        catch (error) {

            res.send(error)
        }
    })

### Exercício 5
    app.post("/movie", async (req: Request, res: Response) => {

        try {

            const newMovie = {
                id: req.body.id,
                nome: req.body.nome,
                sinopse: req.body.sinopse,
                lancamento: new Date(req.body.lancamento),
                nota: req.body.nota,
                playing_limit_date: new Date(req.body.playing_limit_date)
            }

            await connection("Movie").insert(newMovie)
            res.send("Sucess")
        }
        catch (error) {

            res.send(error.sqlMessage)
        }
    })

### Exercício 6
    app.get("/movie/all", async (req: Request, res: Response) => {

        try {

            const result = await connection("Movie").limit(15)
            res.send(result)
        }
        catch (error) {

            res.send(error)
        }
    })

### Exercício 7
    app.get("/movie/search", async (req: Request, res: Response) => {

        try {

            const query = req.query.query
            const result = await connection.raw(`SELECT * FROM Movie WHERE nome LIKE "%${query}%" OR sinopse LIKE "%${query}%"`)

            res.send(result[0])
        }
        catch (error) {

            res.send(error)
        }
    })