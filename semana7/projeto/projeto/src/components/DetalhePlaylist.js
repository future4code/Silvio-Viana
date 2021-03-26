import styled from 'styled-components'

const MusicaBox = styled.div`
audio {
    display: inline;
    height: 12px;
}
`
const AdicionarBox = styled.div`
border: 2px solid black;
border-radius: 5px;
padding: 20px 100px;
display: flex;
flex-direction: column;
input {
    margin: 6px 5px;
    font-size: 20px;
    display: block;
}
button {
    height: 35px;
    width: 280px;
    margin: 10px 0px 0px 0px;
    font-size: 20px;
}`


function DetalhePlaylist(props) {
    return (
        <div>
            <h1>Playlist: {props.playlistDetalheNome}</h1>
            <AdicionarBox>
                <h2>Adicionar Nova Música</h2>
                <input value={props.valueNome} onChange={props.inputNomeMusica} placeholder="Nome"/>
                <input value={props.valueArtist} onChange={props.inputArtistaMusica} placeholder="Artista"/>
                <input value={props.valueUrl} onChange={props.inputUrlMusica} placeholder="Link"/>
                <button onClick={props.adicionarMusica}>Adicionar</button>
            </AdicionarBox>
            <h3>Quantidade de Músicas: {props.playlistDetalhe.quantity}</h3>
            {props.playlistDetalhe.tracks.map(musica => {
                return (
                    <MusicaBox>
                        <p><b>Nome: </b>{musica.name}</p>
                        <p><b>Artista: </b>{musica.artist}</p>
                        <p><b>Música: </b><audio controls src={musica.url}/></p><hr/>
                    </MusicaBox>)
            })}
        </div>
    )

}
export default DetalhePlaylist