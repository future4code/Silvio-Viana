import React from 'react'

export function PerguntaFechada(props) {
    return (
    <div>
        <p>{props.pergunta}</p>
        <select>
            {props.opcoes.map((opcao) => {
                return <option>{opcao}</option>
            })}
        </select>
    </div>
    )
}