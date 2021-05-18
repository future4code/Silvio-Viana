//a.
// Array e object
function obterEstatisticas (numeros: Array<number>): object {

    const numerosOrdenados: Array<number> = numeros.sort((a, b) => {return a - b})

    let soma: number = 0

    for (let numero of numeros) {
        soma += numero
    }

    const estatisticas: object = 
    {maior: numerosOrdenados[numeros.length - 1],
    menor: numerosOrdenados[0],
    media: soma / numeros.length}

    return estatisticas
}

console.log(obterEstatisticas([1, 5, 7, 10, 100, -50, 300]))

//b. soma é tipo number

//c.
type amostra = {numeros: Array<number>, funcao : object}
const testando: amostra = {numeros: [1, 5, 7, 10, 100, -50, 300], funcao: obterEstatisticas([1, 5, 7, 10, 100, -50, 300])}
console.log(testando)