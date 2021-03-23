function Lista(props) {
    return (
        <div>
            <h1>Usuários Cadastrados</h1>
            {props.usuarios.map(user => {
                return (<div>
                        <p key={user.id}>{user.name}</p>
                        <button onClick={() => props.apagarUsuario(user.id)}>x</button>
                        <hr/>
                    </div>
            )})}
        </div>
    )
}

export default Lista