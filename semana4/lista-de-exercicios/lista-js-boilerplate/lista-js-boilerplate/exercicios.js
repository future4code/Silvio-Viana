//Exercício 1

function inverteArray(array) {
  let novoArray = []
  for (let i = array.length - 1; i >= 0; i--) {
     novoArray.push(array[i])
  }
  return novoArray
}

//Exercício 2

function retornaNumerosParesElevadosADois (array) {
   let novoArray = []
   for(num of array) {
      if (num % 2 === 0) {
         novoArray.push(num * num)
      }
   }
   return novoArray
}

//Exercício 3

function retornaNumerosPares (array) {
   let novoArray = []
   for (num of array) {
      if (num % 2 === 0) {
         novoArray.push(num)
      }
   }
   return novoArray
}

//Exercício 4

function retornaMaiorNumero(array) {
   let maior = array[0]
   for (num of array) {
      if (num > maior) {
         maior = num
      }
   }
   return maior
}

//Exercício 5

function retornaQuantidadeElementos (array) {
   return array.length
}

//Exercício 6

function retornaExpressoesBooleanas() {
   let respostas = [false, false, true, true, true]
   return respostas
}

//Exercício 7

function retornaNNumerosPares(n) {
   let novoArray = []
   for (let i = 0; i < n; i++) {
      novoArray.push(i * 2)
   }
   return novoArray
}

// Exercício 8

function checaTriangulo(a, b, c) {
  if (a === b && a === c) {
      return "Equilátero"
  }
  else if (a === b || a === c || b === c) {
      return "Isósceles"
  }
  else {
      return "Escaleno"
  }
}

// Exercício 9

function comparaDoisNumeros(num1, num2) {
   const comparacao = {
      maiorNumero: "Iguais",
      maiorDivisivelporMenor: true,
      diferenca: 0    
   }

   if (num1 > num2) {
      comparacao.maiorNumero = num1
      if (!(num1 % num2 === 0)) {
         comparacao.maiorDivisivelporMenor = false
      }
      comparacao.diferenca = num1 - num2
   }
   else if (num2 > num1) {
      comparacao.maiorNumero = num2
      if (!(num2 % num1 === 0)) {
         comparacao.maiorDivisivelporMenor = false
      }
      comparacao.diferenca = num2 - num1
   }

   return comparacao
}

// Exercício 10

function segundoMaiorEMenor(array) {
   let maior = array[0]
   let maiorSegundo
   let menor = array[0]
   let menorSegundo
   let maiorPrimeiroElemento = true
   let menorPrimeiroElemento = true

   // Caso o menor ou maior número não for o primeiro elemento da lista esse "for" é o suficiente
   for (num of array) {
      if (num > maior) {
         maiorSegundo = maior
         maior = num
         maiorPrimeiroElemento = false
      }
      if (num < menor) {
         menorSegundo = menor
         menor = num
         menorPrimeiroElemento  = false
      }
   }
   // Caso o menor ou maior número for o primeiro elemento da lista esses "for" são ativados
   // O primeiro "for" dava erro se o menor ou maior elemento fosse o primeiro item
   if (maiorPrimeiroElemento) {
      maiorSegundo = array[1]
      for (num of array) {
         if (num > maiorSegundo && num != array[0]) {
            maiorSegundo = num
         }
      }
   }
   if (menorPrimeiroElemento) {
      menorSegundo = array[1]
      for (num of array) {
         if (num < menorSegundo && num != array[0]) {
            menorSegundo = num
         }
      }
   }

   const resposta = [maiorSegundo, menorSegundo]
   return resposta
}

//Exercício 11

function ordenaArray(array) {
   let novoArray = []
   for (let i = 0; i < array.length; i++) {
      if (i === 0) {
         novoArray.push(array[i])
      }
      else {
         let menor = true
         for (let j = 0; j < array.length; j++) {
            if (i != j) {
               if (array[i] > novoArray[j]) {
                  let continuar = true
                  let z = j
                  while (continuar) {
                     z++
                     if(array[i] > novoArray[z]) {
                     }
                     else{
                        novoArray.splice(z, 0, array[i])
                        continuar = false
                        menor = false
                     }
                  }
               }
               break
            }
         }
         if (menor) {
            novoArray.splice(0, 0, array[i])
         }
      }
   }
   return novoArray
}

// Exercício 12

