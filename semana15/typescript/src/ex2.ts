//a.
// Array e object
function obterEstatisticas (numeros: number[]): object {

    const numerosOrdenados: number[] = numeros.sort((a, b) => {return a - b})

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

//b. soma é tipo number

//c.
type amostra = {numeros: number[], funcao : (numeros: number[]) => object}
const testando: amostra = {numeros: [1, 5, 7, 10, 100, -50, 300], funcao: obterEstatisticas}
console.log(testando.funcao(testando.numeros))