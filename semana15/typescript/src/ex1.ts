//a.
const minhaString: string = "test"
console.log(minhaString)
// Erro, o programa não permite number em um tipo string

//b.
const meuNumero: any = "4"
console.log(meuNumero)
// Usando tipo any

//c.
type pessoa = {nome: string, idade: number, corFavorita: string}
const pessoa1: pessoa = {nome: "João", idade: 15, corFavorita: "Verde"}
const pessoa2: pessoa = {nome: "Maria", idade: 25, corFavorita: "Azul"}
const pessoa3: pessoa = {nome: "Pedro", idade: 5, corFavorita: "Amarelo"}
console.log(pessoa1, pessoa2, pessoa3)

//d.
enum cores {vermelho = "Vermelho", azul = "Azul", verde = "Verde", amarelo = "Amarelo"}
type person = {nome: string, idade: number, corFavorita: cores}
const person1: person = {nome: "João", idade: 15, corFavorita: cores.verde}
const person2: person = {nome: "Maria", idade: 25, corFavorita: cores.azul}
const person3: person = {nome: "Pedro", idade: 5, corFavorita: cores.amarelo}
console.log(person1, person2, person3)