function filmeFavorito() {
   const astrodevFilmeFavorito = {
      nome: "O Diabo Veste Prada",
      ano: 2006,
      diretor: "David Frankel",
      atores: ["Meryl Streep", "Anne Hathaway", "Emily Blunt", "Stanley Tucci"]
   }
   return astrodevFilmeFavorito
}

// Exercício 13

function imprimeChamada() {
   const astrodevFilmeFavorito = {
      nome: "O Diabo Veste Prada",
      ano: 2006,
      diretor: "David Frankel",
      atores: ["Meryl Streep", "Anne Hathaway", "Emily Blunt", "Stanley Tucci"]
   }
   return `Venha assistir ao filme ${astrodevFilmeFavorito.nome}, de ${astrodevFilmeFavorito.ano}, dirigido por ${astrodevFilmeFavorito.diretor} e estrelado por ${astrodevFilmeFavorito.atores[0]}, ${astrodevFilmeFavorito.atores[1]}, ${astrodevFilmeFavorito.atores[2]}, ${astrodevFilmeFavorito.atores[3]}.`
}

// Exercício 14

function criaRetangulo(lado1, lado2) {
   const retangulo = {
      largura: lado1,
      altura: lado2,
      perimetro: 2 * (lado1 + lado2),
      area: lado1 * lado2
   }
   return retangulo
}

// Exercício 15

function anonimizaPessoa(pessoa) {
   pessoa.nome = "ANÔNIMO"
   return pessoa
}

// Exercício 16

const arrayDePessoas = [
  { nome: "Pedro", idade: 20 },
  { nome: "João", idade: 10 },
  { nome: "Paula", idade: 12 },
  { nome: "Artur", idade: 89 } 
]

// Exercício 16, letra A

function maioresDe18(arrayDePessoas) {
   return arrayDePessoas.filter((pessoa) => {
      return pessoa.idade >= 20
   })
}

// Exercício 16, letra B

function menoresDe18(arrayDePessoas) {
   return arrayDePessoas.filter((pessoa) => {
      return pessoa.idade < 20
   })
}

// Exercício 17, letra A

function multiplicaArrayPor2(array) {
   return array.map((num) => {
      return num * 2
   })
}

// Exercício 17, letra B

function multiplicaArrayPor2S(array) {
   return array.map((num) => {
      return String(num * 2)
   })
}

// Exercício 17, letra C

function verificaParidade(array) {
   return array.map((num) => {
      if (num % 2 === 0) {
         return num + " é par"
      }
      return num + " é ímpar"
   })
}

// Exercício 18

const pessoas = [
  { nome: "Paula", idade: 12, altura: 1.8},
  { nome: "João", idade: 20, altura: 1.3},
  { nome: "Pedro", idade: 15, altura: 1.9},
  { nome: "Luciano", idade: 22, altura: 1.8},
  { nome: "Artur", idade: 10, altura: 1.2},
  { nome: "Soter", idade: 70, altura: 1.9}
]

//Exercício 18, letra A

function retornaPessoasAutorizadas() {
   return pessoas.filter((pessoa) => {
      return pessoa.altura >= 1.5 && pessoa.idade > 14 && pessoa.idade < 60
   })
}


// Exercício 18, letra B

function retornaPessoasNaoAutorizadas() {
   return pessoas.filter((pessoa) => {
      return !(pessoa.altura >= 1.5 && pessoa.idade > 14 && pessoa.idade < 60)
   })
}

//Exercício 19

const consultas = [
  { nome: "João", genero: "masculino", cancelada: true, dataDaConsulta: "01/10/2019" },
  { nome: "Pedro", genero: "masculino", cancelada: false, dataDaConsulta: "02/10/2019" },
  { nome: "Paula", genero: "feminino", cancelada: true, dataDaConsulta: "03/11/2019" },
  { nome: "Márcia", genero: "feminino", cancelada: false, dataDaConsulta: "04/11/2019" }
  ]

function retornaEmailConsulta(consultas) {
  // implemente sua lógica aqui
}

//Exercício 20

const contas = [
  { cliente: "João", saldoTotal: 1000, compras: [100, 200, 300] },
  { cliente: "Paula", saldoTotal: 7500, compras: [200, 1040] },
  { cliente: "Pedro", saldoTotal: 10000, compras: [5140, 6100, 100, 2000] },
  { cliente: "Luciano", saldoTotal: 100, compras: [100, 200, 1700] },
  { cliente: "Artur", saldoTotal: 1800, compras: [200, 300] },
  { cliente: "Soter", saldoTotal: 1200, compras: [] }
]

function atualizaSaldo() {
  // implemente sua lógica aqui
}