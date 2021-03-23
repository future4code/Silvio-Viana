import React from 'react';
import './App.css';
import Post from './components/Post/Post';
import styled from 'styled-components'

class App extends React.Component {

  state = {
    posts: [
      {nome: 'Paulinha', foto: 'https://picsum.photos/50/50', post: 'https://picsum.photos/200/150'},
      {nome: 'João', foto: 'https://picsum.photos/50/50?a=1', post: 'https://picsum.photos/200/150?1'},
      {nome: 'Maria', foto: 'https://picsum.photos/50/50?a=2', post: 'https://picsum.photos/200/150?2'}],
    inputNome: "",
    inputFoto: "",
    inputPost: ""
  }

  changeNome = (event) => {
    this.setState({inputNome: event.target.value})
  }

  changeFoto = (event) => {
    this.setState({inputFoto: event.target.value})
  }

  changePost = (event) => {
    this.setState({inputPost: event.target.value})
  }

  adicionarPost = () => {
    let novaLista = [...this.state.posts]
    const post = {nome: this.state.inputNome, foto: this.state.inputFoto, post: this.state.inputPost}
    novaLista.push(post)
    this.setState({posts: novaLista, inputNome: "", inputFoto: "", inputPost: ""})

  }


  render() {

    //Quando eu uso style.componentes, toda vez que eu digito uma letra ele sai do input
    const Input = styled.input`
    width: 300px;
    height: 50px;`

    const Botao = styled.button`
    width: 308px;
    height: 50px;`


    const componentes = this.state.posts.map((pessoa) => {
      return <Post key={pessoa.nome}
        nomeUsuario={pessoa.nome}
        fotoUsuario={pessoa.foto}
        fotoPost={pessoa.post}
      />
    })
    
    return (
      <div className={'app-container'}>
        {componentes}
          <Input type="text" placeholder="Nome" onChange={this.changeNome} value={this.state.inputNome}/>
          <Input type="text" placeholder="Foto de Perfil" onChange={this.changeFoto} value={this.state.inputFoto} />
          <Input type="text" placeholder="Foto do Post" onChange={this.changePost}value={this.state.inputPost} />
          <Botao onClick={this.adicionarPost}>Criar Post</Botao>
      </div>
    );
  }
}

export default App;
