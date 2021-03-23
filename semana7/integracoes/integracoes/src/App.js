import React from 'react'
import Cadastro from './components/Cadastro'
import Lista from './components/Lista'
import axios from 'axios'

class App extends React.Component {

  state = {
    usuarios: [],
    inputNome: '',
    inputEmail: '',
    verLista: false
  }

  componentDidMount() {
    this.getAllUsers()
  }

  getAllUsers = () => {
    axios.get("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users",
    {
      headers: {
        Authorization: "silvio-viana-cruz"
      }
    })
    .then(res => {
      this.setState({usuarios: res.data})
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  createUsuarios = () => {
    const body = {
      name: this.state.inputNome,
      email: this.state.inputEmail
    }

    axios.post("https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users", body,
    {
      headers: {
        Authorization: "silvio-viana-cruz"
      }
    })
    .then(res => {
      this.setState({inputNome: '', inputEmail: ''})
      this.getAllUsers()
      alert("Usuário cadastrado com sucesso")
    })
    .catch(err => {
      console.log(err)
    })
  }

  inputNome = event => {
    this.setState({inputNome: event.target.value})
  }

  inputEmail = event => {
    this.setState({inputEmail: event.target.value})
  }

  salvarPessoa = () => {
    if (this.state.inputNome === '' || this.state.inputEmail === '') {
      alert("Você deve preencher nome e email")
      return
    }
    else {
      this.createUsuarios()
    }

  }
  
  apagarUsuario = (userId) => {
    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${userId}`,
    {
      headers: "silvio-viana-cruz"
    })
    .then(res => {
      alert("Usuário Apagado com Sucesso")
    })
    .catch(err => {
      console.log(err)
    })
  }

  mudarTela = () => {
    this.setState({verLista: !this.state.verLista})
  }

  render() {
    return (

    <div>
      {this.state.verLista? 
      <Lista apagarUsuario={this.apagarUsuario}usuarios={this.state.usuarios}/>
      :
      <Cadastro 
      inputNome={this.inputNome}
      inputEmail={this.inputEmail}
      valueNome={this.state.inputNome}
      valueEmail={this.state.inputEmail}
      salvarPessoa={this.salvarPessoa}/>}
      <button onClick={this.mudarTela}>Mudar Tela</button>
    </div>

    )}
}

export default App;
