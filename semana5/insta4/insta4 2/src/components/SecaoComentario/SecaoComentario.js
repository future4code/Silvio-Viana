import React, {Component} from 'react'
import './SecaoComentario.css'

export class SecaoComentario extends Component {
	state = {
		comentario: ""
	}

	onChangeComentario = (event) => {
		//Mesmo eu dizendo que o comentário recebe event.targe.value eles não ficam iguais
		this.setState({comentario: event.target.value})
		console.log("Estado:", this.state.comentario)
		console.log("Evento:", event.target.value)
	}

	render() {
		return <div className={'comment-container'}>
			<input
				className={'input-comentario'}
				placeholder={'Comentário'}
				value={this.state.comentario}
				onChange={this.onChangeComentario}
			/>
			<button onClick={this.props.aoEnviar}>Enviar</button>
		</div>
	}
}
