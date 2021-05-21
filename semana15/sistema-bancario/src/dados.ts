export type user = {nome: string, cpf: string, nascimento: string, saldo: number, extratos: extrato[]}
export type extrato = {valor: number, data: string, descricao: string}

const user1: user = {nome: "Silvio Viana", cpf: "123.456.789-00", nascimento: "08/01/2000", saldo: 10000, extratos: []}
const user2: user = {nome: "Amélia Maria", cpf: "312.456.789-00", nascimento: "07/07/2001", saldo: 5000, extratos: []}
const user3: user = {nome: "João Pedro", cpf: "231.456.789-00", nascimento: "05/12/2002", saldo: 200, extratos: []}

export const usersDefault: user[] = [user1, user2, user3]