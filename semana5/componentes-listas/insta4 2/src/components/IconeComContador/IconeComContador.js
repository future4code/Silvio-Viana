import React from 'react'
import './IconeComContador.css'

export function IconeComContador(props) {
	return <div className={'icon-container'}>
		<img alt={'Icone'} src={props.icone} onClick={props.onClickIcone}/>
		<p>{props.valorContador}</p>
	</div>
}

export function Compartilhar(props) {
	return <img className="icone" alt={'Icone'} src={props.icone} onClick={props.onClickIcone}/>
}
