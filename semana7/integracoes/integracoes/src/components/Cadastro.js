function Cadastro(props) {
    return (
        <div>
            <label>Nome:</label>
            <input onChange={props.inputNome} value={props.valueNome}></input>
            <label>Email:</label>
            <input onChange={props.inputEmail} value={props.valueEmail} ></input>
            <button onClick={props.salvarPessoa}>Salvar</button>
        </div>
    )
}

export default Cadastro