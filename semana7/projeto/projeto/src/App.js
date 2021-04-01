import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import CriarPlaylist from './components/CriarPlaylist'
import ListaPlaylist from './components/ListaPlaylist'
import DetalhePlaylist from './components/DetalhePlaylist'
import {baseUrl, axiosConfig} from './parameters'

const BoxPrincipal = styled.div`
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
height: 100vh;
overflow-x: hidden;
`

const Header = styled.header`
border: 1px solid black;
padding: 0px 0px;
font-size: 15px;
background-color: green;
color: white;
width: 99.8%;
display: flex;
justify-content: space-between;
align-items: center;

h1 {
  display: flex;
  align-items: flex-end;
  img {
    width: 50px;
    margin: 0px 10px;
  }
}

button {
  font-size: 25px;
  float: right;
  width: 250px;
  height: 50px;
  margin: 0px 20px 0px 0px;
}`

const Footer = styled.footer`
width: 96.2vw;
border: 1px solid black;
padding: 20px 50px 20px 0px;
font-size: 15px;
background-color: green;
color: white;
`

export default class App extends React.Component {

  state = {
    pagina: 'cadastro',
    inputNomePlaylist: '',
    playlists: [],
    botaoNome: 'Ver Lista',
    playlistDetalhe: '',
    playlistDetalheNome: '',
    playlistDetalheId: '',
    inputNomeMusica: '',
    inputArtistaMusica: '',
    inputUrlMusica: ''
  }

  componentDidMount() {
    this.pegarTodasPlaylists()
  }

  criarPlaylist = async () => {
    if (this.state.inputNomePlaylist === '') {
      alert("Você precisa digitar o nome da playlist")
      return
    }
    if (this.state.inputNomePlaylist.length > 20) {
      alert("O nome da playlist é muito grande, máximo de 20 caracteres")
      return
    }
    const body = {
      name: this.state.inputNomePlaylist
    }
    try {
      const response = await axios.post(baseUrl, body, axiosConfig)
      if (response.status === 200) {
        alert("Playlist criada com sucesso")
      }
      this.pegarTodasPlaylists()
      this.setState({inputNomePlaylist: ''})
    }
    catch (error) {
      alert("Já existe uma playlist com esse nome")
    }
  }

  pegarTodasPlaylists = async () => {
    try {
      const response = await axios.get(baseUrl, axiosConfig)
      this.setState({playlists: response.data.result.list})
    }
    catch (error) {
      console.log(error)
    }
  }

  apagarPlaylist = async (playlistId) => {
    if (!window.confirm("Tem certeza que quer apagar essa playlist?")) {
      return
    }

    try {
      const response = await axios.delete(`${baseUrl}/${playlistId}`, axiosConfig)
      if (response.status === 200) {
        alert('Playlist apagada com sucesso')
      }
      this.pegarTodasPlaylists()
    }
    catch(error) {
      console.log(error)
    }
  }

  pegarMusicasPlaylist = async (playlistId, playlistName) => {
    try {
      const response = await axios.get(`${baseUrl}/${playlistId}/tracks`, axiosConfig)
      this.setState({playlistDetalhe: response.data.result, playlistDetalheNome: playlistName,
        playlistDetalheId: playlistId, pagina: 'detalhe', botaoNome: 'Ver Lista'})
    }
    catch (error) {
      console.log(error)
    }
  }

  adicionarMusica = async () => {
    const body = {
      name: this.state.inputNomeMusica,
      artist: this.state.inputArtistaMusica,
      url: this.state.inputUrlMusica
    }
    if(body.name === '' || body.artist === '' || body.url === '') {
      alert("Você deve digitar todos os dados")
      return
    }
    try {
      const response = await axios.post(`${baseUrl}/${this.state.playlistDetalheId}/tracks`, body, axiosConfig)
      this.setState({inputNomeMusica: '', inputArtistaMusica: '', inputUrlMusica: ''})
      this.pegarMusicasPlaylist(this.state.playlistDetalheId, this.state.playlistDetalheNome)
      alert("Música Adicionada com Sucesso")
    }
    catch (error) {
      console.log(error)
    }
  }

  inputNomePlaylist = (event) => {
    this.setState({inputNomePlaylist: event.target.value})
  }

  inputNomeMusica = (event) => {
    this.setState({inputNomeMusica: event.target.value})
  }

  inputArtistaMusica = (event) => {
    this.setState({inputArtistaMusica: event.target.value})
  }

  inputUrlMusica = (event) => {
    this.setState({inputUrlMusica: event.target.value})
  }

  mudarPagina = () => {
    if (this.state.botaoNome === 'Ver Lista') {
      this.setState({botaoNome: 'Voltar para Cadastro', pagina: 'lista'})
    }
    else if (this.state.botaoNome === 'Voltar para Cadastro') {
      this.setState({botaoNome: 'Ver Lista', pagina: 'cadastro'})
    }
  }

  renderizaPagina = () => {

    if (this.state.pagina === 'cadastro') {
      return <CriarPlaylist inputNomePlaylist={this.inputNomePlaylist} 
      criarPlaylist={this.criarPlaylist} value={this.state.inputNomePlaylist}/>
    }
    else if (this.state.pagina === 'lista') {
      return <ListaPlaylist playlists={this.state.playlists} 
      apagarPlaylist={this.apagarPlaylist} pegarMusicasPlaylist={this.pegarMusicasPlaylist}/>
    }
    else if (this.state.pagina === 'detalhe') {
      return <DetalhePlaylist playlistDetalheNome={this.state.playlistDetalheNome}
      playlistDetalhe={this.state.playlistDetalhe} adicionarMusica={this.adicionarMusica}
      inputNomeMusica={this.inputNomeMusica} inputArtistaMusica={this.inputArtistaMusica}
      inputUrlMusica={this.inputUrlMusica} valueNome={this.state.inputNomeMusica}
      valueArtist={this.state.inputArtistaMusica} valueUrl={this.state.inputUrlMusica}/>
    }
  }

  render() {
    return (
      <BoxPrincipal>
        <Header><h1><img src="https://findicons.com/files/icons/72/harmonia_pastelis/128/hp_music.png"/>Labefy</h1><button onClick={this.mudarPagina}>{this.state.botaoNome}</button></Header>
       {this.renderizaPagina()}
       <Footer>Todos os Direitos Reservados © Silvio Viana 2021</Footer>
      </BoxPrincipal>
    )
  }
}
