const ex = process.argv[2]

//1. usando process.argv[x], x é o índice do argumento
if (ex === 'ex1') {

    const nome = process.argv[3]
    const idade = process.argv[4]
    console.log(`Olá, ${nome}! Você tem ${idade} anos.`)
    console.log(`Olá, ${nome}! Você tem ${idade} anos. Em sete anos você terá ${Number(idade) + 7}.`)
}
//2.
if (ex === 'ex2') {

    const operacao = process.argv[3]
    const n1 = Number(process.argv[4])
    const n2 = Number(process.argv[5])

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
}
//3.
if (ex === 'ex3') {
    
    const tarefas = ["Correr", "Estudar"]
    tarefas.push(process.argv[3])
    console.log(tarefas)
}