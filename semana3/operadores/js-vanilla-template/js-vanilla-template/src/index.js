// 1- a. false
//    b. false
//    c. true
//    e. boolean

// 2- a. none
//    b. null
//    c. 11
//    d. 3
//    e. [3, 19, 5, 6, 7...]
//    f. 9

// 1-
let idade1 = Number(prompt("Qual é a sua idade?"))
let idade2 = Number(prompt("Qual é a idade do seu melhor amigo?"))
console.log("Sua idade é maior do que a do seu melhor amigo?", idade1 > idade2)
console.log("Diferença de idade:", idade1 - idade2)

// 2-
let numeroPar = Number(prompt("Digite um número par"))
console.log(numeroPar % 2)
// Todos dão resultado 0
// O resultado é 1

// 3-
let listaDeTarefas = []
let tarefa1 = prompt("Primeira Tarefa:")
listaDeTarefas.push(tarefa1)
let tarefa2 = prompt("Segunda Tarefa:")
listaDeTarefas.push(tarefa2)
let tarefa3 = prompt("Terceira Tarefa:")
listaDeTarefas.push(tarefa3)
console.log(listaDeTarefas)
let indice = prompt("Me diga o número de uma tarefa que você já realizou (1, 2 ou 3)")
listaDeTarefas.splice(indice - 1, 1)
console.log(listaDeTarefas)

//4-
let nome = prompt("Qual é o seu nome?")
let email = prompt("Qual é o seu email?")
console.log("O e-mail", email, "foi cadastrado com sucesso. Seja bem-vinda(o),", nome + "!")
