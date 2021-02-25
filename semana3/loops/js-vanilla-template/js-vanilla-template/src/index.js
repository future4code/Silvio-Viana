// 1- Repetindo "valor += i" enquanto i for menor que 5, Resultado = 10

// 2- a. Todos os números maiores que 18
//    b. Sim,
//    let i = 0
//    for (let numero of lista) {
//        console.log("Indíce =", i)
//        i++
//        }

// DESAFIO 1- Uma escada seria impressa, com "0" na primeira linha e "0000" na quarta linha

//3- 
const array = [80, 30, 130, 40, 60, 21, 70, 120, 90, 103, 110, 55]

// a.
for (numero of array) {
    console.log(numero)
}

// b.
for (numero of array) {
    console.log(numero / 10)
}

// c.
let array2 = []
for (numero of array) {
    if (numero % 2 === 0) {
        array2.push(numero)
    }
}
console.log(array2)

// d.
let i = 0
for (numero of array) {
    console.log("O elemento do índex", i, "é:", numero)
    i++
}

// e.
let maiorValor
let menorValor
let primeiro = true
for (numero of array) {
    if (primeiro) {
        menorValor = numero
        maiorValor = numero
        primeiro = false
    }
    else {
        if (numero > maiorValor) {
            maiorValor = numero
        }
        if (numero < menorValor) {
            menorValor = numero
        }
    }
}
console.log("O maior número é", maiorValor, "e o menor é", menorValor)
