function fatorial11 (num: number) : number {

    if (num === 1) { return 1 }
    if (num === 0) { return 0 }

    let result: number = 1

    while (num >= 1) {
        result *= num
        num--
    }

    return result
}

console.log(fatorial11(6))
