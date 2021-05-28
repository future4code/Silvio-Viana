import { user, extrato } from './dados'

export function formatoValidoCPF (cpf: string) : boolean {

    if (cpf.length !== 14) { return false }

    let numbers: string = '1234567890'

    for (let i = 0; i < 14; i++) {

        if ((i === 3 || i === 7) && cpf[i] !== ".") { return false }
        else if (i === 11 && cpf[i] !== "-") { return false }
        else if (i !== 3 && i !== 7 && i !== 11 && !numbers.includes(cpf[i])) { return false }
    }

    return true
}

export function existeCPF (cpf: string, users: user[]) : boolean {

    const match = users.find(user => user.cpf === cpf)

    return !(match === undefined)
}

export function formatoValidoData (data: string) : boolean {
    
    //Check simples, 31 de Fevereiro é uma data aceita.

    if (data.length !== 10) { return false }

    let numbers: string = '1234567890'
    const checkData: string[] = data.split("/")

    if (checkData[0].length !== 2 && checkData[1].length !== 2 && checkData[2].length !== 4) { return false }
    if (isNaN(Number(checkData[0])) || Number(checkData[0]) > 31) { return false }
    if (isNaN(Number(checkData[1])) || Number(checkData[1]) > 12 || Number(checkData[1]) < 1) { return false }
    if (isNaN(Number(checkData[2])) || Number(checkData[2]) < 1) { return false }

    return true
}

export function maiorIdade (data: string) : boolean {

    const dataArray: string[] = data.split("/")
    const dataAtual: Date = new Date()

    const difDia = dataAtual.getDate() - Number(dataArray[0])
    const difMes = (dataAtual.getMonth()+1) - Number(dataArray[1])
    const difAno = dataAtual.getFullYear() - Number(dataArray[2]) 

    if (difAno > 18) { return true }
    else if (difAno < 18 || difMes < 0 || (difMes === 0 && difDia < 0)) { return false }
    else { return true }
}

export function dataAtual () : string {

    const data: Date = new Date()
    const dia: string = data.getDate().toString().padStart(2, '0')
    const mes: string = (data.getMonth()+1).toString().padStart(2, '0')
    const ano: number = data.getFullYear()

    return `${dia}/${mes}/${ano}`
}

export function dataFutura (data: string) : boolean {

    const dataArray: string[] = data.split("/")
    const dataAtual: Date = new Date()

    const difDia = dataAtual.getDate() - Number(dataArray[0])
    const difMes = (dataAtual.getMonth()+1) - Number(dataArray[1])
    const difAno = dataAtual.getFullYear() - Number(dataArray[2]) 

    if (difAno < 0) { return true }
    else if (difAno > 0 || difMes > 0 || (difMes === 0 && difDia >= 0)) { return false }
    else { return true }
}

export function existeUser (nome: string, cpf: string, users: user[]) : boolean {

    const match = users.find(user => user.nome === nome && user.cpf === cpf)

    return !(match === undefined)
}

export function pegarSaldo (cpf: string, users: user[]) : number | any {

    const user = users.find(user => user.cpf === cpf)

    if (!user) { return "Error" }

    return user.saldo
}

export function adicionarSaldo (cpf: string, valor: number, users: user[]) : user[] {

    const extrato: extrato = {valor, data: dataAtual(), descricao: "Depósito de dinheiro"}

    return users.map(user => {
        if (user.cpf === cpf) {
            return {...user, saldo: user.saldo += valor, extratos: [...user.extratos, extrato]}
        }
        else {
            return user
        }
    })
}

export function realizarPagamento (cpf: string, extrato: extrato, users : user[]) : user[] {

    return users.map(user => {
        if (user.cpf === cpf) {
            return {...user, saldo: user.saldo += extrato.valor, extratos: [...user.extratos, extrato]}
        }
        else {
            return user
        }
    })
}

export function agendarPagamento (cpf: string, extrato: extrato, users : user[]) : user[] {

    return users.map(user => {
        if (user.cpf === cpf) {
            return {...user, extratos: [...user.extratos, extrato]}
        }
        else {
            return user
        }
    })
}

export function realizarTranferencia (cpf: string, cpfDestino: string, valor: number, users: user[]) : user[] {

    const remetente: extrato = {valor: valor * -1, data: dataAtual(), descricao: "Transferido para outra Conta"}
    const destinatario: extrato = {valor: valor , data: dataAtual(), descricao: "Recebido por Transferência"}

    return users.map(user => {

        if (user.cpf === cpf) {
            return {...user, saldo: user.saldo += remetente.valor, extratos: [...user.extratos, remetente]}
        }
        else if (user.cpf === cpfDestino) {
            return {...user, saldo: user.saldo += destinatario.valor, extratos: [...user.extratos, destinatario]}
        }
        else {
            return user
        }
    })
}

export function atualizarSaldo (cpf: string, users: user[]) : user[] {

    return users.map(user => {

        if (user.cpf === cpf) {

            let novoSaldo: number = 0

            for (let extrato of user.extratos) {

                if (!dataFutura(extrato.data)) { novoSaldo += extrato.valor }
            }

            return {...user, saldo: novoSaldo}
        }
        else {

            return user
        }
    })
}
