// 1- Esse código vai dar erro já que as variáveis não foram declaradas.

// 2- Esse código também vai dar erro já que as variáveis não foram declaradas.

//-------------------------------------------------------------------------------

// 1-
let nome;
let idade;
console.log(typeof nome, typeof idade)
// O tipo é "undefined" já que apesar das variáveis terem sidos criadas não foram definidos seus valores.
nome = prompt('Nome: ')
idade = prompt('Idade: ')
console.log(typeof nome, typeof idade)
// Agora que as variáveis tem valores definidos elas são strings.
console.log('Olá', nome, 'você tem', idade, 'anos.')

// 2-
console.log(' ')
const cor = prompt('Qual é sua cor favorita?')
console.log('Qual é sua cor favorita?')
console.log('Resposta:', cor)
console.log(' ')
const animal = prompt('Qual é seu animal favorito?')
console.log('Qual é seu animal favorito?')
console.log('Resposta:', animal)
console.log(' ')
const lugar = prompt('Qual é seu lugar favorito?')
console.log('Qual é seu lugar favorito?')
console.log('Resposta:', lugar)
console.log(' ')
const suco = prompt('Qual é seu suco favorito?')
console.log('Qual é seu suco favorito?')
console.log('Resposta:', suco)
console.log(' ')
const jogo = prompt('Qual é seu jogo favorito?')
console.log('Qual é seu jogo favorito?')
console.log('Resposta:', jogo)
console.log(' ')

// 3-
let comidas = ["Arroz", "Feijão", "Pão", "Banana", "Torta de Legumes"]
console.log(comidas)
console.log('')
console.log("Essas são minhas comidas preferidas: ")
console.log(comidas[0])
console.log(comidas[1])
console.log(comidas[2])
console.log(comidas[3])
console.log(comidas[4])
console.log('')
comidas[1] = prompt("Qual é a sua comida preferida?")
console.log(comidas)
console.log('')

// 4-
let perguntas = ["Você mora no Brasil?", "Você já saiu do Brasil?", "Você quer sair do Brasil?"]

let respostas = [true, false, true]
console.log(perguntas[0], respostas[0])
console.log(perguntas[1], respostas[1])
console.log(perguntas[2], respostas[2])