function calculeDiscount (roupas: roupa[]) : void {
    console.table(roupas.map(roupa => {
        let precoComDisconto: string = ""
        if (roupa.class === "Verão") { precoComDisconto = (roupa.preco - roupa.preco * 0.05).toFixed(2)}
        if (roupa.class === "Inverno") { precoComDisconto = (roupa.preco - roupa.preco * 0.10).toFixed(2)}
        if (roupa.class === "Banho") { precoComDisconto = (roupa.preco - roupa.preco * 0.04).toFixed(2)}
        if (roupa.class === "Íntimas") { precoComDisconto = (roupa.preco - roupa.preco * 0.07).toFixed(2)}

        return {...roupa, precoComDisconto: precoComDisconto}
    }))

}

type roupa = {nome: string, preco: number, class: tipos}

enum tipos {
    verao = "Verão",
    inverno = "Inverno",
    banho = "Banho",
    intimas = "Íntimas"
}

const roupa1: roupa = {nome: "Casaco", preco: 50, class: tipos.inverno}
const roupa2: roupa = {nome: "Biquini", preco: 30, class: tipos.banho}
const roupa3: roupa = {nome: "Cueca", preco: 10, class: tipos.intimas}
const roupas : roupa[] = [roupa1, roupa2, roupa3]

calculeDiscount(roupas)