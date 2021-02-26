/**
 * EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
 * 
 * 
    const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
    
    console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
    console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
 * 
 * 
 * 
 */
console.log("Bem vindo ao jogo de Blackjack!")
console.log('')
while (confirm("Quer iniciar uma nova rodada?")) {
   let jogadorCarta1 = comprarCarta()
   let jogadorCarta2 = comprarCarta()
   let jogadorResultado = jogadorCarta1.valor + jogadorCarta2.valor
   let compCarta1 = comprarCarta()
   let compCarta2 = comprarCarta()
   let compResultado = compCarta1.valor + compCarta2.valor

   console.log("Usuário - cartas:", jogadorCarta1.texto, jogadorCarta2.texto, " - pontuação", jogadorResultado)
   console.log("Computador - cartas:", compCarta1.texto, compCarta2.texto, " - pontuação", compResultado)

   if (jogadorResultado > compResultado) {
      console.log("O usuário ganhou!")
   }
   else if (jogadorResultado < compResultado) {
      console.log("O computador ganhou!")
   }
   else {
      console.log("Empate!")
   }
   console.log('')
}

console.log("O jogo acabou")