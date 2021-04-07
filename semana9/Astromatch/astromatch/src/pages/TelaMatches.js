import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {baseUrl} from '../parameters'
import {CardMatches, Match, BotõesPágina, Aviso} from '../styled'

export default function TelaMatches(props) {

    const [matches, setMatches] = useState([])
    const [carregado, setCarregado] = useState(false)

    const pegarMatches = async () => {
        try {
            const response = await axios.get(`${baseUrl}/matches`)
            setMatches(response.data.matches)
            setCarregado(true)
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        pegarMatches()
    }, [])

    return (
        <CardMatches>
            <BotõesPágina>
                <button onClick={props.limparMatches}>Limpar Matches</button>
                <button onClick={() => props.mudarPagina('inicial')}>Inicial</button>
            </BotõesPágina>
            {(matches.length === 0 && carregado) && <Aviso><h1>Você não possui Matches</h1></Aviso>}
            {carregado ? matches.map((perfil) => {
                return (
                    <Match>
                        <img src={perfil.photo} alt="Foto de Perfil"/>
                        <h1>{perfil.name}</h1>
                    </Match>)
            }): <Aviso><h1>Carregando...</h1></Aviso>}
        </CardMatches>
    )
}