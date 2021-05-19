function fatorial12 (num: number) : number {

    if (num === 1) { return 1 }
    if (num === 0) { return 0 }

    let result: number = 1

    while (num >= 1) {
        result *= num
        num--
    }

    return result
}

function quantAnagramas (palavra: string) : number {

    function contarLetra (letra: string) : number {

        let result: number = 0

        for (let char of palavra) {
            if (char.toLocaleLowerCase() === letra) { result ++ }
            else if (char.toUpperCase() === letra) { result ++ }
        }

        return result
    }

    let result: number = fatorial12(palavra.length)

    for (let letra of palavra) {
        let count: number = contarLetra(letra)
        if (count > 1) { return result / fatorial12(count)}
    }

    return result
}

console.log(quantAnagramas("Anagrama"))
