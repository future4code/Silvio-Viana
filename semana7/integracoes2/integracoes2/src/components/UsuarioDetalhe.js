import styled from 'styled-components'

const UsuarioBox = styled.div`
text-align: center;
button {
    margin: 3px;
}
`

const BotaoPagina = styled.button`
width: 100px;
height: 30px;
margin: 20px 0px 0px 20px;`

function UsuarioDetalhe(props) {
    return (
        <div>
        <BotaoPagina onClick={() => props.mudarPagina("lista")}>Voltar</BotaoPagina>
        <UsuarioBox>
            <h1>Nome: {props.dados.name}</h1>
            {props.editandoUsuario && <input onChange={props.editandoNome} placeholder="Novo Nome"/>}<hr/>
            <h3>Email: {props.dados.email}</h3>
            {props.editandoUsuario && <input onChange={props.editandoEmail} placeholder="Novo Email"/>}<hr/>
            <button onClick={() => props.apagarUsuario(props.dados.id)}>Apagar Usuário</button>
            {!props.editandoUsuario && <button onClick={props.editarUsuario}>Editar Usuário</button>}
            {props.editandoUsuario && <button onClick={() => props.salvarUsuarioEditado(props.dados.id)}>Salvar</button>}
        </UsuarioBox>
        </div>
    )
}

export default UsuarioDetalhe