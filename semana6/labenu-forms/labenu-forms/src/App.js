import { render } from '@testing-library/react';
import React from 'react'
import './App.css';
import {PerguntaAberta} from './components/PerguntaAberta'
import {PerguntaFechada} from './components/PerguntaFechada'

export default class App extends React.Component {

  state = {
    etapa: 1
  }

  etapaDois = () => {
    this.setState({etapa: 2})
  }

  etapaTres= () => {
    this.setState({etapa: 3})
  }

  etapaQuatro = () => {
    this.setState({etapa: 4})
  }

  render() {

    if (this.state.etapa === 1) {
      return (
        <div className="App">
          <section>
            <h2>Etapa 1 - Dados Gerais</h2>
            <PerguntaAberta 
            pergunta="1. Qual o seu nome"
            />
            <PerguntaAberta 
            pergunta="2. Qual a sua idade?"
            />
            <PerguntaAberta 
            pergunta="3. Qual o seu email?"
            />
            <PerguntaFechada 
            pergunta={"4. Qual a sua escolaridade?"}
            opcoes={['Ensino Médio Incompleto', 'Ensino Médio Completo', 'Ensino Superior Incompleto', 'Ensino Superior Completo']}
            />
            <br/><br/>
            <button onClick={this.etapaDois}>Próxima Etapa</button>
          </section>
        </div>)
    }

    if (this.state.etapa === 2) {
      return (
        <div className="App">
          <section>
            <h2>Etapa 2 - Informações do Ensino Superior</h2>
            <PerguntaAberta 
            pergunta="5. Qual curso?"
            />
            <PerguntaAberta 
            pergunta="6. Qual a unidade de ensino?"
            />
            <br/><br/>
            <button onClick={this.etapaTres}>Próxima Etapa</button>
          </section>
        </div>)
    }

    if (this.state.etapa === 3) {
      return (
        <div className="App">
          <section>
            <h2>Etapa 3 - Informações Gerais de Ensino</h2>
            <PerguntaAberta 
            pergunta="5. Por que você não terminou um curso de graduação?"
            />
            <PerguntaFechada 
            pergunta={"6. Você fez algum curso complementar?"}
            opcoes={['Nenhum', 'Curso Técnico', 'Curso de Inglês']}
            />
            <br/><br/>
            <button onClick={this.etapaQuatro}>Próxima Etapa</button>
          </section>
        </div>)
    }

    if (this.state.etapa === 4) {
      return (
        <div className="App">
          <section>
            <h2>O formulário acabou</h2>
            <p>Muito obrigado por participar! Entraremos em contato!</p>
          </section>
        </div>)
    }
  }
}