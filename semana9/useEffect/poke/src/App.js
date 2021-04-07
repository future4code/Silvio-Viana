import axios from 'axios'
import React, {useState, useEffect} from 'react'
import PokeCard from './components/index'

function App() {

  const [pokemonLista, setPokemonLista] = useState([])
  const [pokemonAtual, setPokemonAtual] = useState('bulbasaur')

  const pegarPokemons = async () => {
    try {
      const response = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=151")
      setPokemonLista(response.data.results)
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    pegarPokemons()
  }, [])

  const mudarPokemon = (event) => {
    setPokemonAtual(event.target.value)
    return 
  }

  return (
    <div>
      <select onChange={mudarPokemon}>
        {pokemonLista.map((pokemon) => {
          return <option key={pokemon.name}>{pokemon.name}</option>
        })}
      </select>
      <PokeCard pokemon={pokemonAtual}/>
    </div>
  );
}

export default App;
