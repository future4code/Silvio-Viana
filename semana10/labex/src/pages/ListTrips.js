import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { goToHome, goToApplicationForm } from '../routes/coordinator'
import { baseUrl } from '../parameters'


export default function ListTrips() {

    const [trips, setTrips] = useState([])
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
    

    return (
        <div>
            <h1>Lista de Viagens</h1>
            <button onClick={() => goToHome(history)}>Voltar</button>
            <button onClick={() => goToApplicationForm(history)}>Inscrever-se</button><hr/>
            {trips && trips.map((trip) => {
                return (
                    <article key={trip.id}>
                        <p><b>Nome: </b>{trip.name}</p>
                        <p><b>Descrição: </b>{trip.description}</p>
                        <p><b>Planeta: </b>{trip.planet}</p>
                        <p><b>Duração: </b>{trip.durationInDays} dias</p>
                        <p><b>Data: </b>{trip.date}</p><hr/>
                    </article>
                )
            })}
        </div>
    )
}