import React from 'react'
import Cadastro from './components/Cadastro'
import Lista from './components/Lista'
import UsuarioDetalhe from './components/UsuarioDetalhe'
import axios from 'axios'
import {baseUrl, axiosConfig} from './parameters'

class App extends React.Component {

  state = {
    usuarios: [],
    inputNome: '',
    inputEmail: '',
    paginaAtual: 'cadastro',
    usuarioDetalhe: [],
    editandoUsuario: false,
    inputNomeEditando: '',
    inputEmailEditando: '',
    inputBuscar: ''
  }

  componentDidMount() {
    this.pegarTodosUsuarios()
  }

  pegarTodosUsuarios = () => {
    axios.get(baseUrl, axiosConfig)
    .then(res => {
      this.setState({usuarios: res.data})
    })
    .catch(err => {
      console.log(err)
    })
  }

  criarUsuario = () => {
    const body = {
      name: this.state.inputNome,
      email: this.state.inputEmail
    }

    axios.post(baseUrl, body, axiosConfig)
    .then(res => {
      this.setState({inputNome: '', inputEmail: ''})
      this.pegarTodosUsuarios()
      alert("Usuário cadastrado com sucesso")
    })
    .catch(err => {
      body.email.includes('@')? console.log(err) :
       alert("Você precisa digitar um email válido")
    })
  }

  apagarUsuario = (userId) => {
    if(window.confirm("Você tem certeza que quer apagar esse usuário?")) {
      axios.delete(`${baseUrl}/${userId}`, axiosConfig)
      .then(res => {
        alert("Usuário Apagado com Sucesso")
        this.pegarTodosUsuarios()
        this.setState({paginaAtual: 'lista'})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }

  usuarioDetalhe = (userId) => {
    axios.get(`${baseUrl}/${userId}`, axiosConfig)
    .then(res => {
      this.setState({usuarioDetalhe: res.data, paginaAtual: 'usuarioDetalhe', mostrarListaFiltrada: false})
    })
    .catch(err => {
      console.log(err)
    })
  }

  salvarUsuarioEditado = (userId) => {
    const body = {
      name: this.state.inputNomeEditando,
      email: this.state.inputEmailEditando
    }
    if (body.name === '' || body.email === '' || !body.email.includes('@')) {
      alert("Você deve digitar dados válidos")
      return
    }
    axios.put(`${baseUrl}/${userId}`, body, axiosConfig)
    .then(res => {
      alert("Usuário editado com sucesso")
      this.setState({editandoUsuario: false})
      this.pegarTodosUsuarios()
      this.usuarioDetalhe(userId)
    })
    .catch(err => {
      body.email.includes('@')? console.log(err) :
       alert("Você precisa digitar um email válido")
    })
  }

  buscarUsuario = () => {
    axios.get(`${baseUrl}/search?name=${this.state.inputBuscar}`, axiosConfig)
    .then(res => {
      this.usuarioDetalhe(res.data[0].id)
    })
    .catch(err => {
      alert("Usuário não encontrado")
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
      this.criarUsuario()
    }

  }

  editarUsuario = () => {
    this.setState({editandoUsuario: true})
  }

  editandoNome = event => {
    this.setState({inputNomeEditando: event.target.value})
  }

  editandoEmail = event => {
    this.setState({inputEmailEditando: event.target.value})
  }

  inputBuscar = event => {
    this.setState({inputBuscar: event.target.value})
  }

  mudarPagina = (novaPagina) => {
    this.setState({paginaAtual: novaPagina, editandoUsuario: false, mostrarListaFiltrada: false})
  }

  renderizaPagina = () => {
    if(this.state.paginaAtual === 'cadastro') {
      return <Cadastro inputNome={this.inputNome} inputEmail={this.inputEmail}
      valueNome={this.state.inputNome} valueEmail={this.state.inputEmail}
      salvarPessoa={this.salvarPessoa} mudarPagina={this.mudarPagina}/>
    }

    else if(this.state.paginaAtual === 'lista') {
      return <Lista usuarioDetalhe={this.usuarioDetalhe} 
      apagarUsuario={this.apagarUsuario}usuarios={this.state.usuarios}
      mudarPagina={this.mudarPagina} inputBuscar={this.inputBuscar} buscarUsuario={this.buscarUsuario}/>
    }

    else if(this.state.paginaAtual === 'usuarioDetalhe') {
      return <UsuarioDetalhe dados={this.state.usuarioDetalhe} apagarUsuario={this.apagarUsuario}
      mudarPagina={this.mudarPagina} editarUsuario={this.editarUsuario} 
      editandoUsuario={this.state.editandoUsuario} salvarUsuarioEditado={this.salvarUsuarioEditado}
      editandoNome={this.editandoNome} editandoEmail={this.editandoEmail}/> 
    }
  }
  //<BotaoPagina onClick={this.mudarPagina}>{this.state.verLista? "Voltar" : "Ver Lista"}</BotaoPagina>

  render() {
    return (
    <div>
      {this.renderizaPagina()}
    </div>
    )}
}

export default App;
