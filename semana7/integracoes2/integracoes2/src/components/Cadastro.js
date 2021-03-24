import styled from 'styled-components'

const CadastroBox = styled.div`
border: 1px solid black;
padding: 50px;
margin: 50px 500px;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;

input {
    display: block;
    margin: 0px 0px 10px 0px;
}

button {
    width: 187px;
}`

const BotaoPagina = styled.button`
width: 100px;
height: 30px;
margin: 20px 0px 0px 20px;`

function Cadastro(props) {
    return (
        <div>
            <BotaoPagina onClick={() => props.mudarPagina("lista")}>Ver Lista</BotaoPagina>
            <CadastroBox>
                <input placeholder="Nome" onChange={props.inputNome} value={props.valueNome}></input>
                <input placeholder="Email" onChange={props.inputEmail} value={props.valueEmail} ></input>
                <button onClick={props.salvarPessoa}>Salvar</button>
            </CadastroBox>
        </div>
    )
}

export default Cadastro