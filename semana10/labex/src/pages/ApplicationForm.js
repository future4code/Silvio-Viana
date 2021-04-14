import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { goToListTrips } from '../routes/coordinator'
import { baseUrl, listaPaises } from '../parameters'
import { useInput, useId } from '../customHooks'


export default function ApplicationForm() {
    
    const [trips, setTrips] = useState([])
    const [nome, setNome, clearNome] = useInput()
    const [idade, setIdade, clearIdade] = useInput()
    const [texto, setTexto, clearTexto] = useInput()
    const [profissao, setProfissao, clearProfissao] = useInput()
    const [origem, setOrigem,clearOrigem] = useInput()
    const [idViagem, setIdViagem, viagemNome, clearViagem] = useId()

    const history = useHistory()

    useEffect(() => {
        getTrips()
    }, [])

    const getTrips = async () => {
        try {
            const response = await axios.get(`${baseUrl}/trips`)
            setTrips(response.data.trips)
        }
        catch (error) {
            console.log(error)
        }
    }

    const applyToTrip = async () => {
        if (!nome || !idade || !texto || !profissao || !origem || !idViagem) {
            window.alert("Você precisa digitar todas as informações!")
            return
        }
        if (idViagem < 1) {
            window.alert("Idade Inválida")
            return
        }

        const body = {
            name: nome,
            age: idade,
            applicationText: texto,
            profession: profissao,
            country: origem
        }
        try {
            await axios.post(`${baseUrl}/trips/${idViagem}/apply`, body)
            window.alert("Inscrição feita com sucesso")
            clearNome()
            clearIdade()
            clearTexto()
            clearProfissao()
            clearOrigem()
            clearViagem()
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1>Inscrever-se para uma Viagem</h1>
            <button onClick={() => goToListTrips(history)}>Voltar</button>

            <select onChange={setIdViagem} value={viagemNome}>
            <option id=""></option>
                {trips.map((trip) => {
                    return <option key={trip.id} id={trip.id}>{trip.name}</option>
                })}
            </select>

            <input value ={nome} onChange={setNome} placeholder="Nome"/>
            <input value ={idade} onChange={setIdade} placeholder="Idade" type="number"/>
            <input value ={texto} onChange={setTexto} placeholder="Texto de Candidatura"/>
            <input value ={profissao} onChange={setProfissao} placeholder="Profissão"/>

            <select onChange={setOrigem} value={origem}>
                <option></option>
                {listaPaises.map((nacao) => {
                    return <option key={nacao.ordem}>{nacao.nome}</option>
                })}
            </select>
            <button onClick={applyToTrip}>Enviar</button>
        </div>
    )
}