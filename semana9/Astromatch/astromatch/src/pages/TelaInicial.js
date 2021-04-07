import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {baseUrl} from '../parameters'
import {ImagemInicial, CardInicial, Botões ,Botão, BotõesPágina} from '../styled'


export default function TelaInicial(props) {

    const [perfil, setPerfil] = useState({})
    const [carregado, setCarregado] = useState(false)

    const pegarPerfil = async () => {
        try {
            const response = await axios.get(`${baseUrl}/person`)
            setPerfil(response.data.profile)
            setCarregado(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        pegarPerfil()
    }, [])

    const escolhaPerfil = async (resposta) => {
        if (!perfil) {
            window.alert("Não há mais usuários disponíveis, tente novamente mais tarde.")
            return
        }
        const body = {
            id: perfil.id,
            choice: resposta
        }
        try {
            await axios.post(`${baseUrl}/choose-person`, body)
            pegarPerfil()
            setCarregado(false)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <CardInicial>
            <BotõesPágina>
                <button onClick={props.limparMatches}>Limpar Matches</button>
                <button onClick={() => props.mudarPagina('matches')}>Matches</button>
            </BotõesPágina>
            {!carregado && <h1>Carregando...</h1>}
            {(carregado && !perfil) && <h1>Não há mais usuários disponíveis</h1>}
            {(carregado && perfil) && <h1>{perfil.name}, {perfil.age}</h1>}
            {(carregado && perfil) && <h3>{perfil.bio}</h3>}
            {(carregado && perfil) && <ImagemInicial src={perfil.photo} alt="Foto da Pessoa"/>}
            <Botões>
                <Botão onClick={() => escolhaPerfil(true)}>Sim</Botão>
                <Botão onClick={() => escolhaPerfil(false)}>Não</Botão>
            </Botões>
        </CardInicial>
    )
}