type prato = {nome: string, custo: number, valorVenda: number, ingredientes: string[]}
const prato1: prato = {nome: "Sanduíche", custo: 5, valorVenda: 10, ingredientes: ["pão", "soja", "ketchup"]}
const prato2: prato = {nome: "Pizza", custo: 10, valorVenda: 20, ingredientes: ["trigo", "tomate", "palmito"]}

const pratos: prato[] = [prato1, prato2]

function cadastrarPrato (prato: prato) : void {
    pratos.push(prato)
}

const novoPrato: prato = {nome: "Macarronada", custo: 3, valorVenda: 9, ingredientes: ["macarrão", "milho"]}
cadastrarPrato(novoPrato)
console.table(pratos)

function precoPrato (nome: string) : void {
    const prato: prato = pratos.filter(prato => {return prato.nome === nome})[0]
    console.table(`Prato: ${nome} | Preço: ${prato.valorVenda}`)
}

precoPrato("Pizza")

type venda = {cliente: string, prato: string}
const vendas: venda[] = []

function venderPrato (prato: string, cliente: string) : void {
    vendas.push({cliente, prato})
}

venderPrato("Pizza", "Marcelo")
venderPrato("Sanduíche", "João")
console.table(vendas)

function lucroRestaurante () : void {
    let soma: number = 0
    let prato: prato
    for (let venda of vendas) {
        prato = pratos.filter(prato => {return prato.nome === venda.prato})[0]
        soma += prato.valorVenda - prato.custo
    }

    console.log(`Lucro: R$${soma.toFixed(2)}`)
}

lucroRestaurante()

// tsc && node ex8.js