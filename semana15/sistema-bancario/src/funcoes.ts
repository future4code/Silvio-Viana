import { extrato, user } from './dados'

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

export function dataFutura (data: string) : boolean {
    return true
}

export function existeUser (nome: string, users: user[]) : boolean {

    const match = users.find(user => user.nome === nome)

    return !(match === undefined)
}

export function pegarSaldo (cpf: string, users: user[]) : number | any {

    const user = users.find(user => user.cpf === cpf)

    if (!user) { return "Error" }

    return user.saldo.toFixed(2)
}

export function adicionarSaldo (cpf: string, adicionar: number, users: user[]) : user[] {

    const extrato: extrato = {valor: adicionar, data: dataAtual(), descricao: "Recebimento"}

    return users.map(user => {
        if (user.cpf === cpf) {
            return {...user, saldo: user.saldo += adicionar, extratos: [...user.extratos, extrato]}
        }
        else {
            return user
        }
    })
}

export function dataAtual () : string {

    const data: Date = new Date()
    const dia: string = data.getDate().toString().padStart(2, '0')
    const mes: string = (data.getMonth()+1).toString().padStart(2, '0')
    const ano: number = data.getFullYear()

    return `${dia}/${mes}/${ano}`
}