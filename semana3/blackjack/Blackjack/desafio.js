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
while (confirm("Quer iniciar uma nova rodada?")) {
   let jogadorCartas = []
   jogadorCartas.push(comprarCarta())
   jogadorCartas.push(comprarCarta())
   let compCartas = []
   compCartas.push(comprarCarta())
   compCartas.push(comprarCarta())

   while (jogadorCartas[0].valor + jogadorCartas[1].valor === 22) {
      jogadorCartas[0] = comprarCarta()
      jogadorCartas[1] = comprarCarta()
   }
   let jogadorMenosDe21 = true
   while (compCartas[0].valor + compCartas[1].valor === 22) {
      compCartas[0] = comprarCarta()
      compCartas[1] = comprarCarta()
   }
   let compMenosDe21 = true

   jogadorCartasTotal = jogadorCartas[0].texto + " " + jogadorCartas[1].texto
   jogadorSoma = jogadorCartas[0].valor + jogadorCartas[1].valor
   compCartasTotal = compCartas[0].texto + " " + compCartas[1].texto
   compSoma = compCartas[0].valor + compCartas[1].valor

   while (jogadorMenosDe21 && confirm(
      "Suas cartas são " + jogadorCartasTotal
      + ". A carta revelada do computador é " + compCartas[0].texto + "." +
      "\n" +
      "Deseja comprar mais uma carta?"
   )) {
      let novaCarta = comprarCarta()
      jogadorCartas.push(novaCarta)
      jogadorCartasTotal += " " + novaCarta.texto
      jogadorSoma += novaCarta.valor

      if (jogadorSoma > 21) {
         jogadorMenosDe21 = false
      }
   }

   while (compSoma < jogadorSoma && jogadorMenosDe21 && compMenosDe21) {
      let novaCarta = comprarCarta()
      compCartas.push(novaCarta)
      compCartasTotal += " " + novaCarta.texto
      compSoma += novaCarta.valor
      
      if (compSoma > 21) {
         compMenosDe21 = false
      }
   }

   console.log("Suas cartas são", jogadorCartasTotal + ".", "Sua pontuação é", jogadorSoma)
   console.log("As cartas do computador são", compCartasTotal + ".", "A pontuação do computador é", compSoma)
   if ((jogadorSoma > compSoma && jogadorMenosDe21) || !compMenosDe21)
   {
      console.log("O usuário ganhou!")
   }
   else if ((compSoma > jogadorSoma && compMenosDe21) || !jogadorMenosDe21){
      console.log("O computador ganhou!")
   }
   else {
      console.log("Empate!")
   }
   console.log('')
}

console.log("O jogo acabou")