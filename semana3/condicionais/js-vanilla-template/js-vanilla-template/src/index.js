// 1- O código verifica se o número é par ou ímpar, se for par ele passa no teste e se for ímpar ele não passa.

// 2- a. Serve para dizer o preço da fruta digitada
//    b. O preço da fruta Maçã é R$2.25
//    c. O preço da fruta Pêra é R$5

// 3- a. Pedindo um número ao usuário e armazendando o seu valor em uma variável chamada "numero"
//    b. "Esse número passou no teste" e erro: varíavel mensagem não existe, erro: varíavel mensagem não existe
//    c. Sim, a varíavel foi definido apenas dentro da condição, portanto não pode ser usada fora dela

// 4-
const idade = Number(prompt("Qual é a sua idade?"))
if (idade >= 18) {
    console.log("Você pode dirigir")
}
else {
    console.log("Você não pode dirigir.")
}

// 5-
const turno1 = prompt("Que turno você estuda? M (Matutino), V (Vespertino) ou N (Noturno)?")
if (turno1 === "M") {
    console.log("Bom Dia")
}
else if (turno1 === "V") {
    console.log("Boa Tarde")
}
else if (turno1 === "N") {
    console.log("Boa Noite")
}
else {
    console.log("Turno Inválido")
}

// 6-
const turno2 = prompt("Que turno você estuda? M (Matutino), V (Vespertino) ou N (Noturno)?")
switch(turno2){
    case "M":
        console.log("Bom Dia")
        break

    case "V":
        console.log("Boa Tarde")
        break

    case "N":
        console.log("Boa Noite")
        break

    default:
        console.log("Turno Inválido")
}

// 7-
const genero = prompt("Qual é o gênero do filme?")
const preco = Number(prompt("Preço do ingresso em R$"))
if (genero === "fantasia" && preco < 15) {
    const snack = prompt("Qual snack você vai comprar?")
    console.log("Bom filme!")
    console.log("... com", snack)
}
else {
    console.log("Escolha outro filme :(")
}

// DESAFIO 2
const nome = prompt("Nome completo: ")
let tipo = prompt("Tipo de jogo, IN (Internacional) ou DO (Doméstico): ")
let etapa = prompt("Etapa do jogo, SF (Semi-Final), DT (Decisão Terceiro Lugar) ou FI (Final): ")
const categoria = Number(prompt("Categoria (1, 2, 3 ou 4): "))
let quantidade = Number(prompt("Quantidade de ingressos: "))
let valorDoIngresso;
let valorTotal;
let erro = false
let concordancia;

if ( 5 > categoria > 0 && categoria % 1 === 0) {
    if (etapa === "SF") {
        etapa = "Semi-Final"
        if (categoria === 1) {
            valorDoIngresso = 1320
        }
        else if (categoria === 2) {
            valorDoIngresso = 880
        }
        else if (categoria === 3) {
            valorDoIngresso = 550
        }
        else if (categoria === 4) {
            valorDoIngresso = 220
        }
    }
    else if (etapa === "DT") {
        etapa = "Decisão de Terceiro Lugar"
        if (categoria === 1) {
            valorDoIngresso = 660
        }
        else if (categoria === 2) {
            valorDoIngresso = 440
        }
        else if (categoria === 3) {
            valorDoIngresso = 330
        }
        else if (categoria === 4) {
            valorDoIngresso = 170
        }
    }
    else if (etapa === "FI") {
        etapa = "Final"
        if (categoria === 1) {
            valorDoIngresso = 1980
        }
        else if (categoria === 2) {
            valorDoIngresso = 1320
        }
        else if (categoria === 3) {
            valorDoIngresso = 880
        }
        else if (categoria === 4) {
            valorDoIngresso = 330
        }
    }
    else {
        console.log('O valor inserido em "Etapa do jogo" é inválido')
        erro = true
    }
}
else{
    console.log('O valor inserido em "Categoria" é inválido')
    erro = true
}

if (quantidade < 0) {
    console.log('O valor inserido em "Quantidade" é inválido')
    erro = true
}
else {
    if (quantidade === 1){
        concordancia = "ingresso"
    }
    else {
        concordancia = "ingressos"
    }
}

if (tipo === "IN") {
    tipo = "Internacional"
    valorTotal = "U$" + quantidade * (valorDoIngresso / 4.10)
    valorDoIngresso = "U$" + (valorDoIngresso / 4.10)
}
else if (tipo === "DO") {
    tipo = "Nacional"
    valorTotal = "R$" + quantidade * valorDoIngresso
    valorDoIngresso = "R$" + valorDoIngresso
}
else {
    console.log('O valor inserido em "Tipo de Jogo" é inválido')
    erro = true
}

if (!erro) {
    console.log("---Dados da compra--- ")
    console.log("Nome do cliente:", nome)
    console.log("Tipo do jogo:", tipo)
    console.log("Etapa do jogo:", etapa)
    console.log("Categoria", categoria)
    console.log("Quantidade de Ingressos:", quantidade, concordancia)
    console.log("---Valores---")
    console.log("Valor do ingresso:", valorDoIngresso)
    console.log("Valor total:", valorTotal) 
}
