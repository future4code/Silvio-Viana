// Cria um id para cada tarefa
let quantidadeTarefas = 0
let idTarefas = "tf" + quantidadeTarefas

// Opções de horários, deu preguiça digitar cada um, ai inventei um modo automático
const horarios = document.getElementById("horarios")
for (let i = 0; i < 24; i++) {
    let hora = i + "h"
    horarios.innerHTML += `<option value="${hora}">${hora}</option>`
}

function criarTarefa() {
    const tarefa = document.getElementById("tarefa").value
    const semana = document.getElementById("dias-semana").value
    const hora = document.getElementById("horarios").value

    if (tarefa !=""){

        document.getElementById(semana).innerHTML += `<li onclick="riscarTarefa(id)" 
        class="tarefa" id="${idTarefas}">Tarefa: ${tarefa} <br> Horário: ${hora}</li>`
        document.getElementById("tarefa").value = ""
        quantidadeTarefas++
        idTarefas = "tf" + quantidadeTarefas

    }
    else {
        alert("Insira uma tarefa válida")
    }
}

function riscarTarefa(id) {
    const riscar = document.getElementById(id)
    const antes = riscar.innerHTML
    riscar.innerHTML = `<s>${antes}</s>`
}

const limparTarefas = () => {
    semanas = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"]
    for (semana of semanas) {
        document.getElementById(semana).innerHTML = ""
    }
}
