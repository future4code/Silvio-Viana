import styled from 'styled-components'

const ListaBox = styled.div`
text-align: center;

p {
    display: inline;
    padding: 0px 10px;
}`

const BotaoPagina = styled.button`
width: 100px;
height: 30px;
margin: 20px 0px 0px 20px;`

function Lista(props) {
    return (
        <div>
            <BotaoPagina onClick={() => props.mudarPagina("cadastro")}>Voltar</BotaoPagina>
            <ListaBox>
                <input onChange={props.inputBuscar} placeholder="Buscar Usuário"/>
                <button onClick={props.buscarUsuario}>Buscar</button>
                <h1>Usuários Cadastrados</h1>
                {props.usuarios.map(user => {
                    return (<div key={user.id}>
                            <p onClick={ () => props.usuarioDetalhe(user.id)}>{user.name}</p>
                            <button onClick={() => props.apagarUsuario(user.id)}>Apagar</button>
                            <hr/>
                        </div>
                )})}
            </ListaBox>
        </div>
    )
}

export default Lista