import axios from 'axios'
import React, {useState, useEffect} from 'react'


export default function PokeCard(props) {

    const [pokemonStatus, setPokemonStatus] = useState({})
    const [pokemonBaixado, setPokemonBaixado] = useState(false)

    const mostrarCard = async () => {
        try {
            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.pokemon}`)
            setPokemonStatus(response.data)
            setPokemonBaixado(true)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        mostrarCard()
    }, [props.pokemon])

    return (
        <div>          
            <h1>Nome: {pokemonStatus.name}</h1>
            <h3>Peso: {pokemonStatus.weight}kg</h3>
            {pokemonBaixado && <h3>Tipo: {pokemonStatus.types[0].type.name}</h3>}
            {pokemonBaixado && <img src={pokemonStatus.sprites.front_default} alt={pokemonStatus.name}/>}
        </div>
    )
}