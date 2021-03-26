import styled from 'styled-components'

const PlaylistBox = styled.div`
margin: 20px 0px;
border: 1px solid black;
padding: 15px;
display: flex;
justify-content: space-between;
width: 400px;
h3 {
    display: inline;
    margin: 0;
}
`
const Botoes = styled.div`
button {
    margin: 0px 3px;
    font-size: 18px;
}`

const ListaBox = styled.div`
margin: 0;
align-items: flex-start;
`



function ListaPlaylist(props) {

    
    return (
        <ListaBox>
            <h1>Lista de Playlists</h1>
            {props.playlists ?
            props.playlists.map(playlist => {
                return (
                    <PlaylistBox key={playlist.id}>
                        <h3>{playlist.name}</h3>
                        <Botoes>
                            <button onClick={() =>props.pegarMusicasPlaylist(playlist.id, playlist.name)}>Detalhes</button>
                            <button onClick={() => props.apagarPlaylist(playlist.id)}>Apagar</button>
                        </Botoes>
                    </PlaylistBox>
                )
            }): <h3>Carregando...</h3>}
        </ListaBox>
    )
}

export default ListaPlaylist