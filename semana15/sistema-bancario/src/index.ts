import express, { Request, Response } from 'express'
import cors from 'cors'
import { usersDefault, user, extrato} from './dados'
import { formatoValidoCPF, existeCPF, formatoValidoData, dataFutura, maiorIdade, existeUser, pegarSaldo, adicionarSaldo, dataAtual, realizarPagamento, agendarPagamento, realizarTranferencia, atualizarSaldo } from './funcoes'

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
        const data: string = req.body.data
        
        if (!nome || !cpf || !data) { throw new Error("Você deve informar: nome, CPF e data de nascimento") }
        if (!formatoValidoCPF(cpf)) { throw new Error("Formato Inválido de CPF") }
        if (existeCPF(cpf, users)) { throw new Error("O CPF informado já está em uso") }
        if (!formatoValidoData(data)) { throw new Error("Formato Inválido de Data") }
        if (!maiorIdade(data)) { throw new Error("Você precisa ser maior de idade para criar uma conta") }

        users.push({nome, cpf, nascimento: data, saldo: 0, extratos: []})

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

        if (!nome || !cpf) { throw new Error("Você deve informar: nome e CPF") }
        if (!formatoValidoCPF(cpf)) { throw new Error("Formato Inválido de CPF") }
        if (!existeCPF(cpf, users)) { throw new Error("CPF não Encontrado") }
        if (!existeUser(nome, cpf, users)) { throw new Error("Usuário não Encontrado") }

        res.status(200).send(`Saldo: R$${pegarSaldo(cpf, users)}`)
    }
    catch (error) {

        res.send(error.message)
    }
})

app.put("/user/balance/add", (req: Request, res: Response) => {

    try {

        const nome: string = req.body.nome
        const cpf: string = req.body.cpf
        const valor: number = Number(req.body.valor)

        if (!nome || !cpf || !valor) { throw new Error("Você deve informar: nome, CPF e o valor que desejar") }
        if (valor < 1) { throw new Error("Valor Inválido") }
        if (!formatoValidoCPF(cpf)) { throw new Error("Formato Inválido de CPF") }
        if (!existeCPF(cpf, users)) { throw new Error("CPF não Encontrado") }
        if (!existeUser(nome, cpf, users)) { throw new Error("Usuário não Encontrado") }

        users = adicionarSaldo(cpf, valor, users)
        res.status(200).send("Saldo adicionado com sucesso")
    }
    catch (error) {

        res.send(error.message)
    }
})

app.put("/user/balance/update", (req: Request, res: Response) => {
    
    try {

        const cpf: string = req.body.cpf

        if (!cpf) { throw new Error("Você deve informar o CPF da conta a ser atualizada")}
        if (!formatoValidoCPF(cpf)) { throw new Error("Formato Inválido de CPF") }
        if (!existeCPF(cpf, users)) { throw new Error("CPF não Encontrado") }

        users = atualizarSaldo(cpf, users)
        res.status(200).send("Atualização de Saldo feita com sucesso")
    }
    catch (error) {

        res.send(error.message)
    }
})

app.post("/user/pay", (req: Request, res: Response) => {

    try {

        const cpf: string = req.body.cpf
        const valor: number = Number(req.body.valor)
        let data: string = req.body.data
        const descricao: string = req.body.descricao

        if (!cpf || !valor || !descricao) { throw new Error("Você deve informar: CPF, um valor, uma descrição e uma data de pagamento") }
        if (valor < 1) { throw new Error("Valor Inválido") }
        if (!data) { data = dataAtual() }
        if (!formatoValidoCPF(cpf)) { throw new Error("Formato Inválido de CPF") }
        if (!existeCPF(cpf, users)) { throw new Error("CPF não Encontrado") }
        if (!formatoValidoData(data)) { throw new Error("Formato Inválido de Data") }
        if (pegarSaldo(cpf, users) < valor) { throw new Error("Saldo Insuficiente") }

        const extrato: extrato = {valor: valor * -1, data, descricao}

        if (dataFutura(data)) {

            users = agendarPagamento(cpf, extrato, users)
            res.status(200).send("Agendamento Realizado com Sucesso")
        }
        else {

            if (data !== dataAtual()) { throw new Error("Data Inválida para Pagamento") }
            users = realizarPagamento(cpf, extrato, users)
            res.status(200).send("Pagamento Realizado com Sucesso")
        }
    }
    catch (error) {

        res.send(error.message)
    }
})

app.post("/user/transfer", (req: Request, res: Response) => {

    try {

        const nome: string = req.body.nome
        const cpf: string = req.body.cpf
        const nomeDestino: string = req.body.nomeDestino
        const cpfDestino: string = req.body.cpfDestino
        const valor: number = req.body.valor

        if (!nome || !cpf || !nomeDestino || !cpfDestino || !valor) { throw new Error("Você deve informar: o seu nome, o seu CPF, o nome do destinatário, o CPF do destinatário e o valor em si") }
        if (valor < 1) { throw new Error("Valor Inválido") }
        if (!formatoValidoCPF(cpf)) { throw new Error("Formato Inválido de CPF do Remetente") }
        if (!existeCPF(cpf, users)) { throw new Error("CPF do Remetente não Encontrado") }
        if (!existeUser(nome, cpf, users)) { throw new Error("Usuário Remetente não Encontrado") }
        if (!formatoValidoCPF(cpfDestino)) { throw new Error("Formato Inválido de CPF do Destinatário") }
        if (!existeCPF(cpfDestino, users)) { throw new Error("CPF do Destinatário não Encontrado") }
        if (!existeUser(nomeDestino, cpfDestino, users)) { throw new Error("Usuário Destinatário não Encontrado") }
        if (pegarSaldo(cpf, users) < valor) { throw new Error("Saldo Insuficiente") }

        users = realizarTranferencia(cpf, cpfDestino, valor, users)
        res.status(200).send("Transferência Realizada com Sucesso")
    }
    catch (error) {

        res.send(error.message)
    }
})

app.listen(3010, () => {
    console.log("http://localhost:3010/")
})
