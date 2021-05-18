const operacao = process.argv[2]
const n1 = Number(process.argv[3])
const n2 = Number(process.argv[4])

if (operacao === 'add') {
    console.log(n1 + n2)
}
else if (operacao === 'sub') {
    console.log(n1 - n2)
}
else if (operacao === 'mult') {
    console.log(n1 * n2)
}
else if (operacao === 'div') {
    console.log(n1 / n2)
}
else {
    console.log("error")
}