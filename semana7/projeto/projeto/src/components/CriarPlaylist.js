import styled from 'styled-components'

const CadastroBox = styled.div`
border: 2px solid black;
display: inline-block;
height: 300px;
width: 50%;
margin: 50px;
border-radius: 5px;
display: flex;
flex-direction: column;
justify-content: space-around;

input {
    width: 350px;
    height: 50px;
    font-size: 20px;
}
button {
    width: 150px;
    height: 56px;
    font-size: 20px;
    margin: 0px 0px 0px 5px;
}`



function CriarPlaylist(props) {
    return (
        <CadastroBox>
            <h1>Criar Playlist</h1>
            <div>
                <input value={props.value} onChange={props.inputNomePlaylist} placeholder="Nome da Playlist"/>
                <button onClick={props.criarPlaylist}>Criar</button>
            </div>
        </CadastroBox>
    )
}

export default CriarPlaylist