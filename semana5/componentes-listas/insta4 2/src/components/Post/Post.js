import React from 'react'
import './Post.css'

import {IconeComContador} from '../IconeComContador/IconeComContador'
import {Compartilhar} from '../IconeComContador/IconeComContador'

import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeComentario from '../../img/comment_icon.svg'
import salvoBranco from '../../img/bookmark_border-24px.svg'
import salvoPreto from '../../img/bookmark-24px.svg'
import iconeCompartilhar from '../../img/share-24px.svg'
import facebook from '../../img/facebook.png'
import instagram from '../../img/instagram.png'
import twitter from '../../img/twitter.png'
import {SecaoComentario} from '../SecaoComentario/SecaoComentario'

class Post extends React.Component {
  state = {
    curtido: false,
    numeroCurtidas: 0,
    comentando: false,
    numeroComentarios: 0,
    salvo: false,
    compartilhando: false
  }

  onClickCurtida = () => {
    console.log('Curtiu!')
    if (this.state.curtido) {
      this.setState({curtido: false, numeroCurtidas: this.state.numeroCurtidas - 1})
    }
    else {
      this.setState({curtido: true, numeroCurtidas: this.state.numeroCurtidas + 1})
    }
  }

  onClickComentario = () => {
    this.setState({
      comentando: !this.state.comentando, compartilhando: false
    })
  }

  onClickSalvar = () => {
    this.setState({
      salvo: !this.state.salvo
    })
  }

  onClickCompartilhar = () => {
    this.setState({compartilhando: !this.state.compartilhando, comentando: false})
  }

  aoEnviarComentario = () => {
    this.setState({
      comentando: false,
      numeroComentarios: this.state.numeroComentarios + 1
    })
  }

  compartilharInstagram = () => {
    const mensagem = document.getElementById("mensagem").value
    console.log("Post compartilhado no Instagram com a mensagem:", mensagem)
    document.getElementById("mensagem").value = ""
  }

  compartilharFacebook = () => {
    const mensagem = document.getElementById("mensagem").value
    console.log("Post compartilhado no Facebook com a mensagem:", mensagem)
    document.getElementById("mensagem").value = ""
  }

  compartilharTwitter = () => {
    const mensagem = document.getElementById("mensagem").value
    console.log("Post compartilhado no Twitter com a mensagem:", mensagem)
    document.getElementById("mensagem").value = ""
  }

  

  render() {
    let iconeCurtida;

    let iconeSalvar;


    if (this.state.salvo) {
      iconeSalvar = salvoPreto
    }
    else {
      iconeSalvar = salvoBranco
    }

    if(this.state.curtido) {
      iconeCurtida = iconeCoracaoPreto
    } else {
      iconeCurtida = iconeCoracaoBranco
    }

    let componenteComentario

    if(this.state.comentando) {
      componenteComentario = <SecaoComentario aoEnviar={this.aoEnviarComentario}/>
    }

    let componenteCompartilhar;

    if (this.state.compartilhando) {
      componenteComentario = 
      <div>
        <div className="compartilhamento">
          <Compartilhar icone={instagram} onClickIcone={this.compartilharInstagram} />
          <Compartilhar icone={facebook} onClickIcone={this.compartilharFacebook} />
          <Compartilhar icone={twitter} onClickIcone={this.compartilharTwitter} />
        </div>
        <input id="mensagem" type="text" placeholder="Mensagem"/>
      </div>
    }

    return <div className={'post-container'}>
      <div className={'post-header'}>
        <img className={'user-photo'} src={this.props.fotoUsuario} alt={'Imagem do usuario'}/>
        <p>{this.props.nomeUsuario}</p>
      </div>

      <img className={'post-photo'} src={this.props.fotoPost} alt={'Imagem do post'}/>

      <div className={'post-footer'}>
        <IconeComContador
          icone={iconeCurtida}
          onClickIcone={this.onClickCurtida}
          valorContador={this.state.numeroCurtidas}
        />

        <IconeComContador
          icone={iconeSalvar}
          onClickIcone={this.onClickSalvar}
        />

        <IconeComContador
          icone={iconeCompartilhar}
          onClickIcone={this.onClickCompartilhar}
        />

        <IconeComContador
          icone={iconeComentario}
          onClickIcone={this.onClickComentario}
          valorContador={this.state.numeroComentarios}
        />
      </div>
      {componenteCompartilhar}
      {componenteComentario}
    </div>
  }
}

export default Post