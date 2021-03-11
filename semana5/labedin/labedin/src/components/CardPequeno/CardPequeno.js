import React from 'react';
import './CardPequeno.css'

function CardPequeno(props) {
    return (
    <div className="smallcard-container">
        <p><b>Email:</b> {props.email}</p>
        
        <p><b>Endereço:</b> {props.endereco}</p>
    </div>)
}

export default CardPequeno;