import React from 'react';
import './App.css';
import Post from './components/Post/Post';

class App extends React.Component {

  render() {

    const posts = [
      {nome: 'Paulinha', foto: 'https://picsum.photos/50/50', post: 'https://picsum.photos/200/150'},
      {nome: 'João', foto: 'https://picsum.photos/50/50?a=1', post: 'https://picsum.photos/200/150?1'},
      {nome: 'Maria', foto: 'https://picsum.photos/50/50?a=2', post: 'https://picsum.photos/200/150?2'}]
    
    const componentes = posts.map((pessoa) => {
      return <Post key={pessoa.nome}
        nomeUsuario={pessoa.nome}
        fotoUsuario={pessoa.foto}
        fotoPost={pessoa.post}
      />
    })
    
    return (
      <div className={'app-container'}>
        {componentes}
      </div>
    );
  }
}

export default App;
