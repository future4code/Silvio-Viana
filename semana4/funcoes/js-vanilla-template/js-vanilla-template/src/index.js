// 1- a. 10 e 50
//    b. Os valores não seriam impresso no console, já que o comando que faz isso é "console.log", nada

// 2- a. "Darvas" e "Caio"
//    b. "Amanda" e "Caio"

// 3- Seleciona todos números pares, elevam ao quadrado e retorna um novo array com esses números. paresAoQuadrado

// 4-
//a.
function biografia () {
    console.log("Eu sou Silvio, tenho 20 anos, moro em Aracaju e sou estudante.")
}
//b.
function biografia2 (nome, idade, cidade, estudante) {
    let situacao
    if (estudante) {
        situacao = "sou"
    }
    else {
        situacao = "não sou"
    }
    const fraseCompleta = "Eu sou " + nome + ", tenho " + idade + " anos, moro em " + cidade + " e " + situacao
    + " estudante."
    
    return fraseCompleta
}

// 5-
//a.
const soma = (num1, num2) => {
    return num1 + num2
}
console.log(soma(2, 5))
//b.
const primeiroMaiorOuIgualSegundo = (n1, n2) => {
    if (n1 >= n2) {
        return true
    }
    else {
        return false
    }
}
//c.
const imprimirDezVezes = (mensagem) => {
    for (let i = 0; i < 10; i++){
        console.log(mensagem)
    }
}

// 6-
//a.
const quantidadeElementos = (array) => {
    return array.length
}
//b.
const numeroPar = (num) => {
    if (num % 2 === 0) {
        return true
    }
    else {
        return false
    }
}
//c.
const quantidadePares = (array) => {
    let quantidade = 0
    for (num of array) {
        if (num % 2 === 0) {
            quantidade++
        }
    }
    return quantidade
}
//d.
const quantidadePares2 = (array) => {
    let quantidade = 0
    for (num of array) {
        if (numeroPar(num)) {
            quantidade++
        }
    }
    return quantidade
}

// DESAFIOS
// 1-
const imprimir = (mensagem) => {
    console.log(mensagem)
}
const soma = (n1, n2) => {
    imprimir(n1 + n2)
}
// 2-
//a.
const paresDuplicados = (array) => {
    let novoArray = []
    for (num of array) {
        if (num % 2 === 0) {
            novoArray.push(num * 2)
        }
    }
    return novoArray
}
//b.
const maiorNumero = (array) => {
    let maior = 0
    for (num of array) {
        if (num > maior) {
            maior = num
        }
    }
    return maior
}
//c.
const maiorNumeroIndice = (array) => {
    let maior = 0
    let i = 0
    let indice
    for (num of array) {
        if (num > maior) {
            maior = num
            indice = i
        }
        i++
    }
    return indice
}
//d.
const arrayInvertido = (array) => {
    novoArray = []
    for (let i = array.length - 1; i != -1; i--) {
        novoArray.push(array[i])
    }
    return novoArray
}