import express, { Request, Response } from 'express'
import cors from 'cors'
import { usersDefault, user, extrato} from './dados'
import { formatoValidoCPF, existeCPF, formatoValidoData, dataFutura, maiorIdade, existeUser, pegarSaldo, adicionarSaldo } from './funcoes'

const app = express()

app.use(express.json())
app.use(cors())

let users = usersDefault

app.get("/users", (req: Request, res: Response) => {

    res.status(200).send(users)
})

app.post("/user/create", (req: Request, res: Response) => {

    try {

        const nome = req.body.nome
        const cpf: string = req.body.cpf
        const nascimento: string = req.body.nascimento
        
        if (!nome || !cpf || !nascimento) { throw new Error("Você deve informar: nome, CPF e data de nascimento")}
        if (!formatoValidoCPF(cpf)) { throw new Error("Formato Inválido de CPF")}
        if (existeCPF(cpf, users)) { throw new Error("O CPF informado já está em uso")}
        if (!formatoValidoData(nascimento)) { throw new Error("Formato Inválido de Data") }
        if (!maiorIdade(nascimento)) { throw new Error("Você precisa ser maior de idade para criar uma conta") }

        users.push({nome, cpf, nascimento, saldo: 0, extratos: []})

        res.status(200).send("Usuário criado com sucesso")
    }

    catch (error) {
        res.send(error.message)
    }
})

app.get("/user/balance", (req: Request, res: Response) => {

    try {

        const nome: string = req.body.nome
        const cpf: string = req.body.cpf

        if (!nome || !cpf) { throw new Error("Você deve informar: nome e CPF")}
        if (!existeCPF(cpf, users)) { throw new Error("CPF não Encontrado")}
        if (!existeUser(nome, users)) { throw new Error("Usuário não Encontrado")}

        res.status(200).send(`Saldo: R$${pegarSaldo(cpf, users)}`)
    }
    catch (error) {

        res.send(error.message)
    }
})

app.put("/user/balance/add", (req: Request, res: Response) => {

    try {

        const nome = req.body.nome
        const cpf = req.body.cpf
        const adicionar = Number(req.body.adicionar)

        if (!nome || !cpf || !adicionar) { throw new Error("Você deve informar: nome, CPF e o valor que desejar")}
        if (!existeCPF(cpf, users)) { throw new Error("CPF não Encontrado")}
        if (!existeUser(nome, users)) { throw new Error("Usuário não Encontrado")}

        users = adicionarSaldo(cpf, adicionar, users)
        res.status(200).send("Saldo adicionado com sucesso")
    }
    catch (error) {

        res.send(error.message)
    }
})

app.listen(3010, () => {
    console.log("http://localhost:3010/")
})