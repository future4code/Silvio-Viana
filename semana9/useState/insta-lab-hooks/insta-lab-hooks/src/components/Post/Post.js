import React, { useState } from 'react'
import { PostContainer, PostHeader, UserPhoto, PostPhoto, PostFooter, CommentContainer } from './styles'

import IconeComContador from '../IconeComContador/IconeComContador'
import SecaoComentario from '../SecaoComentario/SecaoComentario'

import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeComentario from '../../img/comment_icon.svg'

const Post = (props) => {

  const [curtido, setCurtido] = useState(false)
  const [numeroCurtidas, setNumeroCurtidas] = useState(0)
  const [comentando, setComentando] = useState(false)
  const [numeroComentarios, setNumeroComentarios] = useState(0)
  const [comentarios, setComentarios] = useState([])

  const onClickCurtida = () => {
    if (curtido) {
      setNumeroCurtidas(numeroCurtidas - 1)
    }
    else {
      setNumeroCurtidas(numeroCurtidas + 1)
    }
    setCurtido(!curtido)
  };

  const onClickComentario = () => {
    setComentando(!comentando)
  };

  const enviarComentario = (comentario) => {
    console.log(1)
    let novaLista = [...comentarios]
    novaLista.push(comentario)
    setComentarios(novaLista)
    setNumeroComentarios(numeroComentarios + 1)
    setComentando(!comentando)
  }

  const iconeCurtida = curtido ? iconeCoracaoPreto : iconeCoracaoBranco

  const caixaDeComentario = comentando ? <SecaoComentario enviarComentario={enviarComentario}/> : (comentarios.map(comentario => {
    return ( 
    <CommentContainer key={comentario}>
      <p>{comentario}</p>
     </CommentContainer>)
  }))

  return (
    <PostContainer>
      <PostHeader>
        <UserPhoto src={props.fotoUsuario} alt={'Imagem do usuario'}/>
        <p>{props.nomeUsuario}</p>
      </PostHeader>

      <PostPhoto src={props.fotoPost} alt={'Imagem do post'}/>

      <PostFooter>
        <IconeComContador
          icone={iconeCurtida}
          onClickIcone={onClickCurtida}
          valorContador={numeroCurtidas}
        />

        <IconeComContador
          icone={iconeComentario}
          onClickIcone={onClickComentario}
          valorContador={numeroComentarios}
        />
      </PostFooter>
      {caixaDeComentario}
    </PostContainer>
  )
}

export default Post